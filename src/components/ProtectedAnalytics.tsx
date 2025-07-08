import React, { useState, useEffect } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';

// Authorized user IDs for both development and production environments
const AUTHORIZED_USER_IDS = [
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt', // Production UUID
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ'  // Development/Testing UUID
];

interface ClerkUser {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName?: string;
  lastName?: string;
}

const ProtectedAnalytics: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [clerkState, setClerkState] = useState<{
    isLoaded: boolean;
    isSignedIn: boolean;
    user: ClerkUser | null;
  }>({
    isLoaded: false,
    isSignedIn: false,
    user: null
  });
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Monitor Clerk state changes
  useEffect(() => {
    if (!isClient) return;

    const checkClerkState = () => {
      if (typeof window !== 'undefined' && (window as any).Clerk) {
        const clerk = (window as any).Clerk;
        const isLoaded = clerk.loaded || !!clerk.user;
        const user = clerk.user;
        const isSignedIn = !!user;

        console.log('🔍 Protected Analytics: Clerk state check:', {
          isLoaded,
          isSignedIn,
          userId: user?.id,
          clerkLoaded: clerk.loaded,
          hasUser: !!user
        });

        setClerkState({
          isLoaded,
          isSignedIn,
          user: user ? {
            id: user.id,
            emailAddresses: user.emailAddresses || [],
            firstName: user.firstName,
            lastName: user.lastName
          } : null
        });
      }
    };

    // Initial check
    checkClerkState();

    // Set up polling to check for Clerk state changes
    const interval = setInterval(checkClerkState, 1000);

    // Listen for Clerk events if available
    if (typeof window !== 'undefined' && (window as any).Clerk) {
      // Try to listen for Clerk events
      const handleUserChange = () => {
        console.log('🔍 Protected Analytics: Clerk user changed');
        checkClerkState();
      };

      // Some Clerk instances have event listeners
      try {
        if ((window as any).Clerk.session) {
          // Clerk is ready, check immediately
          checkClerkState();
        }
      } catch (e) {
        console.log('🔍 Protected Analytics: Clerk event listener not available');
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isClient]);
  
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

  console.log('🔍 Protected Analytics Debug:', {
    isLoaded: clerkState.isLoaded,
    isSignedIn: clerkState.isSignedIn,
    userId: clerkState.user?.id,
    authorizedUserIds: AUTHORIZED_USER_IDS,
    isAuthorized: clerkState.user?.id && AUTHORIZED_USER_IDS.includes(clerkState.user.id)
  });
  
  // Show loading state while Clerk is loading
  if (!clerkState.isLoaded) {
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
  if (!clerkState.isSignedIn || !clerkState.user) {
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
  const isAuthorized = clerkState.user && AUTHORIZED_USER_IDS.includes(clerkState.user.id);

  // Show access denied if user is not authorized
  if (!isAuthorized) {
    console.log('🔍 Protected Analytics: User not authorized');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this page.</p>
          <p className="text-sm text-gray-500 mt-2">User ID: {clerkState.user?.id}</p>
        </div>
      </div>
    );
  }
  
  console.log('🔍 Protected Analytics: User is authorized, showing dashboard');
  
  // Show analytics dashboard for authorized user
  console.log('🔍 Protected Analytics: Passing userId to dashboard:', clerkState.user.id);
  
  // Ensure we have a valid user ID before rendering the dashboard
  if (!clerkState.user.id) {
    console.error('🔍 Protected Analytics: User ID is missing!');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">User ID is missing.</p>
        </div>
      </div>
    );
  }
  
  return <AnalyticsDashboard userId={clerkState.user.id} />;
};

export default ProtectedAnalytics; 