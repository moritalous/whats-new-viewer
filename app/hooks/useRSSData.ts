import { useState, useEffect, useCallback } from 'react';
import { RSSFeed, Language, LanguageTexts } from '../types';

export const useRSSData = (
  language: Language | null,
  currentTexts: LanguageTexts
) => {
  const [rssData, setRssData] = useState<RSSFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRSSData = useCallback(async () => {
    if (!language) return; // Don't fetch if language is not set

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/rss?lang=${language}`);

      if (!response.ok) {
        throw new Error(currentTexts.errorFetch);
      }

      const data: RSSFeed = await response.json();
      setRssData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : currentTexts.unknownError);
    } finally {
      setLoading(false);
    }
  }, [language, currentTexts.errorFetch, currentTexts.unknownError]);

  useEffect(() => {
    fetchRSSData();
  }, [fetchRSSData]);

  return {
    rssData,
    loading,
    error,
    refetch: fetchRSSData,
  };
};
