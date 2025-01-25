import { createClient } from '@supabase/supabase-js';
export { r as renderers } from '../../chunks/_@astro-renderers_B0sv4yBb.mjs';

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

const prerender = false;
async function POST({ request }) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("Submitting to Supabase:", { email });
    const { data, error } = await supabaseAdmin.from("subscribers").insert([{ email, subscribed_at: (/* @__PURE__ */ new Date()).toISOString() }]).select().single();
    if (error) {
      console.error("Supabase error:", error);
      if (error.message?.includes("does not exist")) {
        return new Response(
          JSON.stringify({
            error: "Database table not set up. Please create the subscribers table."
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({
            error: "This email is already subscribed."
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      return new Response(
        JSON.stringify({
          error: error.message || "Failed to subscribe"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        data
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
