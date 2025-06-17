import React, { useState, useEffect, useRef } from 'react';
import { useUser, useSignIn, useSignUp } from '@clerk/clerk-react';
import { addAuthEventListener, type AuthEventDetail } from '../../utils/authEvents';

interface ClerkAuthOverlayProps {
  allowClose?: boolean;
}

// Using AuthEventDetail from authEvents utility

function ClerkAuthOverlayInner({ allowClose = false }: ClerkAuthOverlayProps) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authTitle, setAuthTitle] = useState('Get unlimited free access');
  const [initialView, setInitialView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [redirectTo, setRedirectTo] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Early return for SSR - don't render anything on server
  if (!isClient) {
    return null;
  }

  // Now safe to use hooks after isClient check
  return <ClerkAuthOverlayClient allowClose={allowClose} />;
}

function ClerkAuthOverlayClient({ allowClose = false }: ClerkAuthOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [authTitle, setAuthTitle] = useState('Get unlimited free access');
  const [initialView, setInitialView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [redirectTo, setRedirectTo] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Now safe to call hooks - only called on client
  const { isSignedIn } = useUser();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  // Set up event listener using the standardized auth event system
  useEffect(() => {
    const handleOpenAuth = (detail: AuthEventDetail) => {
      const view = detail.view || 'sign_in';
      const redirect = detail.redirectTo;

      setInitialView(view);
      setRedirectTo(redirect || (typeof window !== 'undefined' ? window.location.pathname : '/'));
      setAuthTitle(view === 'sign_up' ? 'Get unlimited free access' : 'Welcome back');
      setIsOpen(true);
    };
    
    // Use the standardized event system
    const cleanup = addAuthEventListener('ClerkAuthOverlay', handleOpenAuth);
    
    return cleanup;
  }, []); // No dependencies - set up once and keep

  // Close overlay if user is signed in (only on client)
  useEffect(() => {
    if (isSignedIn) {
      setIsOpen(false);
      // Redirect if needed
      if (redirectTo && typeof window !== 'undefined' && redirectTo !== window.location.pathname) {
        window.location.href = redirectTo;
      }
    }
  }, [isSignedIn, redirectTo]);

  useEffect(() => {
    if (!allowClose) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      const handleClickOutside = (event: MouseEvent) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = '';
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, allowClose]);

  // Always render something to maintain event listeners, but only show UI when open
  if (!isOpen) {
    return <div style={{ display: 'none' }} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FAFAFA',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      {/* Close button */}
      <button
        onClick={() => setIsOpen(false)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'none',
          border: 'none',
          fontSize: '32px',
          cursor: 'pointer',
          color: '#666',
          lineHeight: '1',
          padding: '8px',
          borderRadius: '4px'
        }}
        onMouseOver={(e) => (e.target as HTMLButtonElement).style.color = '#333'}
        onMouseOut={(e) => (e.target as HTMLButtonElement).style.color = '#666'}
        aria-label="Close"
      >
        ×
      </button>
      
      <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
          {!emailSent && (
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 400, 
              lineHeight: '1.3', 
              marginBottom: '48px', 
              color: '#1a1a1a',
              fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
            }}>
              {initialView === 'sign_up' 
                ? <>Sign up for <em>free</em> access to design leadership resources</>
                : 'Welcome back'
              }
            </h1>
          )}

          {!emailSent ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
                <button
                  onClick={async () => {
                    try {
                      if (initialView === 'sign_up') {
                        await signUp?.authenticateWithRedirect({
                          strategy: 'oauth_google',
                          redirectUrl: `${window.location.origin}${redirectTo}`,
                          redirectUrlComplete: `${window.location.origin}${redirectTo}`,
                        });
                      } else {
                        await signIn?.authenticateWithRedirect({
                          strategy: 'oauth_google',
                          redirectUrl: `${window.location.origin}${redirectTo}`,
                          redirectUrlComplete: `${window.location.origin}${redirectTo}`,
                        });
                      }
                    } catch (error) {
                      console.error('Google OAuth error:', error);
                      alert(`Google authentication failed: ${error}`);
                    }
                  }}
                  style={{
                    width: '300px',
                    padding: '14px 20px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '300px',
                    padding: '14px 16px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
                    (e.target as HTMLInputElement).style.borderColor = '#1a1a1a';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.backgroundColor = '#f8f8f8';
                    (e.target as HTMLInputElement).style.borderColor = '#e0e0e0';
                  }}
                />
              </div>

              <button
                onClick={async () => {
                  try {
                    if (initialView === 'sign_up') {
                      // Sign up with magic link
                      await signUp?.create({
                        emailAddress: email,
                      });
                      
                      await signUp?.prepareEmailAddressVerification({
                        strategy: 'email_link',
                        redirectUrl: window.location.origin + redirectTo,
                      });
                      setEmailSent(true);
                    } else {
                      // Sign in with magic link
                      await signIn?.create({
                        strategy: 'email_link',
                        identifier: email,
                        redirectUrl: window.location.origin + redirectTo,
                      });
                      setEmailSent(true);
                    }
                  } catch (error) {
                    console.error('Email authentication error:', error);
                    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
                    alert(`Authentication error: ${errorMsg || 'Please try again'}`);
                  }
                }}
                style={{
                  width: '300px',
                  padding: '14px 20px',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '24px'
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#f8f8f8';
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#ffffff';
                }}
              >
                Continue with Email
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 24px' 
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
                Check your email
              </h2>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>
                A sign-in link has been sent to <strong>{email}</strong>
              </p>
              <p style={{ fontSize: '14px', color: '#999' }}>
                Click the link in the email to sign in to your account
              </p>
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                }}
                style={{
                  marginTop: '32px',
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Use a different email
              </button>
            </div>
          )}

          {!emailSent && (
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              {initialView === 'sign_up' ? (
                <>
                  Already have an account? <button 
                    onClick={() => setInitialView('sign_in')} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#333', 
                      textDecoration: 'underline', 
                      cursor: 'pointer', 
                      fontSize: '14px',
                      padding: 0
                    }}
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account? <button 
                    onClick={() => setInitialView('sign_up')} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#333', 
                      textDecoration: 'underline', 
                      cursor: 'pointer', 
                      fontSize: '14px',
                      padding: 0
                    }}
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          )}


      </div>
    </div>
  );
}

// Export the inner component directly since ClerkProvider is already in the layouts
export default function ClerkAuthOverlay(props: ClerkAuthOverlayProps) {
  return <ClerkAuthOverlayInner {...props} />;
} 