import type { APIRoute } from 'astro';
import { getUserUsageStats, getUserId, getUserEmail, getSessionId } from '../../utils/usageTracking';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Get user identification
    const userId = getUserId(request);
    const userEmail = getUserEmail(request);
    const sessionId = getSessionId(request);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unable to identify user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user usage statistics
    const usage = await getUserUsageStats(userId, userEmail, sessionId);

    if (!usage) {
      return new Response(JSON.stringify({ error: 'Unable to retrieve usage data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate remaining words
    const remainingWords = Math.max(0, usage.daily_limit - usage.daily_words_used);

    return new Response(JSON.stringify({
      userId: usage.user_id,
      currentUsage: usage.daily_words_used,
      dailyLimit: usage.daily_limit,
      remainingWords,
      monthlyUsage: usage.monthly_words_used,
      monthlyLimit: usage.monthly_limit,
      tier: usage.tier,
      lastUsageDate: usage.last_usage_date
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Usage API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve usage data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 