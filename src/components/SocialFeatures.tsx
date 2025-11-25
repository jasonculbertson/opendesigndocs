import React, { useState, useEffect } from 'react';
import ShareButtons from './ShareButtons';

// Lazy load Clerk-dependent components only on client
const LikeButton = React.lazy(() => import('./LikeButton'));
const BookmarkButton = React.lazy(() => import('./BookmarkButton'));

interface SocialFeaturesProps {
  title: string;
}

export default function SocialFeatures({ title }: SocialFeaturesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <ShareButtons title={title} />
        <div className="flex items-center gap-2">
          {isClient && (
            <React.Suspense fallback={<div className="w-20 h-8" />}>
              <LikeButton />
              <BookmarkButton title={title} />
            </React.Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

