import { createClient } from '@supabase/supabase-js';
import { createServerClient, createBrowserClient, parse, serialize, type CookieOptions } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

// Debugging logs removed

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Error condition console logs removed
  throw new Error('PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY must be set in .env');
}

if (!supabaseServiceKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY not found in .env. supabaseAdmin client might fall back to anon key or fail if RLS is restrictive.');
}

// Function to create a Supabase client for server-side logic (middleware, API routes, SSR pages)
export function createSupabaseServerClient(cookies: AstroCookies) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(key: string) {
        return cookies.get(key)?.value;
      },
      set(key: string, value: string, options: CookieOptions) {
        // Ensure all potentially required options for Astro's set are present
        cookies.set(key, value, {
          ...options, 
          // Provide defaults if Supabase doesn't
          path: options.path ?? '/',
          domain: options.domain, // Pass directly from Supabase options
          maxAge: options.maxAge, // Pass directly from Supabase options
          expires: options.expires, // Pass directly from Supabase options
          httpOnly: options.httpOnly ?? true, // Default to true for security
          secure: options.secure ?? true,   // Default to true (assume HTTPS)
          sameSite: options.sameSite ?? 'lax', // Default to lax
          // Astro requires 'encode'. Using identity function as Supabase tokens are typically safe.
          encode: (val: string) => val, 
        });
      },
      remove(key: string, options: CookieOptions) {
        // Ensure all potentially required options for Astro's delete are present
        cookies.delete(key, {
          // Provide defaults matching the set method
          path: options.path ?? '/', 
          domain: options.domain, // Pass domain if provided
          httpOnly: options.httpOnly ?? true,
          secure: options.secure ?? true,
          sameSite: options.sameSite ?? 'lax',
        });
      },
    },
  });
}

// Function to create a Supabase client for browser-side logic
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Existing client export using anon key (might be used in older client-side code, consider migrating)
// Note: This client won't automatically handle SSR auth state like the ssr clients.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a service role client for admin operations (typically server-side only)
export const supabaseAdmin = createClient(
  supabaseUrl,
  // Use service key if available, otherwise fallback to anon key (behavior depends on RLS)
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
