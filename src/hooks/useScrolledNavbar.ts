import { useState, useEffect } from 'react';

export function useScrolledNavbar(threshold = 60) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const checkNav = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Delay to let browser stabilize scroll position on initial load
    timeoutId = window.setTimeout(() => {
      checkNav();
      window.addEventListener('scroll', checkNav, { passive: true });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', checkNav);
    };
  }, [threshold]);

  return isScrolled;
}

