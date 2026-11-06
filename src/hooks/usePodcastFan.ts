import { useMemo } from 'react';

export function usePodcastFanCard(index: number, total: number, isHovered: boolean) {
  return useMemo(() => {
    if (total === 0) return { transform: '', zIndex: 1 };

    const spread = Math.min(9, 60 / total);
    const mid = (total - 1) / 2;
    const angle = (index - mid) * spread;
    const tx = (index - mid) * 40;
    const ty = Math.abs(index - mid) * 5;

    if (isHovered) {
      return {
        transform: `translateX(${tx}px) translateY(${ty - 28}px) rotate(${angle}deg)`,
        zIndex: total + 5,
      };
    }

    return {
      transform: `translateX(${tx}px) translateY(${ty}px) rotate(${angle}deg)`,
      zIndex: index + 1,
    };
  }, [index, total, isHovered]);
}

