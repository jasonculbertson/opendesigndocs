import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET({ request }: APIContext) {
  try {
    console.log('🧪 Testing basic Supabase connection...');
    
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

    // Test 1: Check table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('subscribers')
      .select('*')
      .limit(1);

    if (tableError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to connect to subscribers table',
        details: tableError
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Test 2: Try inserting with minimal columns
    const testEmail = `simple-test-${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('subscribers')
      .insert([
        {
          email: testEmail,
          subscribed_at: new Date().toISOString()
        }
      ])
      .select();

    if (insertError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to insert with minimal columns',
        details: insertError,
        hint: 'Your table structure might be different than expected'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Test 3: Clean up
    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('email', testEmail);

    return new Response(JSON.stringify({
      success: true,
      message: 'Basic Supabase test successful!',
      details: {
        connectionWorked: true,
        insertWorked: true,
        cleanupWorked: !deleteError,
        testEmail: testEmail,
        tableColumns: tableInfo?.[0] ? Object.keys(tableInfo[0]) : [],
        insertedRecord: insertData?.[0]
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Simple test error:', error);
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