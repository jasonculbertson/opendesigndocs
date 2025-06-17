import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { dispatchAuthEvent } from '../../utils/authEvents';

export default function HomeHeaderAuth() {
  const { user, isSignedIn, isLoaded } = useUser();

  const handleSignIn = () => {
    dispatchAuthEvent({
      view: 'sign_in',
      redirectTo: window.location.pathname,
      context: 'manual',
    });
  };

  const handleSignUp = () => {
    dispatchAuthEvent({
      view: 'sign_up',
      redirectTo: window.location.pathname,
      context: 'manual',
    });
  };

  if (!isLoaded) {
    return (
      <div className="hidden lg:flex items-center space-x-4">
        <button onClick={handleSignIn} className="text-sm text-gray-600 hover:text-gray-900">Sign In</button>
        <button onClick={handleSignUp} className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-md hover:bg-black transition-colors">Get Started</button>
      </div>
    );
  }

  if (isSignedIn && user) {
    return (
      <div className="hidden lg:flex items-center">
        <img
          src={user.imageUrl}
          alt="Profile"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid #e5e7eb',
          }}
        />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-4">
      <button onClick={handleSignIn} className="text-sm text-gray-600 hover:text-gray-900">Sign In</button>
      <button onClick={handleSignUp} className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-md hover:bg-black transition-colors">Get Started</button>
    </div>
  );
} 