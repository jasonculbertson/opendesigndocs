import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

const ClerkProviderWrapper: React.FC<ClerkProviderWrapperProps> = ({ children }) => {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('Missing Clerk publishable key');
    return <div>Missing authentication configuration</div>;
  }

  // Validate key format
  if (!publishableKey.startsWith('pk_')) {
    console.error('Invalid Clerk publishable key format. Should start with pk_');
    return <div>Invalid authentication configuration</div>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;