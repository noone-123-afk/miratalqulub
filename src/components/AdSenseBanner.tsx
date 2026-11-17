import React from 'react';

interface Props {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
  responsive?: boolean;
}

/**
 * AdSenseBanner no longer renders fake ad placeholders or unapproved ad claims.
 * Real AdSense verification is handled via the <meta name="google-adsense-account">
 * and official adsbygoogle.js script in index.html.
 */
export const AdSenseBanner: React.FC<Props> = () => {
  return null;
};
