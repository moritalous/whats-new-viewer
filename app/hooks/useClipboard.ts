import { useState, useCallback } from 'react';

export const useClipboard = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error('Fallback copy failed');
        }
      }

      // Show success toast
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      // エラーが発生してもユーザーには通知しない（サイレント）
    }
  }, []);

  const formatShareText = useCallback((title: string, url: string) => {
    return `${title}\n${url}`;
  }, []);

  return {
    copyToClipboard,
    formatShareText,
    showSuccess,
  };
};
