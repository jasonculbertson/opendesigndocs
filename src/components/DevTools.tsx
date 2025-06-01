import React from 'react';

export default function DevTools() {
  // Only render in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  // Empty DevTools component - content gate buttons removed
  return null;
}
