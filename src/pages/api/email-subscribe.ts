import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

// Return a 404 for GET requests
export const GET: APIRoute = ({ params, request }) => {
  return new Response(null, { status: 404 });
};

// Handle POST requests
export const POST: APIRoute = async ({ params, request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }), 
        { status: 400, headers }
      );
    }

    // Check if email already exists
    const { data: existingData, error: existingError } = await supabaseAdmin
      .from('content_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingError && !existingError.message.includes('No rows found')) {
      console.error('Error checking for existing email:', existingError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to check subscription status' }), 
        { status: 500, headers }
      );
    }

    if (existingData?.id) {
      // Email already exists - treat as success
      return new Response(
        JSON.stringify({ success: true }), 
        { status: 200, headers }
      );
    }

    // Insert new subscriber
    const { data: contentData, error: contentError } = await supabaseAdmin
      .from('content_subscribers')
      .insert([{ 
        email, 
        marketing_opt_in: marketingOptIn,
        subscribed_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (contentError) {
      console.error('Error inserting subscriber:', contentError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save subscription' }), 
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true }), 
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }), 
      { status: 500, headers }
    );
  }
};
