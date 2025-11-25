import React, { useState } from 'react';
import { Link as LinkIcon, Check, Linkedin } from 'lucide-react';

// Custom X (formerly Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Tooltip wrapper component
const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <div className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
        {label}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
    </div>
  </div>
);

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
      <Tooltip label={copied ? "Copied!" : "Copy link"}>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
        </button>
      </Tooltip>
      
      <Tooltip label="Share on X">
        <button
          onClick={shareTwitter}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </Tooltip>

      <Tooltip label="Share on LinkedIn">
        <button
          onClick={shareLinkedin}
          className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </button>
      </Tooltip>
    </div>
  );
}
