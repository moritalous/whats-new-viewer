import {
  Cards,
  Header,
  Box,
  SpaceBetween,
  Link,
  Pagination,
  Button,
  Flashbar,
} from '@cloudscape-design/components';
import { RSSItem, RSSFeed, Language, LanguageTexts } from '../types';
import { formatDate, stripHtml, truncateText } from '../utils/formatters';
import { useClipboard } from '../hooks/useClipboard';

interface RSSCardsProps {
  rssData: RSSFeed;
  items: RSSItem[];
  loading: boolean;
  language: Language;
  currentTexts: LanguageTexts;
  currentPageIndex: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: ({ detail }: { detail: { currentPageIndex: number } }) => void;
}

export const RSSCards = ({
  rssData,
  items,
  loading,
  language,
  currentTexts,
  currentPageIndex,
  totalPages,
  itemsPerPage,
  onPageChange,
}: RSSCardsProps) => {
  const { copyToClipboard, formatShareText, showSuccess } = useClipboard();

  const handleShare = async (item: RSSItem) => {
    const shareText = formatShareText(item.title, item.link);
    await copyToClipboard(shareText);
  };

  // トースト通知用のFlashbarアイテム
  const flashbarItems = showSuccess
    ? [
        {
          type: 'success' as const,
          content: currentTexts.copySuccess,
          dismissible: false,
          id: 'copy-success',
        },
      ]
    : [];

  const cardDefinition = {
    header: (item: RSSItem) => (
      <>
        <Link external href={item.link} fontSize="heading-m">
          {item.title}
        </Link>
        <Button
          variant="icon"
          iconName="copy"
          onClick={() => handleShare(item)}
          ariaLabel={currentTexts.shareButtonAriaLabel}
        />
      </>
    ),
    sections: [
      {
        id: 'description',
        content: (item: RSSItem) => {
          const description = item.contentSnippet
            ? stripHtml(item.contentSnippet)
            : stripHtml(item.content);
          const truncatedDescription = truncateText(description, 100);

          return <Box color="text-body-secondary">{truncatedDescription}</Box>;
        },
      },
      {
        id: 'date',
        content: (item: RSSItem) => (
          <Box color="text-body-secondary">
            {formatDate(item.pubDate, language)}
          </Box>
        ),
      },
    ],
  };

  return (
    <>
      {showSuccess && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            maxWidth: '300px',
          }}
        >
          <Flashbar items={flashbarItems} />
        </div>
      )}
      <SpaceBetween size="m">
        <Cards
          cardDefinition={cardDefinition}
          items={items}
          loading={loading}
          loadingText={currentTexts.loading}
          empty={
            <Box textAlign="center" color="inherit">
              <Box variant="strong" color="inherit">
                {currentTexts.noArticles}
              </Box>
              <Box variant="p" color="inherit" padding={{ bottom: 's' }}>
                {currentTexts.noArticlesDesc}
              </Box>
            </Box>
          }
          header={
            <Header
              counter={rssData.items.length ? `(${rssData.items.length})` : ''}
              description={rssData.description}
            >
              {currentTexts.sectionTitle}
            </Header>
          }
        />

        {rssData.items.length > itemsPerPage && (
          <Box textAlign="center">
            <Pagination
              currentPageIndex={currentPageIndex}
              pagesCount={totalPages}
              onChange={onPageChange}
              ariaLabels={{
                nextPageLabel: currentTexts.nextPage,
                previousPageLabel: currentTexts.prevPage,
                pageLabel: currentTexts.pageLabel,
              }}
            />
          </Box>
        )}
      </SpaceBetween>
    </>
  );
};
