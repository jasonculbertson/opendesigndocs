import React, { useState, useEffect } from "react";
import { ClerkProvider } from '@clerk/clerk-react';
import AutoAuthGuard from "./AutoAuthGuard";

interface ClerkReactIslandProps extends React.PropsWithChildren<{}> {
  currentPath: string;
  showSidebar?: boolean;
}

export default function ClerkReactIsland({ children, currentPath, showSidebar = true }: ClerkReactIslandProps) {
  const [isClient, setIsClient] = useState(false);
  const [clientPath, setClientPath] = useState(currentPath);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update client path when it changes
  useEffect(() => {
    setClientPath(currentPath);
  }, [currentPath]);

  // Use clientPath for UI decisions to reduce re-renders
  const isHomepage = clientPath === '/';
  
  // Only log in development to reduce noise
  if (import.meta.env.DEV) {
    console.log('ClerkReactIsland path updated:', clientPath);
  }

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
      {!isHomepage && <AutoAuthGuard currentPath={clientPath} />}
      {children}
    </ClerkProvider>
  );
} 