import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const event = await request.json();
    
    // Log the analytics event
    console.log('📊 Analytics Event Received:', {
      event: event.event,
      properties: event.properties,
      timestamp: event.timestamp,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    });

    // In production, you might want to:
    // 1. Store events in a database
    // 2. Send to external analytics service
    // 3. Process for insights
    
    // For now, we'll just log and return success
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Event tracked successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing analytics event:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to process analytics event' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 