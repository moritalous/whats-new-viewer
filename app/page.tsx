'use client';

import { Suspense } from 'react';
import {
  AppLayout,
  ContentLayout,
  Header,
  Box,
  SpaceBetween,
  Button,
  Alert,
  Spinner,
} from '@cloudscape-design/components';

// Types and constants
import { texts } from './constants/languages';

// Custom hooks
import { useLanguage } from './hooks/useLanguage';
import { useRSSData } from './hooks/useRSSData';
import { useResponsive } from './hooks/useResponsive';
import { usePagination } from './hooks/usePagination';

// Components
import { LanguageSelector } from './components/LanguageSelector';
import { RSSTable } from './components/RSSTable';
import { RSSCards } from './components/RSSCards';
import { Disclaimer } from './components/Disclaimer';

function HomeContent() {
  const { language, handleLanguageChange } = useLanguage();
  const { isMobile } = useResponsive();

  const currentTexts = language ? texts[language] : texts['en'];
  const { rssData, loading, error, refetch } = useRSSData(
    language,
    currentTexts
  );

  const {
    currentPageIndex,
    filteringText,
    getCurrentPageItems,
    getFilteredItems,
    getTotalPages,
    handlePageChange,
    handleFilterChange,
  } = usePagination(rssData, isMobile);

  // Show loading spinner until language is determined
  if (language === null) {
    return (
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout>
            <Box textAlign="center" padding="xxl">
              <Spinner size="large" />
            </Box>
          </ContentLayout>
        }
      />
    );
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="s">
                  <Button
                    variant="normal"
                    onClick={refetch}
                    loading={loading}
                    iconName="refresh"
                    ariaLabel={currentTexts.refreshButton}
                  />
                  <LanguageSelector
                    language={language}
                    onChange={handleLanguageChange}
                  />
                  <Button
                    variant="primary"
                    href="https://github.com/moritalous/whats-new-viewer"
                    target="_blank"
                    iconName="external"
                    iconAlign="right"
                  >
                    GitHub
                  </Button>
                </SpaceBetween>
              }
            >
              {currentTexts.pageTitle}
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Disclaimer - Always visible */}
            <Disclaimer currentTexts={currentTexts} />

            {error ? (
              <Alert type="error" header="Error">
                {error}
              </Alert>
            ) : loading && !rssData ? (
              <Box textAlign="center" padding="xxl">
                <Spinner size="large" />
                <Box
                  variant="p"
                  color="text-body-secondary"
                  margin={{ top: 's' }}
                >
                  {currentTexts.loading}
                </Box>
              </Box>
            ) : rssData ? (
              <SpaceBetween size="m">
                {isMobile ? (
                  <RSSCards
                    rssData={rssData}
                    items={getCurrentPageItems()}
                    loading={loading}
                    language={language}
                    currentTexts={currentTexts}
                    currentPageIndex={currentPageIndex}
                    totalPages={getTotalPages()}
                    itemsPerPage={10}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <RSSTable
                    rssData={rssData}
                    items={getCurrentPageItems()}
                    loading={loading}
                    language={language}
                    currentTexts={currentTexts}
                    isMobile={isMobile}
                    filteringText={filteringText}
                    currentPageIndex={currentPageIndex}
                    totalPages={getTotalPages()}
                    filteredItemsCount={getFilteredItems().length}
                    onFilterChange={handleFilterChange}
                    onPageChange={handlePageChange}
                  />
                )}
              </SpaceBetween>
            ) : null}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <AppLayout
          navigationHide
          toolsHide
          content={
            <ContentLayout>
              <Box textAlign="center" padding="xxl">
                <Spinner size="large" />
              </Box>
            </ContentLayout>
          }
        />
      }
    >
      <HomeContent />
    </Suspense>
  );
}
