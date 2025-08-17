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
export async function PUT({ request }: APIContext) {
  try {
    const body = await request.json();
    const { id, userEmail, ...updateData }: { id: number; userEmail: string } & RecruiterUpdate = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Recruiter ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!userEmail) {
      return new Response(JSON.stringify({ error: 'User email is required for authorization' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set the current user email for RLS policies
    await supabase.rpc('set_config', {
      setting_name: 'app.current_user_email',
      setting_value: userEmail
    });

    // First, check if the user has permission to update this recruiter
    const { data: recruiter, error: fetchError } = await supabase
      .from('recruiters')
      .select('login_email')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching recruiter:', fetchError);
      return new Response(JSON.stringify({ 
        error: 'Recruiter not found',
        details: fetchError.message
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if user is authorized (admin or matches login email)
    const adminEmails = ['jculbertson@gmail.com', 'jason@opendesigndocs.com'];
    const isAdmin = adminEmails.includes(userEmail);
    const isOwner = recruiter.login_email === userEmail;

    if (!isAdmin && !isOwner) {
      return new Response(JSON.stringify({ 
        error: 'Unauthorized: You can only edit your own profile' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
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

    // Update recruiter profile
    const { data: updatedRecruiter, error } = await supabase
      .from('recruiters')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating recruiter:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to update recruiter profile',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!updatedRecruiter) {
      return new Response(JSON.stringify({ 
        error: 'Recruiter not found or access denied' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
