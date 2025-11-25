import React from 'react';
import DownloadButton from './DownloadButton';
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
        <div className="flex items-center gap-1">
          <DownloadButton title={title} />
          <ShareButtons title={title} />
        </div>
        <div className="flex items-center gap-1">
          <LikeButton />
          <BookmarkButton title={title} />
        </div>
      </div>
    </div>
  );
}

