import { render, screen } from '@testing-library/react';
import { Disclaimer } from '../../app/components/Disclaimer';
import { texts } from '../../app/constants/languages';

describe('Disclaimer', () => {
  it('should render disclaimer text in English', () => {
    render(<Disclaimer currentTexts={texts.en} />);

    expect(screen.getByText(/unofficial RSS reader/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Not affiliated with Amazon Web Services/i)
    ).toBeInTheDocument();
  });

  it('should render disclaimer text in Japanese', () => {
    render(<Disclaimer currentTexts={texts.ja} />);

    expect(screen.getByText(/非公式RSSリーダー/)).toBeInTheDocument();
    expect(
      screen.getByText(/Amazon Web Servicesとは関係ありません/)
    ).toBeInTheDocument();
  });

  it('should render disclaimer component', () => {
    render(<Disclaimer currentTexts={texts.en} />);

    // Check that the disclaimer content is present
    expect(screen.getByText(texts.en.disclaimerText)).toBeInTheDocument();
  });

  it('should render with different languages', () => {
    const { rerender } = render(<Disclaimer currentTexts={texts.en} />);

    expect(screen.getByText(texts.en.disclaimerText)).toBeInTheDocument();

    rerender(<Disclaimer currentTexts={texts.ja} />);
    expect(screen.getByText(texts.ja.disclaimerText)).toBeInTheDocument();
  });
});
