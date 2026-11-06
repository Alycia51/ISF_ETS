import React from 'react';
import { LightboxPhoto } from '@/hooks/useLightbox';
import { useI18n } from '@/context/I18nContext';

interface LightboxProps {
  isOpen: boolean;
  currentPhoto: LightboxPhoto | null;
  totalPhotos: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentPhoto,
  totalPhotos,
  onClose,
  onPrev,
  onNext,
}) => {
  const { t } = useI18n();

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      id="lightbox"
      className="lightbox open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        id="lightboxClose"
        className="lightbox-close"
        type="button"
        aria-label={t.common.close}
        onClick={onClose}
      >
        ✕
      </button>

      {totalPhotos > 1 && (
        <button
          id="lightboxPrev"
          className="lightbox-prev"
          type="button"
          aria-label={t.common.previous}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{ display: 'flex' }}
        >
          ‹
        </button>
      )}

      {totalPhotos > 1 && (
        <button
          id="lightboxNext"
          className="lightbox-next"
          type="button"
          aria-label={t.common.next}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{ display: 'flex' }}
        >
          ›
        </button>
      )}

      <div id="lightboxContent" className="lightbox-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt || currentPhoto.caption || ''}
            style={{
              maxWidth: '90vw',
              maxHeight: '75vh',
              borderRadius: '12px',
              objectFit: 'contain',
            }}
          />
          {currentPhoto.caption && (
            <p
              style={{
                color: 'rgba(255,255,255,.8)',
                fontSize: '14px',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: '1.5',
              }}
            >
              {currentPhoto.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
