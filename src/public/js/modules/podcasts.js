/**
 * Podcast Fan Showcase & Modal
 * Handles 3D fan layout calculation, hover dynamics,
 * external video navigation, and podcast details modal.
 */
export function initPodcasts() {
  const podcastCards = document.querySelectorAll('.podcast-card');
  const blogBackdrop = document.getElementById('blogBackdrop');
  const podcastModal = document.getElementById('podcastModal');
  const podcastModalClose = document.getElementById('podcastModalClose');

  if (!podcastCards.length || !podcastModal) return;

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

    // Clic sur miniature → ouvre le lien externe
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
    const desc = card.querySelector('.card-desc')?.textContent || '';
    const url = card.querySelector('.card-thumb-link')?.dataset?.url || '#';
    const thumbImg = card.querySelector('.card-thumbnail img');

    const modalTitle = document.getElementById('modalTitle');
    const modalGuest = document.getElementById('modalGuest');
    const modalDesc = document.getElementById('modalDesc');
    const modalWatchBtn = document.getElementById('modalWatchBtn');
    const thumbEl = document.getElementById('modalThumb');

    if (modalTitle) modalTitle.textContent = title;
    if (modalGuest) modalGuest.textContent = guest;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalWatchBtn) modalWatchBtn.href = url;

    // Miniature
    if (thumbEl) {
      if (thumbImg) {
        thumbEl.innerHTML = `<img src="${thumbImg.src}" alt="${title}" style="width:100%;height:100%;object-fit:cover;">`;
      } else {
        thumbEl.innerHTML = `<div class="card-thumb-placeholder-lg">🎙️</div>`;
      }
    }

    // Membres
    const membersRaw = card.dataset.members;
    const membersEl = document.getElementById('modalMembers');
    const membersListEl = document.getElementById('modalMembersList');
    if (membersRaw && membersListEl && membersEl) {
      try {
        const members = JSON.parse(membersRaw);
        membersListEl.innerHTML = members.map(m => `<li>${m}</li>`).join('');
        membersEl.style.display = 'block';
      } catch (err) {
        membersEl.style.display = 'none';
      }
    } else if (membersEl) {
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

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && podcastModal.classList.contains('show')) {
      closePodcastModal();
    }
  });
}

