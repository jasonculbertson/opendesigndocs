import type { APIRoute } from "astro";

// Simple redirect to the track-llm-bot GET endpoint
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const days = url.searchParams.get('days') || '30';
  
  // Redirect to the main tracking endpoint
  const trackingUrl = new URL('/api/track-llm-bot', url.origin);
  trackingUrl.searchParams.set('days', days);
  
  const response = await fetch(trackingUrl.toString());
  const data = await response.json();
  
  return new Response(JSON.stringify(data, null, 2), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
  });
};
