import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { PageHeader } from '@/components/common/PageHeader';
import { useFadeUp } from '@/hooks/useFadeUp';
import { UpcomingEvent } from '@/types';

const EventCard: React.FC<{ event: UpcomingEvent; index: number }> = ({ event, index }) => {
  const { elementRef, isVisible, delayClass } = useFadeUp((index % 4) as 0 | 1 | 2 | 3);
  const isDateRange = event.date.length > 2;

  return (
    <div
      ref={elementRef}
      className={`event-card fade-up ${delayClass} ${isVisible ? 'visible' : ''}`}
    >
      <div className="event-date">
        <span className={`day ${isDateRange ? 'day--range' : ''}`}>{event.date}</span>
        <span className="month">{event.month}</span>
      </div>
      <div className="event-info">
        <span className="event-type">{event.type}</span>
        <h3>{event.title}</h3>
        <p className="event-location">📍 {event.location}</p>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export const EventsPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <>
      <PageHeader title={t.events.title} subtitle={t.events.subtitle} />

      <section className="events-section">
        <div className="container">
          <div className="events-list">
            {t.events.upcoming.map((event, i) => (
              <EventCard key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

