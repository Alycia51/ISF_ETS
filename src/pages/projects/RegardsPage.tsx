import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { ProjectDetailLayout } from '@/components/projects/ProjectDetailLayout';
import { VintagePhotoCard } from '@/components/projects/VintagePhotoCard';

export const RegardsPage: React.FC = () => {
  const { t } = useI18n();
  const cat = t.projects.categories.regards;

  return (
    <>
      <PageHeader title={cat.title} subtitle={cat.subtitle} />

      <ProjectDetailLayout
        description={cat.description}
        partners={cat.partners}
      >
        <VintagePhotoCard
          imageSrc="/images/realisations/regards-2026.jpg"
          yearLabel="2026"
        />
      </ProjectDetailLayout>
    </>
  );
};

