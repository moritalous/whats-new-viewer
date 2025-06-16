'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';

export const GoogleAnalytics = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Only load GA when GA ID is provided
  if (!gaId) {
    return null;
  }

  return <GA gaId={gaId} />;
};
