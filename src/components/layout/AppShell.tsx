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
  currentPath?: string;
  showSidebar?: boolean;
}



function AppShellInner({ currentPath, showSidebar = true }: AppShellProps) {
  const { isSignedIn, isLoaded } = useUser();
  
  // Use the passed currentPath directly
  const actualPath = currentPath || '/';
  const isHomepage = actualPath === '/';
  const shouldShowSidebar = showSidebar && !isHomepage;

  // Debug logging for path detection
  console.log('🔧 AppShellInner path debug:', {
    currentPathProp: currentPath,
    actualPath,
    isHomepage,
    shouldShowSidebar
  });

  return (
    <>
      {/* Desktop Profile Button - only show on docs pages */}
      {!isHomepage && (
        <div className="hidden lg:block">
          <UserProfileButton />
        </div>
      )}
      
      {shouldShowSidebar && <Sidebar currentPath={actualPath} />}
      
      {/* Mobile Header with integrated profile and hamburger menu */}
      {!isHomepage && <MobileHeader />}

      {/* Auth Guard for non-homepage routes - ENABLED FOR TESTING */}
      {!isHomepage && <AutoAuthGuard currentPath={actualPath} enabled={true} gracePeriodMs={500} />}
      
      {/* Auth Overlay - responds to AutoAuthGuard events */}
      <ClerkAuthOverlay allowClose={true} />
    </>
  );
}

function AppShell({ currentPath, showSidebar }: AppShellProps) {
  const [isClient, setIsClient] = useState(false);
  const [clerkReady, setClerkReady] = useState(false);
  const [mountTime] = useState(() => Date.now());
  
  // Use the passed currentPath prop as the source of truth
  const actualCurrentPath = currentPath || '/';
  
  // Auto-detect showSidebar if not provided
  const shouldShowSidebarByDefault = actualCurrentPath.startsWith('/docs');
  const finalShowSidebar = showSidebar !== undefined ? showSidebar : shouldShowSidebarByDefault;
  
  useEffect(() => {
    setIsClient(true);
    
    // Minimal delay to ensure Clerk is properly initialized
    const timer = setTimeout(() => {
      setClerkReady(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const clerkConfig = getClerkConfig();

  // Use a stable redirect URL to prevent ClerkProvider re-renders
  const redirectUrl = '/docs/levels/levels-titles';

  // Debug logging for path detection
  console.log('🔧 AppShell path debug:', {
    currentPathProp: currentPath,
    actualCurrentPath,
    isClient,
    clerkReady
  });

  // Debug logging for Clerk configuration
  console.log('🔧 AppShell Clerk config:', {
    isConfigured: clerkConfig.isConfigured,
    hasPublishableKey: !!clerkConfig.publishableKey,
    error: clerkConfig.error,
    currentPath: actualCurrentPath,
    redirectUrl,
    isClient,
    clerkReady,
    mountTime,
    age: Date.now() - mountTime
  });

  // During SSR or if Clerk is not configured, render basic version
  if (!isClient || !clerkConfig.isConfigured) {
    const isHomepage = actualCurrentPath === '/';
    const shouldShowSidebar = finalShowSidebar && !isHomepage;
    
    // For mobile header, be more aggressive - show it unless we're definitely on homepage
    const shouldShowMobileHeader = actualCurrentPath !== '/' || 
      (typeof window !== 'undefined' && window.location.pathname !== '/');
    
    if (!clerkConfig.isConfigured) {
      logClerkError(clerkConfig.error!, 'AppShell');
      console.log('🔧 AppShell falling back to basic render due to Clerk config issue');
    }
    
    return (
      <>
        {shouldShowSidebar && <Sidebar currentPath={actualCurrentPath} />}
        {/* Show mobile header unless definitely on homepage */}
        {shouldShowMobileHeader && <MobileHeader />}
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
          <AppShellInner currentPath={actualCurrentPath} showSidebar={finalShowSidebar} />
        ) : (
          // Show basic layout while Clerk initializes - include MobileHeader immediately
          <>
            {(() => {
              const isHomepage = actualCurrentPath === '/';
              const shouldShowMobileHeader = actualCurrentPath !== '/' || 
                (typeof window !== 'undefined' && window.location.pathname !== '/');
              return (
                <>
                  {finalShowSidebar && !isHomepage && <Sidebar currentPath={actualCurrentPath} />}
                  {shouldShowMobileHeader && <MobileHeader />}
                </>
              );
            })()}
          </>
        )}
      </ClerkProvider>
    </AuthErrorBoundary>
  );
}

export default AppShell; 