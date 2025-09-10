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

interface OnboardingRequest {
  name: string;
  email: string;
  linkedin?: string;
  agency?: string;
  title?: string;
  image?: string;
  sendEmail?: boolean;
  adminKey: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function getNextDisplayOrder(existingRecruiters: any[]): number {
  const maxOrder = existingRecruiters.reduce((max, recruiter) => {
    return Math.max(max, recruiter.display_order || 0);
  }, 0);
  return maxOrder + 1;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: OnboardingRequest = await request.json();
    
    // Check admin authorization
    if (body.adminKey !== 'jason2024') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, email, linkedin, agency, title, image, sendEmail = true } = body;
    
    // Validate required fields
    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const slug = generateSlug(name);

    // Check if recruiter already exists
    const { data: existing } = await supabase
      .from('recruiters')
      .select('id, name, email, slug')
      .or(`email.eq.${email},slug.eq.${slug}`)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ 
        error: `Recruiter already exists`,
        existing: existing
      }), { 
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current recruiters to determine display order
    const { data: allRecruiters } = await supabase
      .from('recruiters')
      .select('display_order');

    const displayOrder = getNextDisplayOrder(allRecruiters || []);

    // Insert new recruiter with complete default profile (all NOT NULL fields filled)
    const { data: newRecruiter, error } = await supabase
      .from('recruiters')
      .insert({
        name,
        email,
        login_email: email,
        agency: agency || 'Company', // NOT NULL - provide default (could be agency or company)
        title: title || 'Recruiter',
        linkedin: linkedin || `https://linkedin.com/in/${generateSlug(name)}`, // NOT NULL - generate if missing
        website: '', // Can be empty
        about: `${name.split(' ')[0]} is a design recruiter focused on connecting talented professionals with opportunities that align with their career goals. Profile details will be updated once onboarding is complete.`, // NOT NULL
        specialties: 'Design, UX, Product, Leadership', // Can be default
        philosophy: 'I believe in building meaningful connections between talented professionals and companies that value great design and user experience.', // NOT NULL
        approach: 'My approach focuses on understanding both the technical requirements and cultural fit to ensure long-term success for both candidates and companies.', // NOT NULL
        notable_clients: 'Various design-focused companies across SaaS, FinTech, and Enterprise sectors', // Can be default
        image: image || '/images/default-avatar.png',
        slug,
        display_order: displayOrder,
        profile_completed: false,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to create recruiter profile',
        details: error.message
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate invite URL
    const inviteUrl = `https://opendesigndocs.com/docs/recruiters/invite/${slug}`;

    // Prepare email data for EmailJS
    const emailData = {
      recruiter: {
        name,
        email,
        agency: agency || 'TBD',
        inviteUrl,
        slug
      },
      emailTemplate: {
        to_email: email,
        to_name: name.split(' ')[0],
        invite_url: inviteUrl,
        agency_name: agency || 'your agency',
        tracking_id: `${slug}_${Date.now()}`
      }
    };

    const response = {
      success: true,
      recruiter: newRecruiter,
      inviteUrl,
      emailData: sendEmail ? emailData : null,
      message: `Recruiter ${name} added successfully${sendEmail ? '. Email data prepared for sending.' : '.'}`
    };

    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Onboarding API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
