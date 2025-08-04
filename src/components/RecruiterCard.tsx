import React from 'react';

interface SimpleRecruiterCardProps {
  imageUrl?: string;
  title: string;
  subtitle: string;
  primaryButtonUrl: string; // Internal link to recruiter detail page
}

const RecruiterCard: React.FC<SimpleRecruiterCardProps> = ({
  imageUrl,
  title,
  subtitle,
  primaryButtonUrl,
}) => {
  // Generate initials from title for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <a
      href={primaryButtonUrl}
      className="block bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
    >
      {/* Large Image Section */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} profile`}
                          className="w-full h-full object-cover"
            onError={(e) => {
              // On error, replace with initials fallback
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                    <span class="text-white font-bold text-4xl">${getInitials(title)}</span>
                  </div>
                `;
              }
            }}
          />
        ) : (
          // Fallback avatar with initials
          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
            <span className="text-white font-bold text-4xl">
              {getInitials(title)}
            </span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="px-4 py-3 md:px-6 md:py-5">
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {subtitle}
        </p>
      </div>
    </a>
  );
};

export default RecruiterCard;
export type { SimpleRecruiterCardProps };
