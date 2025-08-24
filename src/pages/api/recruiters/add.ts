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

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check admin authorization
    const adminEmail = request.headers.get('x-admin-email');
    if (adminEmail !== ADMIN_EMAIL) {
      return new Response('Unauthorized', { status: 403 });
    }

    const recruiterData = await request.json();
    
    // Validate required fields
    const required = ['name', 'email', 'agency', 'title', 'slug'];
    for (const field of required) {
      if (!recruiterData[field]) {
        return new Response(`Missing required field: ${field}`, { status: 400 });
      }
    }

    // Check if email or slug already exists
    const { data: existing } = await supabase
      .from('recruiters')
      .select('email, slug')
      .or(`email.eq.${recruiterData.email},slug.eq.${recruiterData.slug}`);

    if (existing && existing.length > 0) {
      const conflicts = existing.map(r => 
        r.email === recruiterData.email ? 'email' : 'slug'
      ).join(', ');
      return new Response(`Recruiter with this ${conflicts} already exists`, { status: 409 });
    }

    // Insert new recruiter
    const { data, error } = await supabase
      .from('recruiters')
      .insert({
        name: recruiterData.name,
        agency: recruiterData.agency,
        title: recruiterData.title,
        image: recruiterData.image || '/images/default-avatar.png',
        linkedin: recruiterData.linkedin || '',
        website: recruiterData.website || '',
        email: recruiterData.email,
        login_email: recruiterData.login_email || recruiterData.email,
        about: recruiterData.about || '',
        specialties: recruiterData.specialties || '',
        philosophy: recruiterData.philosophy || '',
        approach: recruiterData.approach || '',
        notable_clients: recruiterData.notable_clients || '',
        slug: recruiterData.slug
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(`Database error: ${error.message}`, { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
