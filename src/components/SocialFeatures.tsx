import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import ShareButtons from './ShareButtons';

const clerkPubKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

interface SocialFeaturesProps {
  title: string;
}

export default function SocialFeatures({ title }: SocialFeaturesProps) {
  if (!clerkPubKey) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <ShareButtons title={title} />
          <div className="flex items-center gap-2">
            <LikeButton />
            <BookmarkButton title={title} />
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}

