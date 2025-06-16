/**
 * @jest-environment node
 */

import { GET } from '../../app/api/rss/route';
import { NextRequest } from 'next/server';

// Mock rss-parser
jest.mock('rss-parser', () => {
  return jest.fn().mockImplementation(() => ({
    parseURL: jest.fn().mockResolvedValue({
      title: "AWS What's New",
      description: 'Latest AWS announcements',
      link: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
      items: [
        {
          title: 'Test Article 1',
          link: 'https://example.com/article1',
          pubDate: '2025-06-13T19:50:00Z',
          contentSnippet: 'Test content snippet 1',
          content: 'Test full content 1',
          guid: 'guid1',
        },
        {
          title: 'Test Article 2',
          link: 'https://example.com/article2',
          pubDate: '2025-06-13T20:00:00Z',
          contentSnippet: 'Test content snippet 2',
          content: 'Test full content 2',
          guid: 'guid2',
        },
      ],
    }),
  }));
});

describe('/api/rss', () => {
  it('should return RSS data successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/rss?lang=en');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items).toHaveLength(2);
  });

  it('should handle different language parameters', async () => {
    const request = new NextRequest('http://localhost:3000/api/rss?lang=ja');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('items');
  });

  it('should default to English when no lang parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/rss');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('title');
  });
});
