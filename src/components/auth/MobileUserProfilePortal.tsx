import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MobileUserProfile from './MobileUserProfile';

export default function MobileUserProfilePortal() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find the container element in the mobile header
    const slot = document.getElementById('mobile-user-profile-slot');
    setContainer(slot);
  }, []);

  // Don't render anything if the container isn't found
  if (!container) {
    return null;
  }

  // Use React Portal to render the mobile user profile into the header slot
  return createPortal(
    <div className="lg:hidden">
      <MobileUserProfile />
    </div>,
    container
  );
} 