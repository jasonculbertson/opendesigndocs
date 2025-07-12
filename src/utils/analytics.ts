// Analytics utility for tracking site-wide interactions

interface TrackingEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class AnalyticsTracker {
  private events: TrackingEvent[] = [];
  private isEnabled = true;

  constructor() {
    // Check if we're in development mode
    if (typeof window !== 'undefined') {
      this.isEnabled = process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost';
    }
  }

  // Helper function to get common properties
  private getCommonProperties() {
    if (typeof window === 'undefined') return {};
    
    return {
      page_url: window.location.href,
      page_path: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId()
    };
  }

  // Helper function to get or create session ID
  private getSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Helper function to get user ID from Clerk if available
  private getUserId(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try to get user ID from Clerk
    if ((window as any).Clerk?.user?.id) {
      return (window as any).Clerk.user.id;
    }
    
    return null;
  }

  // Track a custom event
  track(event: string, properties?: Record<string, any>) {
    const trackingEvent: TrackingEvent = {
      event,
      properties: {
        ...this.getCommonProperties(),
        user_id: this.getUserId(),
        ...properties
      },
      timestamp: Date.now()
    };

    this.events.push(trackingEvent);

    // Log to console in development
    if (!this.isEnabled) {
      console.log('📊 Analytics Event:', trackingEvent);
    }

    // Send to analytics service in production
    if (this.isEnabled) {
      this.sendToAnalytics(trackingEvent);
    }
  }

  // === GENERAL SITE TRACKING ===

  // Track page views
  trackPageView(page?: string, category?: string) {
    this.track('page_view', {
      page: page || (typeof window !== 'undefined' ? window.location.pathname : ''),
      page_category: category,
      page_title: typeof document !== 'undefined' ? document.title : ''
    });
  }

  // Track document/guide access
  trackDocumentAccess(documentType: string, documentId: string, documentTitle?: string) {
    this.track('document_access', {
      document_type: documentType,
      document_id: documentId,
      document_title: documentTitle,
      page_category: 'documentation'
    });
  }

  // Track navigation clicks
  trackNavigation(linkText: string, destination: string, linkType: string = 'internal') {
    this.track('navigation_click', {
      link_text: linkText,
      destination,
      link_type: linkType, // 'internal', 'external', 'cta', 'menu'
      source_page: typeof window !== 'undefined' ? window.location.pathname : ''
    });
  }

  // Track authentication events
  trackAuth(action: string, method?: string) {
    this.track('auth_event', {
      action, // 'login', 'logout', 'signup', 'login_attempt'
      auth_method: method, // 'email', 'google', 'github', etc.
      page_category: 'authentication'
    });
  }

  // === REVIEWS AI TRACKING (existing) ===

  // Track Reviews AI specific events
  trackReviewsAIButtonClick(buttonType: string, buttonText?: string) {
    this.track('reviews_ai_button_click', {
      button_type: buttonType,
      button_text: buttonText,
      page_category: 'reviews-ai'
    });
  }

  trackReviewsAIFlowStart(flowType: string) {
    this.track('reviews_ai_flow_start', {
      flow_type: flowType,
      page_category: 'reviews-ai'
    });
  }

  trackReviewsAIFlowComplete(flowType: string, duration?: number) {
    this.track('reviews_ai_flow_complete', {
      flow_type: flowType,
      duration,
      page_category: 'reviews-ai'
    });
  }

  trackReviewsAIFileUpload(fileType: string, fileSize?: number) {
    this.track('reviews_ai_file_upload', {
      file_type: fileType,
      file_size: fileSize,
      page_category: 'reviews-ai'
    });
  }

  trackReviewsAIStep(step: string, flowType: string) {
    this.track('reviews_ai_step', {
      step,
      flow_type: flowType,
      page_category: 'reviews-ai'
    });
  }

  // Send to analytics service (Vercel Analytics or custom endpoint)
  private async sendToAnalytics(event: TrackingEvent) {
    try {
      // Try to use Vercel Analytics if available
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('event', {
          name: event.event,
          data: event.properties
        });
      }

      // Also send to a custom endpoint if needed
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  // Get all tracked events (useful for debugging)
  getEvents(): TrackingEvent[] {
    return [...this.events];
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }
}

// Create a singleton instance
export const analytics = new AnalyticsTracker();

// Export general tracking functions
export const trackGeneral = {
  pageView: (page?: string, category?: string) => 
    analytics.trackPageView(page, category),
  
  documentAccess: (documentType: string, documentId: string, documentTitle?: string) => 
    analytics.trackDocumentAccess(documentType, documentId, documentTitle),
  
  navigation: (linkText: string, destination: string, linkType?: string) => 
    analytics.trackNavigation(linkText, destination, linkType),
  
  auth: (action: string, method?: string) => 
    analytics.trackAuth(action, method)
};

// Export Reviews AI tracking functions (existing)
export const trackReviewsAI = {
  buttonClick: (buttonType: string, buttonText?: string) => 
    analytics.trackReviewsAIButtonClick(buttonType, buttonText),
  
  flowStart: (flowType: string) => 
    analytics.trackReviewsAIFlowStart(flowType),
  
  flowComplete: (flowType: string, duration?: number) => 
    analytics.trackReviewsAIFlowComplete(flowType, duration),
  
  fileUpload: (fileType: string, fileSize?: number) => 
    analytics.trackReviewsAIFileUpload(fileType, fileSize),
  
  step: (step: string, flowType: string) => 
    analytics.trackReviewsAIStep(step, flowType)
}; 