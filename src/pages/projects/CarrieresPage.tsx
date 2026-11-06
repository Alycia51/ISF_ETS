import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ProjectDetailLayout } from '@/components/projects/ProjectDetailLayout';
import { VintagePhotoCard } from '@/components/projects/VintagePhotoCard';

export const CarrieresPage: React.FC = () => {
  const { t } = useI18n();
  const cat = t.projects.categories.carrieres;

  return (
    <>
      <PageHeader title={cat.title} subtitle={cat.subtitle} />

      <ProjectDetailLayout
        description={cat.description}
        partners={cat.partners}
      >
        <VintagePhotoCard
          imageSrc="/images/realisations/carrieres-2026.jpg"
          yearLabel="2026"
        />
      </ProjectDetailLayout>
    </>
  );
};

