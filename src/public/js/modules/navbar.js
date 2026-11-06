/**
 * Navbar & Navigation Interactions
 * Handles scroll background transitions, mobile hamburger drawer,
 * language switcher dropdown, and responsive dropdown menus.
 */
export function initNavbar() {
  // ── Navbar : transparent au top, blanche en scrollant ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
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

  // ── Menus déroulants de la navbar (À propos + Réalisations) ──
  const dropdowns = document.querySelectorAll('.nav-item-dropdown');
  if (dropdowns.length) {
    dropdowns.forEach(item => {
      const btn = item.querySelector('.nav-dropdown-btn');
      btn?.addEventListener('click', e => {
        e.stopPropagation();
        const wasOpen = item.classList.contains('open');
        dropdowns.forEach(d => {
          d.classList.remove('open');
          d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', e => {
      dropdowns.forEach(d => {
        if (!d.contains(e.target)) {
          d.classList.remove('open');
          d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    window.addEventListener('scroll', () => {
      if (window.innerWidth > 768) {
        dropdowns.forEach(d => {
          d.classList.remove('open');
          d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
        });
      }
    }, { passive: true });
  }
}

