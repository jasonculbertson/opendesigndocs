import React, { useState, useEffect } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import Sidebar from './Sidebar';
import UserProfileButton from '../auth/UserProfileButton';
import UserProfileSidebar from '../auth/UserProfileSidebar';

interface PersistedSidebarProps {
  currentPath: string;
  showSidebar?: boolean;
}

function PersistedSidebar({ currentPath, showSidebar = true }: PersistedSidebarProps) {
  const [isClient, setIsClient] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the actual current path directly from window
  const actualPath = isClient ? window.location.pathname : currentPath;
  const isHomepage = actualPath === '/';
  const shouldShowSidebar = showSidebar && !isHomepage;

  // Listen for Astro page changes to force re-render
  useEffect(() => {
    if (!isClient) return;
    
    const handlePageLoad = () => {
      // Force a re-render by updating state
      setForceUpdate(prev => prev + 1);
      
      if (import.meta.env.DEV) {
        console.log('PersistedSidebar page load detected:', {
          path: window.location.pathname,
          isHomepage: window.location.pathname === '/',
          showSidebar,
          shouldShowSidebar: showSidebar && window.location.pathname !== '/'
        });
      }
    };

    // Listen for Astro's page load events
    document.addEventListener('astro:page-load', handlePageLoad);
    
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, [isClient, showSidebar]);

  // Debug logging
  if (import.meta.env.DEV) {
    console.log('PersistedSidebar render:', {
      isClient,
      actualPath,
      isHomepage,
      showSidebar,
      shouldShowSidebar
    });
  }

  // During SSR, only render the sidebar (no auth components)
  if (!isClient) {
    return (
      <>
        {shouldShowSidebar && <Sidebar key={actualPath} currentPath={actualPath} />}
      </>
    );
  }

  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('Missing Clerk publishable key in PersistedSidebar');
    return (
      <>
        {shouldShowSidebar && <Sidebar key={actualPath} currentPath={actualPath} />}
      </>
    );
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {!isHomepage && (
        <div className="hidden lg:block">
          <UserProfileButton />
        </div>
      )}
      {shouldShowSidebar && <Sidebar key={actualPath} currentPath={actualPath} />}
      {/* Mobile User Profile - needs to be inside ClerkProvider */}
      {!isHomepage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-[#f9f9f9] border-t border-[#e5e5e5]">
          <UserProfileSidebar />
        </div>
      )}
    </ClerkProvider>
  );
}

export default PersistedSidebar; 