import React, { useState, useEffect, useRef } from 'react';
import { useUser, SignIn, SignUp, useSignIn, useSignUp } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

interface ClerkAuthOverlayProps {
  allowClose?: boolean;
}

interface OpenAuthEventDetail {
  view?: 'sign_in' | 'sign_up';
  redirectTo?: string;
}

type OpenAuthEvent = CustomEvent<OpenAuthEventDetail>;

function ClerkAuthOverlayInner({ allowClose = false }: ClerkAuthOverlayProps) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authTitle, setAuthTitle] = useState('Get unlimited free access');
  const [initialView, setInitialView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [redirectTo, setRedirectTo] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Only use Clerk hooks on client side
  const { isSignedIn } = isClient ? useUser() : { isSignedIn: false };
  const { signIn } = isClient ? useSignIn() : { signIn: null };
  const { signUp } = isClient ? useSignUp() : { signUp: null };

  useEffect(() => {
    setIsClient(true);
    
    // Check for OAuth completion on mount
    if (typeof window !== 'undefined') {
      const storedRedirect = sessionStorage.getItem('clerk_oauth_redirect');
      if (storedRedirect) {
        console.log('🔍 OAuth redirect found on mount, waiting for sign-in...', storedRedirect);
      }
    }
  }, []);

  // Set up event listener regardless of SSR/client state - this is crucial for homepage buttons
  useEffect(() => {
    const handleOpenAuth = (event: Event) => {
      console.log('🎯 openAuthOverlay event received:', event);
      const customEvent = event as OpenAuthEvent;
      const view = customEvent.detail?.view || 'sign_in';
      const redirect = customEvent.detail?.redirectTo;

      setInitialView(view);
      setRedirectTo(redirect || (typeof window !== 'undefined' ? window.location.pathname : '/'));
      setAuthTitle(view === 'sign_up' ? 'Get unlimited free access' : 'Welcome back');
      setIsOpen(true);
    };
    
    if (typeof window !== 'undefined') {
      console.log('🔧 Setting up openAuthOverlay event listener');
      window.addEventListener('openAuthOverlay', handleOpenAuth);
      return () => {
        console.log('🧹 Cleaning up openAuthOverlay event listener');
        window.removeEventListener('openAuthOverlay', handleOpenAuth);
      };
    }
  }, []); // No dependencies - set up once and keep

  // Close overlay if user is signed in (only on client)
  useEffect(() => {
    if (isClient && isSignedIn) {
      console.log('✅ User is signed in, checking for redirects...', { isSignedIn, currentPath: window.location.pathname });
      setIsOpen(false);
      
      // Check for OAuth redirect in sessionStorage
      const storedRedirect = typeof window !== 'undefined' 
        ? sessionStorage.getItem('clerk_oauth_redirect') 
        : null;
      
      if (storedRedirect && storedRedirect !== window.location.pathname) {
        console.log('🔄 Found OAuth redirect in storage:', storedRedirect);
        sessionStorage.removeItem('clerk_oauth_redirect');
        // Use window.location.href for full page reload to ensure session is established
        setTimeout(() => {
          console.log('🚀 Redirecting to:', storedRedirect);
          window.location.href = storedRedirect;
        }, 100);
      } else if (storedRedirect === window.location.pathname) {
        // Already on target page, just clean up
        console.log('✅ Already on target page, cleaning up sessionStorage');
        sessionStorage.removeItem('clerk_oauth_redirect');
      } else if (redirectTo && typeof window !== 'undefined' && redirectTo !== window.location.pathname) {
        // Regular redirect (for email auth)
        console.log('🔄 Regular redirect to:', redirectTo);
        window.location.href = redirectTo;
      }
    }
  }, [isClient, isSignedIn, redirectTo]);

  useEffect(() => {
    if (!isClient) return; // Only handle these effects on client side
    
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
  }, [isClient, isOpen, allowClose]);

  // Always render something to maintain event listeners, but only show UI on client when open
  if (!isClient || !isOpen) {
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
                    console.log('🚀 Google OAuth clicked:', { initialView, redirectTo });
                    
                    // Store redirect URL in sessionStorage so we can use it after OAuth completes
                    if (typeof window !== 'undefined') {
                      sessionStorage.setItem('clerk_oauth_redirect', redirectTo);
                    }
                    
                    try {
                      if (initialView === 'sign_up') {
                        console.log('Starting Google sign-up flow with redirect to:', redirectTo);
                        // Use BOTH redirectUrl (callback handler) AND redirectUrlComplete (final destination)
                        // This is how email auth works - direct to target page
                        await signUp?.authenticateWithRedirect({
                          strategy: 'oauth_google',
                          redirectUrl: `${window.location.origin}${redirectTo}`,
                          redirectUrlComplete: `${window.location.origin}${redirectTo}`,
                        });
                      } else {
                        console.log('Starting Google sign-in flow with redirect to:', redirectTo);
                        // Use BOTH redirectUrl (callback handler) AND redirectUrlComplete (final destination)
                        // This is how email auth works - direct to target page
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

              {/* CAPTCHA container for Clerk's bot protection */}
              <div id="clerk-captcha" style={{ marginBottom: '24px' }}></div>

              <button
                onClick={async () => {
                  console.log('Email button clicked:', { email, initialView });
                  try {
                    if (initialView === 'sign_up') {
                      console.log('Attempting sign up with email...');
                      // Sign up with email code
                      const signUpResult = await signUp?.create({
                        emailAddress: email,
                      });
                      console.log('SignUp create result:', signUpResult);
                      
                      const prepareResult = await signUp?.prepareEmailAddressVerification({
                        strategy: 'email_code',
                      });
                      console.log('Prepare email verification result:', prepareResult);
                      setEmailSent(true);
                    } else {
                      console.log('Attempting sign in with email...');
                      // Sign in with email code
                      const signInResult = await signIn?.create({
                        identifier: email,
                      });
                      console.log('SignIn create result:', signInResult);
                      
                      const prepareResult = await signIn?.prepareFirstFactor({
                        strategy: 'email_code',
                        emailAddressId: signInResult?.supportedFirstFactors?.find(
                          (f: any) => f.strategy === 'email_code'
                        )?.emailAddressId,
                      });
                      console.log('Prepare sign in result:', prepareResult);
                      setEmailSent(true);
                    }
                                      } catch (error) {
                      console.error('Email authentication error:', error);
                      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
                      console.error('Error details:', error);
                      // For now, let's show the error in an alert so user knows something went wrong
                      alert(`Authentication error: ${errorMsg || 'Please try again'}`);
                    }
                }}
                disabled={!email.trim()}
                style={{
                  width: '300px',
                  padding: '14px 20px',
                  backgroundColor: email.trim() ? '#1a1a1a' : '#e2e8f0',
                  color: email.trim() ? 'white' : '#999',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: email.trim() ? 'pointer' : 'not-allowed',
                  marginBottom: '24px',
                  transition: 'all 0.2s ease',
                  opacity: email.trim() ? 1 : 0.6
                }}
                                 onMouseOver={(e) => {
                   if (email.trim()) {
                     (e.target as HTMLButtonElement).style.backgroundColor = '#000000';
                   }
                 }}
                 onMouseOut={(e) => {
                   if (email.trim()) {
                     (e.target as HTMLButtonElement).style.backgroundColor = '#1a1a1a';
                   }
                 }}
              >
                Continue with email
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
                A verification code has been sent to <strong>{email}</strong>
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{
                    width: '200px',
                    padding: '14px 16px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '18px',
                    textAlign: 'center',
                    letterSpacing: '0.5em',
                    outline: 'none',
                    fontWeight: 600
                  }}
                  maxLength={6}
                  autoFocus
                />
              </div>

              <button
                onClick={async () => {
                  if (code.length !== 6) return;
                  setIsVerifying(true);
                  try {
                    if (initialView === 'sign_up') {
                      console.log('Verifying signup code...');
                      await signUp?.attemptEmailAddressVerification({
                        code,
                      });
                      console.log('✅ Email verified! Redirecting...');
                      
                      // Quick redirect - Clerk session is ready after verification
                      setTimeout(() => {
                        console.log('🔄 Manual redirect to:', redirectTo);
                        window.location.href = redirectTo;
                      }, 200);
                    } else {
                      console.log('Verifying signin code...');
                      await signIn?.attemptFirstFactor({
                        strategy: 'email_code',
                        code,
                      });
                      console.log('✅ Signed in! Redirecting...');
                      
                      // Quick redirect - Clerk session is ready after verification
                      setTimeout(() => {
                        console.log('🔄 Manual redirect to:', redirectTo);
                        window.location.href = redirectTo;
                      }, 200);
                    }
                  } catch (error) {
                    console.error('Code verification error:', error);
                    const errorMsg = error instanceof Error ? error.message : 'Invalid code';
                    alert(`Verification failed: ${errorMsg}`);
                    setIsVerifying(false);
                  }
                }}
                disabled={code.length !== 6 || isVerifying}
                style={{
                  width: '200px',
                  padding: '14px 20px',
                  backgroundColor: (code.length === 6 && !isVerifying) ? '#1a1a1a' : '#e2e8f0',
                  color: (code.length === 6 && !isVerifying) ? 'white' : '#999',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: (code.length === 6 && !isVerifying) ? 'pointer' : 'not-allowed',
                  marginBottom: '24px',
                  opacity: (code.length === 6 && !isVerifying) ? 1 : 0.6
                }}
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </button>

              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                  setCode('');
                }}
                style={{
                  marginTop: '16px',
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
