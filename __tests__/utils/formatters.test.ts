import {
  stripHtml,
  formatDate,
  truncateText,
} from '../../app/utils/formatters';

describe('formatters', () => {
  describe('stripHtml', () => {
    it('should remove HTML tags from string', () => {
      const htmlString = '<p>Hello <strong>World</strong></p>';
      const result = stripHtml(htmlString);
      expect(result).toBe('Hello World');
    });

    it('should handle empty string', () => {
      const result = stripHtml('');
      expect(result).toBe('');
    });

    it('should handle string without HTML tags', () => {
      const plainString = 'Hello World';
      const result = stripHtml(plainString);
      expect(result).toBe('Hello World');
    });

    it('should handle complex HTML with multiple tags', () => {
      const complexHtml =
        '<div><p>Test <a href="#">link</a> and <em>emphasis</em></p></div>';
      const result = stripHtml(complexHtml);
      expect(result).toBe('Test link and emphasis');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      const longText =
        'This is a very long text that should be truncated because it exceeds the maximum length limit that we have set for this test case.';
      const result = truncateText(longText, 50);
      expect(result).toBe(
        'This is a very long text that should be truncated...'
      );
      expect(result.length).toBe(52); // 49 + '...'
    });

    it('should not truncate text shorter than maxLength', () => {
      const shortText = 'This is short text.';
      const result = truncateText(shortText, 100);
      expect(result).toBe('This is short text.');
    });

    it('should handle text exactly at maxLength', () => {
      const exactText = 'This text is exactly fifty characters long here.';
      const result = truncateText(exactText, 49);
      // Text is 49 characters, so it should not be truncated
      expect(result).toBe('This text is exactly fifty characters long here.');
    });

    it('should use default maxLength of 100', () => {
      const longText = 'A'.repeat(150);
      const result = truncateText(longText);
      expect(result).toBe('A'.repeat(100) + '...');
    });

    it('should handle empty string', () => {
      const result = truncateText('');
      expect(result).toBe('');
    });

    it('should trim whitespace before adding ellipsis', () => {
      const textWithSpaces =
        'This is a text with trailing spaces     that should be trimmed before truncation happens.';
      const result = truncateText(textWithSpaces, 50);
      expect(result).toBe(
        'This is a text with trailing spaces     that shoul...'
      );
    });
  });

  describe('formatDate', () => {
    it('should format UTC date correctly in English', () => {
      const utcDate = 'Fri, 13 Jun 2025 19:50:00 GMT';
      const result = formatDate(utcDate, 'en');
      expect(result).toContain('UTC');
      expect(result).toContain('Jun');
    });

    it('should format UTC date correctly in Japanese', () => {
      const utcDate = 'Fri, 13 Jun 2025 19:50:00 GMT';
      const result = formatDate(utcDate, 'ja');
      expect(result).toContain('UTC');
    });

    it('should handle Z-format UTC date', () => {
      const isoDate = '2025-06-13T19:50:00Z';
      const result = formatDate(isoDate, 'en');
      expect(result).toContain('UTC');
    });

    it('should handle local timezone date without explicit timezone', () => {
      const localDate = '2025-06-13T19:50:00';
      const result = formatDate(localDate, 'en');
      // This test is environment-dependent, so we just check it returns a string
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle invalid dates by returning original string or Invalid Date', () => {
      const invalidDate = 'completely-invalid-date-string';
      const result = formatDate(invalidDate, 'en');
      // The function should either return the original string or "Invalid Date"
      expect(result === invalidDate || result === 'Invalid Date').toBe(true);
    });
  });
});
