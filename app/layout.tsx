import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@cloudscape-design/global-styles/index.css';
import { GoogleAnalytics } from './components/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
});

// Base URL for canonical links and OG images
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aws-whats-new.example.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#232f3e', // AWS dark blue color
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AWS What's New - RSS Reader",
    template: "%s | AWS What's New",
  },
  description:
    'Stay updated with the latest AWS announcements, features, and updates through our RSS reader application',
  keywords: ['AWS', 'Amazon Web Services', 'RSS', 'cloud computing', 'updates', 'announcements', 'tech news'],
  authors: [{ name: 'AWS What\'s New Team' }],
  creator: 'AWS What\'s New Team',
  publisher: 'AWS What\'s New',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  
  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: "AWS What's New - RSS Reader",
    title: "AWS What's New - RSS Reader",
    description: 'Stay updated with the latest AWS announcements, features, and updates through our RSS reader application',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AWS What's New - RSS Reader",
      },
    ],
  },
  
  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: "AWS What's New - RSS Reader",
    description: 'Stay updated with the latest AWS announcements, features, and updates through our RSS reader application',
    images: [`${baseUrl}/twitter-image.png`],
    creator: '@AWSCloud',
    site: '@AWSCloud',
  },
  
  // Verification for search engines
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  },
  
  // Canonical URL
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add structured data for better search engine understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: "AWS What's New - RSS Reader",
              description: 'Stay updated with the latest AWS announcements, features, and updates through our RSS reader application',
              url: baseUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${baseUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
