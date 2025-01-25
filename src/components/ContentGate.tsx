import React, { useState, useEffect, useCallback } from 'react';
import EmailOverlay from './EmailOverlay';

interface ContentGateProps {
  children: React.ReactNode;
}

export default function ContentGate({ children }: ContentGateProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Check for existing subscription
    const subscribed = localStorage.getItem('emailSubscribed') === 'true';
    setIsSubscribed(subscribed);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsHiding(true);
    // Wait for success animation before hiding
    setTimeout(() => {
      localStorage.setItem('emailSubscribed', 'true');
      setIsSubscribed(true);
      setIsHiding(false); // Reset hiding state
    }, 1500);
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem('emailSubscribed');
    setIsSubscribed(false);
    setIsHiding(false);
  }, []);

  if (isSubscribed) {
    return (
      <>
        {children}
        {/* Dev reset button - only shows in development */}
        {import.meta.env.DEV && (
          <button
            onClick={handleReset}
            className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm shadow-lg hover:bg-gray-800 transition-colors duration-200 z-50 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Overlay</span>
          </button>
        )}
      </>
    );
  }

  return (
    <div className="relative">
      <div 
        className="relative transition-opacity duration-500" 
        style={{
          maxHeight: '1000px',
          overflow: 'hidden',
          mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)',
          WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 900px, rgba(0,0,0,0) 1000px)'
        }}
      >
        {children}
      </div>

      {!isSubscribed && (
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
            isHiding ? 'opacity-0 transform translate-y-full' : 'opacity-100'
          }`}
          style={{
            width: '100%',
            zIndex: 50,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100px, rgba(255,255,255,1) 100%)',
            paddingTop: '100px'
          }}
        >
          <div className="bg-white">
            <div className="max-w-[680px] mx-auto pt-4 px-4 pb-8">
              <EmailOverlay onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      )}

      {/* Dev reset button - only shows in development */}
      {import.meta.env.DEV && (
        <button
          onClick={handleReset}
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm shadow-lg hover:bg-gray-800 transition-colors duration-200 z-50 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset Overlay</span>
        </button>
      )}
    </div>
  );
}
