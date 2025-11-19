import React, { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { UserProfileLoading } from '../ui/LoadingStates';

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

const UserProfileButton = React.memo(function UserProfileButton() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Log auth state for debugging
  useEffect(() => {
    console.log('🔐 UserProfileButton state:', { isLoaded, isSignedIn, hasUser: !!user, forceUpdate });
  }, [isLoaded, isSignedIn, user, forceUpdate]);

  // Aggressive polling for OAuth callback - check for session every 500ms for first 5 seconds
  useEffect(() => {
    if (!isSignedIn && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const hasOAuthCallback = urlParams.has('created_session_id') || urlParams.has('code');
      
      if (hasOAuthCallback) {
        console.log('🔍 UserProfileButton: OAuth callback detected, polling for session...');
        let attempts = 0;
        const maxAttempts = 10; // 5 seconds total
        
        const pollInterval = setInterval(() => {
          attempts++;
          console.log(`🔄 UserProfileButton: Polling attempt ${attempts}/${maxAttempts}`);
          setForceUpdate(prev => prev + 1); // Force re-render to check auth state again
          
          if (attempts >= maxAttempts) {
            console.log('⏱️ UserProfileButton: Stopped polling after max attempts');
            clearInterval(pollInterval);
          }
        }, 500);
        
        return () => clearInterval(pollInterval);
      }
    }
  }, [isSignedIn]);

  // Close menu on outside click
  useEffect(() => {
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

  if (!isLoaded) {
    return (
      <div style={{
        position: 'absolute',
        top: 16,
        right: 24,
        zIndex: 100,
      }}>
        <UserProfileLoading />
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return null;
  }

  const handleOpenProfile = () => {
    setOpen(false);
    openUserProfile({
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
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 16,
        right: 24,
        zIndex: 100,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Open user menu"
      >
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
      </button>
      
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            minWidth: 240,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '0',
            marginTop: 8,
            fontFamily: 'inherit',
          }}
        >
          <div style={{
            fontSize: 15,
            fontWeight: 500,
            color: '#222',
            padding: '18px 24px 12px 24px',
            borderBottom: '1px solid #f3f4f6',
            wordBreak: 'break-all',
          }}>
            {user.primaryEmailAddress?.emailAddress}
          </div>
          
          <button
            onClick={handleOpenProfile}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'calc(100% - 16px)',
              fontSize: 15,
              color: '#222',
              padding: '10px 16px',
              margin: '4px 8px',
              borderRadius: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <SettingsIcon /> Settings
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              signOut();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'calc(100% - 16px)',
              fontSize: 15,
              color: '#222',
              padding: '10px 16px',
              margin: '4px 8px',
              borderRadius: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <LogoutIcon /> Log out
          </button>
        </div>
      )}
    </div>
  );
});

export default UserProfileButton;