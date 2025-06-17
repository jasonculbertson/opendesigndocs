import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { dispatchAuthEvent } from '../../utils/authEvents';

interface AutoAuthGuardProps {
  currentPath: string;
  gracePeriodMs?: number;
  enabled?: boolean;
}

interface AuthState {
  hasTriggeredAuth: boolean;
  isGracePeriodActive: boolean;
  userIntent: 'browsing' | 'direct_access' | 'navigation';
}

export default function AutoAuthGuard({ 
  currentPath, 
  gracePeriodMs = 3000, // 3 second grace period
  enabled = false // Disabled by default for gradual rollout
}: AutoAuthGuardProps) {
  const { isSignedIn, isLoaded } = useUser();
  const [authState, setAuthState] = useState<AuthState>({
    hasTriggeredAuth: false,
    isGracePeriodActive: true,
    userIntent: 'direct_access'
  });
  const gracePeriodTimer = useRef<NodeJS.Timeout>();
  const mountTime = useRef<number>(Date.now());

  // Detect user intent based on behavior
  useEffect(() => {
    const detectUserIntent = () => {
      const timeOnPage = Date.now() - mountTime.current;
      const hasReferrer = document.referrer !== '';
      const isFromSameSite = document.referrer.includes(window.location.hostname);
      
      console.log('🔒 AutoAuthGuard intent detection:', {
        timeOnPage,
        hasReferrer,
        referrer: document.referrer,
        isFromSameSite,
        hostname: window.location.hostname
      });
      
      // Use a longer timeframe for production (2000ms instead of 500ms)
      if (timeOnPage < 2000 && !hasReferrer) {
        return 'direct_access'; // Direct URL access
      } else if (timeOnPage < 2000 && isFromSameSite) {
        return 'navigation'; // Site navigation
      } else {
        return 'direct_access'; // FIXED: Default to direct_access instead of browsing for reliability
      }
    };

    setAuthState(prev => ({
      ...prev,
      userIntent: detectUserIntent()
    }));
  }, []);

  // Grace period management
  useEffect(() => {
    console.log('🔒 AutoAuthGuard grace period setup:', { enabled, gracePeriodMs });
    
    if (!enabled) return;

    console.log('🔒 AutoAuthGuard starting grace period timer...');
    
    // Start grace period timer
    gracePeriodTimer.current = setTimeout(() => {
      console.log('🔒 AutoAuthGuard grace period ended, auth can now trigger');
      setAuthState(prev => ({
        ...prev,
        isGracePeriodActive: false
      }));
    }, gracePeriodMs);

    // Clear timer on unmount
    return () => {
      if (gracePeriodTimer.current) {
        console.log('🔒 AutoAuthGuard clearing grace period timer');
        clearTimeout(gracePeriodTimer.current);
      }
    };
  }, [enabled, gracePeriodMs]);

  // Main authentication logic
  useEffect(() => {
    // Always log for debugging on live site
    console.log('🔒 AutoAuthGuard state:', { 
      enabled,
      currentPath, 
      isSignedIn, 
      isLoaded,
      userIntent: authState.userIntent,
      isGracePeriodActive: authState.isGracePeriodActive,
      hasTriggeredAuth: authState.hasTriggeredAuth
    });

    if (!enabled) {
      // When disabled, just track state for analytics
      console.log('🔒 AutoAuthGuard disabled - tracking only:', { 
        currentPath, 
        isSignedIn, 
        userIntent: authState.userIntent 
      });
      return;
    }

    // Wait for Clerk to load
    if (!isLoaded) {
      console.log('🔒 AutoAuthGuard waiting for Clerk to load...');
      return;
    }

    // Don't trigger on homepage
    if (currentPath === '/') {
      console.log('🔒 AutoAuthGuard skipping homepage');
      return;
    }

    // Don't trigger during grace period
    if (authState.isGracePeriodActive) {
      console.log('🔒 AutoAuthGuard grace period active, waiting...');
      return;
    }

    // Don't trigger if already triggered
    if (authState.hasTriggeredAuth) {
      console.log('🔒 AutoAuthGuard already triggered auth');
      return;
    }

    // Only trigger for non-authenticated users
    if (!isSignedIn) {
      console.log('🔒 AutoAuthGuard user not signed in, checking intent...');
      
      // Respect user intent - be less aggressive for browsing users
      const shouldTriggerAuth = () => {
        switch (authState.userIntent) {
          case 'direct_access':
            return true; // Always trigger for direct access
          case 'navigation':
            return true; // Trigger for site navigation
          case 'browsing':
            return true; // FIXED: Always trigger auth for all intents on production
          default:
            return true;
        }
      };

      if (shouldTriggerAuth()) {
        console.log('🔒 AutoAuthGuard triggering auth...');
        setAuthState(prev => ({ ...prev, hasTriggeredAuth: true }));
        
        // Trigger auth overlay with appropriate messaging
        const authDetail = {
          view: 'sign_up' as const,
          redirectTo: currentPath,
          context: authState.userIntent
        };

        console.log('🔒 AutoAuthGuard triggering auth:', authDetail);

        // Small delay to ensure smooth UX
        setTimeout(() => {
          dispatchAuthEvent(authDetail);
        }, 100);
      } else {
        console.log('🔒 AutoAuthGuard respecting user intent, not triggering auth');
      }
    } else {
      console.log('🔒 AutoAuthGuard user is signed in, no action needed');
    }
  }, [enabled, isSignedIn, isLoaded, currentPath, authState, gracePeriodMs]);

  // Reset auth state when user signs in
  useEffect(() => {
    if (isSignedIn && authState.hasTriggeredAuth) {
      setAuthState(prev => ({
        ...prev,
        hasTriggeredAuth: false
      }));
    }
  }, [isSignedIn, authState.hasTriggeredAuth]);

  // This component doesn't render anything visible
  return null;
} 