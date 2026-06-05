// ── MAIN.JS — Point d'entrée ─────────────────────────────────

import { navigate, openMobile, closeMobile, initNavScroll,
         toggleTheme, applyStoredTheme } from './nav.js';
import { renderEvents, renderExposants,
         initLogo3D, initLiquidBg, observeReveal, startCounters,
         openLightbox, closeLightbox,
         initFestivalCountdown, openFestivalModal, closeFestivalModal } from './ui.js';
import { submitAdhesion }   from './forms.js';
import { adminLogin, adminLogout, adminRefresh, deleteMember,
         switchAdminTab, cmsAddArtiste, cmsUpdateHome, exportCSV } from './admin.js';
import { initPayPal }       from './paypal.js';
import { filterGalerie, renderGalerie, renderGalerieHome } from './galerie.js';

// ── FILTRAGE ÉVÉNEMENTS ───────────────────────────────────────
function filterEvents(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (typeof window.renderEvents === 'function') window.renderEvents(cat);
}

// ── MONTANT DON ───────────────────────────────────────────────
let selectedMontant = 50;
function selectMontant(btn, val) {
  document.querySelectorAll('.montant-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedMontant = val;
  window.selectedMontant = val;
}

// ── EXPOSITION GLOBALE ────────────────────────────────────────
window.navigate          = navigate;
window.openMobile        = openMobile;
window.closeMobile       = closeMobile;
window.toggleTheme       = toggleTheme;
window.openLightbox      = openLightbox;
window.closeLightbox     = closeLightbox;
window.openFestivalModal = openFestivalModal;
window.closeFestivalModal= closeFestivalModal;
window.filterGalerie     = filterGalerie;
window.filterEvents      = filterEvents;
window.selectMontant     = selectMontant;
window.submitAdhesion    = submitAdhesion;
window.adminLogin        = adminLogin;
window.adminLogout       = adminLogout;
window.adminRefresh      = adminRefresh;
window.deleteMember      = deleteMember;
window.switchAdminTab    = switchAdminTab;
window.cmsAddArtiste     = cmsAddArtiste;
window.cmsUpdateHome     = cmsUpdateHome;
window.exportCSV         = exportCSV;

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  applyStoredTheme();
  initNavScroll();
  initLiquidBg();

  // Chargement de la page d'accueil
  try {
    await navigate('accueil');
    
    // Application des changements CMS locaux (Demo)
    const storedTitle = localStorage.getItem('amc_home_title');
    const storedSub   = localStorage.getItem('amc_home_sub');
    if (storedTitle) {
      const h1 = document.querySelector('.hero-title');
      if (h1) h1.innerHTML = storedTitle;
    }
    if (storedSub) {
      const p = document.querySelector('.hero-subtitle');
      if (p) p.textContent = storedSub;
    }

    initLogo3D();
    renderGalerieHome();
    initFestivalCountdown();
  } catch (err) {
    console.error('Initial navigation failed:', err);
  }

  const counterSection = document.querySelector('.chiffres-section');
  if (counterSection) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { startCounters(); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(counterSection);
  }

  setTimeout(initPayPal, 2000);
});
