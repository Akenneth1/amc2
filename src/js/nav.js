// ── NAV.JS — Navigation SPA · Menu mobile · Scroll · Thème ──

import { observeReveal, renderEvents, renderExposants } from './ui.js';
import { adminRefresh, loadArtistes }  from './admin.js';
import { renderGalerie } from './galerie.js';
import { initPayPal }    from './paypal.js';

// ── NAVIGATE (SPA) ────────────────────────────────────────────
export async function navigate(page) {
  console.log('Navigating to:', page);
  
  if (page === 'admin' && !sessionStorage.getItem('amc_admin_session')) {
    page = 'admin-login';
  }

  const appDiv = document.getElementById('app');
  if (!appDiv) return;

  let target = document.getElementById('page-' + page);

  // Chargement dynamique si la page n'est pas encore injectée
  if (!target) {
    try {
      // Détecte automatiquement la base (local ou GitHub Pages)
      const base = import.meta.env.BASE_URL || './';
      const response = await fetch(`${base}src/pages/${page}.html`);
      if (response.ok) {
        const html = await response.text();
        target = document.createElement('div');
        target.id = 'page-' + page;
        target.className = 'page';
        target.innerHTML = html;
        appDiv.appendChild(target);
      } else {
        console.error('Page non trouvée:', page);
        return;
      }
    } catch (e) {
      console.error('Erreur de chargement:', e);
      return;
    }
  }

  // Activation de la page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  target.classList.add('active');

  // Mise à jour de la navigation
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  // Retour en haut de page
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Réinitialisation des animations et logique spécifique
  setTimeout(() => {
    observeReveal();
    try {
      if (page === 'admin')       adminRefresh();
      if (page === 'partenaires') loadArtistes();
      if (page === 'evenements')  renderEvents('tous');
      if (page === 'festival')    renderExposants();
      if (page === 'galerie')     renderGalerie();
      
      if (['don', 'festival', 'paiement'].includes(page)) {
        initPayPal();
      }
    } catch (err) {
      console.warn('Init error:', err);
    }
  }, 100);
}

// ── MOBILE MENU ───────────────────────────────────────────────
export function openMobile() {
  document.getElementById('mobileMenu')?.classList.add('open');
}
export function closeMobile() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}

// ── SCROLL → nav.scrolled ─────────────────────────────────────
export function initNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── THÈME CLAIR / SOMBRE ──────────────────────────────────────
export function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('amc_theme', isLight ? 'light' : 'dark');
}

export function applyStoredTheme() {
  if (localStorage.getItem('amc_theme') === 'light') {
    document.body.classList.add('light-theme');
  }
}
