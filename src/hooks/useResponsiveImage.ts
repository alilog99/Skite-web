import { useState, useEffect } from 'react';

// Custom hook for responsive image switching
export function useResponsiveImage(desktopImage: string, mobileImage: string, breakpoint: number = 768) {
  const [currentImage, setCurrentImage] = useState(desktopImage);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < breakpoint;
      setIsMobile(isMobileView);
      
      if (isMobileView) {
        setCurrentImage(mobileImage);
        // Console log for testing mobile image switching
        console.log('📱 Mobile view detected - Loading optimized image:', mobileImage);
      } else {
        setCurrentImage(desktopImage);
        console.log('🖥️ Desktop view detected - Loading original image:', desktopImage);
      }
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [desktopImage, mobileImage, breakpoint]);

  return { currentImage, isMobile };
}
