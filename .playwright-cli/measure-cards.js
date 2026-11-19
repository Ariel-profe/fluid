async (page) => {
  await page.waitForTimeout(1000);
  return await page.evaluate(() => {
    function measure(c) {
      const img = c.querySelector('img');
      if (!img) return null;
      if (!img.naturalWidth) {
        return {
          name: c.querySelector('h3')?.textContent?.trim()?.slice(0, 40),
          pending: true,
          src: img.getAttribute('src'),
        };
      }
      const ir = img.getBoundingClientRect();
      const elW = ir.width;
      const elH = ir.height;
      const natR = img.naturalWidth / img.naturalHeight;
      const elR = elW / elH;
      let cW;
      let cH;
      if (natR > elR) {
        cW = elW;
        cH = elW / natR;
      } else {
        cH = elH;
        cW = elH * natR;
      }
      return {
        name: c.querySelector('h3')?.textContent?.trim()?.slice(0, 40),
        src: img.getAttribute('src')?.split('/').pop(),
        content: `${Math.round(cW)}x${Math.round(cH)}`,
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        ratio: +natR.toFixed(2),
        area: Math.round(cW * cH),
      };
    }

    const cards = [...document.querySelectorAll('[data-reveal-item]')]
      .map(measure)
      .filter(Boolean);
    const ready = cards.filter((c) => !c.pending);
    const areas = ready.map((c) => c.area);
    const min = Math.min(...areas);
    const max = Math.max(...areas);
    return {
      page: location.pathname,
      count: cards.length,
      ready: ready.length,
      variancePct: ready.length ? Math.round(((max - min) / min) * 100) : null,
      cards,
    };
  });
}
