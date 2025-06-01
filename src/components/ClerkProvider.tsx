import React from 'react';
import { ClerkProvider as ClerkReactProvider } from '@clerk/clerk-react';

interface ClerkProviderProps {
  children: React.ReactNode;
}

const ClerkProvider: React.FC<ClerkProviderProps> = ({ children }) => {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
  console.log('Clerk publishable key:', publishableKey);

  if (!publishableKey) {
    throw new Error('Missing Publishable Key');
  }

  return (
    <ClerkReactProvider publishableKey={publishableKey}>
      {children}
    </ClerkReactProvider>
  );
};

export default ClerkProvider; 