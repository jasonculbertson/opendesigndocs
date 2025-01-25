export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const body = await request.json();
    console.log("Received request:", body);
    return new Response(JSON.stringify({
      success: true,
      message: "Test endpoint working",
      received: body
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return new Response(JSON.stringify({
      error: "Test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
