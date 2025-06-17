import {
  Cards,
  Header,
  Box,
  SpaceBetween,
  Link,
  Pagination,
} from '@cloudscape-design/components';
import { RSSItem, RSSFeed, Language, LanguageTexts } from '../types';
import { formatDate, stripHtml, truncateText } from '../utils/formatters';
import { SocialShare } from './SocialShare';

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
  const cardDefinition = {
    header: (item: RSSItem) => (
      <SpaceBetween direction="horizontal" size="xs">
        <Link external href={item.link} fontSize="heading-m">
          {item.title}
        </Link>
        <SocialShare 
          title={item.title} 
          url={item.link} 
          description={stripHtml(item.contentSnippet || item.content)}
          hashtags={['AWS', 'Cloud', language === 'ja' ? 'アマゾン' : 'Amazon']}
        />
      </SpaceBetween>
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
  );
};
