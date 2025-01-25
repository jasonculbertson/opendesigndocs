import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

// Return a 404 for GET requests
export const GET: APIRoute = ({ params, request }) => {
  return new Response(null, { status: 404 });
};

// Handle POST requests
export const POST: APIRoute = async ({ params, request }) => {
  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    // Log the request for debugging
    console.log('API received request:', { email, marketingOptIn });

    // Return a success response for testing
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error' 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};
