import type { APIContext } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    console.log('API received request:', { email, marketingOptIn });

    if (!email) {
      console.log('No email provided');
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
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
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        if (contentError.code === '23505') {
          // Email already exists, which is fine
          console.log('Email already exists in content_subscribers');
        } else {
          throw contentError;
        }
      }

      // If marketing opt-in is true, also insert into marketing_subscribers
      if (marketingOptIn) {
        const { error: marketingError } = await supabaseAdmin
          .from('marketing_subscribers')
          .insert([{ 
            email, 
            subscribed_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (marketingError && marketingError.code !== '23505') {
          console.error('Supabase marketing_subscribers error:', marketingError);
          throw marketingError;
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          data: contentData
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
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
          headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
