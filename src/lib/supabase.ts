import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Required Supabase environment variables are missing');
}

if (!supabaseServiceKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY not found, falling back to anon key');
}

// Create a Supabase client with the anon key for client-side operations
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Create a service role client for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl!,
  supabaseServiceKey || supabaseAnonKey!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
