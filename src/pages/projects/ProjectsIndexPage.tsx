import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';

export const ProjectsIndexPage: React.FC = () => {
  const { t, localizePath } = useI18n();

  const categories = [
    {
      slug: 'notre-histoire',
      label: t.nav.projectsDropdown.histoire,
    },
    {
      slug: 'carrieres',
      label: t.nav.projectsDropdown.carrieres,
    },
    {
      slug: 'regards',
      label: t.nav.projectsDropdown.regards,
    },
    {
      slug: 'collecte',
      label: t.nav.projectsDropdown.collecte,
    },
    {
      slug: 'autres',
      label: t.nav.projectsDropdown.autres,
    },
  ];

  return (
    <>
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />

      <section className="projects-index">
        <div className="container">
          <div className="projects-index-grid">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={localizePath(`/realisations/${cat.slug}`)}
                className="project-index-card"
              >
                <div className="pic-card-wrap">
                  <div className="pic-card">
                    <div className="pic-card-photo" />
                    <div className="pic-card-label">{cat.label}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

