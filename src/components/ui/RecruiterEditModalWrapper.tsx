import React, { useState, useEffect } from 'react';
import RecruiterEditModal from './RecruiterEditModal.tsx';

interface RecruiterData {
  id: number;
  name: string;
  agency: string;
  image?: string;
  linkedin: string;
  website: string;
  email: string;
  loginEmail: string;
  about: string;
  specialties?: string;
  philosophy: string;
  approach: string;
  notableClients?: string;
}

export default function RecruiterEditModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [recruiter, setRecruiter] = useState<RecruiterData | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      console.log('Custom event received:', event.detail);
      const recruiterData = event.detail?.recruiter;
      if (recruiterData) {
        setRecruiter(recruiterData);
        setIsOpen(true);
      }
    };

    // Listen for the custom event
    document.addEventListener('openRecruiterEditModal', handleOpenModal as EventListener);

    // Cleanup
    return () => {
      document.removeEventListener('openRecruiterEditModal', handleOpenModal as EventListener);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setRecruiter(null);
  };

  return (
    <RecruiterEditModal 
      recruiter={recruiter}
      isOpen={isOpen}
      onClose={handleClose}
    />
  );
}
