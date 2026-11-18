type SearchProduct = {
  id: string;
  name: string;
  description: string;
  brand: string;
  href: string;
  specs: string;
};

type FluidLenis = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
};

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getLenis(): FluidLenis | null {
  return (window as Window & { __fluidLenis?: FluidLenis | null }).__fluidLenis ?? null;
}

function freezeScroll(run: () => void): void {
  const y = window.scrollY;
  const lenis = getLenis();
  run();
  // Restore after DOM updates / focus side-effects (Lenis + sticky nav).
  requestAnimationFrame(() => {
    if (Math.abs(window.scrollY - y) > 0.5) {
      window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior });
      lenis?.scrollTo(y, { immediate: true });
    }
  });
}

export function initProductSearch(
  products: SearchProduct[],
  hint: string,
  empty: string
): void {
  const roots = document.querySelectorAll('[data-product-search]');
  roots.forEach((root) => {
    if (!(root instanceof HTMLElement) || root.dataset.searchReady === 'true') return;
    root.dataset.searchReady = 'true';
    root.setAttribute('data-lenis-prevent', '');

    const input = root.querySelector('[data-product-search-input]');
    const results = root.querySelector('[data-product-search-results]');
    if (!(input instanceof HTMLInputElement) || !(results instanceof HTMLElement)) {
      return;
    }

    results.setAttribute('data-lenis-prevent', '');

    const render = (items: SearchProduct[], query: string) => {
      freezeScroll(() => {
        if (query.trim().length < 2) {
          results.innerHTML = `<p class="px-3 py-2 text-sm text-neutral-500">${hint}</p>`;
          results.hidden = false;
          results.classList.remove('hidden');
          return;
        }
        if (!items.length) {
          results.innerHTML = `<p class="px-3 py-2 text-sm text-neutral-500">${empty}</p>`;
          results.hidden = false;
          results.classList.remove('hidden');
          return;
        }
        results.innerHTML = items
          .slice(0, 8)
          .map(
            (item) => `
            <a href="${item.href}" class="block rounded-xl px-3 py-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800" role="option">
              <span class="block text-sm font-medium text-fluid-navy dark:text-white">${item.name}</span>
              <span class="block text-xs text-neutral-500">${item.description || 'Producto industrial'}</span>
            </a>`
          )
          .join('');
        results.hidden = false;
        results.classList.remove('hidden');
      });
    };

    const search = () => {
      const q = normalize(input.value.trim());
      if (q.length < 2) {
        render([], input.value);
        return;
      }
      const matches = products.filter((product) => {
        const haystack = normalize(
          [product.name, product.description, product.brand, product.specs].join(' ')
        );
        return haystack.includes(q);
      });
      render(matches, input.value);
    };

    input.addEventListener('input', search);
    input.addEventListener('focus', () => {
      freezeScroll(() => search());
    });
    input.addEventListener('mousedown', (event) => {
      // Keep sticky-nav focus from scrolling the document into view.
      if (document.activeElement !== input) {
        event.preventDefault();
        const y = window.scrollY;
        input.focus({ preventScroll: true });
        window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior });
        getLenis()?.scrollTo(y, { immediate: true });
      }
    });
    document.addEventListener('click', (event) => {
      if (!root.contains(event.target as Node)) {
        results.classList.add('hidden');
        results.hidden = true;
      }
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        results.classList.add('hidden');
        results.hidden = true;
        input.blur();
      }
    });
  });
}
