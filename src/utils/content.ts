/**
 * Legacy content-collection helpers were removed with the old MD catalog.
 * The live industrial catalog is TypeScript data under `data/` + `lib/`.
 * This module is kept as a stub so old import paths fail loudly if reintroduced.
 */

export function contentCollectionsRemoved(): never {
  throw new Error(
    'Astro content collections are not used. Use data/ + lib/ for catalog content.'
  );
}
