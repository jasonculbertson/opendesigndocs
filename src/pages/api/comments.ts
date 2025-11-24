import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { clerkClient } from "../../lib/clerk";
import { sendReplyNotification } from '../../utils/notifications';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

// Helper to check auth and get user ID
const getUserId = (locals: App.Locals) => {
  const { userId } = locals.auth();
  return userId;
};

export const GET = async ({ request }: APIContext) => {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');

  if (!path) {
    return new Response(JSON.stringify({ error: 'Path is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('path', path)
    .order('created_at', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ data }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const POST = async ({ request, locals }: APIContext) => {
  const userId = getUserId(locals);

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json();
  const { path, content, parent_id, articleTitle } = body;

  if (!path || !content) {
    return new Response(JSON.stringify({ error: 'Path and content are required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Fetch user details from Clerk to store a snapshot
  let userName = 'Anonymous';
  let userAvatar = '';
  
  try {
    const user = await clerkClient.users.getUser(userId);
    userName = user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.username || 'Anonymous';
    userAvatar = user.imageUrl;
  } catch (e) {
    console.error('Error fetching clerk user:', e);
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data, error } = await supabase
    .from('comments')
    .insert([{ 
      clerk_user_id: userId, 
      path, 
      content,
      user_name: userName,
      user_avatar_url: userAvatar,
      parent_id: parent_id || null
    }])
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Handle Notifications (Fire and forget)
  if (parent_id) {
    (async () => {
      try {
        // Fetch parent comment to get the author
        const { data: parentComment } = await supabase
            .from('comments')
            .select('clerk_user_id')
            .eq('id', parent_id)
            .single();
        
        if (parentComment && parentComment.clerk_user_id !== userId) {
            const articleUrl = new URL(request.url).origin + path; // Construct full URL
            await sendReplyNotification(
                parentComment.clerk_user_id,
                userName,
                articleTitle || 'an article',
                articleUrl,
                content
            );
        }
      } catch (err) {
        console.error('Notification error:', err);
      }
    })();
  }

  return new Response(JSON.stringify({ data }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const DELETE = async ({ request, locals }: APIContext) => {
  const userId = getUserId(locals);
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(request.url);
  const commentId = url.searchParams.get('id');
  
  if (!commentId) {
     return new Response(JSON.stringify({ error: 'Comment ID is required' }), { 
       status: 400,
       headers: { 'Content-Type': 'application/json' }
     });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Verify ownership before deleting
  const { data: comment } = await supabase
    .from('comments')
    .select('clerk_user_id')
    .eq('id', commentId)
    .single();

  if (!comment) {
    return new Response(JSON.stringify({ error: 'Comment not found' }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (comment.clerk_user_id !== userId) {
    // Check if admin (optional, for now strictly own comments)
    return new Response(JSON.stringify({ error: 'Forbidden' }), { 
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
