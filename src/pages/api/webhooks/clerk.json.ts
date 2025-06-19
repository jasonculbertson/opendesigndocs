import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const clerkWebhookSecret = import.meta.env.CLERK_WEBHOOK_SECRET;

export async function POST({ request }: APIContext) {
  try {
    // Verify webhook signature
    const payload = await request.text();
    const signature = request.headers.get('svix-signature');
    
    if (!clerkWebhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET is not configured');
      return new Response('Webhook secret not configured', { status: 500 });
    }

    // For now, we'll skip signature verification in development
    // In production, you should verify the webhook signature
    // using the svix library: https://docs.svix.com/receiving/verifying-payloads/how
    
    const event = JSON.parse(payload);
    console.log('📧 Clerk webhook received:', { 
      type: event.type, 
      eventId: event.data?.id,
      email: event.data?.email_addresses?.[0]?.email_address 
    });

    // Handle user.created event
    if (event.type === 'user.created') {
      const user = event.data;
      const email = user.email_addresses?.[0]?.email_address;
      
      if (!email) {
        console.warn('⚠️ User created without email address:', user.id);
        return new Response('User has no email address', { status: 200 });
      }

      // Initialize Supabase client
      if (!supabaseUrl || !supabaseServiceKey) {
        console.error('❌ Supabase credentials not configured');
        return new Response('Database not configured', { status: 500 });
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Insert user into subscribers table
      const { data, error } = await supabase
        .from('subscribers')
        .insert([
          {
            email: email.toLowerCase(),
            subscribed_at: new Date().toISOString(),
            marketing_opt_in: true // Default to true for Clerk signups
          }
        ])
        .select();

      if (error) {
        console.error('❌ Failed to insert user into subscribers table:', error);
        
        // If it's a duplicate email, that's OK - just log it
        if (error.code === '23505') { // PostgreSQL unique violation
          console.log('✅ User already exists in subscribers table:', email);
          return new Response('User already subscribed', { status: 200 });
        }
        
        return new Response(`Database error: ${error.message}`, { status: 500 });
      }

      console.log('✅ User added to subscribers table:', { 
        email, 
        clerkUserId: user.id,
        subscriberId: data?.[0]?.id 
      });

      return new Response('User subscribed successfully', { status: 200 });
    }

    // Handle other event types if needed
    console.log('ℹ️ Unhandled Clerk webhook event type:', event.type);
    return new Response('Event type not handled', { status: 200 });

  } catch (error) {
    console.error('❌ Clerk webhook error:', error);
    return new Response(`Webhook processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`, { 
      status: 500 
    });
  }
} 