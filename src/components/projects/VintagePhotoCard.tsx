import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';

interface VintagePhotoCardProps {
  imageSrc?: string;
  yearLabel: string;
  onClick?: () => void;
  cursorPointer?: boolean;
}

export const VintagePhotoCard: React.FC<VintagePhotoCardProps> = ({
  imageSrc,
  yearLabel,
  onClick,
  cursorPointer = false,
}) => {
  const { t } = useI18n();
  const [imageError, setImageError] = useState(!imageSrc);

  return (
    <div
      className="vintage-card"
      style={{ cursor: cursorPointer ? 'pointer' : 'default' }}
      onClick={onClick}
      role={cursorPointer ? 'button' : undefined}
      tabIndex={cursorPointer ? 0 : undefined}
      onKeyDown={(e) => {
        if (cursorPointer && (e.key === 'Enter' || e.key === ' ')) {
          onClick?.();
        }
      }}
    >
      <div className="vintage-card-inner">
        <div className="vintage-photo-area">
          {!imageError && imageSrc ? (
            <img
              src={imageSrc}
              alt={yearLabel}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="coming-soon-card" style={{ display: 'flex' }}>
              <span className="coming-soon-camera">📷</span>
              <div className="coming-soon-text">
                <span>{t.common.comingSoon}</span>
                <span className="dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="vintage-card-footer">
          <span>{yearLabel}</span>
        </div>
      </div>
      <div className="vintage-card-shine" />
    </div>
  );
};
