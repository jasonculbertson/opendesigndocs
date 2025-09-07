import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      email, 
      fullName, 
      linkedinUrl, 
      currentCompany, 
      currentTitle, 
      yearsExperience,
      whyJoin,
      invitationCode,
      clerkUserId 
    } = body;

    // Validate required fields
    if (!email || !fullName || !linkedinUrl || !currentCompany || !currentTitle) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate LinkedIn URL format
    if (!linkedinUrl.includes('linkedin.com')) {
      return new Response(JSON.stringify({ 
        error: 'Please provide a valid LinkedIn URL' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if user already applied or is already approved
    const { data: existingApplication } = await supabase
      .from('designer_applications')
      .select('id, status')
      .eq('email', email)
      .single();

    if (existingApplication) {
      if (existingApplication.status === 'pending') {
        return new Response(JSON.stringify({ 
          error: 'You already have a pending application' 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (existingApplication.status === 'approved') {
        return new Response(JSON.stringify({ 
          error: 'You are already a member of the network' 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Check if user is already an approved designer
    const { data: existingProfile } = await supabase
      .from('designer_profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingProfile) {
      return new Response(JSON.stringify({ 
        error: 'You are already a member of the network' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle invitation code if provided
    let invitedByDesignerId = null;
    if (invitationCode) {
      // Verify invitation code is valid and not expired
      const { data: invitation } = await supabase
        .from('designer_invitations')
        .select('inviter_id, status, expires_at')
        .eq('invitation_code', invitationCode)
        .eq('invitee_email', email)
        .single();

      if (!invitation) {
        return new Response(JSON.stringify({ 
          error: 'Invalid invitation code' 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (invitation.status !== 'sent') {
        return new Response(JSON.stringify({ 
          error: 'This invitation has already been used or expired' 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (new Date(invitation.expires_at) < new Date()) {
        return new Response(JSON.stringify({ 
          error: 'This invitation has expired' 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      invitedByDesignerId = invitation.inviter_id;
    }

    // Create application
    const { data: application, error } = await supabase
      .from('designer_applications')
      .insert({
        clerk_user_id: clerkUserId,
        email,
        full_name: fullName,
        linkedin_url: linkedinUrl,
        current_company: currentCompany,
        current_title: currentTitle,
        years_experience: yearsExperience ? parseInt(yearsExperience) : null,
        why_join: whyJoin,
        invited_by_designer_id: invitedByDesignerId,
        invitation_code: invitationCode
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating application:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to submit application' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If this was from an invitation, mark it as accepted
    if (invitationCode) {
      await supabase
        .from('designer_invitations')
        .update({ 
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('invitation_code', invitationCode);
    }

    return new Response(JSON.stringify({ 
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully! You will be notified once reviewed.'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in designer application:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

