'use client';

import { useState } from 'react';
import { Button, SpaceBetween, Box, Modal } from '@cloudscape-design/components';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
  hashtags?: string[];
  via?: string;
}

/**
 * SocialShare component for sharing content to various social media platforms
 */
export const SocialShare = ({
  title,
  url,
  description = '',
  hashtags = ['AWS', 'Cloud'],
  via = 'AWSCloud',
}: SocialShareProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = hashtags.join(',');

  // Social media sharing URLs
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}&via=${via}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;

  // Function to handle share button click
  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareModal(false);
  };

  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
    setShowShareModal(false);
  };

  return (
    <>
      <Button iconName="share" variant="icon" onClick={() => setShowShareModal(true)} />

      <Modal
        visible={showShareModal}
        onDismiss={() => setShowShareModal(false)}
        header="Share this content"
        size="small"
      >
        <Box padding="m">
          <SpaceBetween direction="vertical" size="m">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                iconName="external"
                variant="primary"
                onClick={() => handleShare(twitterUrl)}
              >
                Share on X (Twitter)
              </Button>
              <Button
                iconName="external"
                onClick={() => handleShare(facebookUrl)}
              >
                Share on Facebook
              </Button>
              <Button
                iconName="external"
                onClick={() => handleShare(linkedinUrl)}
              >
                Share on LinkedIn
              </Button>
            </SpaceBetween>
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                iconName="copy"
                onClick={copyToClipboard}
              >
                Copy URL
              </Button>
              <Button
                iconName="envelope"
                onClick={() => handleShare(emailUrl)}
              >
                Share via Email
              </Button>
            </SpaceBetween>
          </SpaceBetween>
        </Box>
      </Modal>
    </>
  );
};