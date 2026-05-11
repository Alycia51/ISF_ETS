document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar : transparent au top, blanche en scrollant ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    // Délai pour laisser le navigateur stabiliser le scroll au chargement
    setTimeout(() => {
      const checkNav = () => {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', checkNav, { passive: true });
      checkNav();
    }, 50);
  }

  // ── Mobile nav toggle ──
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

  // ── Lang dropdown ──
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  if (langToggle && langMenu) {
    langToggle.addEventListener('click', e => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => langMenu.classList.remove('open'));
    langMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => langMenu.classList.remove('open')));
  }

  // ── Scroll fade-up ──
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

  // ── Compteur animé ──
  document.querySelectorAll('.stat-number').forEach(el => {
    const cObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const raw = el.textContent || '';
      const num = parseInt(raw.replace(/\D/g, ''), 10);
      const suf = raw.replace(/\d/g, '');
      if (isNaN(num)) return;
      const start = performance.now();
      const ease = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;
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

  // ── Formulaire contact ──
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
      btn.disabled = true; btn.textContent = '⏳ Envoi...';
      try {
        const r = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: n, email: e, subject: document.querySelector('[name=subject]')?.value, message: m })
        });
        const d = await r.json();
        if (d.success) {
          const s = document.getElementById('successMsg');
          if (s) s.style.display = 'block';
          document.querySelectorAll('[name]').forEach(i => i.value = '');
        }
      } catch (err) { console.error(err); }
      btn.disabled = false; btn.textContent = label;
    });
  }

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Cartes projets — modal séparée ──
  const projectCards = document.querySelectorAll('.project-card');
  const projectsBackdrop = document.getElementById('projectsBackdrop');
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');

  // Données injectées depuis les cartes
  const projectData = [];
  projectCards.forEach((card, i) => {
    projectData.push({
      tag:             card.querySelector('.project-tag')?.textContent?.trim() || '',
      meta:            card.querySelector('.project-meta')?.textContent?.trim() || '',
      title:           card.querySelector('h3')?.textContent?.trim() || '',
      desc:            card.querySelector('.project-body p')?.textContent?.trim() || '',
    });
    card.addEventListener('click', () => openProjectModal(i));
  });

  function openProjectModal(i) {
    const d = projectData[i];
    document.getElementById('modalTag').textContent   = d.tag;
    document.getElementById('modalMeta').textContent  = d.meta;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalDesc').textContent  = d.desc;
    document.getElementById('modalGallery').innerHTML = '';
    projectModal.classList.add('show');
    projectsBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeProjectModal() {
    projectModal.classList.remove('show');
    projectsBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
  projectModalClose?.addEventListener('click', closeProjectModal);
  projectsBackdrop?.addEventListener('click', closeProjectModal);

  // ── Éventail de cartes podcast ──
  const podcastCards = document.querySelectorAll('.podcast-card');
  const blogBackdrop = document.getElementById('blogBackdrop');
  const podcastModal = document.getElementById('podcastModal');
  const podcastModalClose = document.getElementById('podcastModalClose');

  if (podcastCards.length && podcastModal) {
    const total = podcastCards.length;
    const spread = Math.min(9, 60 / total);
    const mid = (total - 1) / 2;

    // Positionner en éventail
    podcastCards.forEach((card, i) => {
      const angle = (i - mid) * spread;
      const tx = (i - mid) * 40;
      const ty = Math.abs(i - mid) * 5;
      const fanT = `translateX(${tx}px) translateY(${ty}px) rotate(${angle}deg)`;
      card.style.transform = fanT;
      card.style.zIndex = String(i + 1);
      card._fan = fanT;
      card._idx = i;

      card.addEventListener('mouseenter', () => {
        if (!card._locked) {
          card.style.transform = `translateX(${tx}px) translateY(${ty - 28}px) rotate(${angle}deg)`;
          card.style.zIndex = String(total + 5);
        }
      });
      card.addEventListener('mouseleave', () => {
        if (!card._locked) {
          card.style.transform = fanT;
          card.style.zIndex = String(i + 1);
        }
      });

      // Clic sur miniature → ouvre le lien
      card.querySelector('.card-thumb-link')?.addEventListener('click', e => {
        e.stopPropagation();
        const url = card.querySelector('.card-thumb-link')?.dataset?.url;
        if (url && url !== '#') window.open(url, '_blank');
      });

      // Clic sur la carte → ouvre modal
      card.addEventListener('click', e => {
        if (e.target.closest('.card-thumb-link')) return;
        openPodcastModal(card);
      });
    });

    function openPodcastModal(card) {
      const title = card.querySelector('.card-title')?.textContent || '';
      const guest = card.querySelector('.card-guest')?.textContent || '';
      const desc  = card.querySelector('.card-desc')?.textContent || '';
      const url   = card.querySelector('.card-thumb-link')?.dataset?.url || '#';
      const thumbImg = card.querySelector('.card-thumbnail img');

      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalGuest').textContent = guest;
      document.getElementById('modalDesc').textContent  = desc;
      document.getElementById('modalWatchBtn').href     = url;

      // Miniature
      const thumbEl = document.getElementById('modalThumb');
      if (thumbImg) {
        thumbEl.innerHTML = `<img src="${thumbImg.src}" alt="${title}" style="width:100%;height:100%;object-fit:cover;">`;
      } else {
        thumbEl.innerHTML = `<div class="card-thumb-placeholder-lg">🎙️</div>`;
      }

      // Membres (stockés en data-attribute si disponibles)
      const membersRaw = card.dataset.members;
      const membersEl  = document.getElementById('modalMembers');
      const membersListEl = document.getElementById('modalMembersList');
      if (membersRaw) {
        const members = JSON.parse(membersRaw);
        membersListEl.innerHTML = members.map(m => `<li>${m}</li>`).join('');
        membersEl.style.display = 'block';
      } else {
        membersEl.style.display = 'none';
      }

      podcastModal.classList.add('show');
      if (blogBackdrop) blogBackdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closePodcastModal() {
      podcastModal.classList.remove('show');
      if (blogBackdrop) blogBackdrop.classList.remove('show');
      document.body.style.overflow = '';
    }

    podcastModalClose?.addEventListener('click', closePodcastModal);
    blogBackdrop?.addEventListener('click', closePodcastModal);
  }

  // ── Dropdown réalisations navbar ──
  const dropdownItem = document.querySelector('.nav-item-dropdown');
  const dropdownBtn  = document.querySelector('.nav-dropdown-btn');
  if (dropdownItem && dropdownBtn) {
    dropdownBtn.addEventListener('click', e => {
      e.stopPropagation();
      dropdownItem.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdownItem.classList.remove('open'));
  }

  // ── Effet typing sur la description ──
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const fullText = typedEl.dataset.text || typedEl.textContent || '';
    typedEl.textContent = '';
    let i = 0;
    const typeObs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      typeObs.unobserve(typedEl);
      const interval = setInterval(() => {
        typedEl.textContent += fullText[i];
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 18);
    }, { threshold: 0.3 });
    typeObs.observe(typedEl);
  }

});