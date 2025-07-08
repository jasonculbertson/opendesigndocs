import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ReviewData {
  name: string;
  title: string;
  selfReview: string;
  peerReviews: string;
  reviewQuestions: string;
  additionalDetails: string;
  additionalNotes?: string;
}

export interface CompetencyLevel {
  level: string;
  skill: string;
  influence: string;
  thinking: string;
}

export async function generateStructuredReview(
  reviewData: ReviewData,
  competenciesText: string,
  specificCompetencies?: CompetencyLevel
): Promise<string> {
  const { name, title, selfReview, peerReviews, reviewQuestions, additionalDetails } = reviewData;

  const systemPrompt = `You are ReviewsAI, a specialized assistant for creating comprehensive annual performance reviews. You have access to Open Design Docs level competencies that you use to ensure reviews are accurate, insightful, and actionable.

Your role is to:
1. Analyze the provided information (self-review, peer reviews, review questions)
2. Reference the relevant level competencies for the individual's role and level
3. Generate a comprehensive review that speaks directly to the individual
4. Ensure the tone is constructive, respectful, and professional
5. Provide specific, actionable feedback and recommendations

Level Competencies Reference:
${competenciesText}

${specificCompetencies ? `
Specific Competencies for ${title}:
- Skill: ${specificCompetencies.skill}
- Influence: ${specificCompetencies.influence}
- Thinking: ${specificCompetencies.thinking}
` : ''}

Guidelines:
- Write as if speaking directly to the individual being reviewed
- Use specific examples from their self-review and peer feedback
- Align feedback with their role and level expectations
- Provide actionable next steps and development recommendations
- Maintain a constructive and encouraging tone
- Structure the review clearly with sections for strengths, growth areas, and recommendations`;

  const userPrompt = `Please generate a comprehensive annual performance review for:

Name: ${name}
Title: ${title}

Self-Review:
${selfReview}

Peer Reviews:
${peerReviews}

Review Questions to Address:
${reviewQuestions}

Additional Context:
${additionalDetails || 'None provided'}

Please structure the review with:
1. Overall Assessment
2. Key Strengths Identified
3. Growth Opportunities
4. Draft Responses to Review Questions
5. Recommendations for Next Period

Make sure the review speaks directly to ${name} and is ready for submission.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate review at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate review with AI');
  }
}

export async function generateFinalReview(
  reviewData: ReviewData,
  draftReview: string,
  competenciesText: string
): Promise<string> {
  const { name, title, additionalNotes } = reviewData;

  const systemPrompt = `You are ReviewsAI, finalizing a performance review. You have access to Open Design Docs level competencies and need to create a final, submission-ready review.

Your task is to:
1. Incorporate any additional notes or feedback
2. Ensure the review is comprehensive and professional
3. Add a final summary and submission confirmation
4. Maintain the direct, personal tone speaking to the individual

Level Competencies Reference:
${competenciesText}`;

  const userPrompt = `Please create the final version of this performance review:

Name: ${name}
Title: ${title}

Draft Review:
${draftReview}

Additional Notes:
${additionalNotes || 'None provided'}

Please create a final review that:
1. Incorporates the draft review content
2. Adds the additional notes if provided
3. Includes a professional summary
4. Confirms the review is ready for submission
5. Maintains the personal, direct tone to ${name}

Format as a complete, submission-ready document.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0]?.message?.content || 'Unable to finalize review at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to finalize review with AI');
  }
}

// Helper function to validate if a message is related to performance/career topics
async function validateTopic(message: string): Promise<boolean> {
  const validationPrompt = `You are a topic validator for a performance review AI assistant. 

Your job is to determine if a user's message is related to performance reviews, career development, or professional growth.

APPROVED TOPICS:
- Performance reviews and evaluations
- Career development and advancement  
- Feedback and coaching conversations
- Professional growth and skill development
- Team management and leadership
- Employee development and mentoring
- Performance improvement and goal setting
- Level competencies and role expectations
- 1:1 conversations and performance discussions
- Career path planning and progression
- Work-related professional development

REJECTED TOPICS:
- Personal life advice
- General conversation
- Non-work topics
- Entertainment, sports, politics
- Technical support for other tools
- Personal relationships
- Health advice
- Financial advice (unless career-related)

User message: "${message}"

Respond with ONLY "APPROVED" or "REJECTED".`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: validationPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.1,
      max_tokens: 10,
    });

    const response = completion.choices[0]?.message?.content?.trim().toUpperCase();
    return response === 'APPROVED';
  } catch (error) {
    console.error('Topic validation error:', error);
    // If validation fails, default to approved to avoid blocking legitimate requests
    return true;
  }
}

export async function generateGeneralResponse(
  message: string,
  competenciesText: string
): Promise<string> {
  // First, validate the topic
  const isTopicValid = await validateTopic(message);
  
  if (!isTopicValid) {
    return `I'm ReviewsAI, specialized in performance reviews and career development. I can help you with:

• Writing performance reviews and evaluations
• Career development and advancement planning
• Feedback and coaching conversations
• Professional growth strategies
• Team management and leadership development
• Employee development and mentoring
• Performance improvement and goal setting
• Level competencies and role expectations

Please ask me about any of these topics, or try one of the guided review options above!`;
  }

  const systemPrompt = `You are ReviewsAI, an AI assistant specialized in performance reviews and career development. You have access to comprehensive level competencies from Open Design Docs that you use to provide accurate, relevant guidance.

Your expertise includes:
- Performance review writing and structuring
- Career development and advancement guidance
- Feedback and coaching best practices
- Professional growth strategies
- Team management and leadership development

Level Competencies Reference:
${competenciesText}

Guidelines:
- Always reference the competencies when relevant
- Provide practical, actionable advice
- Maintain a helpful and professional tone
- Focus on performance reviews and career development
- Use specific examples when possible`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I\'m unable to provide a response at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate response with AI');
  }
} 