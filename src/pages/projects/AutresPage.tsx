import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ProjectDetailLayout } from '@/components/projects/ProjectDetailLayout';
import { VintagePhotoCard } from '@/components/projects/VintagePhotoCard';
import { AlbumShadowbox, AlbumSectionData } from '@/components/projects/AlbumShadowbox';
import { Lightbox } from '@/components/common/Lightbox';
import { useLightbox, LightboxPhoto } from '@/hooks/useLightbox';

export const AutresPage: React.FC = () => {
  const { t } = useI18n();
  const cat = t.projects.categories.autres;

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

  const sections = cat.sections || [];

  const albumSections: AlbumSectionData[] = sections.map((sec) => ({
    title: `📸 ${sec.title}`,
    photos: sec.photos.map((photo) => ({
      src: photo.src,
      caption: photo.caption,
      alt: photo.caption,
    })),
  }));

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
          imageSrc="/images/realisations/autres/ottawa-2023.png"
          yearLabel="2019-2023"
          cursorPointer={true}
          onClick={() => setIsAlbumOpen(true)}
        />
      </ProjectDetailLayout>

      {/* Shadowbox Modal */}
      <AlbumShadowbox
        isOpen={isAlbumOpen}
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

