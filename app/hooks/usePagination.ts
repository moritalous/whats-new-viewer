import { useState } from 'react';
import { RSSFeed } from '../types';

export const usePagination = (rssData: RSSFeed | null, isMobile: boolean) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringText, setFilteringText] = useState('');
  const itemsPerPage = 10;

  // Pagination data calculation with filtering
  const getFilteredItems = () => {
    if (!rssData?.items) return [];

    // Mobile doesn't use filtering
    if (isMobile || !filteringText) return rssData.items;

    const filterText = filteringText.toLowerCase();
    return rssData.items.filter(
      (item) =>
        item.title.toLowerCase().includes(filterText) ||
        item.contentSnippet.toLowerCase().includes(filterText) ||
        item.content.toLowerCase().includes(filterText)
    );
  };

  const getCurrentPageItems = () => {
    const itemsToUse = isMobile ? rssData?.items || [] : getFilteredItems();
    const startIndex = (currentPageIndex - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return itemsToUse.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const itemsToUse = isMobile ? rssData?.items || [] : getFilteredItems();
    return Math.ceil(itemsToUse.length / itemsPerPage);
  };

  // Page change handler
  const handlePageChange = ({
    detail,
  }: {
    detail: { currentPageIndex: number };
  }) => {
    setCurrentPageIndex(detail.currentPageIndex);

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Filter change handler
  const handleFilterChange = ({
    detail,
  }: {
    detail: { filteringText: string };
  }) => {
    setFilteringText(detail.filteringText);
    setCurrentPageIndex(1); // Reset to first page when filtering
  };

  return {
    currentPageIndex,
    filteringText,
    getCurrentPageItems,
    getFilteredItems,
    getTotalPages,
    handlePageChange,
    handleFilterChange,
  };
};
