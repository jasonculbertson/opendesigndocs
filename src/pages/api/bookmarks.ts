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
  const userId = getUserId(locals);

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(request.url);
  const path = url.searchParams.get('path');

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  let query = supabase.from('bookmarks').select('*').eq('clerk_user_id', userId);
  
  if (path) {
    query = query.eq('path', path);
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

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
  const { path, title } = body;

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
    .from('bookmarks')
    .insert([{ clerk_user_id: userId, path, title }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique violation
        return new Response(JSON.stringify({ error: 'Already bookmarked', data: null }), { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
    }
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

export const DELETE = async ({ request, locals }: APIContext) => {
  const userId = getUserId(locals);
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(request.url);
  const path = url.searchParams.get('path');
  
  if (!path) {
     return new Response(JSON.stringify({ error: 'Path parameter is required' }), { 
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

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('clerk_user_id', userId)
    .eq('path', path);

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
