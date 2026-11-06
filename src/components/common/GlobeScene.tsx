import React from 'react';

export const GlobeScene: React.FC = () => {
  return (
    <div className="globe-scene">
      <div className="globe-ring-a" />
      <div className="globe-ring-b" />
      <div className="globe-emoji" aria-hidden="true">
        🌍
      </div>
    </div>
  );
};

