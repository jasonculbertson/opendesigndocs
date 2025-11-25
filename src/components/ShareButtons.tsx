import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: currentUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        title="Copy link"
      >
        {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
      </button>
      
      <button
        onClick={shareTwitter}
        className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-400 transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </button>

      <button
        onClick={shareLinkedin}
        className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </button>
      
      {typeof navigator !== 'undefined' && navigator.share && (
         <button
            onClick={shareNative}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors lg:hidden"
            title="Share"
        >
            <Share2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
