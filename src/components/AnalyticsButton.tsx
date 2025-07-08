import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

// Authorized user IDs for both development and production environments
const AUTHORIZED_USER_IDS = [
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt', // Production UUID
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ'  // Development/Testing UUID
];

const AnalyticsButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Don't render anything on server side
  if (!isClient) {
    return null;
  }
  
  // Now we can safely use the hook on client side
  return <AnalyticsButtonClient authorizedUserIds={AUTHORIZED_USER_IDS} />;
};

interface AnalyticsButtonClientProps {
  authorizedUserIds: string[];
}

function AnalyticsButtonClient({ authorizedUserIds }: AnalyticsButtonClientProps) {
  const [forceUpdate, setForceUpdate] = useState(0);
  
  console.log('🔍 Analytics Button: AnalyticsButtonClient component rendering...');
  
  // Check if window.Clerk is available
  if (typeof window !== 'undefined' && (window as any).Clerk?.user) {
    console.log('🔍 Analytics Button: Window Clerk user:', (window as any).Clerk.user);
  }
  
  // Try to use the hook, but catch any errors
  let user: any = null;
  let isSignedIn: boolean = false;
  let isLoaded: boolean = false;
  let error: Error | null = null;
  
  try {
    const result = useUser();
    user = result.user;
    isSignedIn = result.isSignedIn || false;
    isLoaded = result.isLoaded || false;
  } catch (err) {
    console.log('🔍 Analytics Button: Clerk context not available yet, using defaults. Error:', err);
    error = err as Error;
    
    // Fallback to window.Clerk if available
    if (typeof window !== 'undefined' && (window as any).Clerk?.user) {
      console.log('🔍 Analytics Button: Using window.Clerk as fallback');
      user = (window as any).Clerk.user;
      isSignedIn = true;
      isLoaded = true;
    }
  }
  
  // Force re-render periodically if not loaded
  useEffect(() => {
    if (!isLoaded) {
      console.log('🔍 Analytics Button: Forcing re-render to check Clerk status...');
      const timer = setTimeout(() => {
        setForceUpdate(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, forceUpdate]);
  
  console.log('🔍 Analytics Button Debug:', {
    isLoaded,
    isSignedIn,
    userId: user?.id,
    authorizedUserIds: authorizedUserIds,
    userMatch: user?.id === authorizedUserIds[0], // Assuming first authorized user is the primary one for now
    windowClerkAvailable: typeof window !== 'undefined' && !!(window as any).Clerk?.user,
    error: error?.message
  });
  
  // Still loading
  if (!isLoaded) {
    console.log('🔍 Analytics Button: Still loading...');
    return null;
  }
  
  // User not signed in
  if (!isSignedIn || !user) {
    console.log('🔍 Analytics Button: User not signed in');
    return null;
  }
  
  // Check if current user is authorized
  const isAuthorized = isLoaded && isSignedIn && user && authorizedUserIds.includes(user.id);

  // Check if user is authorized
  if (!isAuthorized) {
    console.log('🔍 Analytics Button: User ID does not match authorized ID');
    console.log('🔍 Expected:', authorizedUserIds);
    console.log('🔍 Actual:', user.id);
    return null;
  }
  
  console.log('🔍 Analytics Button: User is authorized, showing button');
  
  // User is authorized, show the analytics button
  return (
    <a 
      href="/docs/analytics" 
      className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      title="View Analytics Dashboard"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
      Analytics
    </a>
  );
}

export default AnalyticsButton; 