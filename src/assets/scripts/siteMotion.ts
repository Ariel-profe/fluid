import '@styles/lenis.css';

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FluidWindow = Window & {
  __fluidLenis?: Lenis | null;
  __fluidMotionReady?: boolean;
};

/**
 * Single motion stack: Lenis driven by GSAP ticker + calm scroll reveals.
 * Avoids the dual-RAF hitch that causes section-to-section jumps.
 */
export function initSiteMotion(): void {
  const w = window as FluidWindow;
  if (w.__fluidMotionReady) return;
  w.__fluidMotionReady = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    w.__fluidLenis = null;
    return;
  }

  const lenis = new Lenis({
    autoRaf: false,
    prevent: (node) =>
      node instanceof HTMLElement &&
      (node.hasAttribute('data-lenis-prevent') ||
        Boolean(node.closest('[data-lenis-prevent]'))),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  w.__fluidLenis = lenis;

  initReveals();
}

function isOutermostReveal(el: HTMLElement): boolean {
  let parent = el.parentElement;
  while (parent) {
    if (parent.hasAttribute('data-reveal') || parent.hasAttribute('data-reveal-group')) {
      return false;
    }
    parent = parent.parentElement;
  }
  return true;
}

function initReveals(): void {
  const blocks = Array.from(
    document.querySelectorAll<HTMLElement>('[data-reveal]')
  ).filter(isOutermostReveal);

  blocks.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = Array.from(
      group.querySelectorAll<HTMLElement>('[data-reveal-item]')
    );
    if (!items.length) return;

    if (group.getBoundingClientRect().top < window.innerHeight * 0.9) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    gsap.set(items, { opacity: 0, y: 20 });
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          force3D: true,
          overwrite: 'auto',
        });
      },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-media]').forEach((media) => {
    const trigger = media.closest('[data-reveal-item], [data-reveal], [data-reveal-group]') ?? media;
    if (media.getBoundingClientRect().top < window.innerHeight * 0.92) {
      gsap.set(media, { opacity: 1, clearProps: 'transform' });
      return;
    }

    // Opacity-only — avoid scale on large photos (GPU decode + layer thrash).
    gsap.fromTo(
      media,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // Refresh after layout settles — and once more after images decode.
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
  window.addEventListener(
    'load',
    () => {
      ScrollTrigger.refresh();
    },
    { once: true }
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initSiteMotion());
} else {
  initSiteMotion();
}
