import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';

interface BookmarkButtonProps {
  title?: string;
}

export default function BookmarkButton({ title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [currentPath, setCurrentPath] = useState('');

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

  if (isChecking) return null;

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
