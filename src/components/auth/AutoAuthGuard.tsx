import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface AutoAuthGuardProps {
  currentPath: string;
}

export default function AutoAuthGuard({ currentPath }: AutoAuthGuardProps) {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    // TEMPORARILY DISABLED FOR TESTING
    // We'll re-enable this once Clerk authentication is working properly
    // AutoAuthGuard disabled - allowing free access
    return;

    // // Wait for Clerk to load
    // if (!isLoaded) return;

    // // Don't trigger on homepage
    // if (currentPath === '/') return;

    // // Debug logging
    // console.log('🔒 AutoAuthGuard:', { isSignedIn, isLoaded, currentPath });

    // // If user is not signed in and on a subpage, trigger auth overlay
    // if (!isSignedIn) {
    //   console.log('🚫 User not authenticated, triggering auth overlay');
    //   // Small delay to ensure the page has loaded
    //   setTimeout(() => {
    //     window.dispatchEvent(new CustomEvent('openAuthOverlay', {
    //       detail: {
    //         view: 'sign_up',
    //         redirectTo: currentPath
    //       }
    //     }));
    //   }, 100);
    // } else {
    //   console.log('✅ User is authenticated, allowing access');
    // }
  }, [isSignedIn, isLoaded, currentPath]);

  // This component doesn't render anything visible
  return null;
} 