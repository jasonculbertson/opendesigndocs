import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST({ request }: APIContext) {
  try {
    const { eventType, recruiterEmail, recruiterName, trackingId, metadata = {} } = await request.json();

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Database not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store email tracking event
    const { data, error } = await supabase
      .from('email_tracking')
      .insert({
        event_type: eventType,
        recruiter_email: recruiterEmail,
        recruiter_name: recruiterName,
        tracking_id: trackingId,
        metadata: metadata,
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        timestamp: new Date().toISOString()
      });

    if (error) {
      console.error('Email tracking error:', error);
      return new Response(JSON.stringify({ error: 'Failed to track email event' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`📧 Email tracking: ${eventType} for ${recruiterEmail}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email tracking API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET({ url }: APIContext) {
  try {
    const trackingId = url.searchParams.get('t');
    const eventType = url.searchParams.get('e') || 'email_opened';

    if (!trackingId) {
      return new Response('Missing tracking ID', { status: 400 });
    }

    // For email opens, we return a 1x1 transparent pixel
    if (eventType === 'email_opened') {
      // Track the email open
      await fetch(`${url.origin}/api/email-tracking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'email_opened',
          trackingId: trackingId,
          metadata: {
            referer: url.searchParams.get('referer'),
            source: 'email_pixel'
          }
        })
      });

      // Return 1x1 transparent PNG pixel
      const pixel = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        'base64'
      );

      return new Response(pixel, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Email tracking GET error:', error);
    return new Response('Error', { status: 500 });
  }
}
