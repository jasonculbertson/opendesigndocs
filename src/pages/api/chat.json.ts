import type { APIRoute } from 'astro';
import { generateGeneralResponse } from '../../utils/openai';
import { getCompetenciesText } from '../../utils/competenciesLoader';
import { checkUserUsage, updateUserUsage, getUserId, getUserEmail, getSessionId, countWords } from '../../utils/usageTracking';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, messages = [] } = await request.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Chat API: Processing message:', message);
    console.log('Chat API: OpenAI API key present:', !!process.env.OPENAI_API_KEY);

    // Get user identification
    const userId = getUserId(request);
    const userEmail = getUserEmail(request);
    const sessionId = getSessionId(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unable to identify user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate words in the current message
    const messageWords = countWords(message);
    console.log('Chat API: Message word count:', messageWords);

    // Check usage limits before processing
    const usageCheck = await checkUserUsage(userId, messageWords, userEmail, sessionId);
    console.log('Chat API: Usage check result:', usageCheck);

    if (!usageCheck.canUse) {
      return new Response(JSON.stringify({ 
        error: 'Daily word limit exceeded',
        usage: {
          currentUsage: usageCheck.currentUsage,
          dailyLimit: usageCheck.dailyLimit,
          remainingWords: usageCheck.remainingWords
        }
      }), {
        status: 429, // Too Many Requests
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get competencies text
    const competenciesText = await getCompetenciesText();
    console.log('Chat API: Competencies text length:', competenciesText.length);
    
    // Generate response using intelligent model selection
    const response = await generateGeneralResponse(message, competenciesText);
    console.log('Chat API: Generated response length:', response.length);
    
    // Count words in the response
    const responseWords = countWords(response);
    const totalWords = messageWords + responseWords;
    console.log('Chat API: Response word count:', responseWords);
    console.log('Chat API: Total word count:', totalWords);

    // Update usage tracking after successful response
    const usageUpdated = await updateUserUsage(userId, totalWords, userEmail, sessionId);
    console.log('Chat API: Usage updated:', usageUpdated);

    // Get updated usage stats
    const updatedUsage = await checkUserUsage(userId, 0, userEmail, sessionId);
    
    return new Response(JSON.stringify({ 
      response,
      usage: {
        currentUsage: updatedUsage.currentUsage,
        dailyLimit: updatedUsage.dailyLimit,
        remainingWords: updatedUsage.remainingWords,
        wordsUsedThisRequest: totalWords
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 