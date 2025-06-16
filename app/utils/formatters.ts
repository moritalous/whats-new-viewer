import { Language } from '../types';

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};

export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

export const formatDate = (dateString: string, language: Language): string => {
  try {
    const date = new Date(dateString);
    const locale = language === 'ja' ? 'ja-JP' : 'en-US';

    // Check if the original date string indicates UTC
    const isUTCSource =
      dateString.includes('GMT') ||
      dateString.includes('UTC') ||
      dateString.endsWith('Z');

    if (isUTCSource) {
      // Display as UTC time
      const utcDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      });
      return `${utcDate} UTC`;
    } else {
      // Display with local timezone
      const localDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
      return localDate;
    }
  } catch {
    return dateString;
  }
};
