// Google Analytics utility functions using @next/third-parties/google

import { sendGAEvent } from '@next/third-parties/google';

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  sendGAEvent({
    event: action,
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track RSS refresh events
export const trackRSSRefresh = (language: string) => {
  trackEvent('refresh_rss', 'user_interaction', `language_${language}`);
};

// Track language change events
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('change_language', 'user_interaction', `${fromLang}_to_${toLang}`);
};

// Track pagination events
export const trackPagination = (page: number, totalPages: number) => {
  trackEvent(
    'navigate_page',
    'user_interaction',
    `page_${page}_of_${totalPages}`,
    page
  );
};

// Track search/filter events
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'user_interaction', query, resultsCount);
};
