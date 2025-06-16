export interface ClerkConfig {
  publishableKey: string | null;
  isConfigured: boolean;
  error: string | null;
}

export function getClerkConfig(): ClerkConfig {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    return {
      publishableKey: null,
      isConfigured: false,
      error: 'Missing Clerk publishable key - check PUBLIC_CLERK_PUBLISHABLE_KEY environment variable'
    };
  }
  
  return {
    publishableKey,
    isConfigured: true,
    error: null
  };
}

export function logClerkError(error: string, component: string) {
  if (import.meta.env.DEV) {
    console.error(`[${component}] Clerk configuration error:`, error);
  }
} 