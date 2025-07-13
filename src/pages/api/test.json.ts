import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Test case 1: Valid request
    const validResponse = await fetch('http://localhost:4321/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'test',
        step: 'welcome-conversation',
      }),
    });
    const validData = await validResponse.json();

    // Test case 2: Invalid request (missing message)
    const invalidResponse = await fetch('http://localhost:4321/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        step: 'welcome-conversation',
      }),
    });
    const invalidData = await invalidResponse.json();

    // Test case 3: Rate limit test (this will likely fail in a single run, but demonstrates the concept)
    let rateLimitResponse;
    for (let i = 0; i < 105; i++) {
      rateLimitResponse = await fetch('http://localhost:4321/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'test',
          step: 'welcome-conversation',
        }),
      });
    }
    const rateLimitData = await rateLimitResponse.json();

    return new Response(
      JSON.stringify({
        validRequest: {
          status: validResponse.status,
          data: validData,
        },
        invalidRequest: {
          status: invalidResponse.status,
          data: invalidData,
        },
        rateLimitRequest: {
          status: rateLimitResponse.status,
          data: rateLimitData,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
