/**
 * FAQ Accordion Interaction
 * Handles single-item expansion and closing of sibling questions.
 */
export function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

