import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Types for team member operations
interface TeamMemberCreate {
  employee_name: string;
  employee_email: string;
  job_title: string;
  level: string;
  department?: string;
  start_date: string;
  employee_clerk_id?: string;
  profile_photo_url?: string;
  custom_fields?: Record<string, any>;
}

interface TeamMemberUpdate {
  employee_name?: string;
  employee_email?: string;
  job_title?: string;
  level?: string;
  department?: string;
  start_date?: string;
  status?: string;
  employee_clerk_id?: string;
  profile_photo_url?: string;
  custom_fields?: Record<string, any>;
}

// GET - Fetch all team members for the authenticated manager
export async function GET({ locals }: APIContext) {
  try {
    // Check if locals.auth exists and get userId safely
    let userId: string | null = null;
    
    try {
      if (locals.auth) {
        const authResult = locals.auth();
        userId = authResult?.userId || null;
      }
    } catch (error) {
      console.log('Auth not available:', error);
    }
    
    if (!userId) {
      return new Response(JSON.stringify({ 
        success: true, 
        data: [],
        message: 'No authenticated user - showing empty team' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use the team_member_summary view for rich data
    const { data: teamMembers, error } = await supabase
      .from('team_member_summary')
      .select('*')
      .eq('manager_clerk_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching team members:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch team members' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: teamMembers || [] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Team members GET error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST - Create a new team member
export async function POST({ request, locals }: APIContext) {
  try {
    // Check if locals.auth exists and get userId safely
    let userId: string | null = null;
    
    try {
      if (locals.auth) {
        const authResult = locals.auth();
        userId = authResult?.userId || null;
      }
    } catch (error) {
      console.log('Auth not available:', error);
    }
    
    if (!userId) {
      return new Response(JSON.stringify({ 
        error: 'Please sign in to add team members',
        requiresAuth: true 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const teamMemberData: TeamMemberCreate = body;

    // Validate required fields
    if (!teamMemberData.employee_name || !teamMemberData.employee_email || 
        !teamMemberData.job_title || !teamMemberData.level || 
        !teamMemberData.start_date) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: employee_name, employee_email, job_title, level, start_date' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new team member
    const { data: newMember, error } = await supabase
      .from('team_members')
      .insert([
        {
          ...teamMemberData,
          manager_clerk_id: userId
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      
      // Handle specific database errors
      if (error.code === '23505') { // Unique constraint violation
        return new Response(JSON.stringify({ 
          error: 'A team member with this email already exists' 
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ 
        error: 'Failed to create team member',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: newMember 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Team member POST error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT - Update an existing team member
export async function PUT({ request, locals }: APIContext) {
  try {
    const { userId } = locals.auth();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { id, ...updateData }: { id: string } & TeamMemberUpdate = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Team member ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update team member (RLS will ensure only manager's team members can be updated)
    const { data: updatedMember, error } = await supabase
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .eq('manager_clerk_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to update team member',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!updatedMember) {
      return new Response(JSON.stringify({ 
        error: 'Team member not found or access denied' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: updatedMember 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Team member PUT error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE - Delete a team member
export async function DELETE({ request, locals }: APIContext) {
  try {
    const { userId } = locals.auth();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Team member ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete team member (RLS will ensure only manager's team members can be deleted)
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
      .eq('manager_clerk_id', userId);

    if (error) {
      console.error('Error deleting team member:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to delete team member',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Team member deleted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Team member DELETE error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 