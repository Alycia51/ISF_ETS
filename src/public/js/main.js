document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 10), { passive: true });
  }

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    }));
  }

  // Scroll fade-up animation
  const items = document.querySelectorAll('.stat-item,.pillar-card,.value-card,.project-card,.event-card,.member-card');
  items.forEach((el, i) => {
    el.classList.add('fade-up');
    const mod = i % 4;
    if (mod > 0 && mod <= 3) el.classList.add('delay-' + mod);
  });
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach(el => obs.observe(el));

  // Counter animation for stat numbers
  document.querySelectorAll('.stat-number').forEach(el => {
    const cObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const raw = el.textContent || '';
      const num = parseInt(raw.replace(/\D/g, ''), 10);
      const suf = raw.replace(/\d/g, '');
      if (isNaN(num)) return;
      const start = performance.now();
      const ease = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const tick = now => {
        const p = Math.min((now - start) / 1300, 1);
        el.textContent = Math.floor(ease(p) * num) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cObs.unobserve(el);
    }, { threshold: 0.5 });
    cObs.observe(el);
  });

  // Contact form submit
  const btn = document.getElementById('submitBtn');
  if (btn) {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const n = document.querySelector('[name=name]')?.value?.trim();
      const e = document.querySelector('[name=email]')?.value?.trim();
      const m = document.querySelector('[name=message]')?.value?.trim();
      if (!n || !e || !m) {
        btn.style.animation = 'shake .4s ease';
        setTimeout(() => btn.style.animation = '', 400);
        return;
      }
      btn.disabled = true;
      btn.textContent = '⏳ Envoi...';
      try {
        const r = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: n, email: e,
            subject: document.querySelector('[name=subject]')?.value,
            message: m
          })
        });
        const d = await r.json();
        if (d.success) {
          const successMsg = document.getElementById('successMsg');
          if (successMsg) successMsg.style.display = 'block';
          document.querySelectorAll('[name]').forEach(i => i.value = '');
        }
      } catch (err) {
        console.error(err);
      }
      btn.disabled = false;
      btn.textContent = label;
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});