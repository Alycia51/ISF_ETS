import { useState, useRef, useCallback } from 'react';

export function useCardTilt3D(maxTilt = 14) {
  const cardRef = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [foilPosition, setFoilPosition] = useState<string>('');
  const [isFoilIdle, setIsFoilIdle] = useState(true);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      const rotateX = ((0.5 - py) * maxTilt).toFixed(2);
      const rotateY = ((px - 0.5) * maxTilt).toFixed(2);

      setTransformStyle(
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`
      );
      setFoilPosition(`${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`);
      setIsFoilIdle(false);
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTransformStyle('');
    setFoilPosition('');
    setIsFoilIdle(true);
  }, []);

  return {
    cardRef,
    transformStyle,
    foilPosition,
    isFoilIdle,
    handleMouseMove,
    handleMouseLeave,
  };
}

