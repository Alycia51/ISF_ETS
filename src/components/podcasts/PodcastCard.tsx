import React, { useState } from 'react';
import { PodcastItem } from '@/types';
import { usePodcastFanCard } from '@/hooks/usePodcastFan';
import { useI18n } from '@/context/I18nContext';

interface PodcastCardProps {
  podcast: PodcastItem;
  index: number;
  total: number;
  onSelect: (podcast: PodcastItem) => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({
  podcast,
  index,
  total,
  onSelect,
}) => {
  const { t } = useI18n();
  const [isHovered, setIsHovered] = useState(false);
  const { transform, zIndex } = usePodcastFanCard(index, total, isHovered);

  const handleThumbClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (podcast.url && podcast.url !== '#') {
      window.open(podcast.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="podcast-card"
      style={{
        transform,
        zIndex,
        transition: 'transform .35s cubic-bezier(.34,1.4,.64,1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(podcast)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(podcast);
        }
      }}
    >
      <div
        className="card-thumb-link"
        onClick={handleThumbClick}
        title={t.common.watchEpisodeTitle}
      >
        <div className="card-thumbnail">
          {podcast.thumbnail ? (
            <img
              src={podcast.thumbnail}
              alt={podcast.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="card-thumb-placeholder">🎙️</div>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{podcast.title}</h3>
        <p className="card-guest">👤 {podcast.guest}</p>
        <p className="card-desc">{podcast.description}</p>
      </div>
    </div>
  );
};

