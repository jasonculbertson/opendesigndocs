import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role for database operations
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

// Log environment variables for debugging (remove in production)
console.log('Analytics API Environment Check:', {
  supabaseUrl: import.meta.env.SUPABASE_URL ? 'Present' : 'Missing',
  serviceRoleKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing'
});

// Authorized user IDs who can access analytics data (only your Clerk user IDs)
const AUTHORIZED_USER_IDS = [
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt', // Production
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ'  // Development
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const event = await request.json();
    
    // Get request metadata
    const userAgent = request.headers.get('user-agent');
    const referer = request.headers.get('referer');
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     null;

    // Log the analytics event
    console.log('📊 Analytics Event Received:', {
      event: event.event,
      properties: event.properties,
      timestamp: event.timestamp,
      userAgent,
      referer,
      ipAddress
    });

    // Store in Supabase database
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        event_name: event.event,
        user_id: event.properties?.user_id || null,
        user_email: event.properties?.user_email || null,
        session_id: event.properties?.session_id || null,
        properties: event.properties || {},
        page_url: event.properties?.page_url || referer || null,
        user_agent: userAgent,
        ip_address: ipAddress,
        referer: referer,
        timestamp: event.timestamp ? new Date(event.timestamp).toISOString() : new Date().toISOString()
      });

    if (error) {
      console.error('Error storing analytics event:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to store analytics event' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('✅ Analytics event stored successfully:', data);
    
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

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Get user ID from query params or headers (you'd implement your auth logic here)
    const userId = url.searchParams.get('user_id') || 'anonymous';
    
    console.log('Analytics access attempt:', {
      userId,
      authorizedUsers: AUTHORIZED_USER_IDS,
      isAuthorized: AUTHORIZED_USER_IDS.includes(userId)
    });
    
    // Check if user is authorized to view analytics
    if (!AUTHORIZED_USER_IDS.includes(userId)) {
      console.log('Unauthorized analytics access:', { userId, authorizedUsers: AUTHORIZED_USER_IDS });
      return new Response(JSON.stringify({ 
        error: `Unauthorized access to analytics data. User ID: ${userId}` 
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Get date range from query params
    const startDate = url.searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = url.searchParams.get('end_date') || new Date().toISOString();

    // Fetch analytics data from Supabase
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching analytics data:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch analytics data' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Process and aggregate the data
    const totalEvents = events?.length || 0;
    const uniqueUsers = new Set(events?.map(e => e.user_id).filter(Boolean)).size;
    const uniqueSessions = new Set(events?.map(e => e.session_id).filter(Boolean)).size;
    
    // Top events
    const eventCounts = events?.reduce((acc: Record<string, number>, event) => {
      acc[event.event_name] = (acc[event.event_name] || 0) + 1;
      return acc;
    }, {});
    
    // Top pages
    const pageCounts = events?.reduce((acc: Record<string, number>, event) => {
      if (event.page_url) {
        acc[event.page_url] = (acc[event.page_url] || 0) + 1;
      }
      return acc;
    }, {});

    // Daily activity (last 7 days)
    const dailyActivity = events?.reduce((acc: Record<string, number>, event) => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return new Response(JSON.stringify({
      success: true,
      data: {
        summary: {
          totalEvents,
          uniqueUsers,
          uniqueSessions,
          dateRange: { startDate, endDate }
        },
        topEvents: Object.entries(eventCounts || {})
          .sort(([,a], [,b]) => (b as number) - (a as number))
          .slice(0, 10),
        topPages: Object.entries(pageCounts || {})
          .sort(([,a], [,b]) => (b as number) - (a as number))
          .slice(0, 10),
        dailyActivity: Object.entries(dailyActivity || {})
          .sort(([a], [b]) => b.localeCompare(a))
          .slice(0, 7)
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch analytics data' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 