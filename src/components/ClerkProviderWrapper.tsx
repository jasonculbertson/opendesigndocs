import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

const ClerkProviderWrapper: React.FC<ClerkProviderWrapperProps> = ({ children }) => {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  console.log('ClerkProviderWrapper loading with key:', publishableKey);

  if (!publishableKey) {
    console.error('Missing Clerk publishable key');
    return <div>Missing authentication configuration</div>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;