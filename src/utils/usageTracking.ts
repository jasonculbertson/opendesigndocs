import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for usage tracking
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface UserUsage {
  id: string;
  user_id: string;
  user_email?: string;
  session_id?: string;
  words_used: number;
  daily_words_used: number;
  monthly_words_used: number;
  last_usage_date: string;
  reset_date: string;
  tier: string;
  daily_limit: number;
  monthly_limit: number;
  created_at: string;
  updated_at: string;
}

export interface UsageCheckResult {
  canUse: boolean;
  currentUsage: number;
  dailyLimit: number;
  remainingWords: number;
  message?: string;
}

/**
 * Check if a user can use a certain number of words
 */
export async function checkUserUsage(
  userId: string,
  wordsToUse: number,
  userEmail?: string | null,
  sessionId?: string | null
): Promise<UsageCheckResult> {
  try {
    // Call the database function to check usage
    const { data, error } = await supabase.rpc('can_user_use_words', {
      p_user_id: userId,
      p_words_to_use: wordsToUse,
      p_user_email: userEmail,
      p_session_id: sessionId
    });

    if (error) {
      console.error('Error checking user usage:', error);
      return {
        canUse: false,
        currentUsage: 0,
        dailyLimit: 3000,
        remainingWords: 0,
        message: 'Error checking usage limits'
      };
    }

    // Get current usage details
    const { data: usageData, error: usageError } = await supabase.rpc('get_or_create_user_usage', {
      p_user_id: userId,
      p_user_email: userEmail,
      p_session_id: sessionId
    });

    if (usageError) {
      console.error('Error getting user usage:', usageError);
      return {
        canUse: false,
        currentUsage: 0,
        dailyLimit: 3000,
        remainingWords: 0,
        message: 'Error retrieving usage data'
      };
    }

    const usage = usageData as UserUsage;
    const currentUsage = usage.daily_words_used;
    const dailyLimit = usage.daily_limit;
    const remainingWords = Math.max(0, dailyLimit - currentUsage);

    return {
      canUse: data as boolean,
      currentUsage,
      dailyLimit,
      remainingWords,
      message: data ? undefined : 'Daily word limit exceeded'
    };
  } catch (error) {
    console.error('Error in checkUserUsage:', error);
    return {
      canUse: false,
      currentUsage: 0,
      dailyLimit: 3000,
      remainingWords: 0,
      message: 'Unexpected error checking usage'
    };
  }
}

/**
 * Update user usage after successful API call
 */
export async function updateUserUsage(
  userId: string,
  wordsUsed: number,
  userEmail?: string | null,
  sessionId?: string | null
): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('update_user_usage', {
      p_user_id: userId,
      p_words_used: wordsUsed,
      p_user_email: userEmail,
      p_session_id: sessionId
    });

    if (error) {
      console.error('Error updating user usage:', error);
      return false;
    }

    return data as boolean;
  } catch (error) {
    console.error('Error in updateUserUsage:', error);
    return false;
  }
}

/**
 * Get user usage statistics
 */
export async function getUserUsageStats(
  userId: string,
  userEmail?: string | null,
  sessionId?: string | null
): Promise<UserUsage | null> {
  try {
    const { data, error } = await supabase.rpc('get_or_create_user_usage', {
      p_user_id: userId,
      p_user_email: userEmail,
      p_session_id: sessionId
    });

    if (error) {
      console.error('Error getting user usage stats:', error);
      return null;
    }

    return data as UserUsage;
  } catch (error) {
    console.error('Error in getUserUsageStats:', error);
    return null;
  }
}

/**
 * Count words in a text string
 */
export function countWords(text: string): number {
  if (!text || typeof text !== 'string') return 0;
  
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Calculate total words from message history
 */
export function calculateTotalWords(messages: Array<{ content: string }>, currentInput: string = ''): number {
  const allText = messages.map(msg => msg.content).join(' ') + ' ' + currentInput;
  return countWords(allText);
}

/**
 * Get user ID from various sources (Clerk, session, etc.)
 */
export function getUserId(request: Request): string | null {
  // Try to get from Clerk auth header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // This would need to be decoded from JWT token
    // For now, we'll use a simple approach
    try {
      const token = authHeader.substring(7);
      // In a real implementation, you'd decode the JWT token
      // For now, we'll use session ID or IP as fallback
    } catch (error) {
      console.error('Error decoding auth token:', error);
    }
  }

  // Fallback to session ID or IP address
  const sessionId = request.headers.get('x-session-id');
  const userAgent = request.headers.get('user-agent');
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';

  // Create a consistent user ID from available data
  return sessionId || `anonymous_${Buffer.from(ip + userAgent).toString('base64').substring(0, 16)}`;
}

/**
 * Get user email from request headers
 */
export function getUserEmail(request: Request): string | null {
  return request.headers.get('x-user-email');
}

/**
 * Get session ID from request headers
 */
export function getSessionId(request: Request): string | null {
  return request.headers.get('x-session-id') || 
         request.headers.get('x-request-id') ||
         crypto.randomUUID();
} 