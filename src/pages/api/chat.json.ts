import type { APIRoute } from 'astro';
import { generateStructuredReview, generateFinalReview, generateGeneralResponse } from '../../utils/openai';
import { loadAllCompetencies, getAllCompetenciesText } from '../../utils/competenciesLoader';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, step, reviewData, reviewType } = await request.json();

    // Load competencies text
    const allCompetencies = await loadAllCompetencies();
    const competenciesText = getAllCompetenciesText(allCompetencies);

    let response: string;

    switch (step) {
      case 'welcome-conversation':
        response = await generateGeneralResponse(message, competenciesText);
        break;

      case 'self-review-analyzing':
        response = await generateStructuredReview(reviewData, competenciesText);
        break;

      case 'employee-review-analyzing':
        response = await generateStructuredReview(reviewData, competenciesText);
        break;

      case 'oneonone-analyzing':
        response = await generateStructuredReview(reviewData, competenciesText);
        break;

      case 'career-analyzing':
        response = await generateStructuredReview(reviewData, competenciesText);
        break;

      case 'final-review':
        response = await generateFinalReview(reviewData, reviewData.additionalNotes || '', competenciesText);
        break;

      default:
        response = await generateGeneralResponse(message, competenciesText);
    }

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Check if it's an OpenAI API key error
    if (error instanceof Error && error.message.includes('OpenAI API key')) {
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key is not configured. Please contact support.' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ 
      error: 'Failed to process chat request' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 