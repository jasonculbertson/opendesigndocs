import React, { useState } from 'react';

export interface VideoCardProps {
  title: string;
  timestamp: string;
  duration: string;
  thumbnailUrl: string;
  href: string;
  description?: string;
  isDraft?: boolean;
  compact?: boolean;
  youtube?: boolean;
}

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:shorts\/|(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const VideoCardReact: React.FC<VideoCardProps> = ({
  title,
  timestamp,
  duration,
  thumbnailUrl,
  href,
  description = '',
  isDraft = false,
  compact = false,
  youtube = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeVideoId(href);
  const highResThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : thumbnailUrl;
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0`
    : '';

  const containerClass = youtube
    ? 'group relative bg-white cursor-pointer'
    : `group relative rounded-xl overflow-hidden bg-white border border-[#e5e7eb] hover:border-[#d1d5db] transition-colors ${compact ? 'max-w-sm' : ''}`;
  const thumbnailClass = youtube
    ? 'aspect-video relative overflow-hidden rounded-xl bg-gray-100'
    : 'aspect-video relative overflow-hidden';
  const playButtonSize = youtube || compact ? 'w-12 h-12' : 'w-16 h-16';
  const playIconSize = youtube || compact ? 'w-6 h-6' : 'w-8 h-8';
  const textContainerClass = youtube ? 'mt-3' : compact ? 'p-3' : 'p-4';
  const titleClass = youtube
    ? 'font-medium text-[15px] leading-[1.4] text-[#0f0f0f] line-clamp-2 mb-1'
    : compact
    ? 'font-medium leading-snug text-[#1a1f36] text-sm line-clamp-2'
    : 'font-medium text-[15px] leading-snug text-[#1a1f36]';
  const timestampClass = youtube
    ? 'text-[13px] text-[#606060] leading-[1.4]'
    : 'mt-1 text-[13px] text-[#3c4257]';

  return (
    <article className={containerClass} itemScope itemType="http://schema.org/VideoObject">
      <meta itemProp="uploadDate" content={timestamp} />
      <meta itemProp="duration" content={duration} />
      <meta itemProp="thumbnailUrl" content={highResThumbnail} />
      <meta itemProp="description" content={description} />
      {href && videoId && <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${videoId}`} />}
      <div className={thumbnailClass}>
        {!playing ? (
          <div className="relative cursor-pointer">
            <img
              src={highResThumbnail}
              alt={`Thumbnail for ${title}`}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105`}
              itemProp="thumbnail"
              loading="lazy"
            />
            {videoId && (
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${title}`}
              >
                <div className={`${playButtonSize} flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${playIconSize} text-black`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-[12px] font-medium" aria-label="Video duration">
              {duration}
            </div>
            {isDraft && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-[#f97316] rounded-lg text-white text-[13px] font-medium" aria-label="New content">
                New
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}
      </div>
      <div className={textContainerClass}>
        <h3 className={titleClass} itemProp="name">
          {href ? (
            <a href={href} className="hover:underline" target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className={timestampClass}>
          <time dateTime={new Date(timestamp || '').toISOString()}>{timestamp}</time>
        </p>
      </div>
    </article>
  );
};

export default VideoCardReact; 