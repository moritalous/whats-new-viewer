import { Alert } from '@cloudscape-design/components';
import { LanguageTexts } from '../types';

interface DisclaimerProps {
  currentTexts: LanguageTexts;
}

export const Disclaimer = ({ currentTexts }: DisclaimerProps) => {
  return (
    <Alert type="info" dismissible={false} header="Disclaimer">
      {currentTexts.disclaimerText}
    </Alert>
  );
};
