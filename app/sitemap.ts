import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aws-whats-new.example.com';
  
  return [
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aws-whats-new.example.com';
  
  const createSitemapEntry = (path: string, priority: number) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority,
  });

  return [
    createSitemapEntry('', 1),
    createSitemapEntry('/en', 0.8),
    createSitemapEntry('/ja', 0.8),
    // Add more URLs as needed
  ];
}
      url: baseUrl,
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aws-whats-new.example.com';
  const lastModified = new Date(); // Create a single date object
  
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ja`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ja`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Add more URLs as needed
  ];
}