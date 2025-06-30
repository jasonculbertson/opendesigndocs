import React, { useState } from 'react';

// TypeScript interfaces for props
interface TagSection {
  label: string;
  tags: string[];
  tagColorClass: string;
}

interface SecondaryLink {
  text: string;
  url: string;
}

interface RecruiterCardProps {
  imageUrl?: string;
  title: string;
  subtitle: string;
  description: string;
  tagSections: TagSection[];
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryLinks?: SecondaryLink[];
}

// Predefined color classes for consistent styling
const TAG_COLORS = {
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  green: 'bg-green-100 text-green-800',
  pink: 'bg-pink-100 text-pink-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  gray: 'bg-gray-100 text-gray-800',
  red: 'bg-red-100 text-red-800',
};

const RecruiterCard: React.FC<RecruiterCardProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  tagSections,
  primaryButtonText,
  primaryButtonUrl,
  secondaryLinks = [],
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Check if URL is external
  const isExternalUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:');
  };

  // Generate initials from title for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-sm w-full">
      {/* Image Section */}
      <div className="bg-gray-50 p-6 flex justify-center items-center min-h-[120px]">
        {!imageError && imageUrl ? (
          <div className="relative">
            {imageLoading && (
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={`${title} profile`}
              className={`w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm ${
                imageLoading ? 'opacity-0 absolute' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        ) : (
          // Fallback avatar with initials
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-white font-bold text-lg">
              {getInitials(title)}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6">
        {/* Title and Subtitle */}
        <div className="mb-4">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-gray-700 leading-relaxed mb-6">
          {description}
        </p>

        {/* Tag Sections */}
        <div className="space-y-4 mb-6">
          {tagSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                {section.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${section.tagColorClass}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Primary Button */}
        <div className="mb-4">
          <a
            href={primaryButtonUrl}
            target={isExternalUrl(primaryButtonUrl) ? '_blank' : '_self'}
            rel={isExternalUrl(primaryButtonUrl) ? 'noopener noreferrer' : undefined}
            className="block w-full bg-black text-white text-lg font-semibold py-4 px-6 rounded-xl text-center hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label={`${primaryButtonText} - ${title}`}
          >
            {primaryButtonText}
          </a>
        </div>

        {/* Secondary Links */}
        {secondaryLinks.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {secondaryLinks.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                target={isExternalUrl(link.url) ? '_blank' : '_self'}
                rel={isExternalUrl(link.url) ? 'noopener noreferrer' : undefined}
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded px-1"
                aria-label={`${link.text} for ${title}`}
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterCard;
export { TAG_COLORS };
export type { RecruiterCardProps, TagSection, SecondaryLink };
