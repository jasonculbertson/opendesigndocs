import { createClient } from '@supabase/supabase-js';
export { r as renderers } from '../../chunks/_@astro-renderers_B0sv4yBb.mjs';

const prerender = false;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
const GET = ({ params, request }) => {
  return new Response(null, { status: 404, headers });
};
const OPTIONS = ({ request }) => {
  return new Response(null, { headers, status: 204 });
};
const POST = async ({ params, request }) => {
  try {
    const supabaseUrl = "https://bmqaaynxrncmczdtmhiy.supabase.co";
    const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcWFheW54cm5jbWN6ZHRtaGl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTc5MzM4OCwiZXhwIjoyMDUxMzY5Mzg4fQ.pQruaLhTbaIXCeJMt78FgC0upvc1NIQR9BbHftdJZlw";
    if (!supabaseUrl || !supabaseServiceKey) ;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers }
      );
    }
    const { error } = await supabase.from("content_subscribers").upsert([{
      email,
      subscribed_at: (/* @__PURE__ */ new Date()).toISOString()
    }], {
      onConflict: "email"
    });
    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to save subscription" }),
        { status: 500, headers }
      );
    }
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred" }),
      { status: 500, headers }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
