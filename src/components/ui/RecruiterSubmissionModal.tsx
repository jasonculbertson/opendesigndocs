import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function RecruiterSubmissionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    email: '',
    website: '',
    linkedin: '',
    specialties: [] as string[],
    regions: [] as string[],
    companySize: [] as string[],
    description: ''
  });

  const allSpecialties = ["UX Design", "Product Design", "Visual Design", "Brand Design", "Research", "Design Operations", "Design Systems", "Content Design", "Illustration", "Motion Design"];
  const allRegions = ["North America", "Europe", "Asia", "Australia", "South America", "Africa"];
  const allCompanySizes = ["Startup", "Mid-market", "Enterprise"];

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
      // Check for confirmation test parameter
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('confirm') === 'true') {
        setShowConfirmation(true);
      }
    };

    document.addEventListener('openRecruiterModal', handleOpenModal);
    
    return () => {
      document.removeEventListener('openRecruiterModal', handleOpenModal);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowConfirmation(false);
    setIsSubmitting(false);
    setSubmitError('');
    // Reset form
    setFormData({
      name: '',
      agency: '',
      email: '',
      website: '',
      linkedin: '',
      specialties: [],
      regions: [],
      companySize: [],
      description: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    // Handle website field with automatic https:// prefix
    if (field === 'website' && value && !value.startsWith('http://') && !value.startsWith('https://')) {
      value = 'https://' + value;
    }
    
    // Handle LinkedIn field with automatic https://linkedin.com/in/ prefix
    if (field === 'linkedin' && value && !value.startsWith('http://') && !value.startsWith('https://')) {
      value = 'https://linkedin.com/in/' + value;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Format the email data
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        agency: formData.agency,
        website: formData.website,
        linkedin: formData.linkedin,
        specialties: formData.specialties.join(', '),
        regions: formData.regions.join(', '),
        company_size: formData.companySize.join(', '),
        description: formData.description,
        submit_date: new Date().toLocaleString()
      };

      // Send email via EmailJS
      await emailjs.send(
        'service_eh90d7s',  // Your EmailJS service ID
        'template_7x78hqr', // Your EmailJS template ID
        emailData,
        'CNMjB2Shpf0Cd5Zn1'   // Your EmailJS public key
      );

      console.log('Email sent successfully');
      setShowConfirmation(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitError('Failed to send application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        {/* Header with conditional title */}
        <div className="flex items-start justify-between px-8 pt-6">
          {!showConfirmation && (
            <h2 className="mb-0 text-xl md:text-[24px] font-semibold text-[#1a1f36] tracking-[-0.4px] pt-2">
              Apply to be listed in the directory
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
              }}>Thank you for applying</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Thank you for applying to be listed in our directory. We'll review your submission and get back to you.
              </p>
            </div>
          ) : (
            /* Form View */
            <>
          <form onSubmit={handleSubmit} className="space-y-7">
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
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Specialties *</label>
              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSpecialties.map(specialty => (
                  <label key={specialty} className="flex items-center gap-3 text-base font-normal text-gray-800">
                    <input 
                      type="checkbox" 
                      checked={formData.specialties.includes(specialty)}
                      onChange={(e) => handleCheckboxChange('specialties', specialty, e.target.checked)}
                      className="w-5 h-5 border-1 border-gray-300 rounded-full focus:ring-2 focus:ring-gray-300 accent-black"
                    />
                    {specialty}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Regions You Work In *</label>
              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allRegions.map(region => (
                  <label key={region} className="flex items-center gap-3 text-base font-normal text-gray-800">
                    <input 
                      type="checkbox" 
                      checked={formData.regions.includes(region)}
                      onChange={(e) => handleCheckboxChange('regions', region, e.target.checked)}
                      className="w-5 h-5 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-gray-300 accent-black"
                    />
                    {region}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Company Size Focus *</label>
              <div className="flex flex-col gap-4">
                {allCompanySizes.map(size => (
                  <label key={size} className="flex items-center gap-3 text-base font-normal text-gray-800">
                    <input 
                      type="checkbox" 
                      checked={formData.companySize.includes(size)}
                      onChange={(e) => handleCheckboxChange('companySize', size, e.target.checked)}
                      className="w-5 h-5 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-gray-300 accent-black"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Description</label>
              <div className="relative mb-2">
                <textarea 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base resize-none"
                  rows={3}
                  placeholder="Tell us about your experience, process, and what makes you unique..."
                ></textarea>
              </div>
            </div>
          </form>
          {/* Helper text section */}
          <div className="mt-3 pt-can rounded-lg">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Important things to know</h3>
            <p className="text-sm text-gray-600 mb-2">Recruiters must specialize in design roles and provide accurate, up-to-date information. All submissions are reviewed before being listed.</p>
          </div>
          
          {/* Error message */}
          {submitError && (
            <div className="px-8 py-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            </div>
          )}
          
          {/* Button section */}
          <div className="pr-8 pb-4 pt-6">
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
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
} 