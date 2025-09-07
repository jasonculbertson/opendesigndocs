import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADMIN_EMAIL = 'jculbertson@gmail.com';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get user from Clerk (you'll need to implement this based on your auth setup)
    const authHeader = request.headers.get('authorization');
    // For now, we'll implement a simple check - you may want to enhance this
    
    const body = await request.json();
    const { applicationId, action, adminNotes, adminEmail } = body;

    // Verify admin access
    if (adminEmail !== ADMIN_EMAIL) {
      return new Response(JSON.stringify({ 
        error: 'Unauthorized' 
      }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!applicationId || !action || !['approve', 'reject'].includes(action)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid request parameters' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get the application
    const { data: application, error: fetchError } = await supabase
      .from('designer_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (fetchError || !application) {
      return new Response(JSON.stringify({ 
        error: 'Application not found' 
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (application.status !== 'pending') {
      return new Response(JSON.stringify({ 
        error: 'Application has already been reviewed' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update application status
    const { error: updateError } = await supabase
      .from('designer_applications')
      .update({
        status: action === 'approve' ? 'approved' : 'rejected',
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: adminEmail
      })
      .eq('id', applicationId);

    if (updateError) {
      console.error('Error updating application:', updateError);
      return new Response(JSON.stringify({ 
        error: 'Failed to update application' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If approved, create designer profile
    if (action === 'approve') {
      // Determine invited_by_designer_id if this was an invitation
      let invitedByDesignerId = null;
      if (application.invited_by_designer_id) {
        invitedByDesignerId = application.invited_by_designer_id;
      }

      const { error: profileError } = await supabase
        .from('designer_profiles')
        .insert({
          clerk_user_id: application.clerk_user_id,
          email: application.email,
          full_name: application.full_name,
          linkedin_url: application.linkedin_url,
          current_company: application.current_company,
          current_title: application.current_title,
          years_experience: application.years_experience,
          invited_by_designer_id: invitedByDesignerId,
          // Default values
          invitations_sent: 0,
          invitations_remaining: 3,
          is_active: true,
          is_featured: false
        });

      if (profileError) {
        console.error('Error creating designer profile:', profileError);
        // Rollback application approval
        await supabase
          .from('designer_applications')
          .update({ status: 'pending' })
          .eq('id', applicationId);
        
        return new Response(JSON.stringify({ 
          error: 'Failed to create designer profile' 
        }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: `Application ${action}d successfully`
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in admin approval:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

