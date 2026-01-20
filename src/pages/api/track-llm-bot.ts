import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL || "",
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Known LLM bot user agents
const LLM_BOTS: Record<string, string> = {
  'GPTBot': 'OpenAI GPTBot',
  'ChatGPT-User': 'ChatGPT User',
  'OAI-SearchBot': 'OpenAI SearchBot',
  'ClaudeBot': 'Anthropic Claude',
  'Claude-Web': 'Anthropic Claude Web',
  'anthropic-ai': 'Anthropic AI',
  'PerplexityBot': 'Perplexity',
  'Bytespider': 'ByteDance/TikTok',
  'CCBot': 'Common Crawl',
  'Google-Extended': 'Google AI',
  'GoogleOther': 'Google Other',
  'Googlebot': 'Googlebot',
  'cohere-ai': 'Cohere AI',
  'YouBot': 'You.com',
  'Applebot-Extended': 'Apple AI',
  'Meta-ExternalAgent': 'Meta AI',
  'meta-externalagent': 'Meta AI',
  'FacebookBot': 'Facebook Bot',
  'Amazonbot': 'Amazon Bot',
  'AI2Bot': 'AI2 Bot',
  'Diffbot': 'Diffbot',
  'omgili': 'Omgili',
  'Scrapy': 'Scrapy Crawler'
};

function detectLLMBot(userAgent: string): { isBot: boolean; botName: string | null } {
  if (!userAgent) return { isBot: false, botName: null };
  
  for (const [pattern, name] of Object.entries(LLM_BOTS)) {
    if (userAgent.toLowerCase().includes(pattern.toLowerCase())) {
      return { isBot: true, botName: name };
    }
  }
  
  return { isBot: false, botName: null };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { userAgent, path, referrer, ipAddress, country } = body;
    
    const { isBot, botName } = detectLLMBot(userAgent);
    
    if (!isBot || !botName) {
      return new Response(JSON.stringify({ tracked: false, reason: 'Not an LLM bot' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Log to Supabase
    const { error } = await supabase
      .from('llm_bot_visits')
      .insert({
        bot_name: botName,
        user_agent: userAgent,
        path: path || '/',
        referrer: referrer || null,
        ip_address: ipAddress || null,
        country: country || null
      });
    
    if (error) {
      console.error('Failed to log LLM bot visit:', error);
      return new Response(JSON.stringify({ tracked: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`🤖 LLM Bot tracked: ${botName} visited ${path}`);
    
    return new Response(JSON.stringify({ tracked: true, botName }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error tracking LLM bot:', error);
    return new Response(JSON.stringify({ tracked: false, error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GET endpoint to retrieve bot visit stats
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get('days') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Get visit counts by bot
    const { data: botCounts, error: botError } = await supabase
      .from('llm_bot_visits')
      .select('bot_name')
      .gte('created_at', startDate.toISOString());
    
    if (botError) {
      return new Response(JSON.stringify({ error: botError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Aggregate counts
    const counts: Record<string, number> = {};
    botCounts?.forEach(visit => {
      counts[visit.bot_name] = (counts[visit.bot_name] || 0) + 1;
    });
    
    // Get recent visits
    const { data: recentVisits, error: recentError } = await supabase
      .from('llm_bot_visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (recentError) {
      return new Response(JSON.stringify({ error: recentError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get total count
    const { count: totalCount } = await supabase
      .from('llm_bot_visits')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());
    
    return new Response(JSON.stringify({
      period: `Last ${days} days`,
      totalVisits: totalCount || 0,
      byBot: counts,
      recentVisits: recentVisits || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching LLM bot stats:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
