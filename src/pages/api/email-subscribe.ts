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
      // Always insert into content_subscribers
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
        console.error('Supabase content_subscribers error:', contentError);
        
        if (contentError.message?.includes('does not exist')) {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'Database table not set up. Please create the content_subscribers table.' 
            }), {
              status: 500,
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }

        if (contentError.code === '23505') {
          // Email already exists, return success
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

        throw contentError;
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          data: contentData
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    } catch (err) {
      console.error('Supabase error:', err);
      throw err;
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
};
