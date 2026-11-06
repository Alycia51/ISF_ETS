import React from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useFadeUp } from '@/hooks/useFadeUp';

interface ImpactStatsItemProps {
  number: string;
  label: string;
  index: number;
}

export const ImpactStatsItem: React.FC<ImpactStatsItemProps> = ({ number, label, index }) => {
  const { displayValue, elementRef: counterRef } = useAnimatedCounter(number);
  const { elementRef: fadeRef, isVisible, delayClass } = useFadeUp((index % 4) as 0 | 1 | 2 | 3);

  return (
    <div
      ref={fadeRef}
      className={`stat-item fade-up ${delayClass} ${isVisible ? 'visible' : ''}`}
    >
      <h3 ref={counterRef} className="stat-number">
        {displayValue}
      </h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

