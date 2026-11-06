import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ProjectPartner } from '@/types';

interface ProjectDetailLayoutProps {
  description: string;
  partners?: ProjectPartner[];
  children?: React.ReactNode;
}

export const ProjectDetailLayout: React.FC<ProjectDetailLayoutProps> = ({
  description,
  partners = [],
  children,
}) => {
  const { t } = useI18n();
  const { displayText, elementRef } = useTypewriter(description, 18, 0.3);

  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-detail-layout">
          {/* Left Column: Description & Partners */}
          <div className="project-desc">
            <h2 className="detail-section-title">{t.common.about}</h2>
            <p ref={elementRef} className="typed-text">
              {displayText}
            </p>

            {partners && partners.length > 0 && (
              <div className="partners-section">
                <h3 className="partners-title">{t.common.ourPartners}</h3>
                <div className="partners-grid">
                  {partners.map((partner, index) => (
                    <div key={index} className="partner-card">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} loading="lazy" />
                      ) : (
                        <div className="partner-logo-placeholder">🤝</div>
                      )}
                      <span className="partner-name">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Vintage Cards / Photos */}
          <div className="project-photos">
            <div className="vintage-cards-row">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
