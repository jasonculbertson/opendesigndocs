import React, { useState, useEffect } from 'react';
import { useUser, useSignIn, useSignUp } from '@clerk/clerk-react';

interface RecruiterAuthProps {
  recruiterProfileUrl: string;
}

export default function RecruiterAuth({ recruiterProfileUrl }: RecruiterAuthProps) {
  const { isSignedIn, user } = useUser();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  // OAuth callback error detection for recruiter pages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      console.log('🚨 Recruiter OAuth callback error:', { error, errorDescription });
      
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      url.searchParams.delete('error_description');
      window.history.replaceState({}, '', url.toString());
      
      // Handle account linking errors
      if (errorDescription?.includes('account') || errorDescription?.includes('exists')) {
        alert('It looks like you already have an account. Please try signing in with your email instead.');
        setAuthMode('sign_in');
        setShowEmailForm(true);
      }
    }
  }, []);
  
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [authMode, setAuthMode] = useState<'sign_up' | 'sign_in'>('sign_up');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn && user) {
      console.log('✅ User already signed in, redirecting to profile');
      window.location.href = recruiterProfileUrl;
    }
  }, [isSignedIn, user, recruiterProfileUrl]);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      
      // Store redirect URL for after auth
      sessionStorage.setItem('recruiter_redirect_url', recruiterProfileUrl);
      
      const currentPageUrl = window.location.href;
      
      // Add immediate visual feedback
      const button = document.querySelector('button[onclick*="handleGoogleAuth"]') as HTMLButtonElement;
      if (button) {
        button.style.opacity = '0.7';
        button.style.cursor = 'wait';
      }
      
      // Universal Google OAuth: Always try signin first (most common case)
      console.log('🔄 Attempting universal Google authentication for recruiter...');
      
      try {
        // Try signin first since most users already have accounts
        await signIn?.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: currentPageUrl,
          redirectUrlComplete: currentPageUrl,
        });
        console.log('✅ Recruiter Google signin successful');
      } catch (signInError: any) {
        console.log('🔄 Recruiter signin failed, trying signup as fallback:', signInError?.message);
        
        // If signin fails, try signup as fallback
        await signUp?.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: currentPageUrl,
          redirectUrlComplete: currentPageUrl,
        });
        console.log('✅ Recruiter Google signup successful');
      }
    } catch (error) {
      console.error('❌ Both Google signin and signup failed for recruiter:', error);
      setIsLoading(false);
      alert('Google authentication failed. Please try again or use email authentication.');
    }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Smart flow: try intended action first, fall back intelligently
      if (authMode === 'sign_up') {
        try {
          const signUpAttempt = await signUp?.create({ emailAddress: email });
          await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
          setEmailSent(true);
          setShowCodeInput(true);
        } catch (signUpError: any) {
          if (signUpError?.message?.includes('already exists') || 
              signUpError?.message?.includes('taken') ||
              signUpError?.code === 'form_identifier_exists') {
            // User exists, switch to signin
            setAuthMode('sign_in');
            const signInAttempt = await signIn?.create({ identifier: email });
            const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(
              (factor: any) => factor.strategy === 'email_code'
            ) as any;
            
            if (emailCodeFactor) {
              await signIn?.prepareFirstFactor({
                strategy: 'email_code',
                emailAddressId: emailCodeFactor.emailAddressId,
              });
              setEmailSent(true);
              setShowCodeInput(true);
            }
          } else {
            throw signUpError;
          }
        }
      } else {
        try {
          const signInAttempt = await signIn?.create({ identifier: email });
          const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(
            (factor: any) => factor.strategy === 'email_code'
          ) as any;
          
          if (emailCodeFactor) {
            await signIn?.prepareFirstFactor({
              strategy: 'email_code',
              emailAddressId: emailCodeFactor.emailAddressId,
            });
            setEmailSent(true);
            setShowCodeInput(true);
          }
        } catch (signInError: any) {
          if (signInError?.message?.includes('not found') || 
              signInError?.message?.includes("doesn't exist") ||
              signInError?.code === 'form_identifier_not_found') {
            // User doesn't exist, switch to signup
            setAuthMode('sign_up');
            const signUpAttempt = await signUp?.create({ emailAddress: email });
            await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
            setEmailSent(true);
            setShowCodeInput(true);
          } else {
            throw signInError;
          }
        }
      }
    } catch (error) {
      console.error('Email auth error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    if (!code.trim()) return;
    
    try {
      setIsLoading(true);
      
      if (authMode === 'sign_up') {
        const result = await signUp?.attemptEmailAddressVerification({ code });
        if (result?.status === 'complete') {
          // Redirect to profile
          window.location.href = recruiterProfileUrl;
        }
      } else {
        const result = await signIn?.attemptFirstFactor({ strategy: 'email_code', code });
        if (result?.status === 'complete') {
          // Redirect to profile
          window.location.href = recruiterProfileUrl;
        }
      }
    } catch (error) {
      console.error('Code verification error:', error);
      alert('Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent && showCodeInput) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Check your email
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            We sent a 6-digit code to {email}
          </p>
        </div>
        
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-lg font-mono"
          maxLength={6}
        />
        
        <button
          onClick={handleCodeSubmit}
          disabled={isLoading || code.length !== 6}
          className="w-full py-3 px-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
        
        <button
          onClick={() => {
            setEmailSent(false);
            setShowCodeInput(false);
            setCode('');
          }}
          className="w-full text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to email
        </button>
      </div>
    );
  }

  if (showEmailForm) {
    return (
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md"
        />
        
        <button
          onClick={handleEmailSubmit}
          disabled={isLoading || !email.trim()}
          className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Continue with Email'}
        </button>
        
        <button
          onClick={() => setShowEmailForm(false)}
          className="w-full text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to options
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Google Auth Button */}
      <button
        onClick={handleGoogleAuth}
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {isLoading ? 'Loading...' : 'Continue with Google'}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500" style={{backgroundColor: '#FAFAFA'}}>or</span>
        </div>
      </div>

      {/* Email Auth Button */}
      <button
        onClick={() => setShowEmailForm(true)}
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue with Email
      </button>

      {/* Sign in/up toggle */}
      <div className="text-center">
        <span className="text-sm text-gray-600">
          {authMode === 'sign_up' ? 'Already have an account?' : "Don't have an account?"}
        </span>
        {' '}
        <button
          onClick={() => setAuthMode(authMode === 'sign_up' ? 'sign_in' : 'sign_up')}
          className="text-sm text-black font-medium hover:text-gray-700 underline"
        >
          {authMode === 'sign_up' ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
  );
}
