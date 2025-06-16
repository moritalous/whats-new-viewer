import { render } from '@testing-library/react';
import { GoogleAnalytics } from '../../app/components/GoogleAnalytics';

// Mock @next/third-parties/google
jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-ga-id={gaId}>
      Google Analytics Mock
    </div>
  ),
}));

describe('GoogleAnalytics', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should render GoogleAnalytics component when GA ID is provided', () => {
    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123456';

    const { getByTestId } = render(<GoogleAnalytics />);

    const gaComponent = getByTestId('google-analytics');
    expect(gaComponent).toBeInTheDocument();
    expect(gaComponent).toHaveAttribute('data-ga-id', 'G-TEST123456');
  });

  it('should not render anything when GA ID is not provided', () => {
    delete process.env.NEXT_PUBLIC_GA_ID;

    const { container } = render(<GoogleAnalytics />);

    expect(container.firstChild).toBeNull();
  });

  it('should not render when GA ID is empty string', () => {
    process.env.NEXT_PUBLIC_GA_ID = '';

    const { container } = render(<GoogleAnalytics />);

    expect(container.firstChild).toBeNull();
  });
});
