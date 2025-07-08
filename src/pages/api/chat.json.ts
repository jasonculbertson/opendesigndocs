import type { APIRoute } from 'astro';
import { generateGeneralResponse } from '../../utils/openai';
import { getCompetenciesText } from '../../utils/competenciesLoader';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Chat API: Processing message:', message);
    console.log('Chat API: OpenAI API key present:', !!process.env.OPENAI_API_KEY);

    // Get competencies text
    const competenciesText = await getCompetenciesText();
    console.log('Chat API: Competencies text length:', competenciesText.length);
    
    // Generate response using intelligent model selection
    const response = await generateGeneralResponse(message, competenciesText);
    console.log('Chat API: Generated response length:', response.length);
    
    return new Response(JSON.stringify({ response }), {
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