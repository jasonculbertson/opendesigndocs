import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role for database operations
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

// Authorized user IDs who can access analytics data (only your Clerk user IDs)
const AUTHORIZED_USER_IDS = [
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt', // Production
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ'  // Development
];

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Get user ID from query params
    const userId = url.searchParams.get('user_id') || 'anonymous';
    
    // Check if user is authorized to view analytics
    if (!AUTHORIZED_USER_IDS.includes(userId)) {
      console.log('Unauthorized recruiter analytics access:', { userId });
      return new Response(JSON.stringify({ 
        error: `Unauthorized access to recruiter analytics data. User ID: ${userId}` 
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

    console.log('🔍 Fetching recruiter analytics data:', { startDate, endDate });

    // Fetch all analytics events for recruiter-related pages
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .or('event_name.eq.profile_view,event_name.eq.contact_click,page_url.ilike.%/recruiters%')
      .order('created_at', { ascending: false })
      .limit(100000); // Set very high limit to ensure we get all events

    if (error) {
      console.error('Error fetching recruiter analytics data:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch recruiter analytics data' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Log the number of recruiter events fetched for debugging
    console.log(`👥 Recruiter Analytics API: Fetched ${events?.length || 0} recruiter events from ${startDate} to ${endDate}`);

    // Also get recruiter data for enrichment
    const { data: recruiters, error: recruitersError } = await supabase
      .from('recruiters')
      .select('id, name, agency, slug')
      .order('display_order', { ascending: true });

    if (recruitersError) {
      console.error('Error fetching recruiters:', recruitersError);
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch recruiter data' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Create a map for easy recruiter lookup
    const recruiterMap = new Map(recruiters?.map(r => [r.id.toString(), r]) || []);

    // Process recruiter-specific analytics
    const recruiterAnalytics = new Map();
    const contactTypeAnalytics = new Map();
    const dailyTraffic = new Map();

    events?.forEach(event => {
      const recruiterId = event.properties?.recruiter_id?.toString();
      const recruiterName = event.properties?.recruiter_name;
      const contactType = event.properties?.contact_type;
      const date = new Date(event.created_at).toISOString().split('T')[0];

      // Initialize recruiter analytics if not exists
      if (recruiterId && !recruiterAnalytics.has(recruiterId)) {
        const recruiterInfo = recruiterMap.get(recruiterId);
        recruiterAnalytics.set(recruiterId, {
          id: recruiterId,
          name: recruiterName || recruiterInfo?.name || 'Unknown',
          agency: recruiterInfo?.agency || 'Unknown Agency',
          slug: recruiterInfo?.slug || '',
          profileViews: 0,
          contactClicks: 0,
          contactTypes: new Map(),
          dailyViews: new Map(),
          totalEngagement: 0
        });
      }

      // Track profile views
      if (event.event_name === 'profile_view' && recruiterId) {
        const recruiterData = recruiterAnalytics.get(recruiterId);
        if (recruiterData) {
          recruiterData.profileViews++;
          recruiterData.totalEngagement++;
          
          // Daily views
          const currentDayViews = recruiterData.dailyViews.get(date) || 0;
          recruiterData.dailyViews.set(date, currentDayViews + 1);
        }
      }

      // Track contact clicks
      if (event.event_name === 'contact_click' && recruiterId && contactType) {
        const recruiterData = recruiterAnalytics.get(recruiterId);
        if (recruiterData) {
          recruiterData.contactClicks++;
          recruiterData.totalEngagement++;
          
          // Contact type breakdown
          const currentContactCount = recruiterData.contactTypes.get(contactType) || 0;
          recruiterData.contactTypes.set(contactType, currentContactCount + 1);
          
          // Global contact type analytics
          const globalContactCount = contactTypeAnalytics.get(contactType) || 0;
          contactTypeAnalytics.set(contactType, globalContactCount + 1);
        }
      }

      // Daily traffic aggregation
      if (recruiterId) {
        const dayKey = `${date}-${recruiterId}`;
        const currentDayTraffic = dailyTraffic.get(dayKey) || { date, recruiterId, views: 0, contacts: 0 };
        
        if (event.event_name === 'profile_view') {
          currentDayTraffic.views++;
        } else if (event.event_name === 'contact_click') {
          currentDayTraffic.contacts++;
        }
        
        dailyTraffic.set(dayKey, currentDayTraffic);
      }
    });

    // Convert Maps to Arrays and sort
    const recruiterPerformance = Array.from(recruiterAnalytics.values())
      .map(recruiter => ({
        ...recruiter,
        contactTypes: Object.fromEntries(recruiter.contactTypes),
        dailyViews: Object.fromEntries(recruiter.dailyViews),
        conversionRate: recruiter.profileViews > 0 ? ((recruiter.contactClicks / recruiter.profileViews) * 100).toFixed(2) : '0.00'
      }))
      .sort((a, b) => b.totalEngagement - a.totalEngagement);

    // Top contact types
    const topContactTypes = Array.from(contactTypeAnalytics.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    // Daily trends (last 14 days)
    const last14Days = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyTrends = last14Days.map(date => {
      const dayData = Array.from(dailyTraffic.values()).filter(d => d.date === date);
      return {
        date,
        totalViews: dayData.reduce((sum, d) => sum + d.views, 0),
        totalContacts: dayData.reduce((sum, d) => sum + d.contacts, 0),
        uniqueRecruiters: new Set(dayData.map(d => d.recruiterId)).size
      };
    });

    // Calculate summary stats
    const totalProfileViews = recruiterPerformance.reduce((sum, r) => sum + r.profileViews, 0);
    const totalContactClicks = recruiterPerformance.reduce((sum, r) => sum + r.contactClicks, 0);
    const averageConversionRate = totalProfileViews > 0 ? ((totalContactClicks / totalProfileViews) * 100).toFixed(2) : '0.00';

    console.log('📊 Recruiter analytics processed:', {
      totalRecruiters: recruiterPerformance.length,
      totalProfileViews,
      totalContactClicks,
      averageConversionRate
    });

    return new Response(JSON.stringify({
      success: true,
      data: {
        summary: {
          totalRecruiters: recruiterPerformance.length,
          totalProfileViews,
          totalContactClicks,
          averageConversionRate: parseFloat(averageConversionRate),
          dateRange: { startDate, endDate }
        },
        recruiterPerformance,
        topContactTypes,
        dailyTrends,
        generatedAt: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing recruiter analytics:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to process recruiter analytics data' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
