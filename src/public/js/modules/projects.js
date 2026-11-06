/**
 * Projects, Shadowbox Albums & Lightbox Carousel
 * Handles project overview modals, vintage album modals (history, clothing drive, others),
 * and fullscreen photo gallery carousel with keyboard navigation.
 */
export function initProjects() {
  // ── Cartes projets — modal générique ──
  const projectCards = document.querySelectorAll('.project-card');
  const projectsBackdrop = document.getElementById('projectsBackdrop');
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');

  if (projectCards.length && projectModal && projectsBackdrop) {
    const projectData = [];
    projectCards.forEach((card, i) => {
      projectData.push({
        tag: card.querySelector('.project-tag')?.textContent?.trim() || '',
        meta: card.querySelector('.project-meta')?.textContent?.trim() || '',
        title: card.querySelector('h3')?.textContent?.trim() || '',
        desc: card.querySelector('.project-body p')?.textContent?.trim() || '',
      });
      card.addEventListener('click', () => openProjectModal(i));
    });

    function openProjectModal(i) {
      const d = projectData[i];
      const tagEl = document.getElementById('modalTag');
      const metaEl = document.getElementById('modalMeta');
      const titleEl = document.getElementById('modalTitle');
      const descEl = document.getElementById('modalDesc');
      const galleryEl = document.getElementById('modalGallery');

      if (tagEl) tagEl.textContent = d.tag;
      if (metaEl) metaEl.textContent = d.meta;
      if (titleEl) titleEl.textContent = d.title;
      if (descEl) descEl.textContent = d.desc;
      if (galleryEl) galleryEl.innerHTML = '';

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
    projectsBackdrop.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        closeProjectModal();
      }
    });
  }

  // ── Album shadowbox Histoire ──
  const openAlbum = document.getElementById('openAlbum2026');
  if (openAlbum) {
    const albumBackdrop = document.getElementById('albumBackdrop');
    const albumModal = document.getElementById('albumModal');
    const albumClose = document.getElementById('albumClose');

    if (albumModal && albumBackdrop) {
      openAlbum.addEventListener('click', () => {
        albumModal.classList.add('open');
        albumBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      });

      const closeAlbum = () => {
        albumModal.classList.remove('open');
        albumBackdrop.classList.remove('open');
        document.body.style.overflow = '';
        const vid = albumModal.querySelector('video');
        if (vid) vid.pause();
      };

      albumClose?.addEventListener('click', closeAlbum);
      albumBackdrop.addEventListener('click', closeAlbum);

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && albumModal.classList.contains('open')) {
          closeAlbum();
        }
      });
    }
  }

  // ── Album shadowbox Autres ──
  const openAutres = document.getElementById('openAutres2026');
  if (openAutres) {
    const autresBackdrop = document.getElementById('autresBackdrop');
    const autresModal = document.getElementById('autresModal');
    const autresClose = document.getElementById('autresClose');

    if (autresModal && autresBackdrop) {
      openAutres.addEventListener('click', () => {
        autresModal.classList.add('open');
        autresBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      });

      const closeAutres = () => {
        autresModal.classList.remove('open');
        autresBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      };

      autresClose?.addEventListener('click', closeAutres);
      autresBackdrop.addEventListener('click', closeAutres);

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && autresModal.classList.contains('open')) {
          closeAutres();
        }
      });
    }
  }

  // ── Cartes vintage par édition (Collecte) ──
  document.querySelectorAll('.vintage-card[data-edition]').forEach(card => {
    const year = card.dataset.edition;
    const backdrop = document.getElementById(`backdrop-${year}`);
    const modal = document.getElementById(`modal-${year}`);
    if (!modal || !backdrop) return;

    card.addEventListener('click', () => {
      modal.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeBtn = modal.querySelector('.album-close');
    const closeModal = () => {
      modal.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  });

  // ── Lightbox photos plein écran ──
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (lightbox && lightboxContent) {
    const sections = {};

    document.querySelectorAll('.album-thumb').forEach(thumb => {
      const section = thumb.dataset.section || 'default';
      const idx = parseInt(thumb.dataset.index || '0', 10);
      if (!sections[section]) sections[section] = [];
      sections[section][idx] = {
        src: thumb.dataset.src,
        caption: thumb.dataset.caption || '',
      };
      thumb.addEventListener('click', () => openLightbox(section, idx));
    });

    let curSection = 'default';
    let curIdx = 0;

    function openLightbox(section, idx) {
      curSection = section;
      curIdx = idx;
      showLightboxItem();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function showLightboxItem() {
      const items = sections[curSection];
      if (!items || !items[curIdx]) return;
      const item = items[curIdx];

      lightboxContent.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:14px;">
          <img src="${item.src}" alt="${item.caption || ''}" style="max-width:90vw;max-height:75vh;border-radius:12px;object-fit:contain;">
          ${item.caption ? `<p style="color:rgba(255,255,255,.8);font-size:14px;text-align:center;max-width:600px;line-height:1.5;">${item.caption}</p>` : ''}
        </div>`;

      if (lightboxPrev) lightboxPrev.style.display = items.length > 1 ? 'flex' : 'none';
      if (lightboxNext) lightboxNext.style.display = items.length > 1 ? 'flex' : 'none';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightboxContent.innerHTML = '';
      // Restaurer le scroll seulement si aucune modale d'album n'est active en arrière-plan
      const hasActiveModal = document.querySelector('.album-modal.open, .modal.show');
      if (!hasActiveModal) {
        document.body.style.overflow = '';
      }
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev?.addEventListener('click', e => {
      e.stopPropagation();
      const items = sections[curSection];
      if (!items || !items.length) return;
      curIdx = (curIdx - 1 + items.length) % items.length;
      showLightboxItem();
    });

    lightboxNext?.addEventListener('click', e => {
      e.stopPropagation();
      const items = sections[curSection];
      if (!items || !items.length) return;
      curIdx = (curIdx + 1) % items.length;
      showLightboxItem();
    });

    document.addEventListener('keydown', e => {
      if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') {
          e.stopPropagation();
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          const items = sections[curSection];
          if (items && items.length) {
            curIdx = (curIdx - 1 + items.length) % items.length;
            showLightboxItem();
          }
        } else if (e.key === 'ArrowRight') {
          const items = sections[curSection];
          if (items && items.length) {
            curIdx = (curIdx + 1) % items.length;
            showLightboxItem();
          }
        }
      }
    });
  }
}

