import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ProjectDetailLayout } from '@/components/projects/ProjectDetailLayout';
import { VintagePhotoCard } from '@/components/projects/VintagePhotoCard';
import { AlbumShadowbox, AlbumSectionData } from '@/components/projects/AlbumShadowbox';
import { Lightbox } from '@/components/common/Lightbox';
import { useLightbox, LightboxPhoto } from '@/hooks/useLightbox';
import { ProjectEdition } from '@/types';

export const CollectePage: React.FC = () => {
  const { t } = useI18n();
  const cat = t.projects.categories.collecte;

  const [activeEdition, setActiveEdition] = useState<ProjectEdition | null>(null);

  const {
    isOpen: isLightboxOpen,
    currentPhoto,
    totalPhotos,
    openLightbox,
    closeLightbox,
    nextPhoto,
    prevPhoto,
  } = useLightbox();

  const editions = cat.editions || [];

  const albumSections: AlbumSectionData[] = activeEdition
    ? [
        {
          title: `${t.common.collection} ${activeEdition.year}`,
          photos: activeEdition.photos.map((photo) => ({
            src: photo,
            alt: `${t.common.collection} ${activeEdition.year}`,
          })),
        },
      ]
    : [];

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
        {editions.map((edition, i) => (
          <VintagePhotoCard
            key={i}
            imageSrc={edition.cover}
            yearLabel={edition.year}
            cursorPointer={true}
            onClick={() => setActiveEdition(edition)}
          />
        ))}
      </ProjectDetailLayout>

      {/* Shadowbox Modal per edition */}
      <AlbumShadowbox
        isOpen={Boolean(activeEdition)}
        sections={albumSections}
        onClose={() => setActiveEdition(null)}
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

