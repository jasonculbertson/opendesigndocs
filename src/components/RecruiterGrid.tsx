import React, { useState, useEffect } from 'react';
import RecruiterCard from './RecruiterCard.tsx';
import RecruiterEditModal from './ui/RecruiterEditModal.tsx';

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

interface RecruiterGridProps {
  recruiters: RecruiterData[];
  hasAccess: boolean;
  createSlug: (name: string) => string;
}

export default function RecruiterGrid({ recruiters, hasAccess, createSlug }: RecruiterGridProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterData | null>(null);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Monitor Clerk state for user email
  useEffect(() => {
    if (!isClient || !hasAccess) return;

    const checkUserEmail = () => {
      if (typeof window !== 'undefined' && (window as any).Clerk?.user) {
        const clerk = (window as any).Clerk;
        const user = clerk.user;
        
        if (user && user.emailAddresses && user.emailAddresses.length > 0) {
          const email = user.emailAddresses[0].emailAddress;
          setUserEmail(email);
          console.log('🔍 Recruiter Grid: User email detected:', email);
        }
      }
    };

    // Initial check
    checkUserEmail();

    // Set up polling to check for auth changes
    const interval = setInterval(checkUserEmail, 1000);

    return () => clearInterval(interval);
  }, [isClient, hasAccess]);

  // Handle edit modal
  useEffect(() => {
    const handleOpenEditModal = (event: CustomEvent) => {
      const recruiter = event.detail?.recruiter;
      if (recruiter) {
        setSelectedRecruiter(recruiter);
        setEditModalOpen(true);
      }
    };

    document.addEventListener('openRecruiterEditModal', handleOpenEditModal as EventListener);
    
    return () => {
      document.removeEventListener('openRecruiterEditModal', handleOpenEditModal as EventListener);
    };
  }, []);

  const handleEditClick = (recruiter: RecruiterData) => {
    setSelectedRecruiter(recruiter);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRecruiter(null);
  };

  return (
    <>
      <div id="recruiters-grid" className="grid grid-cols-2 lg:!grid-cols-4 gap-8 mb-12">
        {recruiters.map(recruiter => (
          <div key={recruiter.id} className="recruiter-card w-full" data-recruiter-id={recruiter.id}>
            <RecruiterCard
              imageUrl={recruiter.image}
              title={recruiter.name}
              subtitle={recruiter.agency}
              primaryButtonUrl={hasAccess ? `/docs/recruiters/${createSlug(recruiter.name)}?access=recruit2024` : `/docs/recruiters/${createSlug(recruiter.name)}`}
              recruiterEmail={recruiter.loginEmail}
              userEmail={userEmail}
              onEdit={() => handleEditClick(recruiter)}
            />
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {hasAccess && (
        <RecruiterEditModal
          recruiter={selectedRecruiter}
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}
