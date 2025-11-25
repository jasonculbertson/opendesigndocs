import React from 'react';
import ShareButtons from './ShareButtons';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';

interface SocialFeaturesProps {
  title: string;
}

export default function SocialFeatures({ title }: SocialFeaturesProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <ShareButtons title={title} />
        <div className="flex items-center gap-1 ml-4">
          <LikeButton />
          <BookmarkButton title={title} />
        </div>
      </div>
    </div>
  );
}

