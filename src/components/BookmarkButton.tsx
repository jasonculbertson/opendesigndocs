import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2, X } from 'lucide-react';

// Tooltip wrapper component
const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="relative group/tooltip">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
      <div className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
        {label}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
    </div>
  </div>
);

// First-time bookmark education tooltip
const FirstBookmarkTooltip = ({ onDismiss }: { onDismiss: () => void }) => (
  <div 
    className="fixed top-16 right-4 z-[100]"
    style={{
      animation: 'fadeInSlide 0.3s ease-out forwards',
    }}
  >
    <style>{`
      @keyframes fadeInSlide {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
    <div className="relative bg-gray-900 text-white rounded-xl shadow-2xl p-4 max-w-[280px]">
      <button 
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-3 pr-6">
        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
          <Bookmark className="w-4 h-4 text-white fill-current" />
        </div>
        <div>
          <p className="font-medium text-sm mb-1">Bookmark saved!</p>
          <p className="text-xs text-gray-300 leading-relaxed">
            Find all your bookmarks by clicking your profile avatar in the top right corner.
          </p>
        </div>
      </div>
      {/* Arrow pointing up-right toward avatar */}
      <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900" />
    </div>
  </div>
);

interface BookmarkButtonProps {
  title?: string;
}

export default function BookmarkButton({ title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [currentPath, setCurrentPath] = useState('');
  const [showFirstBookmarkTip, setShowFirstBookmarkTip] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setCurrentPath(path);
      checkBookmarkStatus(path);
    }
  }, []);

  const checkBookmarkStatus = async (path: string) => {
    try {
      const res = await fetch(`/api/bookmarks?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const { data } = await res.json();
        setIsBookmarked(data && data.length > 0);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const toggleBookmark = async () => {
    setIsLoading(true);
    try {
      if (isBookmarked) {
        // Remove
        const res = await fetch(`/api/bookmarks?path=${encodeURIComponent(currentPath)}`, {
          method: 'DELETE',
        });
        if (res.status === 401) {
          window.dispatchEvent(new CustomEvent('openAuthOverlay'));
        } else if (res.ok) {
          setIsBookmarked(false);
        }
      } else {
        // Add
        const res = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: currentPath,
            title: title || document.title,
          }),
        });
        if (res.status === 401) {
          window.dispatchEvent(new CustomEvent('openAuthOverlay'));
        } else if (res.ok) {
          setIsBookmarked(true);
          // Show first-time bookmark tip if user hasn't seen it before
          const hasSeenTip = localStorage.getItem('hasSeenBookmarkTip');
          if (!hasSeenTip) {
            setShowFirstBookmarkTip(true);
            localStorage.setItem('hasSeenBookmarkTip', 'true');
            // Auto-dismiss after 8 seconds
            setTimeout(() => setShowFirstBookmarkTip(false), 8000);
          }
        } else if (res.status === 409) {
          setIsBookmarked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissFirstBookmarkTip = () => {
    setShowFirstBookmarkTip(false);
  };

  if (isChecking) return null;

  return (
    <>
      {showFirstBookmarkTip && <FirstBookmarkTooltip onDismiss={dismissFirstBookmarkTip} />}
      <Tooltip label={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}>
        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            isBookmarked 
              ? 'text-gray-900 hover:bg-gray-100' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          )}
        </button>
      </Tooltip>
    </>
  );
}
