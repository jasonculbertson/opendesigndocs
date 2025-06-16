// Standardized authentication event system

export interface AuthEventDetail {
  view?: 'sign_in' | 'sign_up';
  redirectTo?: string;
  context?: 'direct_access' | 'navigation' | 'browsing' | 'manual';
  timestamp?: number;
}

export interface AuthEventListener {
  id: string;
  handler: (detail: AuthEventDetail) => void;
  cleanup?: () => void;
}

class AuthEventManager {
  private listeners: Map<string, AuthEventListener> = new Map();
  private eventQueue: AuthEventDetail[] = [];
  private isProcessing = false;

  /**
   * Add an event listener for auth overlay events
   */
  addEventListener(id: string, handler: (detail: AuthEventDetail) => void): () => void {
    if (typeof window === 'undefined') {
      // SSR fallback
      return () => {};
    }

    const listener: AuthEventListener = {
      id,
      handler,
      cleanup: () => {
        window.removeEventListener('openAuthOverlay', this.handleAuthEvent);
      }
    };

    // Remove existing listener with same ID
    this.removeEventListener(id);

    // Add new listener
    this.listeners.set(id, listener);
    window.addEventListener('openAuthOverlay', this.handleAuthEvent);

    // Return cleanup function
    return () => this.removeEventListener(id);
  }

  /**
   * Remove event listener by ID
   */
  removeEventListener(id: string): boolean {
    const listener = this.listeners.get(id);
    if (listener) {
      if (listener.cleanup) {
        listener.cleanup();
      }
      this.listeners.delete(id);
      
      // If no more listeners, remove window event listener
      if (this.listeners.size === 0) {
        window.removeEventListener('openAuthOverlay', this.handleAuthEvent);
      }
      
      return true;
    }
    return false;
  }

  /**
   * Dispatch auth overlay event
   */
  dispatchAuthEvent(detail: AuthEventDetail): boolean {
    if (typeof window === 'undefined') {
      // Queue for when window is available
      this.eventQueue.push({
        ...detail,
        timestamp: Date.now()
      });
      return false;
    }

    try {
      const enrichedDetail: AuthEventDetail = {
        ...detail,
        timestamp: Date.now()
      };

      const event = new CustomEvent('openAuthOverlay', {
        detail: enrichedDetail,
        bubbles: true,
        cancelable: true
      });

      const success = window.dispatchEvent(event);
      
      if (import.meta.env.DEV) {
        console.log('🎯 Auth event dispatched:', enrichedDetail, 'Success:', success);
      }

      return success;
    } catch (error) {
      console.error('Failed to dispatch auth event:', error);
      return false;
    }
  }

  /**
   * Handle auth overlay events (internal)
   */
  private handleAuthEvent = (event: Event) => {
    if (this.isProcessing) {
      // Prevent event loops
      return;
    }

    this.isProcessing = true;

    try {
      const customEvent = event as CustomEvent<AuthEventDetail>;
      const detail = customEvent.detail || {};

      // Notify all listeners
      this.listeners.forEach((listener) => {
        try {
          listener.handler(detail);
        } catch (error) {
          console.error(`Auth event listener '${listener.id}' failed:`, error);
        }
      });
    } catch (error) {
      console.error('Failed to handle auth event:', error);
    } finally {
      this.isProcessing = false;
    }
  };

  /**
   * Process queued events (for SSR hydration)
   */
  processQueuedEvents(): void {
    if (typeof window === 'undefined' || this.eventQueue.length === 0) {
      return;
    }

    const events = [...this.eventQueue];
    this.eventQueue = [];

    events.forEach((detail) => {
      this.dispatchAuthEvent(detail);
    });
  }

  /**
   * Clear all listeners and queued events
   */
  cleanup(): void {
    this.listeners.forEach((listener) => {
      if (listener.cleanup) {
        listener.cleanup();
      }
    });
    this.listeners.clear();
    this.eventQueue = [];
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('openAuthOverlay', this.handleAuthEvent);
    }
  }

  /**
   * Get current listener count (for debugging)
   */
  getListenerCount(): number {
    return this.listeners.size;
  }
}

// Global instance
export const authEventManager = new AuthEventManager();

// Convenience functions
export const addAuthEventListener = (
  id: string, 
  handler: (detail: AuthEventDetail) => void
): (() => void) => {
  return authEventManager.addEventListener(id, handler);
};

export const removeAuthEventListener = (id: string): boolean => {
  return authEventManager.removeEventListener(id);
};

export const dispatchAuthEvent = (detail: AuthEventDetail): boolean => {
  return authEventManager.dispatchAuthEvent(detail);
};

// Initialize for client-side
if (typeof window !== 'undefined') {
  // Process any queued events on load
  window.addEventListener('load', () => {
    authEventManager.processQueuedEvents();
  });

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    authEventManager.cleanup();
  });
} 