import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bmqaaynxrncmczdtmhiy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcWFheW54cm5jbWN6ZHRtaGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3OTMzODgsImV4cCI6MjA1MTM2OTM4OH0.esgNwWgHvQ9GVgkjD7u1uOWWbyqaPFMz9UqLk_frqHE";
const supabaseServiceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcWFheW54cm5jbWN6ZHRtaGl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTc5MzM4OCwiZXhwIjoyMDUxMzY5Mzg4fQ.pQruaLhTbaIXCeJMt78FgC0upvc1NIQR9BbHftdJZlw";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
createClient(supabaseUrl, supabaseAnonKey);

export { supabaseAdmin as s };
