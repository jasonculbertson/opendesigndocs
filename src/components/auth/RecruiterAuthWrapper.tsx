import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import RecruiterAuth from './RecruiterAuth';

interface RecruiterAuthWrapperProps {
  recruiterProfileUrl: string;
  publishableKey: string;
}

export default function RecruiterAuthWrapper({ 
  recruiterProfileUrl, 
  publishableKey 
}: RecruiterAuthWrapperProps) {
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
      afterSignInUrl={recruiterProfileUrl}
      afterSignUpUrl={recruiterProfileUrl}
    >
      <RecruiterAuth recruiterProfileUrl={recruiterProfileUrl} />
    </ClerkProvider>
  );
}
