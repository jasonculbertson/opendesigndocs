import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET({ request }: APIContext) {
  try {
    console.log('🧪 Testing Supabase connection...');
    
    // Check environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing Supabase environment variables',
        details: {
          hasUrl: !!supabaseUrl,
          hasServiceKey: !!supabaseServiceKey,
          urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'missing'
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Supabase client initialized');

    // Test 1: Check if we can connect to the database
    const { data: connectionTest, error: connectionError } = await supabase
      .from('subscribers')
      .select('count', { count: 'exact', head: true });

    if (connectionError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to connect to subscribers table',
        details: connectionError
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Successfully connected to subscribers table');

    // Test 2: Try to insert a test record
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('subscribers')
      .insert([
        {
          email: testEmail,
          clerk_user_id: 'test-user-id',
          first_name: 'Test',
          last_name: 'User',
          subscribed_at: new Date().toISOString(),
          source: 'api_test',
          marketing_opt_in: true
        }
      ])
      .select();

    if (insertError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to insert test record',
        details: insertError,
        hint: 'Check if your subscribers table has the expected columns'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Successfully inserted test record:', insertData);

    // Test 3: Clean up the test record
    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('email', testEmail);

    if (deleteError) {
      console.warn('⚠️ Failed to clean up test record, but insertion worked:', deleteError);
    } else {
      console.log('✅ Test record cleaned up successfully');
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Supabase integration test successful!',
      details: {
        connectionWorked: true,
        insertWorked: true,
        cleanupWorked: !deleteError,
        testEmail: testEmail,
        insertedRecord: insertData?.[0]
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Supabase test error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Unexpected error during test',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json();
    const { email, testClerkWebhook } = body;

    if (!email) {
      return new Response(JSON.stringify({
        error: 'Email is required for testing'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('🧪 Testing with custom email:', email);

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing Supabase environment variables'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (testClerkWebhook) {
      // Simulate Clerk webhook payload
      const mockClerkUser = {
        id: `test_clerk_${Date.now()}`,
        email_addresses: [{ email_address: email }],
        first_name: 'Test',
        last_name: 'User'
      };

      const { data, error } = await supabase
        .from('subscribers')
        .insert([
          {
            email: email.toLowerCase(),
            clerk_user_id: mockClerkUser.id,
            first_name: mockClerkUser.first_name,
            last_name: mockClerkUser.last_name,
            subscribed_at: new Date().toISOString(),
            source: 'clerk_signup_test',
            marketing_opt_in: true
          }
        ])
        .select();

      if (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to simulate Clerk webhook',
          details: error
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Clerk webhook simulation successful!',
        insertedRecord: data?.[0]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Test regular newsletter signup
      const { data, error } = await supabase
        .from('subscribers')
        .insert([
          {
            email: email.toLowerCase(),
            subscribed_at: new Date().toISOString(),
            source: 'newsletter_signup_test',
            marketing_opt_in: true
          }
        ])
        .select();

      if (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to test newsletter signup',
          details: error
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Newsletter signup test successful!',
        insertedRecord: data?.[0]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('❌ Test POST error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Unexpected error during POST test',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 