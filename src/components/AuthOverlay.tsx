import React, { useState, useEffect, useRef } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'; 
import { createSupabaseBrowserClient } from '../lib/supabase'; 

interface OpenAuthEventDetail {
  view?: 'sign_in' | 'sign_up'; 
}

interface OpenAuthEvent extends CustomEvent<OpenAuthEventDetail> {}

const AuthOverlay: React.FC = () => {
  const [supabaseClient] = useState(() => createSupabaseBrowserClient()); 
  const [isOpen, setIsOpen] = useState(false);
  const [authTitle, setAuthTitle] = useState('Welcome back.'); 
  const [initialView, setInitialView] = useState<'sign_in' | 'sign_up'>('sign_in'); 
  const [marketingConsent, setMarketingConsent] = useState(true); 
  const overlayRef = useRef<HTMLDivElement>(null);
  const authContentRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleOpenAuth = (event: Event) => {
      const customEvent = event as OpenAuthEvent;
      const view = customEvent.detail?.view || 'sign_in';

      setInitialView(view); 
      setAuthTitle(view === 'sign_up' ? 'Get unlimited free access' : 'Welcome back.');
      setIsOpen(true);
    };

    document.addEventListener('openAuthOverlay', handleOpenAuth);

    return () => {
      document.removeEventListener('openAuthOverlay', handleOpenAuth);
    };
  }, []);

  useEffect(() => {
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
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && authContentRef.current) {
      const observer = new MutationObserver(() => {
        const content = authContentRef.current?.innerText || '';
        if (content.includes('Create a password')) {
          setAuthTitle('Get unlimited free access');
        } else {
          setAuthTitle('Welcome back.');
        }
      });

      observer.observe(authContentRef.current, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '/auth/callback';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(8px)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000 
    }}>
      <div ref={overlayRef} style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        maxWidth: '480px', width: '90%', position: 'relative',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none',
            fontSize: '1.8rem', cursor: 'pointer', color: '#6b7280', lineHeight: '1'
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <div style={{ maxWidth: '400px', width: '90%', margin: '0 auto' }}> 
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem', color: '#111827' }}>
            {authTitle}
          </h1>
          <div ref={authContentRef}>
            {/* ~~Marketing Consent Checkbox Moved From Here~~ */} 
            <Auth
              supabaseClient={supabaseClient}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(0, 0, 0)',
                      brandAccent: 'rgb(0, 0, 0)',
                      brandButtonText: 'white',
                    },
                    radii: {
                      buttonBorderRadius: '0.5rem', 
                      inputBorderRadius: '0.5rem',
                    }
                  },
                },
              }}
              providers={['google']}
              redirectTo={redirectTo}
              localization={{
                variables: {
                  sign_in: { email_label: 'Your email address', password_label: 'Your password' },
                  sign_up: { email_label: 'Your email address', password_label: 'Create a password' },
                },
              }}
              view={initialView} 
            />
            {/* Marketing Consent Checkbox - Renders only on sign-up, after Auth component, left-aligned */} 
            {authTitle === 'Get unlimited free access' && (
              <div style={{ marginTop: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="marketingConsent"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  style={{ marginRight: '0.5rem', height: '1rem', width: '1rem', cursor: 'pointer', accentColor: '#000000' /* Use accent-color for checkbox */ }}
                />
                <label htmlFor="marketingConsent" style={{ fontSize: '0.875rem', color: '#000000 !important', cursor: 'pointer' /* Keep label black */ }}>
                  I agree to receive update messages.
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
