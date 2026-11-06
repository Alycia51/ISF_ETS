/**
 * Global Animations
 * Handles scroll fade-up reveals, animated number counters,
 * and typewriter text effects.
 */
export function initAnimations() {
  // ── Scroll fade-up ──
  const items = document.querySelectorAll(
    '.stat-item, .pillar-card, .value-card, .project-card, .event-card, .member-card'
  );
  if (items.length) {
    items.forEach((el, i) => {
      el.classList.add('fade-up');
      const mod = i % 4;
      if (mod > 0 && mod <= 3) el.classList.add('delay-' + mod);
    });

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(el => obs.observe(el));
  }

  // ── Compteurs animés ──
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    statNumbers.forEach(el => {
      const cObs = new IntersectionObserver(
        entries => {
          if (!entries[0].isIntersecting) return;
          const raw = el.textContent || '';
          const num = parseInt(raw.replace(/\D/g, ''), 10);
          const suf = raw.replace(/\d/g, '');
          if (isNaN(num)) return;
          const start = performance.now();
          const ease = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
          const tick = now => {
            const p = Math.min((now - start) / 1300, 1);
            el.textContent = Math.floor(ease(p) * num) + suf;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          cObs.unobserve(el);
        },
        { threshold: 0.5 }
      );
      cObs.observe(el);
    });
  }

  // ── Effet typing sur la description ──
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const fullText = typedEl.dataset.text || typedEl.textContent || '';
    typedEl.textContent = '';
    let i = 0;
    const typeObs = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return;
        typeObs.unobserve(typedEl);
        const interval = setInterval(() => {
          typedEl.textContent += fullText[i];
          i++;
          if (i >= fullText.length) clearInterval(interval);
        }, 18);
      },
      { threshold: 0.3 }
    );
    typeObs.observe(typedEl);
  }
}

