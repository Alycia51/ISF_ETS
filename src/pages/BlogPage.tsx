import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { PodcastCard } from '@/components/podcasts/PodcastCard';
import { PodcastModal } from '@/components/podcasts/PodcastModal';
import { PodcastItem } from '@/types';

export const BlogPage: React.FC = () => {
  const { t } = useI18n();
  const [selectedPodcast, setSelectedPodcast] = useState<PodcastItem | null>(null);

  const podcasts = t.blog.podcasts || [];
  const introText =
    t.blog.introText ||
    'Découvrez nos épisodes — survolez pour explorer, cliquez pour en savoir plus.';

  return (
    <>
      <PageHeader title={t.blog.title} subtitle={t.blog.subtitle} />

      <section className="blog-section">
        <div className="container">
          <div className="blog-intro">
            <p className="blog-intro-text">🎙️ {introText}</p>
          </div>

          <div className="fan-stage">
            <div id="fanContainer" className="fan-container">
              {podcasts.map((podcast, i) => (
                <PodcastCard
                  key={i}
                  podcast={podcast}
                  index={i}
                  total={podcasts.length}
                  onSelect={setSelectedPodcast}
                />
              ))}
            </div>
          </div>

          <p className="fan-hint">
            ← Glisser votre souris pour parcourir les épisodes · Cliquez pour en savoir plus →
          </p>
        </div>
      </section>

      {/* Podcast Modal */}
      <PodcastModal
        podcast={selectedPodcast}
        onClose={() => setSelectedPodcast(null)}
      />
    </>
  );
};

