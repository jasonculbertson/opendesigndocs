// Analytics utility for tracking Reviews AI interactions

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

  // Track a custom event
  track(event: string, properties?: Record<string, any>) {
    const trackingEvent: TrackingEvent = {
      event,
      properties,
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

  // Track Reviews AI specific events
  trackReviewsAIButtonClick(buttonType: string, buttonText?: string) {
    this.track('reviews_ai_button_click', {
      button_type: buttonType,
      button_text: buttonText,
      page: 'reviews-ai',
      timestamp: new Date().toISOString()
    });
  }

  trackReviewsAIFlowStart(flowType: string) {
    this.track('reviews_ai_flow_start', {
      flow_type: flowType,
      page: 'reviews-ai',
      timestamp: new Date().toISOString()
    });
  }

  trackReviewsAIFlowComplete(flowType: string, duration?: number) {
    this.track('reviews_ai_flow_complete', {
      flow_type: flowType,
      duration,
      page: 'reviews-ai',
      timestamp: new Date().toISOString()
    });
  }

  trackReviewsAIFileUpload(fileType: string, fileSize?: number) {
    this.track('reviews_ai_file_upload', {
      file_type: fileType,
      file_size: fileSize,
      page: 'reviews-ai',
      timestamp: new Date().toISOString()
    });
  }

  trackReviewsAIStep(step: string, flowType: string) {
    this.track('reviews_ai_step', {
      step,
      flow_type: flowType,
      page: 'reviews-ai',
      timestamp: new Date().toISOString()
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

// Export specific tracking functions for convenience
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