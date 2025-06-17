'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
  language?: string;
}

/**
 * SEO component for dynamic page-specific SEO settings
 * This complements the static metadata in layout.tsx
 */
export const SEO = ({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noindex = false,
  structuredData,
  language = 'en',
}: SEOProps) => {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aws-whats-new.example.com';
  const currentUrl = canonicalUrl || `${baseUrl}${pathname}`;
  const imageUrl = ogImage || `${baseUrl}/og-image.png`;

  // Default structured data for articles if not provided
const imageUrl = ogImage || `${baseUrl}/og-image.png`;

  // Default structured data for articles if not provided
  const defaultStructuredData = useMemo(() => structuredData || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: currentUrl,
  }, [structuredData, title, description, currentUrl]);

  return (
    <Head>
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: currentUrl,
  };

  return (
    <Head>
      {/* These tags will supplement the metadata in layout.tsx */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang for language variants */}
      <link rel="alternate" hrefLang={language} href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* Open Graph */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'ja_JP'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={imageUrl} />
      
      {/* No index if specified */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultStructuredData) }}
      />
    </Head>
  );
};