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

export const PUT: APIRoute = async ({ request }) => {
  try {
    // Check admin authorization
    const adminEmail = request.headers.get('x-admin-email');
    if (adminEmail !== ADMIN_EMAIL) {
      return new Response('Unauthorized', { status: 403 });
    }

    const { id, ...updateData } = await request.json();
    
    // Validate required fields
    if (!id) {
      return new Response('Missing recruiter ID', { status: 400 });
    }

    const required = ['name', 'email', 'agency', 'title'];
    for (const field of required) {
      if (!updateData[field]) {
        return new Response(`Missing required field: ${field}`, { status: 400 });
      }
    }

    // Check if email conflicts with another recruiter (excluding current one)
    const { data: existing } = await supabase
      .from('recruiters')
      .select('id, email')
      .eq('email', updateData.email)
      .neq('id', id);

    if (existing && existing.length > 0) {
      return new Response('Another recruiter with this email already exists', { status: 409 });
    }

    // Update recruiter
    const { data, error } = await supabase
      .from('recruiters')
      .update({
        name: updateData.name,
        agency: updateData.agency,
        title: updateData.title,
        image: updateData.image || '/images/default-avatar.png',
        linkedin: updateData.linkedin || '',
        website: updateData.website || '',
        email: updateData.email,
        login_email: updateData.login_email || updateData.email,
        about: updateData.about || '',
        specialties: updateData.specialties || '',
        philosophy: updateData.philosophy || '',
        approach: updateData.approach || '',
        notable_clients: updateData.notable_clients || '',
        profile_completed: true
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(`Database error: ${error.message}`, { status: 500 });
    }

    if (!data) {
      return new Response('Recruiter not found', { status: 404 });
    }

    return new Response(JSON.stringify(data), {
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
