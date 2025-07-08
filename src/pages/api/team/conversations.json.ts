import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Types for conversation operations
interface ConversationCreate {
  team_member_id: string;
  conversation_type: 'one_on_one' | 'feedback' | 'career' | 'review' | 'informal' | 'goal_setting';
  title: string;
  content: string;
}

interface ConversationUpdate {
  conversation_type?: 'one_on_one' | 'feedback' | 'career' | 'review' | 'informal' | 'goal_setting';
  title?: string;
  content?: string;
  status?: 'active' | 'archived';
}

// GET - Fetch conversations for a team member
export async function GET({ locals, url }: APIContext) {
  try {
    const { userId } = locals.auth();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const teamMemberId = url.searchParams.get('team_member_id');
    
    if (!teamMemberId) {
      return new Response(JSON.stringify({ error: 'team_member_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify this team member belongs to the authenticated manager
    const { data: teamMember } = await supabase
      .from('team_members')
      .select('id')
      .eq('id', teamMemberId)
      .eq('manager_clerk_id', userId)
      .single();

    if (!teamMember) {
      return new Response(JSON.stringify({ error: 'Team member not found or access denied' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch conversations for this team member
    const { data: conversations, error } = await supabase
      .from('growth_conversations')
      .select('*')
      .eq('team_member_id', teamMemberId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch conversations' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: conversations || [] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Conversations GET error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST - Create a new conversation
export async function POST({ request, locals }: APIContext) {
  try {
    const { userId } = locals.auth();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const conversationData: ConversationCreate = body;

    // Validate required fields
    if (!conversationData.team_member_id || !conversationData.conversation_type || 
        !conversationData.title || !conversationData.content) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: team_member_id, conversation_type, title, content' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify this team member belongs to the authenticated manager
    const { data: teamMember } = await supabase
      .from('team_members')
      .select('id')
      .eq('id', conversationData.team_member_id)
      .eq('manager_clerk_id', userId)
      .single();

    if (!teamMember) {
      return new Response(JSON.stringify({ error: 'Team member not found or access denied' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new conversation
    const { data: newConversation, error } = await supabase
      .from('growth_conversations')
      .insert([
        {
          ...conversationData,
          created_by_clerk_id: userId
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to create conversation',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: newConversation 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Conversation POST error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT - Update an existing conversation
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
    const { id, ...updateData }: { id: string } & ConversationUpdate = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Conversation ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update conversation (RLS will ensure only manager's team conversations can be updated)
    const { data: updatedConversation, error } = await supabase
      .from('growth_conversations')
      .update(updateData)
      .eq('id', id)
      .eq('created_by_clerk_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating conversation:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to update conversation',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!updatedConversation) {
      return new Response(JSON.stringify({ 
        error: 'Conversation not found or access denied' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: updatedConversation 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Conversation PUT error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE - Delete/Archive a conversation
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
      return new Response(JSON.stringify({ error: 'Conversation ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Archive conversation (instead of hard delete to preserve history)
    const { error } = await supabase
      .from('growth_conversations')
      .update({ status: 'archived' })
      .eq('id', id)
      .eq('created_by_clerk_id', userId);

    if (error) {
      console.error('Error archiving conversation:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to archive conversation',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Conversation archived successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Conversation DELETE error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 