import React from 'react';
import { dispatchAuthEvent } from '../../utils/authEvents';

interface AuthState {
  isSignedIn: boolean;
  user: any; // Using any since we can't import Clerk types without provider
  isLoaded: boolean;
}

interface ProfileDropdownProps {
  user: any;
  onSignOut: () => void;
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 12, flexShrink: 0}}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 12, flexShrink: 0}}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function ProfileDropdown({ user, onSignOut }: ProfileDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close menu on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleOpenProfile = () => {
    setOpen(false);
    // Open Clerk profile modal if available
    if (typeof window !== 'undefined' && (window as any).Clerk?.openUserProfile) {
      (window as any).Clerk.openUserProfile({
        appearance: {
          elements: {
            modalContent: {
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              maxWidth: '800px',
              width: '90vw',
              maxHeight: '80vh',
            },
            modalCloseButton: {
              color: '#6b7280',
              '&:hover': {
                color: '#374151',
              },
            },
            card: {
              borderRadius: '12px',
              border: 'none',
              boxShadow: 'none',
            },
            header: {
              padding: '24px 24px 0 24px',
            },
            headerTitle: {
              fontSize: '24px',
              fontWeight: '600',
              color: '#111827',
            },
            headerSubtitle: {
              fontSize: '14px',
              color: '#6b7280',
              marginTop: '4px',
            },
            main: {
              padding: '0',
            },
            navbar: {
              backgroundColor: '#f9fafb',
              borderRight: '1px solid #e5e7eb',
              padding: '24px 0',
            },
            navbarButton: {
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 24px',
              margin: '2px 16px',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#e5e7eb',
              },
              '&[data-active="true"]': {
                backgroundColor: '#e5e7eb',
                fontWeight: '600',
              },
            },
            pageScrollBox: {
              padding: '24px',
            },
            formButtonPrimary: {
              backgroundColor: '#3b82f6',
              borderRadius: '6px',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            },
            formFieldInput: {
              borderRadius: '6px',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              },
            },
          },
        },
      });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border-none bg-transparent p-0 cursor-pointer"
        aria-label="Open user menu"
      >
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
      </button>
      
      {open && (
        <div
          className="absolute top-10 right-0 min-w-60 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50"
          style={{ fontFamily: 'inherit' }}
        >
          <div className="text-sm font-medium text-gray-900 px-6 py-4 border-b border-gray-100 break-all">
            {user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress}
          </div>
          
          <button
            onClick={handleOpenProfile}
            className="flex items-center w-full text-sm text-gray-900 px-4 py-2 mx-2 my-1 rounded-lg border-none bg-transparent cursor-pointer transition-colors duration-150 hover:bg-gray-50"
          >
            <SettingsIcon /> Settings
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSignOut();
            }}
            className="flex items-center w-full text-sm text-gray-900 px-4 py-2 mx-2 my-1 rounded-lg border-none bg-transparent cursor-pointer transition-colors duration-150 hover:bg-gray-50"
          >
            <LogoutIcon /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default function HomeHeaderAuth() {
  const [authState, setAuthState] = React.useState<AuthState>({
    isSignedIn: false,
    user: null,
    isLoaded: false
  });

  const handleSignIn = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const redirectTo = currentPath === '/' ? '/docs/levels/levels-titles' : currentPath;
    
    // Start with sign_in view but Clerk will handle existing vs new users intelligently
    dispatchAuthEvent({
      view: 'sign_in',
      redirectTo,
      context: 'manual',
    });
  };

  const handleSignUp = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const redirectTo = currentPath === '/' ? '/docs/levels/levels-titles' : currentPath;
    
    // Start with sign_up view but Clerk will handle existing vs new users intelligently  
    dispatchAuthEvent({
      view: 'sign_up',
      redirectTo,
      context: 'manual',
    });
  };

  // Check auth state on mount and when it changes
  React.useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Wait for Clerk to be ready
        if (typeof window !== 'undefined') {
          // Check if Clerk is loaded
          const clerk = (window as any).Clerk;
          
          if (clerk && clerk.loaded) {
            const user = clerk.user;
            const newAuthState = {
              isSignedIn: !!user,
              user: user,
              isLoaded: true
            };
            
            // Only update if state actually changed to avoid re-renders
            setAuthState(prevState => {
              if (prevState.isSignedIn !== newAuthState.isSignedIn || 
                  prevState.user?.id !== newAuthState.user?.id ||
                  !prevState.isLoaded) {
                console.log('🔄 HomeHeaderAuth: Auth state changed', { 
                  wasSignedIn: prevState.isSignedIn, 
                  nowSignedIn: newAuthState.isSignedIn,
                  userId: newAuthState.user?.id 
                });
                return newAuthState;
              }
              return prevState;
            });
          } else if (clerk) {
            // Clerk exists but not loaded yet - wait
            console.log('⏳ HomeHeaderAuth: Waiting for Clerk to load...');
          } else {
            // Clerk not available yet
            console.log('⏳ HomeHeaderAuth: Clerk not available yet...');
          }
        }
      } catch (error) {
        console.error('❌ HomeHeaderAuth: Error checking auth state:', error);
        setAuthState({
          isSignedIn: false,
          user: null,
          isLoaded: true
        });
      }
    };

    // Initial check
    checkAuthState();
    
    // Poll for auth state changes every 500ms
    const pollInterval = setInterval(checkAuthState, 500);

    // Listen for auth state changes
    const handleAuthChange = () => {
      setTimeout(checkAuthState, 100); // Small delay to allow Clerk to update
    };

    // Listen for page visibility changes (when user comes back from email verification)
    document.addEventListener('visibilitychange', handleAuthChange);
    window.addEventListener('focus', handleAuthChange);
    
    // Listen for navigation events
    window.addEventListener('popstate', handleAuthChange);

    return () => {
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleAuthChange);
      window.removeEventListener('focus', handleAuthChange);
      window.removeEventListener('popstate', handleAuthChange);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).Clerk) {
        await (window as any).Clerk.signOut();
        setAuthState({
          isSignedIn: false,
          user: null,
          isLoaded: true
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Show loading state while checking auth
  if (!authState.isLoaded) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  // Show profile image with dropdown if signed in
  if (authState.isSignedIn && authState.user) {
    return <ProfileDropdown user={authState.user} onSignOut={handleSignOut} />;
  }

  // Show sign in/up buttons if not signed in
  return (
    <div className="flex items-center space-x-4">
      <button onClick={handleSignIn} className="text-sm text-gray-600 hover:text-gray-900">
        Sign In
      </button>
      <button onClick={handleSignUp} className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-md hover:bg-black transition-colors">
        Get Started
      </button>
    </div>
  );
} 