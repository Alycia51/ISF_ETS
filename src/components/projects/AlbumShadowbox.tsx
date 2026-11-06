import React, { useRef, useEffect } from 'react';
import { LightboxPhoto } from '@/hooks/useLightbox';
import { useI18n } from '@/context/I18nContext';

export interface AlbumSectionData {
  title: string;
  photos: {
    src: string;
    caption?: string;
    alt?: string;
  }[];
}

interface AlbumShadowboxProps {
  isOpen: boolean;
  videoSrc?: string;
  sections?: AlbumSectionData[];
  onClose: () => void;
  onOpenPhoto: (photos: LightboxPhoto[], index: number) => void;
}

export const AlbumShadowbox: React.FC<AlbumShadowboxProps> = ({
  isOpen,
  videoSrc,
  sections = [],
  onClose,
  onOpenPhoto,
}) => {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="album-backdrop open"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="album-modal open" role="dialog" aria-modal="true">
        <button
          className="album-close"
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
        >
          ✕
        </button>

        {/* Video Player */}
        {videoSrc && (
          <div className="album-video-wrap">
            <video ref={videoRef} className="album-video" controls>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Photo Sections */}
        {sections.map((section, si) => (
          <div key={si} className="album-section">
            <h3 className="album-section-title">{section.title}</h3>
            <div className="album-grid">
              {section.photos.map((photo, pi) => (
                <div
                  key={pi}
                  className="album-thumb"
                  onClick={() => onOpenPhoto(section.photos, pi)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOpenPhoto(section.photos, pi);
                    }
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.caption || ''}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

