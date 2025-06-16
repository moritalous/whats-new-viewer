import { Language, LanguageTexts } from '../types';

export const texts: Record<Language, LanguageTexts> = {
  en: {
    pageTitle: "What\'s New Viewer",
    refreshButton: 'Refresh',
    sectionTitle: 'Latest AWS Updates',
    loading: 'Loading RSS feed...',
    noArticles: 'No articles found',
    noArticlesDesc: 'No articles available in the RSS feed.',
    errorFetch: 'Failed to fetch RSS data',
    unknownError: 'An unknown error occurred',
    resetPage: 'Reset to page 1 when data is updated',
    nextPage: 'Next page',
    prevPage: 'Previous page',
    pageLabel: (num: number) => `Page ${num}`,
    filterPlaceholder: 'Search articles...',
    filterAriaLabel: 'Search articles',
    disclaimerText:
      "This is an unofficial RSS reader for AWS What's New. Not affiliated with Amazon Web Services.",
    tableHeaders: {
      title: 'Title',
      description: 'Description',
      publishedDate: 'Published Date',
    },
  },
  ja: {
    pageTitle: "What\'s New Viewer",
    refreshButton: '更新',
    sectionTitle: '最新のAWSアップデート',
    loading: 'RSSフィードを読み込み中...',
    noArticles: '記事が見つかりません',
    noArticlesDesc: 'RSSフィードに記事がありません。',
    errorFetch: 'RSSデータの取得に失敗しました',
    unknownError: '不明なエラーが発生しました',
    resetPage: 'データ更新時はページを1に戻す',
    nextPage: '次のページ',
    prevPage: '前のページ',
    pageLabel: (num: number) => `ページ ${num}`,
    filterPlaceholder: '記事を検索...',
    filterAriaLabel: '記事を検索',
    disclaimerText:
      "これはAWS What's Newの非公式RSSリーダーです。Amazon Web Servicesとは関係ありません。",
    tableHeaders: {
      title: 'タイトル',
      description: '概要',
      publishedDate: '公開日時',
    },
  },
};

export const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
];
