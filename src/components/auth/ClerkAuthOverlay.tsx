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
  const [isManualRedirect, setIsManualRedirect] = useState(false);
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
  const [redirectTo, setRedirectTo] = useState<string>(typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(() => {
    // Check if user came from recruiter invitation and wants email auth
    if (typeof window !== 'undefined') {
      const authMethod = localStorage.getItem('recruiter_auth_method');
      return authMethod === 'email';
    }
    return false;
  });
  const [emailSent, setEmailSent] = useState(false);
  const [isManualRedirect, setIsManualRedirect] = useState(() => {
    // Check if we recently completed a manual redirect
    if (typeof window !== 'undefined') {
      const recent = sessionStorage.getItem('clerk_manual_redirect');
      if (recent) {
        const timestamp = parseInt(recent);
        const now = Date.now();
        // Consider manual redirect active for 2 seconds after redirect
        if (now - timestamp < 2000) {
          return true;
        } else {
          sessionStorage.removeItem('clerk_manual_redirect');
        }
      }
    }
    return false;
  });
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showAccountExistsMessage, setShowAccountExistsMessage] = useState(false);
  const [isRetryingOAuth, setIsRetryingOAuth] = useState(false);

  // Now safe to call hooks - only called on client
  const { isSignedIn, isLoaded } = useUser();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  // Preload Clerk initialization on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Clerk && !isLoaded) {
      console.log('🚀 Preloading Clerk initialization...');
      // Trigger Clerk to start loading immediately
      window.Clerk.load().catch((error: any) => {
        console.log('Clerk preload error (non-critical):', error);
      });
    }
  }, [isLoaded]);

  // Helper function to set manual redirect flag with sessionStorage persistence
  const setManualRedirectFlag = (value: boolean) => {
    setIsManualRedirect(value);
    if (value && typeof window !== 'undefined') {
      sessionStorage.setItem('clerk_manual_redirect', Date.now().toString());
    } else if (!value && typeof window !== 'undefined') {
      sessionStorage.removeItem('clerk_manual_redirect');
    }
  };

  // Proactive session check on component load
  useEffect(() => {
    const checkForExistingSession = async () => {
      if (!isLoaded || isSignedIn || typeof window === 'undefined') return;
      
      try {
        const clerk = (window as any).Clerk;
        if (clerk && clerk.session && !clerk.user) {
          console.log('🔍 Found orphaned session, attempting to restore...');
          await clerk.setActive({ session: clerk.session });
        }
      } catch (error) {
        console.log('🔍 No session to restore');
      }
    };

    // Small delay to ensure Clerk is fully loaded
    const timer = setTimeout(checkForExistingSession, 1000);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn]);

  // Debug logging for state changes
  useEffect(() => {
    console.log('🔍 Clerk state update:', { 
      signUpStatus: signUp?.status, 
      signInStatus: signIn?.status,
      isSignedIn,
      emailSent,
      showCodeInput 
    });
  }, [signUp?.status, signIn?.status, isSignedIn, emailSent, showCodeInput]);

  // Set up event listener using the standardized auth event system
  useEffect(() => {
    const handleOpenAuth = async (detail: AuthEventDetail) => {
      const view = detail.view || 'sign_in';
      const redirect = detail.redirectTo;
      const finalRedirect = redirect || (typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/');

      console.log('🎯 Auth overlay opened:', { 
        view, 
        redirect, 
        finalRedirect,
        context: detail.context,
        timestamp: detail.timestamp,
        currentPath: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        isLoaded,
        isSignedIn
      });

      // Check if user is already signed in
      if (isLoaded && isSignedIn) {
        console.log('✅ User already signed in, redirecting immediately');
        const redirectUrl = finalRedirect === '/' ? '/docs/levels/levels-titles' : finalRedirect;
        window.location.href = redirectUrl;
        return;
      }

      // Check for existing Clerk session before showing overlay
      if (isLoaded && !isSignedIn && typeof window !== 'undefined' && (window as any).Clerk) {
        try {
          console.log('🔍 Checking for existing Clerk session...');
          const clerk = (window as any).Clerk;
          
          // Try to restore session silently
          if (clerk.session) {
            console.log('✅ Found existing Clerk session, attempting silent sign-in');
            // Session exists, user should be signed in automatically
            // Wait a moment for the session to be processed
            setTimeout(() => {
              if (isSignedIn) {
                const redirectUrl = finalRedirect === '/' ? '/docs/levels/levels-titles' : finalRedirect;
                window.location.href = redirectUrl;
              } else {
                // If still not signed in after session check, show overlay
                showAuthOverlay(view, finalRedirect);
              }
            }, 500);
            return;
          }
        } catch (error) {
          console.log('🔍 No existing session found, showing auth overlay');
        }
      }

      // Show auth overlay if no existing session
      showAuthOverlay(view, finalRedirect);
    };

    const showAuthOverlay = (view: 'sign_in' | 'sign_up', finalRedirect: string) => {
      setInitialView(view);
      setRedirectTo(finalRedirect);
      setAuthTitle(view === 'sign_up' ? 'Get unlimited free access' : 'Welcome back');
      setIsOpen(true);
    };
    
    // Use the standardized event system
    const cleanup = addAuthEventListener('ClerkAuthOverlay', handleOpenAuth);
    
    return cleanup;
  }, [isLoaded, isSignedIn]); // No dependencies - set up once and keep

  // Close overlay if user is signed in (only on client)
  useEffect(() => {
    if (isSignedIn && !isManualRedirect) {
      console.log('✅ User signed in, closing overlay and redirecting to:', redirectTo);
      console.log('🔍 Current URL:', window.location.href);
      console.log('🔍 Current pathname:', window.location.pathname);
      console.log('🔍 IsManualRedirect:', isManualRedirect);
      setIsOpen(false);
      
      // Check if this is an OAuth completion by looking for stored redirect URL
      const storedOAuthRedirect = typeof window !== 'undefined' ? sessionStorage.getItem('oauth_redirect_url') : null;
      if (storedOAuthRedirect) {
        console.log('🔄 AUTO-REDIRECT (OAuth): Found stored redirect URL:', storedOAuthRedirect);
        sessionStorage.removeItem('oauth_redirect_url');
        
        // Use setTimeout to ensure overlay closes first
        setTimeout(() => {
          console.log('🔄 AUTO-REDIRECT (OAuth): Executing redirect to stored URL...');
          window.location.href = storedOAuthRedirect;
        }, 100);
        return;
      }
      
      // Check for recruiter redirect URL first
      const recruiterRedirectUrl = typeof window !== 'undefined' ? localStorage.getItem('recruiter_redirect_url') : null;
      
      // Determine appropriate redirect URL
      const currentPath = typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/';
      let finalRedirect;
      
      if (recruiterRedirectUrl) {
        // Prioritize recruiter redirect if present
        finalRedirect = recruiterRedirectUrl;
        console.log('🎯 Using recruiter redirect URL:', finalRedirect);
        
        // Clean up recruiter localStorage flags
        localStorage.removeItem('recruiter_redirect_url');
        localStorage.removeItem('recruiter_auth_method');
      } else if (redirectTo && redirectTo !== currentPath) {
        // Use the specified redirectTo if it's different from current path
        finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
      } else if (currentPath === '/' && redirectTo && redirectTo !== '/') {
        // Special case: User came back from OAuth but ended up on homepage
        // This happens when clicking "Sign Up" with Google but user already exists
        console.log('🔄 OAuth completion detected: User signed in but on homepage, using intended destination:', redirectTo);
        finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
      } else if (currentPath === '/') {
        // If we're on homepage and no specific redirect, go to levels
        finalRedirect = '/docs/levels/levels-titles';
      } else {
        // Stay on current page
        finalRedirect = null;
      }
      
      if (finalRedirect) {
        console.log('🔄 AUTO-REDIRECT: Redirecting from', currentPath, 'to', finalRedirect, '(original redirectTo:', redirectTo, ')');
        // Use setTimeout to ensure overlay closes first
        setTimeout(() => {
          console.log('🔄 AUTO-REDIRECT: Executing redirect now...');
          window.location.href = finalRedirect;
        }, 100);
      } else {
        console.log('🔄 AUTO-REDIRECT: No redirect needed. Staying on current path:', currentPath);
      }
    } else {
      console.log('🔄 AUTO-REDIRECT: Skipped. isSignedIn:', isSignedIn, 'isManualRedirect:', isManualRedirect);
    }
  }, [isSignedIn, redirectTo, isManualRedirect]);

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
      {/* CAPTCHA container for Clerk bot protection */}
      <div id="clerk-captcha" style={{ display: 'none' }} />
      
      {/* Close button */}
      <button
        onClick={() => {
          setIsOpen(false);
          // Redirect to homepage when closing the signup wall
          window.location.href = '/';
        }}
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
          {!emailSent && !showCodeInput && (
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
                      // Immediate visual feedback
                      const button = document.activeElement as HTMLButtonElement;
                      if (button) {
                        button.style.opacity = '0.7';
                        button.style.cursor = 'wait';
                        button.textContent = 'Loading...';
                      }
                      
                      setIsRetryingOAuth(true);
                      
                      // Store the desired redirect URL in sessionStorage for OAuth completion
                      const finalRedirectTo = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                      sessionStorage.setItem('oauth_redirect_url', finalRedirectTo);
                      console.log('💾 Stored OAuth redirect URL:', finalRedirectTo);
                      
                      // Always redirect to current page after OAuth, then our completion handler will redirect to the final destination
                      // Include search parameters to preserve URL parameters like ?access=recruit2024
                      const currentPageUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
                      
                      console.log('🔄 Starting OAuth with redirect:', {
                        initialView,
                        originalRedirectTo: redirectTo,
                        finalRedirectTo,
                        currentPageUrl,
                        windowLocation: window.location.href,
                      });
                      
                      // Ensure Clerk is fully loaded before attempting OAuth
                      if (!signUp || !signIn) {
                        console.log('⏳ Waiting for Clerk to initialize...');
                        // Wait a bit for Clerk to load
                        await new Promise(resolve => setTimeout(resolve, 100));
                      }
                      
                      // Smart OAuth: Try intended flow first, but with better error handling
                      let oauthSuccess = false;
                      
                      if (initialView === 'sign_up') {
                        console.log('🔄 Attempting Google signup first...');
                        try {
                          await signUp?.authenticateWithRedirect({
                            strategy: 'oauth_google',
                            redirectUrl: currentPageUrl,
                            redirectUrlComplete: currentPageUrl,
                          });
                          oauthSuccess = true;
                        } catch (signUpError: any) {
                          console.log('🔄 Signup failed, trying signin automatically:', signUpError?.message);
                          
                          // If signup fails, automatically try signin
                          if (signUpError?.message?.includes('already exists') || 
                              signUpError?.message?.includes('taken') ||
                              signUpError?.code === 'form_identifier_exists' ||
                              signUpError?.errors?.[0]?.code === 'form_identifier_exists') {
                            
                            console.log('🔑 User exists, switching to signin flow...');
                            await signIn?.authenticateWithRedirect({
                              strategy: 'oauth_google',
                              redirectUrl: currentPageUrl,
                              redirectUrlComplete: currentPageUrl,
                            });
                            oauthSuccess = true;
                          } else {
                            throw signUpError;
                          }
                        }
                      } else {
                        console.log('🔑 Attempting Google signin first...');
                        try {
                          await signIn?.authenticateWithRedirect({
                            strategy: 'oauth_google',
                            redirectUrl: currentPageUrl,
                            redirectUrlComplete: currentPageUrl,
                          });
                          oauthSuccess = true;
                        } catch (signInError: any) {
                          console.log('🔄 Signin failed, trying signup automatically:', signInError?.message);
                          
                          // If signin fails, automatically try signup
                          if (signInError?.message?.includes('not found') || 
                              signInError?.message?.includes("doesn't exist") ||
                              signInError?.code === 'form_identifier_not_found' ||
                              signInError?.errors?.[0]?.code === 'form_identifier_not_found') {
                            
                            console.log('📝 User not found, switching to signup flow...');
                            await signUp?.authenticateWithRedirect({
                              strategy: 'oauth_google',
                              redirectUrl: currentPageUrl,
                              redirectUrlComplete: currentPageUrl,
                            });
                            oauthSuccess = true;
                          } else {
                            throw signInError;
                          }
                        }
                      }
                      
                      if (!oauthSuccess) {
                        throw new Error('Both signup and signin OAuth attempts failed');
                      }
                    } catch (error) {
                      console.error('Google OAuth error:', error);
                      
                      // Log detailed error information for debugging
                      if (error && typeof error === 'object') {
                        console.error('Error details:', {
                          message: (error as any).message,
                          stack: (error as any).stack,
                          name: (error as any).name,
                          fullError: error
                        });
                      }
                      
                      // Handle session exists error - use Clerk's session management
                      if (error && typeof error === 'object' && 'errors' in error) {
                        const errors = (error as any).errors;
                        if (errors?.[0]?.code === 'session_exists') {
                          console.log('Session already exists, attempting to use existing session');
                          
                          // Show loading state
                          setIsRetryingOAuth(true);
                          
                          try {
                            // Check if we can access the existing session
                            const clerk = (window as any).Clerk;
                            if (clerk && clerk.session) {
                              console.log('✅ Found active Clerk session, signing in user');
                              // Force Clerk to recognize the session
                              await clerk.setActive({ session: clerk.session });
                              
                              // Close overlay and redirect
                              setIsOpen(false);
                              const finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                              setTimeout(() => {
                                window.location.href = finalRedirect;
                              }, 100);
                              return;
                            } else {
                              // No session found, switch to sign-in mode
                              console.log('🔄 No active session found, switching to sign-in mode');
                              setInitialView('sign_in');
                              setAuthTitle('Welcome back!');
                              setIsRetryingOAuth(false);
                              
                              // Show helpful message
                              alert('You have a Google account connected. Please try signing in instead.');
                            }
                          } catch (sessionError) {
                            console.error('Failed to use existing session:', sessionError);
                            setIsRetryingOAuth(false);
                            setInitialView('sign_in');
                            setAuthTitle('Welcome back!');
                            alert('You already have a Google account connected. Please try signing in instead.');
                          }
                          return;
                        }
                      }
                      
                      // More user-friendly error message
                      let errorMessage = 'Google authentication failed';
                      if (error instanceof Error) {
                        if (error.message.includes('JSON')) {
                          errorMessage = 'Authentication service temporarily unavailable. Please try again or use email sign-up.';
                        } else {
                          errorMessage = `Google authentication failed: ${error.message}`;
                        }
                      }
                      
                      alert(errorMessage);
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

              {/* Divider */}
              <div style={{ 
                position: 'relative', 
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                width: '300px',
                margin: '0 auto'
              }}>
                <div style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: '#e0e0e0'
                }} />
                <span style={{
                  padding: '0 16px',
                  fontSize: '14px',
                  color: '#666',
                  backgroundColor: '#FAFAFA'
                }}>
                  or
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: '#e0e0e0'
                }} />
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
                    console.log('🔄 Starting smart email authentication for:', { email, initialView });
                    
                    // Smart unified flow: Try the user's intended action first, but fall back intelligently
                    let authSuccess = false;
                    
                    if (initialView === 'sign_up') {
                      console.log('📝 Attempting signup first (user clicked Get Started)...');
                      try {
                        // Try signup first since user clicked "Get Started"
                        const signUpAttempt = await signUp?.create({
                          emailAddress: email,
                        });
                        console.log('✅ Signup attempt created:', signUpAttempt?.id);
                        
                        // Send email verification code
                        console.log('📧 Preparing email verification...');
                        await signUp?.prepareEmailAddressVerification({
                          strategy: 'email_code',
                        });
                        console.log('✅ Email verification code sent for signup');
                        
                        setEmailSent(true);
                        setShowCodeInput(true);
                        authSuccess = true;
                      } catch (signUpError: any) {
                        console.log('🔄 Signup failed, trying signin (user might already exist):', signUpError?.message);
                        
                        // If signup fails because user exists, automatically try signin
                        if (signUpError?.message?.includes('already exists') || 
                            signUpError?.message?.includes('taken') ||
                            signUpError?.code === 'form_identifier_exists') {
                          console.log('🔑 User exists, switching to signin automatically...');
                          
                          // Automatically switch to signin
                          const signInAttempt = await signIn?.create({
                            identifier: email,
                          });
                          console.log('✅ Signin attempt created:', signInAttempt?.id);

                          // Find email code factor
                          const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(
                            (factor: any) => factor.strategy === 'email_code'
                          ) as any;

                          if (emailCodeFactor) {
                            await signIn?.prepareFirstFactor({
                              strategy: 'email_code',
                              emailAddressId: emailCodeFactor.emailAddressId,
                            });
                            console.log('✅ Email verification code sent for signin');
                            
                            // Update UI to reflect we switched to signin
                            setInitialView('sign_in');
                            setAuthTitle('Welcome back!');
                            setEmailSent(true);
                            setShowCodeInput(true);
                            authSuccess = true;
                          } else {
                            throw new Error('Email signin not available for this user');
                          }
                        } else {
                          // Re-throw if it's not a "user exists" error
                          throw signUpError;
                        }
                      }
                    } else {
                      console.log('🔑 Attempting signin first (user clicked Sign In)...');
                      try {
                        // Try signin first since user clicked "Sign In"
                        const signInAttempt = await signIn?.create({
                          identifier: email,
                        });
                        console.log('✅ Signin attempt created:', signInAttempt?.id);

                        // Find email code factor
                        const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(
                          (factor: any) => factor.strategy === 'email_code'
                        ) as any;

                        if (emailCodeFactor) {
                          await signIn?.prepareFirstFactor({
                            strategy: 'email_code',
                            emailAddressId: emailCodeFactor.emailAddressId,
                          });
                          console.log('✅ Email verification code sent for signin');
                          
                          setEmailSent(true);
                          setShowCodeInput(true);
                          authSuccess = true;
                        } else {
                          throw new Error('Email signin not available');
                        }
                      } catch (signInError: any) {
                        console.log('🔄 Signin failed, trying signup (user might be new):', signInError?.message);
                        
                        // If signin fails because user doesn't exist, automatically try signup
                        if (signInError?.message?.includes('not found') || 
                            signInError?.message?.includes("doesn't exist") ||
                            signInError?.code === 'form_identifier_not_found') {
                          console.log('📝 User not found, switching to signup automatically...');
                          
                          // Automatically switch to signup
                          const signUpAttempt = await signUp?.create({
                            emailAddress: email,
                          });
                          console.log('✅ Signup attempt created:', signUpAttempt?.id);
                          
                          await signUp?.prepareEmailAddressVerification({
                            strategy: 'email_code',
                          });
                          console.log('✅ Email verification code sent for signup');
                          
                          // Update UI to reflect we switched to signup
                          setInitialView('sign_up');
                          setAuthTitle('Get unlimited free access');
                          setEmailSent(true);
                          setShowCodeInput(true);
                          authSuccess = true;
                        } else {
                          // Re-throw if it's not a "user not found" error
                          throw signInError;
                        }
                      }
                    }
                    
                    if (!authSuccess) {
                      throw new Error('Authentication flow failed');
                    }
                  } catch (error) {
                    console.error('❌ Email authentication error:', error);
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
                Continue with email
              </button>

              {/* Sign in/Sign up toggle links */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '4px', 
                marginTop: '16px',
                fontSize: '14px',
                color: '#666'
              }}>
                <span>
                  {initialView === 'sign_up' ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <button
                  onClick={() => {
                    setInitialView(initialView === 'sign_up' ? 'sign_in' : 'sign_up');
                    setEmail('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLButtonElement).style.color = '#666';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.color = '#1a1a1a';
                  }}
                >
                  {initialView === 'sign_up' ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </>
          ) : (
            emailSent && showCodeInput ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
                  Enter verification code
                </h2>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', lineHeight: '1.5' }}>
                  We sent a 6-digit code to <strong>{email}</strong>
                </p>
                
                <div style={{ marginBottom: '24px' }}>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    style={{
                      width: '300px',
                      padding: '14px 16px',
                      backgroundColor: '#f8f8f8',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '18px',
                      textAlign: 'center',
                      letterSpacing: '4px',
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
                      console.log('🔐 Attempting code verification:', { code, initialView });
                      
                      if (initialView === 'sign_up') {
                        console.log('📝 Current signup state:', signUp?.status);
                        
                        if (!signUp) {
                          throw new Error('No signup attempt found. Please start over.');
                        }
                        
                        // Verify the email address with the code
                        console.log('🔍 Attempting email verification...');
                        const result = await signUp.attemptEmailAddressVerification({
                          code: code,
                        });
                        
                        console.log('✅ Verification result:', result?.status);
                        
                        if (result?.status === 'complete') {
                          console.log('✅ Email verified, signup complete');
                          console.log('🔄 Disabling automatic redirect and handling manually');
                          
                          // Set flag to prevent automatic redirect
                          setManualRedirectFlag(true);
                          
                          // Force close the overlay and redirect since verification is complete
                          setIsOpen(false);
                          setEmailSent(false);
                          setShowCodeInput(false);
                          setCode('');
                          
                          console.log('🔄 Manually closing overlay and redirecting...');
                          
                          // Give Clerk a moment to update the session state, then redirect
                          setTimeout(() => {
                            const finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                            console.log('🔄 Redirecting after signup:', finalRedirect);
                            window.location.href = finalRedirect;
                          }, 500); // Shorter delay since we're preventing the automatic redirect
                        } else if (result?.status === 'missing_requirements') {
                          console.log('⚠️ Missing requirements detected, attempting to complete signup...');
                          
                          // Log detailed information about what's missing
                          console.log('📋 Signup object details:', {
                            status: signUp.status,
                            missingFields: signUp.missingFields,
                            unverifiedFields: signUp.unverifiedFields,
                            requiredFields: signUp.requiredFields,
                            optionalFields: signUp.optionalFields
                          });
                          
                          // Try to complete the signup with basic information
                          try {
                            // First try with just an empty update
                            let completeResult = await signUp.update({});
                            console.log('🔄 Update result (empty):', completeResult?.status);
                            
                            // If still missing requirements, try providing basic user info
                            if (completeResult?.status === 'missing_requirements') {
                              console.log('🔄 Trying with basic user info...');
                              
                              // Extract first name from email if possible
                              const emailParts = email.split('@')[0];
                              const firstName = emailParts.charAt(0).toUpperCase() + emailParts.slice(1);
                              
                              completeResult = await signUp.update({
                                firstName: firstName,
                                lastName: 'User'  // Generic last name
                              });
                              console.log('🔄 Update result (with names):', completeResult?.status);
                            }
                            
                            // If still missing requirements, try to force completion
                            if (completeResult?.status === 'missing_requirements') {
                              console.log('🔄 Trying to force completion...');
                              try {
                                // Try to create and set session
                                const sessionResult = await signUp.createdSessionId;
                                console.log('🔄 Session ID found:', sessionResult);
                                if (sessionResult) {
                                  completeResult = { status: 'complete' } as any;
                                }
                              } catch (sessionError) {
                                console.log('❌ Session check failed:', sessionError);
                              }
                            }
                            
                            if (completeResult?.status === 'complete') {
                              console.log('✅ Signup completed after providing additional info');
                              
                              // Set flag to prevent automatic redirect
                              setManualRedirectFlag(true);
                              
                              setIsOpen(false);
                              setEmailSent(false);
                              setShowCodeInput(false);
                              setCode('');
                              
                              setTimeout(() => {
                                const finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                                console.log('🔄 Redirecting after completion:', finalRedirect);
                                window.location.href = finalRedirect;
                              }, 500);
                            } else {
                              console.log('⚠️ Still missing requirements after all attempts');
                              console.log('📋 Final signup state:', {
                                status: completeResult?.status,
                                missingFields: signUp.missingFields,
                                requiredFields: signUp.requiredFields
                              });
                              
                              // More helpful error message
                              const missingFieldsList = signUp.missingFields?.map(field => {
                                if (typeof field === 'string') return field;
                                return (field as any)?.code || String(field);
                              }).join(', ') || 'unknown fields';
                              alert(`Account created but needs additional information: ${missingFieldsList}. Please try signing in to complete your profile.`);
                            }
                          } catch (updateError) {
                            console.error('❌ Error updating signup:', updateError);
                            
                            // Log more details about the error
                            if (updateError && typeof updateError === 'object' && 'errors' in updateError) {
                              const errors = (updateError as any).errors;
                              console.error('❌ Detailed error:', errors);
                              
                              if (errors?.[0]) {
                                alert(`Setup error: ${errors[0].longMessage || errors[0].message}`);
                                return;
                              }
                            }
                            
                            alert('Account created but there was an issue completing setup. Please try signing in.');
                          }
                        } else {
                          console.log('⚠️ Verification incomplete, status:', result?.status);
                          alert('Verification incomplete. Please try again.');
                        }
                      } else {
                        console.log('🔑 Current signin state:', signIn?.status);
                        
                        if (!signIn) {
                          throw new Error('No signin attempt found. Please start over.');
                        }
                        
                        // Verify the email code for sign-in
                        console.log('🔍 Attempting first factor verification...');
                        const result = await signIn.attemptFirstFactor({
                          strategy: 'email_code',
                          code: code,
                        });
                        
                        console.log('✅ Verification result:', result?.status);
                        
                        if (result?.status === 'complete') {
                          console.log('✅ Sign-in complete');
                          console.log('🔄 Disabling automatic redirect and handling manually');
                          
                          // Set flag to prevent automatic redirect
                          setManualRedirectFlag(true);
                          
                          // Force close the overlay and redirect since verification is complete
                          setIsOpen(false);
                          setEmailSent(false);
                          setShowCodeInput(false);
                          setCode('');
                          
                          console.log('🔄 Manually closing overlay and redirecting...');
                          
                          // Give Clerk a moment to update the session state, then redirect
                          setTimeout(() => {
                            const finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                            console.log('🔄 Redirecting after signin:', finalRedirect);
                            window.location.href = finalRedirect;
                          }, 500); // Shorter delay since we're preventing the automatic redirect
                        } else {
                          console.log('⚠️ Verification incomplete, status:', result?.status);
                          alert('Verification incomplete. Please try again.');
                        }
                      }
                    } catch (error) {
                      console.error('❌ Code verification error:', error);
                      
                      // Check if it's a specific Clerk error
                      if (error && typeof error === 'object' && 'errors' in error) {
                        const clerkError = (error as any).errors?.[0];
                        if (clerkError) {
                          console.error('❌ Clerk error details:', clerkError);
                          alert(`Verification failed: ${clerkError.longMessage || clerkError.message}`);
                          return;
                        }
                      }
                      
                      const errorMsg = error instanceof Error ? error.message : 'Invalid code. Please try again.';
                      
                      // If the attempt was lost, suggest starting over
                      if (errorMsg.includes('No sign up attempt') || errorMsg.includes('No signin attempt')) {
                        alert(`${errorMsg} Please click "Use a different email" and start over.`);
                      } else {
                        alert(`Verification failed: ${errorMsg}`);
                      }
                    }
                  }}
                  disabled={code.length !== 6}
                  style={{
                    width: '300px',
                    padding: '14px 20px',
                    backgroundColor: code.length === 6 ? '#1a1a1a' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: code.length === 6 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    marginBottom: '24px'
                  }}
                >
                  Verify Code
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                  <button
                    onClick={() => {
                      setShowCodeInput(false);
                      setEmailSent(false);
                      setCode('');
                    }}
                    style={{
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
                  
                  <button
                    onClick={async () => {
                      try {
                        if (initialView === 'sign_up') {
                          await signUp?.prepareEmailAddressVerification({
                            strategy: 'email_code',
                          });
                        } else {
                          // Re-send code for sign-in
                          const signInAttempt = await signIn?.create({
                            identifier: email,
                          });
                          const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(
                            (factor: any) => factor.strategy === 'email_code'
                          ) as any;
                          
                          await signIn?.prepareFirstFactor({
                            strategy: 'email_code',
                            emailAddressId: emailCodeFactor.emailAddressId,
                          });
                        }
                        setCode('');
                        alert('New code sent!');
                      } catch (error) {
                        console.error('Error resending code:', error);
                        alert('Failed to resend code. Please try again.');
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      fontSize: '14px',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Resend code
                  </button>
                </div>
              </div>
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
                <p style={{ fontSize: '14px', color: '#999' }}>
                  Enter the 6-digit code to continue
                </p>
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setShowCodeInput(false);
                    setEmail('');
                    setCode('');
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
            )
          )}
      </div>
    </div>
  );
}

export default function ClerkAuthOverlay(props: ClerkAuthOverlayProps) {
  return <ClerkAuthOverlayInner {...props} />;
} 