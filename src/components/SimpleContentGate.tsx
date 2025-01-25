import React from 'react';

interface ContentGateProps {
  children: React.ReactNode;
}

export default function SimpleContentGate({ children }: ContentGateProps) {
  return (
    <div className="relative min-h-screen">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
