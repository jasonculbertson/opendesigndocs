import type { APIContext } from 'astro';

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

    // For now, just log the subscription request
    // The actual email validation already happened on the frontend
    console.log('Email subscription request:', { 
      email: email.toLowerCase(), 
      marketingOptIn,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement actual email storage
    // Options:
    // 1. Store in Supabase subscribers table
    // 2. Store in Clerk user metadata after they sign up
    // 3. Use a simple database or service

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Email subscription recorded'
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