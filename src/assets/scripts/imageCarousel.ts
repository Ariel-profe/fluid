export function initImageCarousel(root: HTMLElement): void {
  if (root.dataset.carouselReady === 'true') return;
  root.dataset.carouselReady = 'true';

  const slides = Array.from(
    root.querySelectorAll<HTMLElement>('[data-carousel-slide]')
  );
  const caption = root.querySelector<HTMLElement>('[data-carousel-caption]');
  const captionSources = Array.from(
    root.querySelectorAll<HTMLElement>('[data-carousel-caption-source]')
  );
  const dots = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]')
  );
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!slides.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = Number(root.dataset.interval || 4500);
  let index = 0;
  let timer: number | undefined;

  const startZoom = (slide: HTMLElement) => {
    const img = slide.querySelector<HTMLElement>('[data-carousel-image]');
    if (!img || reduced) return;
    img.style.transition = 'none';
    img.style.transform = 'scale(1)';
    // Reflow so the next transition always starts from 1.
    void img.offsetWidth;
    img.style.transition = 'transform 7s linear';
    img.style.transform = 'scale(1.045)';
  };

  const resetZoom = (slide: HTMLElement) => {
    const img = slide.querySelector<HTMLElement>('[data-carousel-image]');
    if (!img) return;
    img.style.transition = 'none';
    img.style.transform = 'scale(1)';
  };

  const show = (nextIndex: number) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('opacity-100', active);
      slide.classList.toggle('opacity-0', !active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) startZoom(slide);
      else resetZoom(slide);
    });

    const source = captionSources[index];
    if (caption && source) {
      caption.textContent = source.textContent?.trim() || '';
    }

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('bg-fluid-cyan', active);
      dot.classList.toggle('bg-white/45', !active);
    });
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    if (reduced) return;
    stop();
    timer = window.setInterval(() => show(index + 1), intervalMs);
  };

  prev?.addEventListener('click', () => {
    show(index - 1);
    start();
  });
  next?.addEventListener('click', () => {
    show(index + 1);
    start();
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      show(Number(dot.dataset.index || 0));
      start();
    });
  });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  show(0);
  start();
}
