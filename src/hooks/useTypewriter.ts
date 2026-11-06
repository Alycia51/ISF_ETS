import { useState, useEffect, useRef } from 'react';

export function useTypewriter(fullText: string, speed = 18, threshold = 0.3) {
  const [displayText, setDisplayText] = useState('');
  const elementRef = useRef<HTMLParagraphElement | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !fullText) return;

    // Reset when text changes
    hasTriggered.current = false;
    setDisplayText('');

    let intervalId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasTriggered.current) return;
        hasTriggered.current = true;
        observer.unobserve(el);

        let currentIndex = 0;
        intervalId = window.setInterval(() => {
          if (currentIndex < fullText.length) {
            setDisplayText(fullText.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(intervalId);
          }
        }, speed);
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [fullText, speed, threshold]);

  return { displayText, elementRef };
}

