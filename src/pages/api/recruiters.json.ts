import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Types for recruiter operations
interface RecruiterUpdate {
  name?: string;
  agency?: string;
  title?: string;
  linkedin?: string;
  website?: string;
  email?: string;
  about?: string;
  specialties?: string;
  philosophy?: string;
  approach?: string;
  notable_clients?: string;
  image?: string;
}

// GET - Fetch all active recruiters
export async function GET({ url }: APIContext) {
  try {
    const searchParams = new URLSearchParams(url.search);
    const slug = searchParams.get('slug');

    let query = supabase
      .from('recruiters')
      .select('*')
      .eq('is_active', true);

    // If slug is provided, fetch specific recruiter
    if (slug) {
      query = query.eq('slug', slug).single();
    } else {
      query = query.order('name');
    }

    const result = await query;
    
    if (result.error) {
      console.error('Error fetching recruiters:', result.error);
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch recruiters',
        details: result.error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: result.data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Recruiters GET error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT - Update an existing recruiter profile
export async function PUT({ request, locals }: APIContext) {
  try {
    // Get authentication from Clerk
    let userId: string | null = null;
    let userEmail: string | null = null;
    
    try {
      if (locals.auth) {
        const authResult = locals.auth();
        userId = authResult?.userId || null;
        // Try to get email from session claims
        userEmail = authResult?.sessionClaims?.email as string || null;
      }
    } catch (error) {
      console.log('Auth not available:', error);
    }
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!userEmail) {
      return new Response(JSON.stringify({ error: 'User email not found in authentication' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { id, ...updateData }: { id: number } & RecruiterUpdate = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Recruiter ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check authorization directly (bypass RLS for now)
    const adminEmails = ['jculbertson@gmail.com', 'jason@opendesigndocs.com'];
    const isAdmin = adminEmails.includes(userEmail);
    
    console.log('Authorization check:', { userId, userEmail, isAdmin, recruiterId: id });

    if (!isAdmin) {
      // For non-admin users, check if they own this profile
      const { data: recruiter, error: fetchError } = await supabase
        .from('recruiters')
        .select('login_email')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching recruiter for auth check:', fetchError);
        return new Response(JSON.stringify({ 
          error: 'Recruiter not found for authorization check',
          details: fetchError.message
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const isOwner = recruiter.login_email === userEmail;
      if (!isOwner) {
        return new Response(JSON.stringify({ 
          error: `Unauthorized: You can only edit your own profile. Your email: ${userEmail}, Profile owner: ${recruiter.login_email}` 
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Validate required fields if they're being updated
    if (updateData.name !== undefined && !updateData.name.trim()) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (updateData.about !== undefined && !updateData.about.trim()) {
      return new Response(JSON.stringify({ error: 'About field is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (updateData.philosophy !== undefined && !updateData.philosophy.trim()) {
      return new Response(JSON.stringify({ error: 'Philosophy field is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (updateData.approach !== undefined && !updateData.approach.trim()) {
      return new Response(JSON.stringify({ error: 'Approach field is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Attempting to update recruiter with data:', updateData);

    // Update recruiter profile (using service role key should bypass RLS)
    const { data: updatedRecruiter, error } = await supabase
      .from('recruiters')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    console.log('Update result:', { updatedRecruiter, error });

    if (error) {
      console.error('Supabase update error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to update recruiter profile in database',
        details: error.message,
        code: error.code,
        hint: error.hint
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!updatedRecruiter) {
      console.error('No recruiter returned after update');
      return new Response(JSON.stringify({ 
        error: 'Update appeared to succeed but no data returned. This might indicate a database issue.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Successfully updated recruiter:', updatedRecruiter);

    return new Response(JSON.stringify({ 
      success: true, 
      data: updatedRecruiter 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Recruiter PUT error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
