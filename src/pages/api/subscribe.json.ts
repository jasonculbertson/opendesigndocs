import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;

    if (!email) {
      return new Response(JSON.stringify({ 
        error: 'Email is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase client
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Supabase credentials not configured');
      return new Response(JSON.stringify({ 
        error: 'Database not configured' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert email into subscribers table
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          subscribed_at: new Date().toISOString(),
          source: 'newsletter_signup',
          marketing_opt_in: marketingOptIn || false
        }
      ])
      .select();

    if (error) {
      console.error('❌ Failed to insert subscriber:', error);
      
      // If it's a duplicate email, return a friendly message
      if (error.code === '23505') { // PostgreSQL unique violation
        return new Response(JSON.stringify({ 
          success: true,
          message: 'Already subscribed!'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ 
        error: 'Failed to subscribe',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Email subscription successful:', { 
      email: email.toLowerCase(), 
      marketingOptIn,
      subscriberId: data?.[0]?.id,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Successfully subscribed!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Subscribe endpoint error:', error);
    return new Response(JSON.stringify({ 
      error: 'Subscription failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 