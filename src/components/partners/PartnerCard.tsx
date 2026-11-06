import React from 'react';
import { Partner, PartnerTier } from '@/types';
import { useCardTilt3D } from '@/hooks/useCardTilt3D';
import { useI18n } from '@/context/I18nContext';

interface PartnerCardProps {
  partner: Partner;
  tier: PartnerTier;
  suit: string;
  rank?: string;
  tilt?: number;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  tier,
  suit,
  rank,
  tilt = 14,
}) => {
  const { t } = useI18n();
  const {
    cardRef,
    transformStyle,
    foilPosition,
    isFoilIdle,
    handleMouseMove,
    handleMouseLeave,
  } = useCardTilt3D(tilt);

  const cardContent = (
    <>
      <div className="corner c-tl">
        <span className="suit">{suit}</span>
        {rank && <span className="rank">{rank}</span>}
      </div>
      <div className="corner c-br">
        <span className="suit">{suit}</span>
        {rank && <span className="rank">{rank}</span>}
      </div>

      <div className="pcard-body">
        <div className="pcard-logo">
          {partner.logo ? (
            <img src={partner.logo} alt={partner.name} loading="lazy" />
          ) : (
            <span>{partner.initials}</span>
          )}
        </div>
        <h3 className="pcard-name">{partner.name}</h3>
        {partner.url && tier === 'diamant' && (
          <span className="pcard-link">{t.partners.visitSite}</span>
        )}
      </div>

      <div
        className={`foil foil--${tier} ${isFoilIdle ? 'idle' : ''}`}
        style={{
          backgroundPosition: foilPosition || undefined,
        }}
      />
    </>
  );

  const commonProps = {
    className: `pcard pcard--${tier}`,
    style: {
      transform: transformStyle || undefined,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (partner.url) {
    return (
      <a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      {...commonProps}
    >
      {cardContent}
    </div>
  );
};

