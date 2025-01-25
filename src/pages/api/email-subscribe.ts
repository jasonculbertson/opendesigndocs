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

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('content_subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Email already subscribed'
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabaseAdmin
      .from('content_subscribers')
      .insert([{ 
        email, 
        marketing_opt_in: marketingOptIn 
      }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error('Failed to save subscriber');
    }

    return new Response(
      JSON.stringify({ success: true }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
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
