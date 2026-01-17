import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function LegalModal({ isOpen, onClose, title, children }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto">
          <div className="prose prose-slate max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// About Content
export function AboutContent() {
  return (
    <>
      <p className="text-lg text-gray-600 mb-6">
        Free, practical resources to help designers grow their careers and managers build exceptional teams.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">The Mission</h3>
      <p>
        Open Design Docs exists to bring clarity to design careers. Too many designers struggle with questions like "What do I need to do to get promoted?" or "How do I evaluate my team fairly?" Meanwhile, managers often create frameworks from scratch, reinventing the wheel at every company.
      </p>
      <p className="mt-3">
        This site provides battle-tested frameworks that you can use immediately, whether you're a designer planning your next career move or a manager building a world-class team.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">About the Creator</h3>
      <p>
        I'm <strong>Jason Culbertson</strong>, VP of Design at <strong>Consensys</strong> where I lead design for <strong>MetaMask</strong>, the world's leading crypto wallet with 30M+ users. Previously, I was VP of Design at <strong>Linktree</strong>, and I've spent my career building and scaling design teams across multiple industries.
      </p>
      <p className="mt-3">
        I've also served as an advisor to companies like <strong>OpenSea</strong> and <strong>Great Question</strong>, helping them elevate their design practices and build strong teams.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why It's Free</h3>
      <p>
        Great career resources shouldn't be locked behind a paywall. Every designer deserves to know what's expected at their level. Every manager deserves tools that help them lead fairly and develop their teams effectively.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Get in Touch</h3>
      <p>
        Have questions or feedback? Find me on <a href="https://linkedin.com/in/jasonculbertson" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">LinkedIn</a>.
      </p>
    </>
  );
}

// Privacy Content
export function PrivacyContent() {
  return (
    <>
      <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Introduction</h3>
      <p>Welcome to Open Design Docs. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
      
      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. Data We Collect</h3>
      <p>We may collect, use, store and transfer different kinds of personal data:</p>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li><strong>Identity Data</strong>: first name, last name, username</li>
        <li><strong>Contact Data</strong>: email address</li>
        <li><strong>Technical Data</strong>: IP address, browser type, time zone, operating system</li>
        <li><strong>Usage Data</strong>: information about how you use our website</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. How We Use Your Data</h3>
      <p>We use your personal data to provide and improve our services, and to comply with legal obligations.</p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Data Security</h3>
      <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.</p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5. Contact Us</h3>
      <p>If you have any questions about this privacy policy, please contact us via LinkedIn.</p>
    </>
  );
}

// Terms Content
export function TermsContent() {
  return (
    <>
      <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Agreement to Terms</h3>
      <p>By accessing our website at Open Design Docs, you agree to be bound by these terms of service and all applicable laws and regulations.</p>
      
      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. Use License</h3>
      <p>Permission is granted to download materials on Open Design Docs for personal, non-commercial use. Under this license you may not:</p>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Modify or copy the materials</li>
        <li>Use the materials for commercial purposes</li>
        <li>Remove any copyright or proprietary notations</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Disclaimer</h3>
      <p>The materials on Open Design Docs are provided on an 'as is' basis. Open Design Docs makes no warranties, expressed or implied.</p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Limitations</h3>
      <p>Open Design Docs shall not be liable for any damages arising out of the use or inability to use the materials on this website.</p>

      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5. Governing Law</h3>
      <p>These terms and conditions are governed by applicable laws and you submit to the exclusive jurisdiction of the courts in that location.</p>
    </>
  );
}

// Main export for homepage use
type ModalType = 'about' | 'privacy' | 'terms' | null;

export function HomepageModals() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    const handleOpenModal = (e: CustomEvent<{ modal: ModalType }>) => {
      setActiveModal(e.detail.modal);
    };

    window.addEventListener('openLegalModal' as any, handleOpenModal);
    return () => window.removeEventListener('openLegalModal' as any, handleOpenModal);
  }, []);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <LegalModal isOpen={activeModal === 'about'} onClose={closeModal} title="About Open Design Docs">
        <AboutContent />
      </LegalModal>
      
      <LegalModal isOpen={activeModal === 'privacy'} onClose={closeModal} title="Privacy Policy">
        <PrivacyContent />
      </LegalModal>
      
      <LegalModal isOpen={activeModal === 'terms'} onClose={closeModal} title="Terms of Service">
        <TermsContent />
      </LegalModal>
    </>
  );
}

export default HomepageModals;
