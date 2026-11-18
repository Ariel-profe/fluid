/**
 * Public Spanish URL map. Internal code stays in English; user-facing paths are ES.
 */

export const routes = {
  home: '/',
  about: '/nosotros',
  products: '/productos',
  services: '/servicios',
  contact: '/contacto',
  clients: '/clientes',
} as const;

export type AppRoute = keyof typeof routes;

/** Category listing: /productos/valvulas */
export function categoryPath(categorySlug: string): string {
  return `${routes.products}/${categorySlug}`;
}

/** Subcategory listing: /productos/valvulas/mariposa */
export function subcategoryPath(
  categorySlug: string,
  subcategorySlug: string
): string {
  return `${routes.products}/${categorySlug}/${subcategorySlug}`;
}

/** Product detail: /productos/valvulas/mariposa/vxs */
export function productPath(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
): string {
  return `${routes.products}/${categorySlug}/${subcategorySlug}/${productSlug}`;
}

/** Legacy English → Spanish redirects for bookmarks / old links. */
export const legacyRedirects: Record<string, string> = {
  '/about': routes.about,
  '/products': routes.products,
  '/services': routes.services,
  '/contact': routes.contact,
  '/partners': routes.clients,
};
