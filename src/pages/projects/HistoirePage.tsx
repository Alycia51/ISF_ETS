import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ProjectDetailLayout } from '@/components/projects/ProjectDetailLayout';
import { VintagePhotoCard } from '@/components/projects/VintagePhotoCard';
import { AlbumShadowbox, AlbumSectionData } from '@/components/projects/AlbumShadowbox';
import { Lightbox } from '@/components/common/Lightbox';
import { useLightbox, LightboxPhoto } from '@/hooks/useLightbox';

export const HistoirePage: React.FC = () => {
  const { t } = useI18n();
  const cat = t.projects.categories.histoire;

  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const {
    isOpen: isLightboxOpen,
    currentPhoto,
    totalPhotos,
    openLightbox,
    closeLightbox,
    nextPhoto,
    prevPhoto,
  } = useLightbox();

  const albumSections: AlbumSectionData[] = [
    {
      title: t.common.gala,
      photos: (cat.gala || []).map((photo) => ({
        src: photo,
        alt: 'Gala 2026',
      })),
    },
    {
      title: t.common.conference,
      photos: (cat.conference || []).map((photo) => ({
        src: photo,
        alt: 'Conférence 2026',
      })),
    },
  ];

  const handleOpenPhoto = (photos: LightboxPhoto[], index: number) => {
    openLightbox(photos, index);
  };

  return (
    <>
      <PageHeader title={cat.title} subtitle={cat.subtitle} />

      <ProjectDetailLayout
        description={cat.description}
        partners={cat.partners}
      >
        <VintagePhotoCard
          imageSrc="/images/realisations/histoire/Gala/DSC05435.jpg"
          yearLabel="2026"
          cursorPointer={true}
          onClick={() => setIsAlbumOpen(true)}
        />
      </ProjectDetailLayout>

      {/* Shadowbox Album */}
      <AlbumShadowbox
        isOpen={isAlbumOpen}
        videoSrc={cat.video}
        sections={albumSections}
        onClose={() => setIsAlbumOpen(false)}
        onOpenPhoto={handleOpenPhoto}
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        currentPhoto={currentPhoto}
        totalPhotos={totalPhotos}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </>
  );
};
