import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';

interface ContentGateProps {
  children: React.ReactNode;
  threshold?: number; // Percentage of content to show before gating (default 40%)
}

export default function ContentGate({ children, threshold = 40 }: ContentGateProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [shouldShowGate, setShouldShowGate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, isLoaded } = useUser();

  // If user is signed in, always show full content
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setShowFullContent(true);
      setShouldShowGate(false);
    }
  }, [isSignedIn, isLoaded]);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || isSignedIn) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // Calculate the height at which to show the gate
    const fullHeight = content.scrollHeight;
    const thresholdHeight = (fullHeight * threshold) / 100;

    // If content is short enough, don't show gate
    if (fullHeight <= 600) {
      setShouldShowGate(false);
      return;
    }

    setShouldShowGate(true);

    if (!showFullContent) {
      // Set container height to threshold height
      container.style.height = `${thresholdHeight}px`;
      container.style.overflow = 'hidden';
    } else {
      // Show full content
      container.style.height = 'auto';
      container.style.overflow = 'visible';
    }
  }, [threshold, showFullContent, children, isSignedIn]);

  const handleSignIn = () => {
    document.dispatchEvent(new CustomEvent('openAuthOverlay', { 
      detail: { 
        view: 'sign_in',
        redirectTo: window.location.pathname
      } 
    }));
  };

  const handleSignUp = () => {
    document.dispatchEvent(new CustomEvent('openAuthOverlay', { 
      detail: { 
        view: 'sign_up',
        redirectTo: window.location.pathname
      } 
    }));
  };

  // If user is signed in or loading, show full content
  if (!isLoaded || isSignedIn || !shouldShowGate) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div ref={containerRef}>
        <div ref={contentRef}>
          {children}
        </div>
      </div>
      
      {!showFullContent && shouldShowGate && (
        <>
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
          
          {/* Auth gate overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white pt-8 pb-8">
            <div className="text-center max-w-md mx-auto px-4">
              <h2 className="text-[32px] font-bold mb-2 font-['Fraunces'] text-gray-900">
                Get unlimited free access
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Essential resources for design leaders
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleSignUp}
                  className="w-full max-w-sm mx-auto bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium block"
                >
                  Continue reading
                </button>
                
                <button
                  onClick={handleSignIn}
                  className="w-full max-w-sm mx-auto bg-white text-gray-900 py-3 px-6 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors text-lg font-medium block"
                >
                  Sign in
                </button>
              </div>

              <div className="mt-6 space-y-2 text-[15px] text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Leadership guides and templates</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Exclusive design case studies</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular updates with new content</span>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-400">
                We respect your privacy. No spam, ever. Unsubscribe anytime.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}