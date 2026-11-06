import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/context/I18nContext';
import { partnersList } from '@/data/partners';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerHand } from '@/components/partners/PartnerHand';
import { OrSlotFlipCard } from '@/components/partners/OrSlotFlipCard';
import { PerksTable } from '@/components/partners/PerksTable';
import { PartnerVlogSection } from '@/components/partners/PartnerVlogSection';

const TierHead: React.FC<{
  num: string;
  tierKey: 'diamant' | 'or' | 'argent' | 'bronze' | 'special';
  eyebrow: string;
  title: string;
}> = ({ num, tierKey, eyebrow, title }) => (
  <div className="tier-head">
    <span className="big-num" aria-hidden="true">
      {num}
    </span>
    <div>
      <p className={`tier-eyebrow tier-eyebrow--${tierKey}`}>{eyebrow}</p>
      <h2 className="tier-title" id={`t-${tierKey}`}>
        {title}
      </h2>
    </div>
  </div>
);

export const PartnersPage: React.FC = () => {
  const { t, localizePath } = useI18n();
  const P = t.partners;

  const countLbl = (n: number) => `${n} ${n > 1 ? P.partnerPlural : P.partnerSingular}`;

  const dia = partnersList.filter((p) => p.tier === 'diamant');
  const orL = partnersList.filter((p) => p.tier === 'or');
  const arg = partnersList.filter((p) => p.tier === 'argent');
  const bro = partnersList.filter((p) => p.tier === 'bronze');
  const spe = partnersList.filter((p) => p.tier === 'special');

  return (
    <div className="partners-page">
      {/* ── EN-TÊTE ── */}
      <section className="partners-hero">
        <div className="container partners-hero__inner">
          <div className="partners-hero__text">
            <span className="ph-badge">
              <span className="ph-dot" />
              {P.badge} · {countLbl(partnersList.length)}
            </span>
            <h1 className="ph-title">
              {P.heroTitle} <span>{P.heroAccent}</span>
            </h1>
            <p className="ph-text">{P.heroText}</p>
            <div className="ph-actions">
              <Link to={localizePath('/contact')} className="btn btn--dark">
                {P.joinBtn}
              </Link>
              <a href="#forfaits" className="btn btn--line">
                {P.packagesBtn}
              </a>
            </div>
          </div>

          <PartnerHand partners={partnersList} />
        </div>
      </section>

      {/* ── 01 DIAMANT ── */}
      <section className="tier-section" aria-labelledby="t-diamant">
        <div className="container">
          <TierHead
            num="01"
            tierKey="diamant"
            eyebrow={P.tiers.diamant.eyebrow}
            title={P.tiers.diamant.title}
          />
          <div className="pgrid pgrid--diamant">
            {dia.map((p, i) => (
              <div
                key={i}
                className="deal"
                style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }}
              >
                <PartnerCard
                  partner={p}
                  tier="diamant"
                  suit="◆"
                  rank="D"
                  tilt={18}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 OR ── */}
      <section className="tier-section" aria-labelledby="t-or">
        <div className="container">
          <TierHead
            num="02"
            tierKey="or"
            eyebrow={P.tiers.or.eyebrow}
            title={P.tiers.or.title}
          />
          {orL.length > 0 ? (
            <div className="pgrid pgrid--argent">
              {orL.map((p, i) => (
                <div
                  key={i}
                  className="deal"
                  style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }}
                >
                  <PartnerCard
                    partner={p}
                    tier="or"
                    suit="?"
                    rank="O"
                    tilt={16}
                  />
                </div>
              ))}
            </div>
          ) : (
            <OrSlotFlipCard />
          )}
        </div>
      </section>

      {/* ── 03 ARGENT ── */}
      <section className="tier-section" aria-labelledby="t-argent">
        <div className="container">
          <TierHead
            num="03"
            tierKey="argent"
            eyebrow={P.tiers.argent.eyebrow}
            title={P.tiers.argent.title}
          />
          <div className="pgrid pgrid--argent">
            {arg.map((p, i) => (
              <div
                key={i}
                className="deal"
                style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }}
              >
                <PartnerCard
                  partner={p}
                  tier="argent"
                  suit="●"
                  rank="A"
                  tilt={14}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 BRONZE ── */}
      <section className="tier-section" aria-labelledby="t-bronze">
        <div className="container">
          <TierHead
            num="04"
            tierKey="bronze"
            eyebrow={P.tiers.bronze.eyebrow}
            title={P.tiers.bronze.title}
          />
          <div className="pgrid pgrid--bronze">
            {bro.map((p, i) => (
              <div
                key={i}
                className="deal"
                style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }}
              >
                <PartnerCard
                  partner={p}
                  tier="bronze"
                  suit="▲"
                  rank="B"
                  tilt={12}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 SPÉCIAL ── */}
      {spe.length > 0 && (
        <section className="tier-section" aria-labelledby="t-special">
          <div className="container">
            <TierHead
              num="05"
              tierKey="special"
              eyebrow={P.tiers.special.eyebrow}
              title={P.tiers.special.title}
            />
            <div className="pgrid pgrid--special">
              {spe.map((p, i) => (
                <div
                  key={i}
                  className="deal"
                  style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }}
                >
                  <PartnerCard
                    partner={p}
                    tier="special"
                    suit="★"
                    rank=""
                    tilt={14}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VLOG / BLOG ── */}
      <PartnerVlogSection />

      {/* ── FORFAITS ── */}
      <PerksTable />
    </div>
  );
};

