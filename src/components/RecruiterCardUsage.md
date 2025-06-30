# RecruiterCard Component Usage Guide

## Overview
The `RecruiterCard` component is a premium-looking, fully responsive React component built with TypeScript and Tailwind CSS. It's designed for displaying recruiter profiles with a clean, modern aesthetic.

## Features
✅ **Responsive Design** - Works on all screen sizes  
✅ **Image Fallback** - Shows initials when image fails to load  
✅ **Accessibility** - ARIA labels and keyboard navigation  
✅ **External Link Handling** - Opens external links in new tabs  
✅ **TypeScript Support** - Full type safety  
✅ **Tailwind CSS** - Clean, consistent styling  

## Props Interface

```typescript
interface RecruiterCardProps {
  imageUrl?: string;           // Optional profile image URL
  title: string;              // Recruiter name
  subtitle: string;           // Company/role
  description: string;        // Bio/description
  tagSections: TagSection[];  // Array of tag groups
  primaryButtonText: string;  // Main CTA button text
  primaryButtonUrl: string;   // Main CTA button URL
  secondaryLinks?: SecondaryLink[]; // Optional additional links
}

interface TagSection {
  label: string;              // Section label (e.g., "Specialties")
  tags: string[];            // Array of tags
  tagColorClass: string;     // Tailwind color class
}

interface SecondaryLink {
  text: string;              // Link text
  url: string;               // Link URL
}
```

## Predefined Tag Colors
The component exports predefined color classes for consistency:

```typescript
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
```

## Usage in Astro

```astro
---
import RecruiterCard from '../components/RecruiterCard.tsx';

const recruiterData = {
  imageUrl: "https://example.com/profile.jpg",
  title: "Sarah Johnson",
  subtitle: "Senior Design Recruiter at TechFlow",
  description: "Specializing in connecting top-tier UX/UI designers...",
  tagSections: [
    {
      label: "Specialties",
      tags: ["UX Design", "Product Design"],
      tagColorClass: "bg-blue-100 text-blue-800"
    }
  ],
  primaryButtonText: "Connect on LinkedIn",
  primaryButtonUrl: "https://linkedin.com/in/sarahjohnson",
  secondaryLinks: [
    { text: "Website", url: "https://techflow.com" }
  ]
};
---

<RecruiterCard {...recruiterData} client:load />
```

## Integration with Your Recruiters Page

To integrate with your existing recruiters page, you can replace the current card HTML with the RecruiterCard component:

```astro
<!-- In your recruiters.astro file -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {recruiters.map((recruiter) => (
    <RecruiterCard
      key={recruiter.id}
      imageUrl={recruiter.imageUrl}
      title={recruiter.name}
      subtitle={recruiter.company}
      description={recruiter.bio}
      tagSections={[
        {
          label: "Specialties",
          tags: recruiter.specialties,
          tagColorClass: "bg-blue-100 text-blue-800"
        },
        {
          label: "Regions",
          tags: recruiter.regions,
          tagColorClass: "bg-green-100 text-green-800"
        }
      ]}
      primaryButtonText="Connect"
      primaryButtonUrl={recruiter.linkedinUrl}
      secondaryLinks={recruiter.additionalLinks}
      client:load
    />
  ))}
</div>
```

## Key Features

### Image Handling
- Automatic fallback to initials when image fails
- Loading state with skeleton animation
- Circular avatar styling with border and shadow

### Responsive Design
- Mobile-first approach
- Scales gracefully on all screen sizes
- Maximum width constraint to prevent excessive stretching

### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators

### Link Behavior
- External links open in new tabs
- Internal links navigate within the same tab
- Proper `rel` attributes for security

## Styling Customization
The component uses Tailwind CSS classes and can be customized by:
1. Modifying the predefined `TAG_COLORS` object
2. Adjusting the component's internal classes
3. Using Tailwind's configuration for global changes
