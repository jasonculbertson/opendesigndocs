import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin email - only this email can use this endpoint
const ADMIN_EMAIL = 'jculbertson@gmail.com';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check admin authorization
    const adminEmail = request.headers.get('x-admin-email');
    if (adminEmail !== ADMIN_EMAIL) {
      return new Response('Unauthorized', { status: 403 });
    }

    // Get all recruiters
    const { data: recruiters, error } = await supabase
      .from('recruiters')
      .select('*')
      .order('name');

    if (error) {
      console.error('Supabase error:', error);
      return new Response(`Database error: ${error.message}`, { status: 500 });
    }

    return new Response(JSON.stringify(recruiters || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
