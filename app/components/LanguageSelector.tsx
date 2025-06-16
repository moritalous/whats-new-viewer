import { Select, SelectProps } from '@cloudscape-design/components';
import { Language } from '../types';
import { languageOptions } from '../constants/languages';

interface LanguageSelectorProps {
  language: Language;
  onChange: SelectProps['onChange'];
}

export const LanguageSelector = ({
  language,
  onChange,
}: LanguageSelectorProps) => {
  const selectedOption =
    languageOptions.find((opt) => opt.value === language) || null;

  return (
    <Select
      selectedOption={selectedOption}
      onChange={onChange}
      options={languageOptions}
      placeholder="Select language"
    />
  );
};
