import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://whats-new.example.com';

  // Fetch RSS articles to include in sitemap
  try {
    // Use actual API endpoint in production
    const rssApiUrl =
      process.env.NODE_ENV === 'production'
        ? `${baseUrl}/api/rss`
        : 'http://localhost:3000/api/rss';

    const response = await fetch(rssApiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS data: ${response.status}`);
    }

    const rssData = await response.json();

    const rssEntries: MetadataRoute.Sitemap =
      rssData.items
        ?.slice(0, 100)
        .map((item: { link: string; pubDate: string }) => ({
          url: item.link,
          lastModified: new Date(item.pubDate),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        })) || [];

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...rssEntries,
    ];
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    // Return only base URL on error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
