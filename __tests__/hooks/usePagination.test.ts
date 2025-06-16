import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../app/hooks/usePagination';
import { RSSFeed } from '../../app/types';

const mockRSSData: RSSFeed = {
  title: 'Test RSS',
  description: 'Test Description',
  link: 'https://example.com',
  items: Array.from({ length: 25 }, (_, i) => ({
    title: `Article ${i + 1}`,
    link: `https://example.com/article-${i + 1}`,
    pubDate: '2025-06-13T19:50:00Z',
    contentSnippet: `Content snippet ${i + 1}`,
    content: `Full content ${i + 1}`,
    guid: `guid-${i + 1}`,
  })),
};

describe('usePagination', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePagination(mockRSSData, false));

    expect(result.current.currentPageIndex).toBe(1);
    expect(result.current.filteringText).toBe('');
    expect(result.current.getCurrentPageItems()).toHaveLength(10);
    expect(result.current.getTotalPages()).toBe(3); // 25 items / 10 per page = 3 pages
  });

  it('should handle page changes correctly', () => {
    const { result } = renderHook(() => usePagination(mockRSSData, false));

    act(() => {
      result.current.handlePageChange({ detail: { currentPageIndex: 2 } });
    });

    expect(result.current.currentPageIndex).toBe(2);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should filter items correctly on desktop', () => {
    const { result } = renderHook(() => usePagination(mockRSSData, false));

    act(() => {
      result.current.handleFilterChange({
        detail: { filteringText: 'Article 1' },
      });
    });

    expect(result.current.filteringText).toBe('Article 1');
    expect(result.current.currentPageIndex).toBe(1); // Should reset to page 1

    const filteredItems = result.current.getFilteredItems();
    expect(filteredItems).toHaveLength(11); // Article 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
  });

  it('should not filter items on mobile', () => {
    const { result } = renderHook(() => usePagination(mockRSSData, true));

    act(() => {
      result.current.handleFilterChange({
        detail: { filteringText: 'Article 1' },
      });
    });

    // On mobile, filtering should be ignored
    const filteredItems = result.current.getFilteredItems();
    expect(filteredItems).toHaveLength(25); // All items
  });

  it('should handle empty RSS data', () => {
    const { result } = renderHook(() => usePagination(null, false));

    expect(result.current.getCurrentPageItems()).toHaveLength(0);
    expect(result.current.getTotalPages()).toBe(0);
    expect(result.current.getFilteredItems()).toHaveLength(0);
  });

  it('should handle case-insensitive filtering', () => {
    const { result } = renderHook(() => usePagination(mockRSSData, false));

    act(() => {
      result.current.handleFilterChange({
        detail: { filteringText: 'ARTICLE 5' },
      });
    });

    const filteredItems = result.current.getFilteredItems();
    expect(filteredItems.length).toBeGreaterThan(0);
    expect(filteredItems.some((item) => item.title.includes('Article 5'))).toBe(
      true
    );
  });

  it('should filter by content snippet', () => {
    const { result } = renderHook(() => usePagination(mockRSSData, false));

    act(() => {
      result.current.handleFilterChange({
        detail: { filteringText: 'snippet 3' },
      });
    });

    const filteredItems = result.current.getFilteredItems();
    expect(
      filteredItems.some((item) => item.contentSnippet.includes('snippet 3'))
    ).toBe(true);
  });
});
