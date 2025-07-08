import type { APIRoute } from 'astro';
import { generateStructuredReview, generateFinalReview, generateGeneralResponse } from '../../utils/openai';
import { loadAllCompetencies, getAllCompetenciesText, loadRoleCompetencies, loadSpecificCompetencies } from '../../utils/competenciesLoader';

// Helper function to extract role from message or reviewData
function extractRoleFromRequest(message: string, reviewData: any): string | null {
  // Common role patterns to look for with their corresponding file names
  const rolePatterns = [
    { pattern: /product designer/i, roleName: 'Product Designer' },
    { pattern: /ux designer/i, roleName: 'Ux Designer' },
    { pattern: /ui designer/i, roleName: 'Ui Designer' },
    { pattern: /design ops/i, roleName: 'Design Ops' },
    { pattern: /user researcher/i, roleName: 'User Researcher' },
    { pattern: /content designer/i, roleName: 'Content Designer' },
    { pattern: /copywriter/i, roleName: 'Copywriter' },
    { pattern: /graphic designer/i, roleName: 'Graphic Designer' },
    // Additional patterns for variations
    { pattern: /\bux\b/i, roleName: 'Ux Designer' },
    { pattern: /\bui\b/i, roleName: 'Ui Designer' },
    { pattern: /researcher/i, roleName: 'User Researcher' },
    { pattern: /design operations/i, roleName: 'Design Ops' },
    { pattern: /product design/i, roleName: 'Product Designer' }
  ];

  const textToSearch = `${message} ${JSON.stringify(reviewData || {})}`;
  
  // Look for level information too (Level 1, Level 2, etc.)
  const levelMatch = textToSearch.match(/level\s*(\d+)/i);
  const level = levelMatch ? levelMatch[1] : null;
  
  for (const { pattern, roleName } of rolePatterns) {
    if (pattern.test(textToSearch)) {
      console.log(`Detected role: ${roleName}${level ? ` (Level ${level})` : ''}`);
      return roleName;
    }
  }
  
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, step, reviewData, reviewType } = await request.json();

    // Smart competency loading based on conversation context and step
    let competenciesText = '';
    
    // Extract role information from both current message and review data
    const mentionedRole = extractRoleFromRequest(message, reviewData);
    const roleFromReviewData = reviewData?.role || reviewData?.position || reviewData?.title;
    const finalRole = mentionedRole || roleFromReviewData;
    
    if (step === 'welcome-conversation') {
      if (message.length < 50 && !finalRole) {
        // Very simple greeting - minimal context needed
        competenciesText = 'Available competency frameworks include Product Designer, UX Designer, Content Designer, User Researcher, Design Ops, Copywriter, and Graphic Designer roles across multiple levels.';
      } else if (finalRole) {
        // User mentioned a specific role - use static fallback for now to avoid timeouts
        console.log(`Using static competency context for role: ${finalRole}`);
        competenciesText = `${finalRole} competency framework includes multiple levels (1-6) with evaluation criteria for:
        
• Skill: Technical capabilities and craft expertise
• Influence: Impact on team, projects, and organization  
• Thinking: Problem-solving and strategic thinking abilities

Each level builds upon the previous with increasing scope, complexity, and leadership expectations. The framework helps assess current performance and identify growth opportunities.`;
      } else {
        // General inquiry - use static context to avoid loading delays
        competenciesText = `Design competency frameworks available for Product Designer, UX Designer, Content Designer, User Researcher, Design Ops, Copywriter, and Graphic Designer roles. Each role has 6 levels with Skill, Influence, and Thinking criteria.`;
      }
    } else if (step.includes('analyzing') || step === 'final-review') {
      // For analysis steps, we need detailed competencies - but use efficient loading
      if (finalRole) {
        // Try to load the specific role's competencies with timeout
        try {
          const roleCompetencies = await Promise.race([
            loadRoleCompetencies(finalRole),
            new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]);
          
          if (roleCompetencies) {
            competenciesText = getAllCompetenciesText([roleCompetencies]);
          } else {
            throw new Error('Role not found');
          }
        } catch (error) {
          console.log(`Analysis step: Failed to load role ${finalRole}, using static context`);
          competenciesText = `${finalRole} detailed competency framework with specific evaluation criteria for performance analysis and review generation.`;
        }
      } else {
        // No specific role identified - use comprehensive static context
        competenciesText = `Comprehensive design competency frameworks covering all design roles with detailed evaluation criteria for performance analysis.`;
      }
    } else {
      // Default case - use static context for reliability
      if (finalRole) {
        competenciesText = `${finalRole} competency framework with structured evaluation criteria for career development and performance assessment.`;
      } else {
        competenciesText = `Design competency frameworks available for multiple roles with structured evaluation criteria.`;
      }
    }

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