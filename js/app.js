(() => {
  'use strict';
  const deck = document.getElementById('deck');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('[data-index]'));
  const prev = document.getElementById('previous');
  const next = document.getElementById('next');
  const full = document.getElementById('fullscreen');
  const counter = document.getElementById('counter');
  const announce = document.getElementById('announce');
  let index = 0;
  let pointerStart = null;

  function showSlide(target) {
    const requested = Math.min(slides.length - 1, Math.max(0, target));
    if (requested === index) return;
    index = requested;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if (active) {
        slide.removeAttribute('inert');
        slide.scrollTop = 0;
      } else {
        slide.setAttribute('inert', '');
      }
    });
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    announce.textContent = slides[index].getAttribute('aria-label') || '';
  }

  prev.addEventListener('click', () => showSlide(index - 1));
  next.addEventListener('click', () => showSlide(index + 1));
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.index))));

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault(); showSlide(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault(); showSlide(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault(); showSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault(); showSlide(slides.length - 1);
    } else if (event.key.toLowerCase() === 'f') {
      event.preventDefault(); toggleFullscreen();
    }
  });

  // Deslizar horizontalmente también funciona en pantallas táctiles.
  deck.addEventListener('touchstart', event => {
    if (event.touches.length === 1) pointerStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  deck.addEventListener('touchend', event => {
    if (!pointerStart || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - pointerStart.x;
    const dy = event.changedTouches[0].clientY - pointerStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.35) showSlide(index + (dx < 0 ? 1 : -1));
    pointerStart = null;
  }, { passive: true });

  async function toggleFullscreen() {
    if (!document.fullscreenEnabled) return;
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (error) {
      console.warn('El navegador no permitió activar pantalla completa.', error);
    }
  }
  full.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    const active = Boolean(document.fullscreenElement);
    full.setAttribute('aria-label', active ? 'Salir de pantalla completa' : 'Activar pantalla completa');
    full.title = active ? 'Salir de pantalla completa (Esc)' : 'Pantalla completa (F)';
  });
})();
