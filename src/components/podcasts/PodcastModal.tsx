import React, { useEffect } from 'react';
import { PodcastItem } from '@/types';
import { useI18n } from '@/context/I18nContext';

interface PodcastModalProps {
  podcast: PodcastItem | null;
  onClose: () => void;
}

export const PodcastModal: React.FC<PodcastModalProps> = ({ podcast, onClose }) => {
  const { t } = useI18n();

  useEffect(() => {
    if (!podcast) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [podcast, onClose]);

  if (!podcast) return null;

  return (
    <>
      <div
        id="blogBackdrop"
        className="blog-backdrop show"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="podcastModal"
        className="podcast-modal show"
        role="dialog"
        aria-modal="true"
      >
        <button
          id="podcastModalClose"
          className="podcast-modal-close"
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
        >
          ✕
        </button>

        <div id="modalThumb" className="podcast-modal-thumb">
          {podcast.thumbnail ? (
            <img
              src={podcast.thumbnail}
              alt={podcast.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="card-thumb-placeholder-lg">🎙️</div>
          )}
        </div>

        <div className="podcast-modal-body">
          <h3 id="modalTitle" className="podcast-modal-title">
            {podcast.title}
          </h3>
          <p id="modalGuest" className="podcast-modal-guest">
            {podcast.guest}
          </p>
          <p id="modalDesc" className="podcast-modal-desc">
            {podcast.longDescription || podcast.description}
          </p>

          {podcast.members && podcast.members.length > 0 && (
            <div id="modalMembers" className="podcast-modal-members">
              <p className="card-members-title">{t.common.participatingMembers}</p>
              <ul id="modalMembersList" className="podcast-modal-members-list">
                {podcast.members.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            </div>
          )}

          {podcast.url && podcast.url !== '#' && (
            <a
              id="modalWatchBtn"
              className="card-watch-btn"
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.watchPodcast}
            </a>
          )}
        </div>
      </div>
    </>
  );
};
