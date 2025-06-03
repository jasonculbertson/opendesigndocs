import React, { useState, useEffect } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

const ClerkProviderWrapper: React.FC<ClerkProviderWrapperProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or before hydration, just render children
  if (!isClient) {
    return <>{children}</>;
  }

  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Debug logging only on client
  console.log('🔑 Clerk Debug Info:', {
    hasKey: !!publishableKey,
    keyPrefix: publishableKey?.substring(0, 15) + '...',
    domain: window.location.hostname,
    isProd: publishableKey?.includes('live'),
    isDev: publishableKey?.includes('test')
  });

  if (!publishableKey) {
    console.error('Missing Clerk publishable key');
    return <>{children}</>;
  }

  // Validate key format
  if (!publishableKey.startsWith('pk_')) {
    console.error('Invalid Clerk publishable key format. Should start with pk_');
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;