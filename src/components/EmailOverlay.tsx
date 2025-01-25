import React, { useState, useEffect, useCallback } from 'react';
import { validateEmail } from '../lib/emailValidation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface EmailOverlayProps {
  onSuccess: () => void;
  isHiding?: boolean;
}

export default function EmailOverlay({ onSuccess, isHiding }: EmailOverlayProps) {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    // Submit email
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/email-subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, marketingOptIn })
      });

      const data = await response.json();
      
      if (data.success) {
        setShowSuccess(true);
        onSuccess();
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, marketingOptIn, onSuccess]);

  // Return early if we're not on the client yet
  if (!isClient) {
    return null;
  }

  const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-500 ${
    isHiding ? 'opacity-0' : 'opacity-100'
  }`;

  return (
    <div className={overlayClasses}>
      <div className="bg-white max-w-[680px] w-full mx-4 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank you for subscribing!</h2>
              <p className="text-gray-600">You now have access to all content.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Subscribe to Access Content</h2>
              <p className="text-gray-600 mb-6">
                Join our community to access exclusive content and stay updated with the latest in design leadership.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing"
                      name="marketing"
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="marketing" className="text-sm text-gray-600">
                      I agree to receive marketing emails. You can unsubscribe at any time.
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
