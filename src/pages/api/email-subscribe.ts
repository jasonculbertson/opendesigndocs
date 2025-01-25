import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export const GET: APIRoute = ({ params, request }) => {
  return new Response(null, { status: 404, headers });
};

export const OPTIONS: APIRoute = ({ request }) => {
  return new Response(null, { headers, status: 204 });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }), 
        { status: 500, headers }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }), 
        { status: 400, headers }
      );
    }

    const { error } = await supabase
      .from('content_subscribers')
      .upsert([{ 
        email,
        subscribed_at: new Date().toISOString()
      }], {
        onConflict: 'email'
      });

    if (error) {
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
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }), 
      { status: 500, headers }
    );
  }
};
