import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/context/I18nContext';

export const OrSlotFlipCard: React.FC = () => {
  const { t, localizePath } = useI18n();
  const orSlot = t.partners.orSlot;

  return (
    <Link
      to={localizePath('/contact')}
      className="flip or-slot"
      aria-label={`${orSlot.title} — ${orSlot.text}`}
    >
      <div className="flip-inner">
        <div className="face face--front">
          <span className="face-mark">?</span>
          <span className="face-title">{orSlot.hiddenTitle}</span>
          <span className="face-hint">{orSlot.hiddenHint}</span>
        </div>
        <div className="face face--back">
          <span className="face-title face-title--dark">{orSlot.title}</span>
          <span className="face-text">{orSlot.text}</span>
          <span className="face-btn">{orSlot.btn}</span>
        </div>
      </div>
    </Link>
  );
};

