import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

// This is a simpler endpoint format for testing
export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    // Log the request for debugging
    console.log('API received request:', { email, marketingOptIn });

    // Return a success response for testing
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
