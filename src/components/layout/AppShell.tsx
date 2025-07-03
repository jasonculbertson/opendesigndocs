import React, { useState, useEffect } from 'react';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import Sidebar from './Sidebar';
import UserProfileButton from '../auth/UserProfileButton';
import UserProfileSidebar from '../auth/UserProfileSidebar';
import MobileUserProfile from '../auth/MobileUserProfile';
import MobileUserProfilePortal from '../auth/MobileUserProfilePortal';
import MobileHeader from './MobileHeader';
import AutoAuthGuard from '../auth/AutoAuthGuard';
import AuthErrorBoundary from '../auth/AuthErrorBoundary';
import ClerkAuthOverlay from '../auth/ClerkAuthOverlay';
import { getClerkConfig, logClerkError } from '../../utils/clerkConfig';

interface AppShellProps {
  currentPath: string;
  showSidebar?: boolean;
}



function AppShellInner({ currentPath, showSidebar = true }: AppShellProps) {
  const [actualPath, setActualPath] = useState(currentPath);
  const { isSignedIn, isLoaded } = useUser();

  // Listen for Astro page changes
  useEffect(() => {
    const handlePageLoad = () => {
      const newPath = window.location.pathname;
      setActualPath(newPath);
      
      // Path updated silently
    };

    // Listen for Astro's page load events
    document.addEventListener('astro:page-load', handlePageLoad);
    
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  const isHomepage = actualPath === '/';
  const shouldShowSidebar = showSidebar && !isHomepage;

  // AppShell rendering (debug logging removed)

  return (
    <>
      {/* Persistent Sidebar Components */}
      {!isHomepage && (
        <div className="hidden lg:block">
          <UserProfileButton />
        </div>
      )}
      
      {shouldShowSidebar && <Sidebar currentPath={actualPath} />}
      
      {/* Mobile Header with integrated profile and hamburger menu */}
      {!isHomepage && <MobileHeader />}

      {/* Auth Guard for non-homepage routes - ENABLED FOR TESTING */}
      {!isHomepage && <AutoAuthGuard currentPath={actualPath} enabled={true} gracePeriodMs={1000} />}
      
      {/* Auth Overlay - responds to AutoAuthGuard events */}
      <ClerkAuthOverlay allowClose={true} />
    </>
  );
}

function AppShell({ currentPath, showSidebar = true }: AppShellProps) {
  const [isClient, setIsClient] = useState(false);
  const [clerkReady, setClerkReady] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Small delay to ensure Clerk is properly initialized
    const timer = setTimeout(() => {
      setClerkReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const clerkConfig = getClerkConfig();

  // Determine the appropriate redirect URL based on current page
  const getRedirectUrl = () => {
    // If on homepage, redirect to levels page
    if (currentPath === '/') {
      return '/docs/levels/levels-titles';
    }
    // For all other pages, redirect back to the same page
    return currentPath;
  };

  const redirectUrl = getRedirectUrl();

  // Debug logging for Clerk configuration
  console.log('🔧 AppShell Clerk config:', {
    isConfigured: clerkConfig.isConfigured,
    hasPublishableKey: !!clerkConfig.publishableKey,
    error: clerkConfig.error,
    currentPath,
    redirectUrl,
    isClient,
    clerkReady
  });

  // During SSR or if Clerk is not configured, render basic version
  if (!isClient || !clerkConfig.isConfigured) {
    const isHomepage = currentPath === '/';
    const shouldShowSidebar = showSidebar && !isHomepage;
    
    if (!clerkConfig.isConfigured) {
      logClerkError(clerkConfig.error!, 'AppShell');
      console.log('🔧 AppShell falling back to basic render due to Clerk config issue');
    }
    
    return (
      <>
        {shouldShowSidebar && <Sidebar currentPath={currentPath} />}
      </>
    );
  }
  
  return (
    <AuthErrorBoundary
      onError={(error, errorInfo) => {
        logClerkError(`AppShell error: ${error.message}`, 'AppShell');
      }}
    >
      <ClerkProvider 
        publishableKey={clerkConfig.publishableKey!}
        afterSignInUrl={redirectUrl}
        afterSignUpUrl={redirectUrl}
      >
        {clerkReady ? (
          <AppShellInner currentPath={currentPath} showSidebar={showSidebar} />
        ) : (
          // Show basic layout while Clerk initializes
          <>
            {(() => {
              const isHomepage = currentPath === '/';
              return showSidebar && !isHomepage && <Sidebar currentPath={currentPath} />;
            })()}
          </>
        )}
      </ClerkProvider>
    </AuthErrorBoundary>
  );
}

export default AppShell; 