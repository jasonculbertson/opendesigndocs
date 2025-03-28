// Import the Edge Runtime from Vercel
export const config = {
  runtime: 'edge'
};

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://bmqaaynxrncmczdtmhiy.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
}

// Create a service role client for admin operations
const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    console.log('API received request:', { email, marketingOptIn });

    if (!email) {
      console.log('No email provided');
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

    console.log('Submitting to Supabase:', { email, marketingOptIn });

    try {
      const { data, error } = await supabaseAdmin
        .from('subscribers')
        .insert([{ 
          email, 
          subscribed_at: new Date().toISOString(),
          marketing_opt_in: marketingOptIn || false
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        if (error.message?.includes('does not exist')) {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'Database table not set up. Please create the subscribers table.' 
            }), {
              status: 500,
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }

        if (error.code === '23505') {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'This email is already subscribed.' 
            }), {
              status: 400,
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }

        if (error.code === '42501') {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'Permission denied. Please check Supabase configuration.' 
            }), {
              status: 500,
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: false,
            error: error.message || 'Failed to subscribe',
            code: error.code 
          }), {
            status: 500,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }

      console.log('Successfully added to Supabase:', data);

      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Successfully subscribed',
          data 
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Database operation failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown error'
        }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
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
}
