import React, { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import { PartnerPost } from '@/types';

export const PartnerVlogSection: React.FC = () => {
  const { t } = useI18n();
  const vlog = t.partners.vlog;
  const posts = t.partners.posts;

  const [activePost, setActivePost] = useState<PartnerPost | null>(null);

  useEffect(() => {
    if (!activePost) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePost(null);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePost]);

  return (
    <section className="pvlog" id="vlog" aria-labelledby="t-vlog">
      <div className="container">
        <p className="pvlog-eyebrow">{vlog.eyebrow}</p>
        <h2 className="pvlog-title" id="t-vlog">
          {vlog.title}
        </h2>
        <p className="pvlog-text">{vlog.text}</p>

        {posts.length > 0 ? (
          <div className="pvlog-grid">
            {posts.map((post, i) => (
              <article key={i} className="pvlog-card">
                <div
                  className="pvlog-media"
                  onClick={() => setActivePost(post)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActivePost(post);
                  }}
                >
                  {post.image && <img src={post.image} alt="" loading="lazy" />}
                  <span className="pvlog-format">{post.format}</span>
                  {post.video && (
                    <span className="play">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" fill="#FFFFFF" />
                      </svg>
                    </span>
                  )}
                </div>

                <div className="pvlog-body">
                  <span className="pvlog-partner">{post.partner}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <button
                    className="pvlog-more"
                    type="button"
                    onClick={() => setActivePost(post)}
                  >
                    {vlog.readMore}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="pvlog-empty">{vlog.empty}</p>
        )}

        {/* Modal for Post */}
        {activePost && (
          <>
            <div
              id="postBackdrop"
              className="post-backdrop show"
              onClick={() => setActivePost(null)}
              aria-hidden="true"
            />
            <div
              id="postModal"
              className="post-modal show"
              role="dialog"
              aria-modal="true"
            >
              <button
                id="postClose"
                className="post-close"
                type="button"
                aria-label={t.common.close}
                onClick={() => setActivePost(null)}
              >
                ✕
              </button>
              <div id="postModalBody" className="post-modal-body">
                {activePost.image && (
                  <img
                    className="post-full-img"
                    src={activePost.image}
                    alt=""
                    style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
                  />
                )}
                <span className="pvlog-partner">{activePost.partner}</span>
                <h3 className="post-full-title" style={{ fontSize: '24px', margin: '8px 0 16px' }}>
                  {activePost.title}
                </h3>
                <p className="post-full-text" style={{ lineHeight: '1.7', color: 'var(--gray-800)' }}>
                  {activePost.text}
                </p>
                {activePost.video && (
                  <div style={{ marginTop: '24px' }}>
                    <a
                      className="btn btn--primary"
                      href={activePost.video}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▶ {vlog.watch}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

