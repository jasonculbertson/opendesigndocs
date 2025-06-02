import React, { useEffect } from 'react';
import { ClerkProvider as ClerkReactProvider, useUser } from '@clerk/clerk-react';

interface ClerkProviderProps {
  children: React.ReactNode;
}

function DebugAuthState() {
  const { user, isSignedIn, isLoaded } = useUser();
  
  useEffect(() => {
    console.log('Clerk Auth State Change:', {
      isLoaded,
      isSignedIn,
      user: user ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl
      } : null,
      timestamp: new Date().toISOString()
    });
  }, [isLoaded, isSignedIn, user]);
  
  return null;
}

const ClerkProvider: React.FC<ClerkProviderProps> = ({ children }) => {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
  console.log('Clerk publishable key:', publishableKey);

  if (!publishableKey) {
    throw new Error('Missing Publishable Key');
  }

  return (
    <ClerkReactProvider publishableKey={publishableKey}>
      <DebugAuthState />
      {children}
    </ClerkReactProvider>
  );
};

export default ClerkProvider; 