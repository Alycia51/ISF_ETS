import React, { useMemo } from 'react';

interface StarProps {
  top: string;
  left: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

export const StarfieldSky: React.FC = () => {
  // Generate 90 stable stars
  const stars = useMemo(() => {
    // Seeded random generator to produce identical, deterministic starfield
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const items: StarProps[] = [];
    for (let i = 0; i < 90; i++) {
      const size = (random() * 2 + 1).toFixed(1);
      items.push({
        top: `${(random() * 100).toFixed(1)}%`,
        left: `${(random() * 100).toFixed(1)}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${(random() * 4).toFixed(2)}s`,
        animationDuration: `${(random() * 3 + 2).toFixed(2)}s`,
      });
    }
    return items;
  }, []);

  return (
    <div className="cta-sky" aria-hidden="true">
      {stars.map((star, idx) => (
        <span
          key={idx}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.height,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
      <span className="shooting-star shooting-star--1" />
      <span className="shooting-star shooting-star--2" />
      <span className="shooting-star shooting-star--3" />
    </div>
  );
};

