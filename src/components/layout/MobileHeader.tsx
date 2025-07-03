import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import MobileUserProfile from '../auth/MobileUserProfile';

export default function MobileHeader() {
  // Use try-catch to handle cases where Clerk context isn't available yet
  let isSignedIn = false;
  let isLoaded = false;
  
  try {
    const user = useUser();
    isSignedIn = user.isSignedIn || false;
    isLoaded = user.isLoaded || false;
  } catch (error) {
    // Clerk context not available yet, use defaults
    isSignedIn = false;
    isLoaded = false;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    // Initialize state based on actual DOM state if available
    if (typeof window !== 'undefined') {
      const sidebar = document.getElementById('sidebar');
      const initialState = sidebar ? !sidebar.classList.contains('-translate-x-full') : false;
      return initialState;
    }
    return false;
  });
  const isInitialMount = useRef(true);

  const closeMenu = () => {
    setIsMenuOpen(false);
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar && overlay) {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden', 'opacity-0');
      overlay.classList.remove('opacity-50');
      document.body.style.overflow = '';
    }
  };

  // Expose closeMenu function globally so sidebar can access it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).closeMobileMenu = closeMenu;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).closeMobileMenu;
      }
    };
  }, []);

  const toggleMenu = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (!sidebar || !overlay) return;
    
    const newIsOpen = !isMenuOpen;
    setIsMenuOpen(newIsOpen);
    
    if (newIsOpen) {
      // Open menu
      sidebar.classList.remove('-translate-x-full');
      overlay.classList.remove('hidden', 'opacity-0');
      overlay.classList.add('opacity-50');
      document.body.style.overflow = 'hidden';
    } else {
      // Close menu
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden', 'opacity-0');
      overlay.classList.remove('opacity-50');
      document.body.style.overflow = '';
    }
  };

  // Sync component state with actual DOM state when Clerk loads
  useEffect(() => {
    if (!isInitialMount.current) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        // Preserve the current DOM state when Clerk loads
        const isDOMOpen = !sidebar.classList.contains('-translate-x-full');
        if (isDOMOpen !== isMenuOpen) {
          // Don't change the DOM, just sync our state
          setIsMenuOpen(isDOMOpen);
        }
      }
    }
    isInitialMount.current = false;
  }, [isLoaded]);

  // Handle overlay clicks to close menu
  useEffect(() => {
    const handleOverlayClick = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };

    const overlay = document.getElementById('mobile-overlay');
    if (overlay) {
      overlay.addEventListener('click', handleOverlayClick);
      return () => overlay.removeEventListener('click', handleOverlayClick);
    }
  }, [isMenuOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
        const overlay = document.getElementById('mobile-overlay');
        if (overlay) {
          overlay.classList.add('hidden', 'opacity-0');
          overlay.classList.remove('opacity-50');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[70] flex items-center px-4">
      <a href="https://www.opendesigndocs.com/docs/levels/levels-titles" className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        <span className="text-[15px] font-medium text-gray-900 leading-none">Open Design Docs</span>
      </a>

      <div className="ml-auto flex items-center gap-3">
        {/* Mobile User Profile - only show when Clerk is loaded and user is signed in */}
        {isLoaded && isSignedIn && (
          <MobileUserProfile />
        )}
        
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            {/* Close icon (X) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
              }`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            {/* Menu icon (hamburger) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
              }`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
} 