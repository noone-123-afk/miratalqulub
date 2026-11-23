import React, { useEffect } from 'react';
import { SupportedLanguage } from '../data/translations';

export interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  language: SupportedLanguage;
  pageType?: 'website' | 'article' | 'about' | 'contact' | 'terms' | 'privacy';
  ogImageUrl?: string;
  structuredData?: Record<string, any>;
}

const DEFAULT_OG_IMAGE = 'https://miratalqulub.com/og-image.jpg';

export const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  canonicalPath,
  language,
  pageType = 'website',
  ogImageUrl = DEFAULT_OG_IMAGE,
  structuredData,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', description);

    // 3. Update Canonical Link
    const fullCanonicalUrl = `https://miratalqulub.com${canonicalPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Update OpenGraph Tags
    const setOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const resolvedImageUrl = ogImageUrl.startsWith('http')
      ? ogImageUrl
      : `https://miratalqulub.com${ogImageUrl.startsWith('/') ? ogImageUrl : `/${ogImageUrl}`}`;

    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:url', fullCanonicalUrl);
    setOgMeta('og:type', pageType === 'article' ? 'article' : 'website');
    setOgMeta('og:locale', language === 'ar' ? 'ar_AR' : 'en_US');
    setOgMeta('og:site_name', language === 'ar' ? 'مِـرآة القـلوب' : 'Mirror of Hearts');
    setOgMeta('og:image', resolvedImageUrl);
    setOgMeta('og:image:secure_url', resolvedImageUrl);
    setOgMeta('og:image:type', 'image/jpeg');
    setOgMeta('og:image:width', '1200');
    setOgMeta('og:image:height', '630');
    setOgMeta('og:image:alt', title);

    // 5. Update Twitter Cards
    const setTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setTwitterMeta('twitter:card', 'summary_large_image');
    setTwitterMeta('twitter:title', title);
    setTwitterMeta('twitter:description', description);
    setTwitterMeta('twitter:image', resolvedImageUrl);
    setTwitterMeta('twitter:image:alt', title);

    // 6. Dynamic JSON-LD Structured Data
    const scriptId = 'page-dynamic-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup dynamic JSON-LD on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalPath, language, pageType, ogImageUrl, structuredData]);

  return null;
};
