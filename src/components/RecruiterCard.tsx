import React from 'react';

interface SimpleRecruiterCardProps {
  imageUrl?: string;
  title: string;
  subtitle: string;
  primaryButtonUrl: string; // Internal link to recruiter detail page
  recruiterEmail?: string;
  userEmail?: string;
  onEdit?: () => void;
}

const RecruiterCard: React.FC<SimpleRecruiterCardProps> = ({
  imageUrl,
  title,
  subtitle,
  primaryButtonUrl,
  recruiterEmail,
  userEmail,
  onEdit,
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

  // Check if current user can edit this recruiter
  const canEdit = userEmail && recruiterEmail && userEmail.toLowerCase() === recruiterEmail.toLowerCase();

  return (
    <div className="relative">
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
      
      {/* Edit Button - Only visible to the recruiter */}
      {canEdit && onEdit && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
          className="absolute top-3 right-3 bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50 z-10"
          title="Edit your profile"
          aria-label="Edit profile"
        >
          <svg 
            className="w-4 h-4 text-gray-600 hover:text-gray-800" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RecruiterCard;
export type { SimpleRecruiterCardProps };
