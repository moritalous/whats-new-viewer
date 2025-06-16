import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Monitor screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};
