import React from 'react';
import RecruiterCard from './RecruiterCard.tsx';

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

export default function RecruiterGridSimple({ recruiters, hasAccess, createSlug }: RecruiterGridProps) {
  return (
    <div id="recruiters-grid" className="grid grid-cols-2 lg:!grid-cols-4 gap-8 mb-12">
      {recruiters.map(recruiter => (
        <div key={recruiter.id} className="recruiter-card w-full" data-recruiter-id={recruiter.id}>
          <RecruiterCard
            imageUrl={recruiter.image}
            title={recruiter.name}
            subtitle={recruiter.agency}
            primaryButtonUrl={hasAccess ? `/docs/recruiters/${createSlug(recruiter.name)}?access=recruit2024` : `/docs/recruiters/${createSlug(recruiter.name)}`}
            recruiterEmail={recruiter.loginEmail}
            userEmail={null} // No edit buttons on cards
            onEdit={undefined} // No edit functionality on cards
          />
        </div>
      ))}
    </div>
  );
}
