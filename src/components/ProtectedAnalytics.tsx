import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import AnalyticsDashboard from './AnalyticsDashboard';

// Authorized user IDs for both development and production environments
const AUTHORIZED_USER_IDS = [
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt', // Production UUID
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ'  // Development/Testing UUID
];

const ProtectedAnalytics: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side before using Clerk hooks
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Show loading state on server side and initial client render
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Now we can safely use the hook on client side
  return <ProtectedAnalyticsClient authorizedUserIds={AUTHORIZED_USER_IDS} />;
};

interface ProtectedAnalyticsClientProps {
  authorizedUserIds: string[];
}

function ProtectedAnalyticsClient({ authorizedUserIds }: ProtectedAnalyticsClientProps) {
  const [forceUpdate, setForceUpdate] = useState(0);
  
  console.log('🔍 Protected Analytics: Component rendering...');
  
  // Check if window.Clerk is available
  if (typeof window !== 'undefined' && (window as any).Clerk?.user) {
    console.log('🔍 Protected Analytics: Window Clerk user:', (window as any).Clerk.user);
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
    console.log('🔍 Protected Analytics: Clerk context not available yet, using defaults. Error:', err);
    error = err as Error;
    
    // Fallback to window.Clerk if available
    if (typeof window !== 'undefined' && (window as any).Clerk?.user) {
      console.log('🔍 Protected Analytics: Using window.Clerk as fallback');
      user = (window as any).Clerk.user;
      isSignedIn = true;
      isLoaded = true;
    }
  }
  
  // Force re-render periodically if not loaded
  useEffect(() => {
    if (!isLoaded) {
      console.log('🔍 Protected Analytics: Forcing re-render to check Clerk status...');
      const timer = setTimeout(() => {
        setForceUpdate(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, forceUpdate]);
  
  console.log('🔍 Protected Analytics Debug:', {
    isLoaded,
    isSignedIn,
    userId: user?.id,
    authorizedUserIds: authorizedUserIds,
    userMatch: user?.id === authorizedUserIds[0], // Assuming first authorized user for now
    windowClerkAvailable: typeof window !== 'undefined' && !!(window as any).Clerk?.user,
    error: error?.message
  });
  
  // Show loading state while Clerk is loading
  if (!isLoaded) {
    console.log('🔍 Protected Analytics: Still loading...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show access denied if user is not signed in
  if (!isSignedIn || !user) {
    console.log('🔍 Protected Analytics: User not signed in');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be signed in to view analytics.</p>
        </div>
      </div>
    );
  }
  
  // Check if current user is authorized
  const isAuthorized = isLoaded && isSignedIn && user && authorizedUserIds.includes(user.id);

  // Show access denied if user is not authorized
  if (!isAuthorized) {
    console.log('🔍 Protected Analytics: User not authorized');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }
  
  console.log('🔍 Protected Analytics: User is authorized, showing dashboard');
  
  // Show analytics dashboard for authorized user
  return <AnalyticsDashboard />;
}

export default ProtectedAnalytics; 