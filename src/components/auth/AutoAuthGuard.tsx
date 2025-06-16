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
      
      if (timeOnPage < 500 && !hasReferrer) {
        return 'direct_access'; // Direct URL access
      } else if (timeOnPage < 500 && isFromSameSite) {
        return 'navigation'; // Site navigation
      } else {
        return 'browsing'; // User is actively browsing
      }
    };

    setAuthState(prev => ({
      ...prev,
      userIntent: detectUserIntent()
    }));
  }, []);

  // Grace period management
  useEffect(() => {
    if (!enabled) return;

    // Start grace period timer
    gracePeriodTimer.current = setTimeout(() => {
      setAuthState(prev => ({
        ...prev,
        isGracePeriodActive: false
      }));
    }, gracePeriodMs);

    // Clear timer on unmount
    return () => {
      if (gracePeriodTimer.current) {
        clearTimeout(gracePeriodTimer.current);
      }
    };
  }, [enabled, gracePeriodMs]);

  // Main authentication logic
  useEffect(() => {
    if (!enabled) {
      // When disabled, just track state for analytics
      if (import.meta.env.DEV) {
        console.log('🔒 AutoAuthGuard disabled - tracking only:', { 
          currentPath, 
          isSignedIn, 
          userIntent: authState.userIntent 
        });
      }
      return;
    }

    // Wait for Clerk to load
    if (!isLoaded) return;

    // Don't trigger on homepage
    if (currentPath === '/') return;

    // Don't trigger during grace period
    if (authState.isGracePeriodActive) return;

    // Don't trigger if already triggered
    if (authState.hasTriggeredAuth) return;

    // Only trigger for non-authenticated users
    if (!isSignedIn) {
      // Respect user intent - be less aggressive for browsing users
      const shouldTriggerAuth = () => {
        switch (authState.userIntent) {
          case 'direct_access':
            return true; // Always trigger for direct access
          case 'navigation':
            return true; // Trigger for site navigation
          case 'browsing':
            return false; // Don't interrupt active browsing
          default:
            return true;
        }
      };

      if (shouldTriggerAuth()) {
        setAuthState(prev => ({ ...prev, hasTriggeredAuth: true }));
        
        // Trigger auth overlay with appropriate messaging
        const authDetail = {
          view: 'sign_up' as const,
          redirectTo: currentPath,
          context: authState.userIntent
        };

        if (import.meta.env.DEV) {
          console.log('🔒 AutoAuthGuard triggering auth:', authDetail);
        }

        // Small delay to ensure smooth UX
        setTimeout(() => {
          dispatchAuthEvent(authDetail);
        }, 100);
      }
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