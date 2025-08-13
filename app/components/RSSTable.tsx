import {
  Table,
  Header,
  Box,
  Link,
  TextFilter,
  Pagination,
  Button,
  Flashbar,
} from '@cloudscape-design/components';
import { RSSItem, RSSFeed, Language, LanguageTexts } from '../types';
import { formatDate, stripHtml, truncateText } from '../utils/formatters';
import { useClipboard } from '../hooks/useClipboard';

interface RSSTableProps {
  rssData: RSSFeed;
  items: RSSItem[];
  loading: boolean;
  language: Language;
  currentTexts: LanguageTexts;
  isMobile: boolean;
  filteringText: string;
  currentPageIndex: number;
  totalPages: number;
  filteredItemsCount: number;
  onFilterChange: ({ detail }: { detail: { filteringText: string } }) => void;
  onPageChange: ({ detail }: { detail: { currentPageIndex: number } }) => void;
}

export const RSSTable = ({
  rssData,
  items,
  loading,
  language,
  currentTexts,
  isMobile,
  filteringText,
  currentPageIndex,
  totalPages,
  filteredItemsCount,
  onFilterChange,
  onPageChange,
}: RSSTableProps) => {
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

  const columnDefinitions = [
    {
      id: 'title',
      header: currentTexts.tableHeaders.title,
      cell: (item: RSSItem) => (
        <>
          <Link external href={item.link} fontSize="heading-s">
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
      width: 400,
      minWidth: 300,
    },
    {
      id: 'description',
      header: currentTexts.tableHeaders.description,
      cell: (item: RSSItem) => {
        const description = item.contentSnippet
          ? stripHtml(item.contentSnippet)
          : stripHtml(item.content);
        const truncatedDescription = truncateText(description, 200);

        return <Box color="text-body-secondary">{truncatedDescription}</Box>;
      },
      width: 600,
      minWidth: 300,
    },
    {
      id: 'pubDate',
      header: currentTexts.tableHeaders.publishedDate,
      cell: (item: RSSItem) => (
        <Box color="text-body-secondary">
          {formatDate(item.pubDate, language)}
        </Box>
      ),
      width: 150,
      minWidth: 130,
    },
  ];

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
      <Table
        columnDefinitions={columnDefinitions}
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
        filter={
          !isMobile ? (
            <TextFilter
              filteringText={filteringText}
              onChange={onFilterChange}
              filteringPlaceholder={currentTexts.filterPlaceholder}
              filteringAriaLabel={currentTexts.filterAriaLabel}
            />
          ) : undefined
        }
        header={
          <Header
            counter={
              rssData.items.length
                ? isMobile
                  ? `(${rssData.items.length})`
                  : `(${filteredItemsCount}/${rssData.items.length})`
                : ''
            }
            description={rssData.description}
          >
            {currentTexts.sectionTitle}
          </Header>
        }
        pagination={
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
        }
        variant="container"
        wrapLines
        stripedRows
      />
    </>
  );
};
