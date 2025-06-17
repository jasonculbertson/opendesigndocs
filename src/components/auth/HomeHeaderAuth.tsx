import React from 'react';
import { dispatchAuthEvent } from '../../utils/authEvents';

export default function HomeHeaderAuth() {
  const [clerkState, setClerkState] = React.useState({
    user: null,
    isSignedIn: false,
    isLoaded: false,
    hasClerk: false
  });

  React.useEffect(() => {
    // Try to load Clerk hooks after component mounts
    const loadClerkState = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { useUser } = await import('@clerk/clerk-react');
        
        // This would normally be called in the component, but we can't do that conditionally
        // So we'll just mark that Clerk is available and use static buttons
        setClerkState({
          user: null,
          isSignedIn: false,
          isLoaded: true,
          hasClerk: true
        });
      } catch (error) {
        setClerkState({
          user: null,
          isSignedIn: false,
          isLoaded: true,
          hasClerk: false
        });
      }
    };

    loadClerkState();
  }, []);

  const handleSignIn = () => {
    dispatchAuthEvent({
      view: 'sign_in',
      redirectTo: typeof window !== 'undefined' ? window.location.pathname : '/',
      context: 'manual',
    });
  };

  const handleSignUp = () => {
    dispatchAuthEvent({
      view: 'sign_up',
      redirectTo: typeof window !== 'undefined' ? window.location.pathname : '/',
      context: 'manual',
    });
  };

  // Always show the static buttons for now
  // The React component will handle dynamic user states when properly wrapped
  return (
    <div className="hidden lg:flex items-center space-x-4">
      <button onClick={handleSignIn} className="text-sm text-gray-600 hover:text-gray-900">Sign In</button>
      <button onClick={handleSignUp} className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-md hover:bg-black transition-colors">Get Started</button>
    </div>
  );
} 