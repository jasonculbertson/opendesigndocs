/**
 * Shared video utilities for YouTube integration
 */

export interface VideoData {
  title: string;
  thumbnailUrl: string;
  href: string;
  duration: string;
  timestamp?: string;
  description?: string;
  views?: string;
}

export interface ShortData {
  title: string;
  thumbnailUrl: string;
  href: string;
  duration: string;
  views?: string;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle both regular YouTube URLs and Shorts URLs
  const regex = /(?:youtube\.com\/(?:shorts\/|(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Generate YouTube embed URL with consistent parameters
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    showinfo: '0',
    iv_load_policy: '3',
    cc_load_policy: '0',
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Create YouTube iframe element with consistent settings
 */
export function createYouTubeIframe(videoId: string, title: string, autoplay = true): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.src = getYouTubeEmbedUrl(videoId, autoplay);
  iframe.title = title;
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'width: 100%; height: 100%; border: none; display: block;';
  
  return iframe;
}

/**
 * Load YouTube video player for a specific element
 */
export function loadYouTubeVideo(videoId: string, containerId: string, title: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Could not find container with ID: ${containerId}`);
    return;
  }

  // Check if already loaded
  if (container.querySelector('iframe')) {
    console.log('Video already loaded');
    return;
  }

  // Clear container and add iframe
  container.innerHTML = '';
  const iframe = createYouTubeIframe(videoId, title);
  container.appendChild(iframe);
}

/**
 * Common styling classes for video components
 */
export const videoStyles = {
  // Aspect ratios
  aspectVideo: 'aspect-video',
  aspectShorts: 'aspect-[9/16]',
  
  // Play button sizes
  playButton: {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
  },
  
  playIcon: {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
  },
  
  // Common transitions
  hover: 'transition-transform duration-300 group-hover:scale-105',
  
  // Duration badge
  duration: 'absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-[12px] font-medium',
} 