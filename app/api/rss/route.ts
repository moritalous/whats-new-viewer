import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  guid: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  items: RSSItem[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

    const parser = new Parser({
      customFields: {
        item: ['guid'],
      },
    });

    // Select RSS URL based on language
    const rssUrl =
      lang === 'ja'
        ? 'https://aws.amazon.com/jp/about-aws/whats-new/recent/feed/'
        : 'https://aws.amazon.com/about-aws/whats-new/recent/feed/';

    const feed = await parser.parseURL(rssUrl);

    const rssData: RSSFeed = {
      title: feed.title || "AWS What's New",
      description:
        feed.description ||
        (lang === 'ja'
          ? 'Latest AWS announcements'
          : 'Latest AWS announcements'),
      link: feed.link || '',
      items: feed.items.map((item) => {
        // Log the original date format for debugging
        if (process.env.NODE_ENV === 'development' && item.pubDate) {
          console.log('Original pubDate format:', item.pubDate);
        }

        return {
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          contentSnippet: item.contentSnippet || '',
          content: item.content || '',
          guid: item.guid || item.link || '',
        };
      }),
    };

    return NextResponse.json(rssData);
  } catch (error) {
    console.error('RSS fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}
