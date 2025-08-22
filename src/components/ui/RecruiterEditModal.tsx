import React, { useState, useEffect } from 'react';

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

interface RecruiterEditModalProps {
  recruiter: RecruiterData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterEditModal({ recruiter, isOpen, onClose }: RecruiterEditModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    email: '',
    website: '',
    linkedin: '',
    about: '',
    specialties: '',
    philosophy: '',
    approach: '',
    notableClients: ''
  });

  // Initialize form data when recruiter prop changes
  useEffect(() => {
    if (recruiter) {
      setFormData({
        name: recruiter.name || '',
        agency: recruiter.agency || '',
        email: recruiter.email || '',
        website: recruiter.website || '',
        linkedin: recruiter.linkedin || '',
        about: recruiter.about || '',
        specialties: recruiter.specialties || '',
        philosophy: recruiter.philosophy || '',
        approach: recruiter.approach || '',
        notableClients: recruiter.notableClients || ''
      });
    }
  }, [recruiter]);

  const handleClose = () => {
    setShowConfirmation(false);
    setIsSubmitting(false);
    setSubmitError('');
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    // Handle website field with automatic https:// prefix
    if (field === 'website' && value && !value.startsWith('http://') && !value.startsWith('https://')) {
      value = 'https://' + value;
    }
    
    // Handle LinkedIn field with automatic https://linkedin.com/in/ prefix
    if (field === 'linkedin' && value && !value.startsWith('http://') && !value.startsWith('https://')) {
      if (!value.includes('linkedin.com')) {
        value = 'https://linkedin.com/in/' + value;
      } else {
        value = 'https://' + value;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Prepare update data for the API (authentication handled server-side)
      const updateData = {
        id: recruiter?.id,
        name: formData.name,
        agency: formData.agency,
        email: formData.email,
        website: formData.website,
        linkedin: formData.linkedin,
        about: formData.about,
        specialties: formData.specialties,
        philosophy: formData.philosophy,
        approach: formData.approach,
        notable_clients: formData.notableClients
      };

      // Get user email from Clerk for API authentication
      let userEmail = null;
      if (typeof window !== 'undefined' && window.Clerk?.user) {
        userEmail = window.Clerk.user.primaryEmailAddress?.emailAddress;
      }

      // Call the API to update the recruiter profile
      const response = await fetch('/api/recruiters.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(userEmail && { 'x-user-email': userEmail })
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      console.log('Profile updated successfully:', result.data);
      setShowConfirmation(true);
      
      // Optionally refresh the page after a short delay to show the updated data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !recruiter) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-6">
          {!showConfirmation && (
            <h2 className="mb-0 text-xl md:text-[24px] font-semibold text-[#1a1f36] tracking-[-0.4px] pt-2">
              Edit Your Profile
            </h2>
          )}
          {showConfirmation && <div></div>} {/* Empty div to maintain flex layout */}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 transition -mt-2 -mr-4 md:-mt-2 md:-mr-2"
            aria-label="Close"
            type="button"
            style={{ lineHeight: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className={`${showConfirmation ? 'px-8 pb-8' : 'p-8'} flex-1 flex flex-col`}>
          {!showConfirmation && (
            <div className="mb-6">
              <div className="border-b border-gray-200 w-full"></div>
            </div>
          )}
          
          {showConfirmation ? (
            /* Confirmation View */
            <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="mb-4" style={{
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '1.3',
                color: '#1a1f36',
                letterSpacing: '-0.2px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>Profile Updated Successfully</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Your profile changes have been saved and are now live. Close this dialog to see your updated information.
              </p>
            </div>
          ) : (
            /* Form View */
            <>
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Agency Name</label>
                    <input 
                      type="text" 
                      value={formData.agency}
                      onChange={(e) => handleInputChange('agency', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-2">Website</label>
                    <input 
                      type="url" 
                      placeholder="https://"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">LinkedIn Profile *</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://linkedin.com/in/"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base"
                  />
                </div>

                {/* About */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">About *</label>
                  <div className="relative mb-2">
                    <textarea 
                      required
                      value={formData.about}
                      onChange={(e) => handleInputChange('about', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base resize-none"
                      rows={4}
                      placeholder="Tell us about your background, experience, and what makes you unique..."
                    ></textarea>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Specialties</label>
                  <div className="relative mb-2">
                    <textarea 
                      value={formData.specialties}
                      onChange={(e) => handleInputChange('specialties', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base resize-none"
                      rows={3}
                      placeholder="What design roles and areas do you specialize in? (Optional)"
                    ></textarea>
                  </div>
                </div>

                {/* Philosophy */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Philosophy *</label>
                  <div className="relative mb-2">
                    <textarea 
                      required
                      value={formData.philosophy}
                      onChange={(e) => handleInputChange('philosophy', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base resize-none"
                      rows={3}
                      placeholder="What's your recruiting philosophy and approach to talent matching?"
                    ></textarea>
                  </div>
                </div>

                {/* Approach */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Approach *</label>
                  <div className="relative mb-2">
                    <textarea 
                      required
                      value={formData.approach}
                      onChange={(e) => handleInputChange('approach', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base resize-none"
                      rows={3}
                      placeholder="Describe your process and methodology for finding and placing candidates..."
                    ></textarea>
                  </div>
                </div>

                {/* Notable Clients */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-2">Notable Clients</label>
                  <div className="relative mb-2">
                    <textarea 
                      value={formData.notableClients}
                      onChange={(e) => handleInputChange('notableClients', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base resize-none"
                      rows={3}
                      placeholder="Notable companies or clients you've worked with... (Optional)"
                    ></textarea>
                  </div>
                </div>
              </form>

              {/* Error message */}
              {submitError && (
                <div className="mt-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                </div>
              )}
              
              {/* Button section */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`font-semibold py-3 px-12 rounded-lg shadow-sm transition ${
                    isSubmitting 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-900'
                  }`}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
