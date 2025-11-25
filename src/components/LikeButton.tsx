import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';

export default function LikeButton() {
  const { isSignedIn, isLoaded } = useUser();
  const clerk = useClerk();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [path, setPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      setPath(currentPath);
      fetchLikes(currentPath);
    }
  }, [isSignedIn, isLoaded]); // Refetch when auth state changes to check 'hasLiked'

  const fetchLikes = async (currentPath: string) => {
    try {
      const res = await fetch(`/api/likes?path=${encodeURIComponent(currentPath)}`);
      if (res.ok) {
        const data = await res.json();
        setCount(data.count);
        setLiked(data.hasLiked);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isSignedIn) {
      clerk.openSignIn();
      return;
    }

    if (isUpdating) return;

    // Optimistic update
    const previousLiked = liked;
    const previousCount = count;
    
    setLiked(!previousLiked);
    setCount(previousLiked ? count - 1 : count + 1);
    setIsUpdating(true);

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (!res.ok) {
        // Revert on error
        setLiked(previousLiked);
        setCount(previousCount);
      } else {
        const data = await res.json();
        // Ensure server state matches (optional, but good for consistency)
        setLiked(data.liked);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setLiked(previousLiked);
      setCount(previousCount);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded) return <div className="w-8 h-8" />; // Placeholder

  return (
    <button
      onClick={handleLike}
      disabled={isUpdating}
      className={`flex items-center gap-2 group transition-all duration-300 ${
        liked ? 'text-pink-600' : 'text-gray-500 hover:text-pink-500'
      }`}
      title={liked ? 'Unlike' : 'Like'}
    >
      <div className={`p-2 rounded-full transition-colors ${
        liked ? 'bg-pink-50' : 'group-hover:bg-pink-50'
      }`}>
        <Heart className={`w-5 h-5 transition-transform ${
          liked ? 'fill-current scale-110' : 'scale-100 group-hover:scale-110'
        }`} />
      </div>
      <span className={`font-medium text-sm tabular-nums transition-colors ${
          liked ? 'text-pink-600' : 'text-gray-500 group-hover:text-pink-500'
      }`}>
        {count > 0 ? count : ''}
      </span>
    </button>
  );
}
