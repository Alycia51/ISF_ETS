import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter<T extends HTMLElement = HTMLHeadingElement>(targetValue: string) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const elementRef = useRef<T | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated.current) return;

    const num = parseInt(targetValue.replace(/\D/g, ''), 10);
    const suf = targetValue.replace(/\d/g, '');

    if (isNaN(num)) {
      setDisplayValue(targetValue);
      return;
    }

    // Set initial display to 0 + suffix before animating
    setDisplayValue(`0${suf}`);

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();

        const tick = (now: number) => {
          const p = Math.min((now - start) / 1300, 1);
          setDisplayValue(Math.floor(ease(p) * num) + suf);
          if (p < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [targetValue]);

  return { displayValue, elementRef };
}
