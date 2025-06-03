import React, { useState, useEffect } from "react";
import { ClerkProvider } from '@clerk/clerk-react';
import Sidebar from "./Sidebar";
import UserProfileButton from "./UserProfileButton";
import AutoAuthGuard from "./AutoAuthGuard";

interface ClerkReactIslandProps extends React.PropsWithChildren<{}> {
  currentPath: string;
  showSidebar?: boolean;
}

export default function ClerkReactIsland({ children, currentPath, showSidebar = true }: ClerkReactIslandProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log('ClerkReactIsland rendering on path:', currentPath);
  const isHomepage = currentPath === '/';
  
  console.log('ClerkReactIsland conditions:', {
    isHomepage,
    showSidebar,
    willShowUserProfileButton: !isHomepage,
    willShowSidebar: showSidebar && !isHomepage
  });

  // During SSR, render basic structure - no auth overlay needed since auth is bypassed
  if (!isClient) {
    return (
      <>
        {children}
      </>
    );
  }

  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('Missing Clerk publishable key');
    return (
      <>
        {children}
      </>
    );
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {!isHomepage && <AutoAuthGuard currentPath={currentPath} />}
      {!isHomepage && (
        <div className="hidden lg:block">
          <UserProfileButton />
        </div>
      )}
      {showSidebar && !isHomepage && <Sidebar currentPath={currentPath} />}
      {children}
    </ClerkProvider>
  );
} 