import React, { useEffect, useState, useRef } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Settings, LogOut } from 'lucide-react';

export default function UserProfileSidebar() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Component state tracking (debug logging removed)

  // Close dropdown on outside click
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
    return null; // Don't show loading state
  }
  
  if (!isSignedIn) {
    return null; // Don't show anything if user is not signed in
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
            maxWidth: '900px',
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
            backgroundColor: '#3b82f6',
            borderRight: '1px solid #e5e7eb',
            padding: '24px 0',
          },
          navbarButton: {
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 24px',
            margin: '2px 16px',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
            '&[data-active="true"]': {
              backgroundColor: 'rgba(255,255,255,0.2)',
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
    <div className="mt-auto border-t border-gray-200 bg-[#f9f9f9] relative" ref={containerRef}>
      <div 
        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer -ml-1 mr-2 my-2"
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.imageUrl}
          alt={user?.fullName || 'User'}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0 ring-1 ring-gray-200"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {user?.fullName || user?.firstName || 'User'}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900 truncate">
              {user?.fullName || user?.firstName || 'User'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
          </div>
          
          <div className="py-2">
            <button
              onClick={handleOpenProfile}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                signOut();
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 