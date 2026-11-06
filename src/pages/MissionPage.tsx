import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { useFadeUp } from '@/hooks/useFadeUp';

const FadeCard: React.FC<{
  className: string;
  index: number;
  children: React.ReactNode;
}> = ({ className, index, children }) => {
  const { elementRef, isVisible, delayClass } = useFadeUp((index % 4) as 0 | 1 | 2 | 3);
  return (
    <div
      ref={elementRef}
      className={`${className} fade-up ${delayClass} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

export const MissionPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <>
      <PageHeader title={t.mission.title} subtitle={t.mission.subtitle} />

      <section className="pillars-section">
        <div className="container">
          <h2 className="section-title">{t.mission.pillarTitle}</h2>
          <div className="grid-2x2">
            {t.mission.pillars.map((pillar, i) => (
              <FadeCard key={i} className="pillar-card" index={i}>
                <span className="icon">{pillar.icon}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">{t.mission.valuesTitle}</h2>
          <div className="grid-2x2">
            {t.mission.values.map((val, i) => (
              <FadeCard key={i} className="value-card" index={i}>
                <span className="icon">{val.icon}</span>
                <h4>{val.title}</h4>
                <p>{val.text}</p>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

