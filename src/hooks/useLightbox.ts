import { useState, useEffect, useCallback } from 'react';

export interface LightboxPhoto {
  src: string;
  caption?: string;
  alt?: string;
}

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState<LightboxPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((items: LightboxPhoto[], initialIndex = 0) => {
    setPhotos(items);
    setCurrentIndex(initialIndex);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextPhoto = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Handle body overflow lock & keyboard events (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox, nextPhoto, prevPhoto]);

  return {
    isOpen,
    currentPhoto: photos[currentIndex] || null,
    totalPhotos: photos.length,
    currentIndex,
    openLightbox,
    closeLightbox,
    nextPhoto,
    prevPhoto,
  };
}

