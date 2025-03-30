import React, { useState, useEffect } from 'react';

export default function DevTools() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    // Check localStorage on client-side
    if (typeof window !== 'undefined') {
      setIsSubscribed(localStorage.getItem('emailSubscribed') === 'true');
    }
  }, []);

  const removeContentGate = () => {
    localStorage.setItem('emailSubscribed', 'true');
    setIsSubscribed(true);
    window.location.reload();
  };

  const resetContentGate = () => {
    localStorage.removeItem('emailSubscribed');
    setIsSubscribed(false);
    window.location.reload();
  };

  // Only render in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {isSubscribed ? (
        <button
          onClick={resetContentGate}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-red-700"
        >
          Enable Content Gate
        </button>
      ) : (
        <button
          onClick={removeContentGate}
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-green-700"
        >
          Remove Content Gate
        </button>
      )}
    </div>
  );
}
