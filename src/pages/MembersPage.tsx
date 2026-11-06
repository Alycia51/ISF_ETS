import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { useFadeUp } from '@/hooks/useFadeUp';
import { BoardMember } from '@/types';

const MemberCard: React.FC<{ member: BoardMember; index: number }> = ({ member, index }) => {
  const { elementRef, isVisible, delayClass } = useFadeUp((index % 4) as 0 | 1 | 2 | 3);
  const photoFilename = member.photo ? member.photo.split('/').pop() : undefined;
  const photoSrc = photoFilename ? `/images/membre/${photoFilename}` : undefined;

  return (
    <div
      ref={elementRef}
      className={`member-card fade-up ${delayClass} ${isVisible ? 'visible' : ''}`}
    >
      <div className="member-avatar">
        {photoSrc ? (
          <img src={photoSrc} alt={member.name} loading="lazy" />
        ) : (
          member.name[0]
        )}
      </div>
      <h3>{member.name}</h3>
      <p className="member-role">{member.role}</p>
      <p className="member-program">{member.program}</p>
      {member.linkedin && (
        <a
          className="member-linkedin"
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
    </div>
  );
};

export const MembersPage: React.FC = () => {
  const { t, localizePath } = useI18n();

  return (
    <>
      <PageHeader title={t.members.title} subtitle={t.members.subtitle} />

      <section className="members-section">
        <div className="container">
          <h2 className="section-title">{t.members.boardTitle}</h2>
          <div className="board-grid">
            {t.members.board.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="join-cta">
        <div className="container">
          <div className="cta-card">
            <h2>{t.members.joinTitle}</h2>
            <p>{t.members.joinText}</p>
            <Link to={localizePath('/contact')} className="btn btn--white">
              {t.members.joinBtn}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

