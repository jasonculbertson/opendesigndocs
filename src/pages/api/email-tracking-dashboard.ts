import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET({ request }: APIContext) {
  try {
    // Simple admin check (you might want to make this more robust)
    const url = new URL(request.url);
    const adminKey = url.searchParams.get('admin');
    
    if (adminKey !== 'jason2024') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Database not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all email tracking events
    const { data: events, error } = await supabase
      .from('email_tracking')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching email tracking data:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch tracking data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Known recruiters list
    const recruiters = [
      { name: 'Laura Hunting', email: 'laura@foundby.co', agency: 'Found By' },
      { name: 'Garrett Fowler', email: 'garrett@off.site', agency: 'Offsite' },
      { name: 'Dirk Cleveland', email: 'dirk@fusiontalent.com', agency: 'Fusion' },
      { name: 'MJ', email: 'mj@off.site', agency: 'Offsite' }
    ];

    // Process data for dashboard
    const summary = {
      emailsSent: events?.filter(e => e.event_type === 'email_sent').length || 0,
      emailsOpened: events?.filter(e => e.event_type === 'email_opened').length || 0,
      pageVisits: events?.filter(e => e.event_type === 'page_visited').length || 0,
      signups: events?.filter(e => e.event_type === 'signup_started').length || 0
    };

    // Process recruiter-specific data
    const recruiterProgress = recruiters.map(recruiter => {
      const recruiterEvents = events?.filter(e => e.recruiter_email === recruiter.email) || [];
      
      const emailSent = recruiterEvents.find(e => e.event_type === 'email_sent');
      const emailOpened = recruiterEvents.find(e => e.event_type === 'email_opened');
      const pageVisited = recruiterEvents.find(e => e.event_type === 'page_visited');
      const signedUp = recruiterEvents.find(e => e.event_type === 'signup_started');
      const profileAccessed = recruiterEvents.find(e => e.event_type === 'profile_accessed');
      
      // Determine status
      let status = 'pending';
      if (profileAccessed) status = 'completed';
      else if (signedUp) status = 'in_progress';
      else if (pageVisited) status = 'engaged';
      else if (emailOpened) status = 'opened';
      else if (emailSent) status = 'sent';

      return {
        ...recruiter,
        emailSent: emailSent?.timestamp,
        emailOpened: emailOpened?.timestamp,
        pageVisited: pageVisited?.timestamp,
        signedUp: signedUp?.timestamp,
        profileAccessed: profileAccessed?.timestamp,
        status,
        eventCount: recruiterEvents.length
      };
    });

    return new Response(JSON.stringify({
      summary,
      recruiters: recruiterProgress,
      events: events || [],
      lastUpdated: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email tracking dashboard error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
