import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Settings, LogOut, X } from 'lucide-react';

export default function MobileUserProfile() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Don't render anything if not loaded or not signed in
  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  const handleOpenProfile = () => {
    setIsSheetOpen(false);
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

  const handleSignOut = () => {
    setIsSheetOpen(false);
    signOut();
  };

  return (
    <>
      {/* Profile Button */}
      <button
        onClick={() => setIsSheetOpen(true)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Open user menu"
      >
        <img
          src={user.imageUrl}
          alt={user.fullName || 'User'}
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
      </button>

      {/* Bottom Sheet Overlay */}
      {isSheetOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[200] lg:hidden"
          onClick={() => setIsSheetOpen(false)}
        >
          {/* Bottom Sheet */}
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-[201] animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.fullName || user.firstName || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-6 py-4 space-y-2">
              <button
                onClick={handleOpenProfile}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Log out</span>
              </button>
            </div>

            {/* Safe area for iOS */}
            <div className="pb-safe-area-inset-bottom h-6"></div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
} 