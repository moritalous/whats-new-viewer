import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
      toString: jest.fn(() => ''),
    };
  },
}));

// Only mock window properties in jsdom environment
if (typeof window !== 'undefined') {
  // Mock window.scrollTo
  Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true,
  });

  // Mock window.innerWidth for responsive tests
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
  });

  // Mock window.addEventListener and removeEventListener
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();
}

// Mock Cloudscape components
jest.mock('@cloudscape-design/components', () => ({
  AppLayout: ({ children, content }) => content || children,
  ContentLayout: ({ children }) => children,
  Header: ({ children }) => <div>{children}</div>,
  Box: ({ children }) => <div>{children}</div>,
  SpaceBetween: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Alert: ({ children }) => <div>{children}</div>,
  Spinner: () => <div>Loading...</div>,
  Select: ({ selectedOption, onChange, options }) => (
    <button
      role="button"
      onClick={() =>
        onChange && onChange({ detail: { selectedOption: options[0] } })
      }
    >
      {selectedOption?.label || 'Select'}
    </button>
  ),
  Table: ({ items, header }) => (
    <div>
      {header}
      {items?.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  ),
  Cards: ({ items, header }) => (
    <div>
      {header}
      {items?.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  ),
  Link: ({ children, href }) => <a href={href}>{children}</a>,
  TextFilter: ({ filteringText, onChange }) => (
    <input
      value={filteringText}
      onChange={(e) =>
        onChange && onChange({ detail: { filteringText: e.target.value } })
      }
    />
  ),
  Pagination: ({ currentPageIndex, onChange }) => (
    <button
      onClick={() =>
        onChange &&
        onChange({ detail: { currentPageIndex: currentPageIndex + 1 } })
      }
    >
      Page {currentPageIndex}
    </button>
  ),
}));
