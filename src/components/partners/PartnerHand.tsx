import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { Partner } from '@/types';

interface PartnerHandProps {
  partners: Partner[];
}

export const PartnerHand: React.FC<PartnerHandProps> = ({ partners }) => {
  const { t } = useI18n();
  const P = t.partners;

  const countLbl = (n: number) => `${n} ${n > 1 ? P.partnerPlural : P.partnerSingular}`;

  const bro = partners.filter((p) => p.tier === 'bronze');
  const arg = partners.filter((p) => p.tier === 'argent');
  const spe = partners.filter((p) => p.tier === 'special');
  const orL = partners.filter((p) => p.tier === 'or');
  const dia = partners.filter((p) => p.tier === 'diamant');

  return (
    <div className="hand" role="img" aria-label={P.handLabel}>
      <div className="hpos hp1">
        <div className="hcard hcard--bronze">
          <span className="hcard-suit">▲</span>
          <div>
            <div className="hcard-title">{P.tiers.bronze.title}</div>
            <div className="hcard-count">{countLbl(bro.length)}</div>
          </div>
        </div>
      </div>

      <div className="hpos hp2">
        <div className="hcard hcard--argent">
          <span className="hcard-suit">●</span>
          <div>
            <div className="hcard-title">{P.tiers.argent.title}</div>
            <div className="hcard-count">{countLbl(arg.length)}</div>
          </div>
        </div>
      </div>

      <div className="hpos hp3">
        <div className="hcard hcard--special">
          <span className="hcard-suit">★</span>
          <div>
            <div className="hcard-title">{P.tiers.special.title}</div>
            <div className="hcard-count">{countLbl(spe.length)}</div>
          </div>
        </div>
      </div>

      <div className="hpos hp4">
        <div className="hcard hcard--or">
          <span className="hcard-suit">?</span>
          <div>
            <div className="hcard-title">{P.tiers.or.title}</div>
            <div className="hcard-count">
              {orL.length ? countLbl(orL.length) : P.orHandLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="hpos hp5">
        <div className="hcard hcard--diamant">
          <span className="hcard-suit">◆</span>
          <div>
            <div className="hcard-title">{P.tiers.diamant.title}</div>
            <div className="hcard-count">{countLbl(dia.length)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

