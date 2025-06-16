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

export type Language = 'en' | 'ja';

export interface LanguageTexts {
  pageTitle: string;
  refreshButton: string;
  sectionTitle: string;
  loading: string;
  noArticles: string;
  noArticlesDesc: string;
  errorFetch: string;
  unknownError: string;
  resetPage: string;
  nextPage: string;
  prevPage: string;
  pageLabel: (num: number) => string;
  filterPlaceholder: string;
  filterAriaLabel: string;
  disclaimerText: string;
  tableHeaders: {
    title: string;
    description: string;
    publishedDate: string;
  };
}
