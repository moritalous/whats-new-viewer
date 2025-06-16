import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SelectProps } from '@cloudscape-design/components';
import { Language } from '../types';

export const useLanguage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language | null>(null);

  // Initialize language from URL params
  useEffect(() => {
    const langParam = searchParams.get('lang') as Language;
    if (langParam === 'ja' || langParam === 'en') {
      setLanguage(langParam);
    } else {
      setLanguage('en'); // Default to English
    }
  }, [searchParams]);

  // Update document title when language changes
  useEffect(() => {
    if (language) {
      const title =
        language === 'ja'
          ? "AWS What's New - RSS リーダー"
          : "AWS What's New - RSS Reader";
      document.title = title;
    }
  }, [language]);

  // Language change handler with URL update
  const handleLanguageChange: SelectProps['onChange'] = ({ detail }) => {
    const newLanguage = detail.selectedOption?.value as Language;
    if (!newLanguage) return;

    setLanguage(newLanguage);

    // Update URL with new language parameter
    const params = new URLSearchParams(searchParams.toString());
    if (newLanguage === 'en') {
      params.delete('lang'); // Remove param for default English
    } else {
      params.set('lang', newLanguage);
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  };

  return {
    language,
    handleLanguageChange,
  };
};
