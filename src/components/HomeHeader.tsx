import React from 'react';

export default function HomeHeader() {
  return (
    <div className="hidden lg:flex items-center space-x-4">
      <a href="#" id="signin-link" className="text-sm text-gray-600 hover:text-gray-900">Sign In</a>
      <button id="signup-button" className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-md hover:bg-black transition-colors">Get Started</button>
    </div>
  );
} 