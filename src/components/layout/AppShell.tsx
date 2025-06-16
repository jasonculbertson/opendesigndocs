import React, { useState, useEffect } from 'react';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import Sidebar from './Sidebar';
import UserProfileButton from '../auth/UserProfileButton';
import UserProfileSidebar from '../auth/UserProfileSidebar';
import AutoAuthGuard from '../auth/AutoAuthGuard';

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
      
      if (import.meta.env.DEV) {
        console.log('AppShell path updated:', newPath);
      }
    };

    // Listen for Astro's page load events
    document.addEventListener('astro:page-load', handlePageLoad);
    
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  const isHomepage = actualPath === '/';
  const shouldShowSidebar = showSidebar && !isHomepage;

  if (import.meta.env.DEV) {
    console.log('AppShell render:', {
      actualPath,
      isHomepage,
      shouldShowSidebar,
      isSignedIn,
      isLoaded
    });
  }

  return (
    <>
      {/* Persistent Sidebar Components */}
      {!isHomepage && (
        <div className="hidden lg:block">
          <UserProfileButton />
        </div>
      )}
      
      {shouldShowSidebar && <Sidebar currentPath={actualPath} />}
      
      {/* Mobile User Profile */}
      {!isHomepage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-[#f9f9f9] border-t border-[#e5e5e5]">
          <UserProfileSidebar />
        </div>
      )}

      {/* Auth Guard for non-homepage routes */}
      {!isHomepage && <AutoAuthGuard currentPath={actualPath} />}
    </>
  );
}

function AppShell({ currentPath, showSidebar = true }: AppShellProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, render without auth components
  if (!isClient) {
    const isHomepage = currentPath === '/';
    const shouldShowSidebar = showSidebar && !isHomepage;
    
    return (
      <>
        {shouldShowSidebar && <Sidebar currentPath={currentPath} />}
      </>
    );
  }

  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('Missing Clerk publishable key');
    const isHomepage = currentPath === '/';
    const shouldShowSidebar = showSidebar && !isHomepage;
    
    return (
      <>
        {shouldShowSidebar && <Sidebar currentPath={currentPath} />}
      </>
    );
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AppShellInner currentPath={currentPath} showSidebar={showSidebar} />
    </ClerkProvider>
  );
}

export default AppShell; 