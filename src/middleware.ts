import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';
import { sequence } from 'astro:middleware';

// Known LLM bot user agents
const LLM_BOT_PATTERNS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Bytespider',
  'CCBot',
  'Google-Extended',
  'GoogleOther',
  'cohere-ai',
  'YouBot',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'meta-externalagent',
  'AI2Bot',
  'Diffbot'
];

function isLLMBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return LLM_BOT_PATTERNS.some(pattern => ua.includes(pattern.toLowerCase()));
}

// LLM Bot tracking middleware
const llmBotTracker = async (context: any, next: any) => {
  const { request } = context;
  const userAgent = request.headers.get('user-agent');
  
  // Only track if it's an LLM bot
  if (isLLMBot(userAgent)) {
    const url = new URL(request.url);
    
    // Fire-and-forget: don't wait for the tracking response
    try {
      const trackingUrl = new URL('/api/track-llm-bot', url.origin);
      
      // Get IP and country from headers (Vercel provides these)
      const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                        request.headers.get('x-real-ip') || 
                        null;
      const country = request.headers.get('x-vercel-ip-country') || null;
      
      // Use fetch but don't await - fire and forget
      fetch(trackingUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAgent,
          path: url.pathname,
          referrer: request.headers.get('referer') || null,
          ipAddress,
          country
        })
      }).catch(err => {
        // Silently ignore tracking errors to not affect page load
        console.error('LLM bot tracking failed:', err);
      });
    } catch (e) {
      // Silently ignore
    }
  }
  
  return next();
};

// Define public routes that don't require authentication overlay
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/api/(.*)'
]);

export const onRequest = sequence(llmBotTracker, clerkMiddleware());
