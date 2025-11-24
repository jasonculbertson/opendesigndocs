import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

// Helper to check auth and get user ID
const getUserId = (locals: App.Locals) => {
  const { userId } = locals.auth();
  return userId;
};

export const GET = async ({ request, locals }: APIContext) => {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');
  const userId = getUserId(locals);

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

  // Get total count
  const { count, error: countError } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('path', path);

  if (countError) {
    return new Response(JSON.stringify({ error: countError.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check if current user liked
  let hasLiked = false;
  if (userId) {
    const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('path', path)
        .eq('clerk_user_id', userId)
        .single();
    hasLiked = !!data;
  }

  return new Response(JSON.stringify({ count: count || 0, hasLiked }), { 
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
  const { path } = body;

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

  // Check if already liked
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('path', path)
    .eq('clerk_user_id', userId)
    .single();

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id);

    if (error) throw error;

    return new Response(JSON.stringify({ liked: false }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    // Like
    const { error } = await supabase
      .from('likes')
      .insert([{ clerk_user_id: userId, path }]);

    if (error) {
        // Handle race condition
        if (error.code === '23505') {
            return new Response(JSON.stringify({ liked: true }), { status: 200 });
        }
        throw error;
    }

    return new Response(JSON.stringify({ liked: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
