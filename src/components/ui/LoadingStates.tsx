import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color = '#666' }: LoadingSpinnerProps) {
  const dimensions = {
    sm: 16,
    md: 24,
    lg: 32
  };

  const spinnerSize = dimensions[size];

  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `2px solid transparent`,
        borderTop: `2px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface AuthLoadingProps {
  message?: string;
  showSpinner?: boolean;
}

export function AuthLoading({ 
  message = 'Loading authentication...',
  showSpinner = true 
}: AuthLoadingProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      gap: '16px',
      minHeight: '200px',
      color: '#666',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {showSpinner && <LoadingSpinner size="lg" color="#666" />}
      <p style={{
        margin: 0,
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center'
      }}>
        {message}
      </p>
    </div>
  );
}

interface UserProfileLoadingProps {
  compact?: boolean;
}

export function UserProfileLoading({ compact = false }: UserProfileLoadingProps) {
  const size = compact ? 24 : 32;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#f3f4f6',
      position: 'relative'
    }}>
      <LoadingSpinner size={compact ? 'sm' : 'md'} color="#9ca3af" />
    </div>
  );
}

interface SidebarLoadingProps {
  itemCount?: number;
}

export function SidebarLoading({ itemCount = 5 }: SidebarLoadingProps) {
  return (
    <div style={{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          style={{
            height: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

interface ErrorRetryProps {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorRetry({ 
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try again'
}: ErrorRetryProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      gap: '16px',
      minHeight: '200px',
      color: '#666',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#fee2e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#dc2626',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        !
      </div>
      <p style={{
        margin: 0,
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.4'
      }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
          }}
        >
          {retryText}
        </button>
      )}
    </div>
  );
} 