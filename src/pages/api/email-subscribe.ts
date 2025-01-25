import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

// Return a 404 for GET requests
export const GET: APIRoute = ({ params, request }) => {
  return new Response(null, { status: 404, headers });
};

// Handle preflight requests
export const OPTIONS: APIRoute = ({ request }) => {
  return new Response(null, { headers, status: 204 });
};

// Handle POST requests
export const POST: APIRoute = async ({ params, request }) => {
  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase client not initialized');
    }

    const body = await request.json();
    const { email, marketingOptIn } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }), 
        { status: 400, headers }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }), 
        { status: 400, headers }
      );
    }

    // Check if email already exists
    const { data: existingData, error: existingError } = await supabaseAdmin
      .from('content_subscribers')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingError) {
      console.error('Error checking for existing email:', existingError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to check subscription status' }), 
        { status: 500, headers }
      );
    }

    if (existingData?.id) {
      // Email already exists - treat as success
      return new Response(
        JSON.stringify({ success: true, message: 'Already subscribed' }), 
        { status: 200, headers }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabaseAdmin
      .from('content_subscribers')
      .insert([{ 
        email, 
        marketing_opt_in: marketingOptIn ?? false,
        subscribed_at: new Date().toISOString()
      }]);

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);
      
      // Check for specific error types
      if (insertError.code === '23505') { // Unique violation
        return new Response(
          JSON.stringify({ success: true, message: 'Already subscribed' }), 
          { status: 200, headers }
        );
      }

      if (insertError.code === '42P01') { // Table doesn't exist
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Database not properly configured. Please contact support.' 
          }), 
          { status: 500, headers }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save subscription' }), 
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed' }), 
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Unexpected error in email subscription:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      }), 
      { status: 500, headers }
    );
  }
};
