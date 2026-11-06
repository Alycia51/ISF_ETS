import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/context/I18nContext';
import { ImpactStatsItem } from '@/components/common/ImpactStatsItem';
import { GlobeScene } from '@/components/common/GlobeScene';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { StarfieldSky } from '@/components/common/StarfieldSky';

export const HomePage: React.FC = () => {
  const { t, localizePath } = useI18n();
  const donateUrl = 'https://activitesphilanthropie.etsmtl.ca/CLUBSDONSCIEN/';

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grid-pattern" />
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">{t.home.heroTitle}</h1>
            <p className="hero__subtitle">{t.home.heroSubtitle}</p>
            <div className="hero__actions">
              <Link to={localizePath('/contact')} className="btn btn--primary">
                {t.home.heroBtn}
              </Link>
              <Link to={localizePath('/mission')} className="btn btn--outline">
                {t.home.aboutBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="impact-stats">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.impactTitle}</h2>
            <p>{t.home.impactSubtitle}</p>
          </div>
          <div className="stats-grid">
            {t.home.impactStats.map((stat, i) => (
              <ImpactStatsItem
                key={i}
                number={stat.number}
                label={stat.label}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="about-preview">
        <div className="container about__grid">
          <div className="about__image">
            <GlobeScene />
          </div>
          <div className="about__text">
            <h2>{t.home.aboutTitle}</h2>
            <p>{t.home.aboutText}</p>
            <Link to={localizePath('/mission')} className="link-more">
              {t.home.aboutBtn} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.faqTitle}</h2>
          </div>
          <FaqAccordion items={t.home.faqItems} />
        </div>
      </section>

      {/* ── CTA CIEL ÉTOILÉ ── */}
      <section className="join-cta join-cta--sky">
        <StarfieldSky />
        <div className="container">
          <div className="cta-card">
            <h2>{t.home.joinTitle}</h2>
            <p>{t.home.joinText}</p>
            <div className="cta-actions">
              <Link to={localizePath('/contact')} className="btn btn--white">
                {t.home.joinBtn}
              </Link>
              <a
                className="btn btn--donate"
                href={donateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.home.donateBtn}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

