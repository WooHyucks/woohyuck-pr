import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = 'c151e0599ecd2fe49e494a801b61d7b0';

/**
 * Initializes Amplitude Analytics
 */
export const initAmplitude = () => {
  if (typeof window !== 'undefined') {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
        formInteractions: false,
        fileDownloads: false,
      },
    });
  }
};

/**
 * Custom tracking function for generic events
 */
export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  amplitude.track(eventName, eventProperties);
};

/**
 * Helper tracking functions for structured events
 */
export const amplitudeEvents = {
  // Page Navigation / Views
  pageView: (pageName: string) => {
    trackEvent('page_viewed', { page_name: pageName });
  },

  // CTA Button Clicks
  clickConsultation: (location: 'hero' | 'pricing' | 'contact' | 'floating') => {
    trackEvent('click_consultation_button', { click_location: location });
  },

  // Modal Actions
  openConsultationModal: (location: string) => {
    trackEvent('consultation_modal_opened', { opened_from: location });
  },
  closeConsultationModal: () => {
    trackEvent('consultation_modal_closed');
  },

  // Form Submissions
  submitConsultation: (status: 'success' | 'failure', errorMsg?: string) => {
    trackEvent('consultation_form_submitted', { status, error_message: errorMsg });
  },

  // Project Clicks
  clickProject: (projectName: string) => {
    trackEvent('click_project_card', { project_name: projectName });
  },

  // Social Links Clicks
  clickExternalLink: (platform: 'github' | 'phone' | 'email') => {
    trackEvent('click_external_link', { platform });
  },

  // Pricing Tiers click
  clickPricingTier: (tierId: string, tierName: string) => {
    trackEvent('click_pricing_tier', { tier_id: tierId, tier_name: tierName });
  }
};
