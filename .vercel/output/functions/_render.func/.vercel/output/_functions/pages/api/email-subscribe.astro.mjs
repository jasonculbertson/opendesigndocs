import { s as supabaseAdmin } from '../../chunks/supabase_CxGAgQm0.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = ({ params, request }) => {
  return new Response(null, { status: 404 });
};
const POST = async ({ params, request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (request.method === "OPTIONS") {
    return new Response(null, { headers, status: 204 });
  }
  try {
    const body = await request.json();
    const { email, marketingOptIn } = body;
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers }
      );
    }
    const { data: existingData, error: existingError } = await supabaseAdmin.from("content_subscribers").select("id").eq("email", email).single();
    if (existingError && !existingError.message.includes("No rows found")) {
      console.error("Error checking for existing email:", existingError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to check subscription status" }),
        { status: 500, headers }
      );
    }
    if (existingData?.id) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers }
      );
    }
    const { data: contentData, error: contentError } = await supabaseAdmin.from("content_subscribers").insert([{
      email,
      marketing_opt_in: marketingOptIn,
      subscribed_at: (/* @__PURE__ */ new Date()).toISOString()
    }]).select().single();
    if (contentError) {
      console.error("Error inserting subscriber:", contentError);
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
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred" }),
      { status: 500, headers }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
