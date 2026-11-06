import React, { useState } from 'react';
import { FaqItem } from '@/types';

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`faq-item ${isOpen ? 'open' : ''}`}
            data-index={index}
          >
            <button
              className="faq-question"
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleItem(index)}
            >
              <span>{item.q}</span>
              <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

