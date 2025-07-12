// Google Analytics utility functions for enhanced tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Check if GA is loaded
function isGALoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

// Track authenticated user
export function trackAuthenticatedUser(userId: string): void {
  if (!isGALoaded()) return;

  window.gtag('config', import.meta.env.PUBLIC_GA_MEASUREMENT_ID, {
    user_id: userId,
    custom_map: {
      'custom_parameter_1': 'authenticated'
    }
  });
}

// Track custom events
export function trackEvent(eventName: string, parameters?: Record<string, any>): void {
  if (!isGALoaded()) return;

  window.gtag('event', eventName, {
    event_category: 'engagement',
    event_label: parameters?.label || '',
    value: parameters?.value || 0,
    ...parameters
  });
}

// Track page views manually (useful for SPA routing)
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (!isGALoaded()) return;

  window.gtag('config', import.meta.env.PUBLIC_GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle || document.title
  });
}

// Enhanced tracking for document access
export function trackDocumentAccess(documentType: string, documentId: string, documentTitle?: string): void {
  trackEvent('document_access', {
    event_category: 'content',
    document_type: documentType,
    document_id: documentId,
    document_title: documentTitle,
    page_location: window.location.href
  });
}

// Track navigation
export function trackNavigation(linkText: string, destination: string, linkType: string = 'internal'): void {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    link_text: linkText,
    link_destination: destination,
    link_type: linkType,
    source_page: window.location.pathname
  });
}

// Initialize enhanced tracking when user is authenticated
export function initializeAuthenticatedTracking(): void {
  if (typeof window === 'undefined') return;

  function setupUserTracking() {
    if (window.Clerk?.user?.id) {
      trackAuthenticatedUser(window.Clerk.user.id);
    }
  }

  // Check immediately if Clerk is already loaded
  if (window.Clerk?.user?.id) {
    setupUserTracking();
  }

  // Listen for Clerk to load
  window.addEventListener('clerk:loaded', setupUserTracking);

  // Poll for Clerk user (fallback)
  const checkAuth = setInterval(() => {
    if (window.Clerk?.user?.id) {
      setupUserTracking();
      clearInterval(checkAuth);
    }
  }, 1000);

  // Stop polling after 10 seconds
  setTimeout(() => clearInterval(checkAuth), 10000);
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Wait for GA to load, then initialize enhanced tracking
  const initGA = setInterval(() => {
    if (isGALoaded()) {
      initializeAuthenticatedTracking();
      clearInterval(initGA);
    }
  }, 100);

  // Stop trying after 10 seconds
  setTimeout(() => clearInterval(initGA), 10000);
} 