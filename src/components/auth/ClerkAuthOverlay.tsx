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
  const [redirectTo, setRedirectTo] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isManualRedirect, setIsManualRedirect] = useState(false);
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Now safe to call hooks - only called on client
  const { isSignedIn } = useUser();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

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
    const handleOpenAuth = (detail: AuthEventDetail) => {
      const view = detail.view || 'sign_in';
      const redirect = detail.redirectTo;
      const finalRedirect = redirect || (typeof window !== 'undefined' ? window.location.pathname : '/');

      console.log('🎯 Auth overlay opened:', { 
        view, 
        redirect, 
        finalRedirect,
        context: detail.context,
        timestamp: detail.timestamp,
        currentPath: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
      });
      
      setInitialView(view);
      setRedirectTo(finalRedirect);
      setAuthTitle(view === 'sign_up' ? 'Get unlimited free access' : 'Welcome back');
      setIsOpen(true);
    };
    
    // Use the standardized event system
    const cleanup = addAuthEventListener('ClerkAuthOverlay', handleOpenAuth);
    
    return cleanup;
  }, []); // No dependencies - set up once and keep

  // Close overlay if user is signed in (only on client)
  useEffect(() => {
    if (isSignedIn && !isManualRedirect) {
      console.log('✅ User signed in, closing overlay and redirecting to:', redirectTo);
      console.log('🔍 Current URL:', window.location.href);
      console.log('🔍 Current pathname:', window.location.pathname);
      console.log('🔍 IsManualRedirect:', isManualRedirect);
      setIsOpen(false);
      
      // Redirect if needed - skip homepage redirect
      if (redirectTo && typeof window !== 'undefined' && redirectTo !== window.location.pathname) {
        const finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
        console.log('🔄 AUTO-REDIRECT: Redirecting from', window.location.pathname, 'to', finalRedirect, '(original redirectTo:', redirectTo, ')');
        // Use setTimeout to ensure overlay closes first
        setTimeout(() => {
          console.log('🔄 AUTO-REDIRECT: Executing redirect now...');
          window.location.href = finalRedirect;
        }, 100);
      } else {
        console.log('🔄 AUTO-REDIRECT: No redirect needed. redirectTo:', redirectTo, 'current path:', window.location.pathname);
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
                      // If redirectTo is homepage, use the default target page instead
                      const finalRedirectTo = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                      const finalRedirectUrl = `${window.location.origin}${finalRedirectTo}`;
                      
                      console.log('🔄 Starting OAuth with redirect:', {
                        initialView,
                        originalRedirectTo: redirectTo,
                        finalRedirectTo,
                        finalRedirectUrl,
                        windowLocation: window.location.href,
                      });
                      if (initialView === 'sign_up') {
                        await signUp?.authenticateWithRedirect({
                          strategy: 'oauth_google',
                          redirectUrl: finalRedirectUrl,
                          redirectUrlComplete: finalRedirectUrl,
                        });
                      } else {
                        await signIn?.authenticateWithRedirect({
                          strategy: 'oauth_google',
                          redirectUrl: finalRedirectUrl,
                          redirectUrlComplete: finalRedirectUrl,
                        });
                      }
                    } catch (error) {
                      console.error('Google OAuth error:', error);
                      
                      // Handle session exists error
                      if (error && typeof error === 'object' && 'errors' in error) {
                        const errors = (error as any).errors;
                        if (errors?.[0]?.code === 'session_exists') {
                          console.log('Session already exists, attempting to use existing session');
                          // If there's already a session, just close the overlay and redirect
                          setIsOpen(false);
                          const finalRedirect = redirectTo === '/' ? '/docs/levels/levels-titles' : redirectTo;
                          setTimeout(() => {
                            window.location.href = finalRedirect;
                          }, 100);
                          return;
                        }
                      }
                      
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
                    console.log('🔄 Starting email verification for:', { email, initialView });
                    
                    if (initialView === 'sign_up') {
                      console.log('📝 Creating signup attempt...');
                      // Create signup attempt first
                      const signUpAttempt = await signUp?.create({
                        emailAddress: email,
                      });
                      console.log('✅ Signup attempt created:', signUpAttempt?.id);
                      
                      // Send email verification code
                      console.log('📧 Preparing email verification...');
                      await signUp?.prepareEmailAddressVerification({
                        strategy: 'email_code',
                      });
                      console.log('✅ Email verification code sent');
                      
                      setEmailSent(true);
                      setShowCodeInput(true);
                    } else {
                      console.log('🔑 Creating signin attempt...');
                      // For sign in, create the attempt first to get supported factors
                      const signInAttempt = await signIn?.create({
                        identifier: email,
                      });
                      console.log('✅ Signin attempt created:', signInAttempt?.id);
                      console.log('🔍 Supported factors:', signInAttempt?.supportedFirstFactors);

                      // Find email code factor from supported first factors
                      const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(
                        (factor: any) => factor.strategy === 'email_code'
                      ) as any;

                      if (!emailCodeFactor) {
                        console.error('❌ No email code factor found');
                        throw new Error('Email code sign-in is not available for this user');
                      }
                      console.log('✅ Email code factor found:', emailCodeFactor);

                      // Prepare the email code verification
                      console.log('📧 Preparing email verification...');
                      await signIn?.prepareFirstFactor({
                        strategy: 'email_code',
                        emailAddressId: emailCodeFactor.emailAddressId,
                      });
                      console.log('✅ Email verification code sent');
                      
                      setEmailSent(true);
                      setShowCodeInput(true);
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
                          setIsManualRedirect(true);
                          
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
                              setIsManualRedirect(true);
                              
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
                          setIsManualRedirect(true);
                          
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