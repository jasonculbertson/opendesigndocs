import { s as supabaseAdmin } from '../../chunks/supabase_CUcrLoCQ.mjs';
export { renderers } from '../../renderers.mjs';

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
