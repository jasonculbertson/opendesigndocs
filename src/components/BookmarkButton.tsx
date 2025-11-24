import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Bookmark, Loader2 } from 'lucide-react';

interface BookmarkButtonProps {
  title?: string;
}

export default function BookmarkButton({ title }: BookmarkButtonProps) {
  const { isSignedIn, isLoaded } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn && currentPath) {
      checkBookmarkStatus();
    }
  }, [isLoaded, isSignedIn, currentPath]);

  const checkBookmarkStatus = async () => {
    try {
      const res = await fetch(`/api/bookmarks?path=${encodeURIComponent(currentPath)}`);
      if (res.ok) {
        const { data } = await res.json();
        setIsBookmarked(data && data.length > 0);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!isSignedIn) {
      // You might want to trigger a sign-in modal here
      // For now we'll just alert.
      alert('Please sign in to bookmark pages.');
      return;
    }

    setIsLoading(true);
    try {
      if (isBookmarked) {
        // Remove
        const res = await fetch(`/api/bookmarks?path=${encodeURIComponent(currentPath)}`, {
          method: 'DELETE',
        });
        if (res.ok) {
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
        if (res.ok) {
          setIsBookmarked(true);
        } else if (res.status === 409) {
          setIsBookmarked(true); // Treat as success if already bookmarked
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If not loaded yet, show nothing or a placeholder.
  // If not signed in, we can either hide the button or show it in a state that prompts login.
  // Let's show it but it will alert on click if not signed in.
  if (!isLoaded) return null;

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={`p-2 rounded-full transition-colors flex items-center justify-center ${
        isBookmarked 
          ? 'text-yellow-500 hover:bg-yellow-50' 
          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
      )}
    </button>
  );
}
