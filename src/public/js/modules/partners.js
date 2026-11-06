/**
 * Partners Page Interactions
 * Handles 3D card tilt with holographic foil reflections,
 * perks table accordion expansion, and diamond partner vlog modal.
 */
export function initPartners() {
  // ── Cartes qui s'inclinent en 3D et reflet qui suit la souris ──
  const pCards = document.querySelectorAll('.pcard');
  if (pCards.length) {
    pCards.forEach(card => {
      const max = parseFloat(card.dataset.tilt || '14');
      const foil = card.querySelector('.foil');

      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) translateY(-10px) scale(1.03)`;

        if (foil) {
          foil.classList.remove('idle');
          foil.style.backgroundPosition = `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        if (foil) {
          foil.style.backgroundPosition = '';
          foil.classList.add('idle');
        }
      });
    });
  }

  // ── Bouton « Voir tous les avantages » ──
  const perksToggle = document.getElementById('perksToggle');
  const perksTable = document.getElementById('perksTable');
  if (perksToggle && perksTable) {
    perksToggle.addEventListener('click', () => {
      const open = perksTable.classList.toggle('open');
      perksToggle.setAttribute('aria-expanded', String(open));
      perksToggle.textContent = open ? perksToggle.dataset.hide : perksToggle.dataset.show;
    });
  }

  // ── Billets Vlog/Blog des partenaires Diamant ──
  const postModal = document.getElementById('postModal');
  const postBody = document.getElementById('postModalBody');
  const postBackdrop = document.getElementById('postBackdrop');
  const postClose = document.getElementById('postClose');

  if (postModal && postBody) {
    const openPost = card => {
      const full = card.querySelector('.post-full');
      if (!full) return;
      const copy = full.cloneNode(true);
      copy.hidden = false;
      postBody.replaceChildren(copy);
      postModal.classList.add('show');
      postBackdrop?.classList.add('show');
      document.body.style.overflow = 'hidden';
    };

    const closePost = () => {
      postModal.classList.remove('show');
      postBackdrop?.classList.remove('show');
      postBody.replaceChildren();
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.pvlog-card').forEach(card => {
      card.querySelector('.pvlog-more')?.addEventListener('click', () => openPost(card));
      card.querySelector('.pvlog-media')?.addEventListener('click', () => openPost(card));
    });

    postClose?.addEventListener('click', closePost);
    postBackdrop?.addEventListener('click', closePost);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && postModal.classList.contains('show')) {
        closePost();
      }
    });
  }
}

