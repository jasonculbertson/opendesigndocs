import React, { useState, useEffect } from 'react';

export default function RecruiterSubmissionModal() {
  const [isOpen, setIsOpen] = useState(false);
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
    };

    document.addEventListener('openRecruiterModal', handleOpenModal);
    
    return () => {
      document.removeEventListener('openRecruiterModal', handleOpenModal);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log('Form submitted:', formData);
    // For now, just close the modal
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        {/* Close X Button */}
        <div className="flex items-center justify-between px-8 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-0">Apply to be listed in the directory</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 transition"
            aria-label="Close"
            type="button"
            style={{ lineHeight: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Content Area */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="pt-4 mb-8">
            <div className="border-b border-gray-200 w-full"></div>
          </div>
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
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Specialties *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-3 gap-4">
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
        </div>
        {/* Button section */}
        <div className="px-8 pb-12 pt-1 flex justify-start">
          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-12 rounded-lg shadow-sm hover:bg-gray-900 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
} 