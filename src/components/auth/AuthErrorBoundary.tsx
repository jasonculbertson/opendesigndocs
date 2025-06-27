import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

interface AuthErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: string) => void;
}

export default class AuthErrorBoundary extends Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorMessage = `${error.message}\n${errorInfo.componentStack}`;
    
    // Check if this is a hydration-related error
    const isHydrationError = error.message.includes('hydration') || 
                            error.message.includes('Hydration') ||
                            error.message.includes('Clerk') ||
                            error.message.includes('authentication');
    
    this.setState({
      errorInfo: errorMessage
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorMessage);
    }

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('AuthErrorBoundary caught an error:', {
        error,
        errorInfo,
        stack: error.stack,
        isHydrationError
      });
    }

    // For hydration errors, try to auto-recover after a short delay
    if (isHydrationError && typeof window !== 'undefined') {
      console.log('🔄 AuthErrorBoundary: Detected hydration error, attempting auto-recovery...');
      setTimeout(() => {
        console.log('🔄 AuthErrorBoundary: Auto-recovering from hydration error...');
        this.handleRetry();
      }, 1000);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          color: '#d63031',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
            Authentication Error
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.4' }}>
            There was a problem with the authentication system. This is usually temporary.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d63031',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#d63031',
                border: '1px solid #d63031',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ marginTop: '16px', fontSize: '12px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                Error Details (Development)
              </summary>
              <pre style={{ 
                marginTop: '8px', 
                padding: '8px', 
                backgroundColor: '#f8f8f8', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '11px'
              }}>
                {this.state.error.message}
                {this.state.errorInfo && `\n\n${this.state.errorInfo}`}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 