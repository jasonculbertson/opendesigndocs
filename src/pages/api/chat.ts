import type { APIRoute } from 'astro';
import { loadAllCompetencies, getCompetenciesForRole, getAllCompetenciesText } from '../../utils/competenciesLoader';
import { 
  generateStructuredReview, 
  generateFinalReview, 
  generateGeneralResponse,
  type ReviewData 
} from '../../utils/openai';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, step, reviewData } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Load competencies data
    const allCompetencies = await loadAllCompetencies();
    const competenciesText = getAllCompetenciesText(allCompetencies);

    let response = '';

    // Handle different steps of the review process
    switch (step) {
      case 'analyzing':
        // Extract role and level from title for specific competencies
        const roleMatch = reviewData.title.match(/(\w+(?:\s+\w+)*)\s+(?:Designer|Manager|Lead|Staff|Principal)/i);
        const levelMatch = reviewData.title.match(/(?:Designer|Manager|Lead|Staff|Principal)\s*(\w+)?/i);
        
        const role = roleMatch ? roleMatch[1] : 'Product Designer';
        const level = levelMatch ? levelMatch[1] || 'Senior' : 'Senior';
        
        const specificCompetencies = getCompetenciesForRole(role, level, allCompetencies);
        
        response = await generateStructuredReview(
          reviewData as ReviewData, 
          competenciesText, 
          specificCompetencies || undefined
        );
        break;
      
      case 'finalizing':
        // For final review, we need the draft review content
        // This would need to be passed from the frontend
        const draftReview = reviewData.draftReview || 'Draft review content not provided';
        response = await generateFinalReview(
          reviewData as ReviewData, 
          draftReview, 
          competenciesText
        );
        break;
      
      case 'welcome-conversation':
        // For welcome conversation, validate the topic first
        response = await generateGeneralResponse(message, competenciesText);
        break;
      
      default:
        response = await generateGeneralResponse(message, competenciesText);
    }

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      if (error.message.includes('OpenAI API key')) {
        errorMessage = 'AI service not configured. Please contact support.';
      } else if (error.message.includes('Failed to generate')) {
        errorMessage = 'Unable to generate response at this time. Please try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 