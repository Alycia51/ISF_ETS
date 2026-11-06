/**
 * Main Application Script (ES Module Entry Point)
 * Orchestrates client-side features and modular interactions.
 */
import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initContact } from './modules/contact.js';
import { initFaq } from './modules/faq.js';
import { initPodcasts } from './modules/podcasts.js';
import { initProjects } from './modules/projects.js';
import { initPartners } from './modules/partners.js';

function initApp() {
  initNavbar();
  initAnimations();
  initContact();
  initFaq();
  initPodcasts();
  initProjects();
  initPartners();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
