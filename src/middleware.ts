import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';

// Define types for context.locals
declare module 'astro' {
  interface Locals {
    supabase: ReturnType<typeof createSupabaseServerClient>;
    session: Session | null;
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createSupabaseServerClient(context.cookies);
  context.locals.supabase = supabase;

  const { data: { session } } = await supabase.auth.getSession();
  context.locals.session = session;

  // Handle Supabase auth callback redirects
  // See: https://supabase.com/docs/guides/auth/server-side-rendering#handling-code-exchange
  if (context.url.pathname === '/auth/callback' && context.request.method === 'GET') {
    const code = context.url.searchParams.get('code');
    if (code) {
      try {
        await supabase.auth.exchangeCodeForSession(code);
        // Redirect to a protected page or homepage after successful login
        return context.redirect('/', 303); // Adjust redirect path as needed
      } catch (error) {
        console.error('Error exchanging code for session:', error);
        // Handle error, maybe redirect to an error page or login page
        return context.redirect('/login-error', 303); // Adjust error path
      }
    }
  }

  // You could add route protection logic here if needed, e.g.:
  // if (!session && context.url.pathname.startsWith('/dashboard')) {
  //   return context.redirect('/login');
  // }

  // Continue processing the request
  const response = await next();

  // Needed for Supabase SSR cookie management
  response.headers.append('Vary', 'Cookie');

  return response;
});
