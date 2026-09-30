import { getCategoryBySlug } from "@/data/products";

export type CatalogCategoryTile = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  galleryImage: string;
  subcategories: string[];
};

/** Las 5 líneas comerciales. Home, catálogo, nav, footer y galería leen esto. */
export const CATALOG_CATEGORIES: CatalogCategoryTile[] = [
  {
    id: "valvulas",
    slug: "valves",
    title: "Válvulas",
    description:
      "Mariposas, esféricas, esclusas, de retención, de aire, guillotina y aplicaciones especiales.",
    image: "/categories/valvulas.webp",
    galleryImage: "/common/1.jpg",
    subcategories: ["Mariposa", "Esférica", "Retención", "Esclusa", "Guillotina", "Aire"],
  },
  {
    id: "actuadores",
    slug: "actuadores-accesorios",
    title: "Actuadores y accesorios",
    description:
      "Actuadores neumáticos, eléctricos e hidráulicos, junto con accesorios y componentes relacionados.",
    image: "/categories/actuadores.webp",
    galleryImage: "/common/2.jpg",
    subcategories: ["Manuales", "Neumáticos", "Eléctricos"],
  },
  {
    id: "canos-bridas",
    slug: "canos-bridas-accesorios",
    title: "Caños, bridas y accesorios",
    description:
      "Caños de acero, galvanizados, bridas, juntas y accesorios para sistemas industriales.",
    image: "/categories/brida.webp",
    galleryImage: "/common/3.jpg",
    subcategories: ["Caños de acero", "Bridas", "Accesorios"],
  },
  {
    id: "caudal-presion",
    slug: "caudal-presion-temperatura",
    title: "Caudal, presión y temperatura",
    description:
      "Placas, bombas, manómetros y sensores para medición y control de proceso.",
    image: "/categories/manometro.webp",
    galleryImage: "/common/4.jpg",
    subcategories: ["Caudal", "Presión", "Temperatura"],
  },
  {
    id: "areas-clasificadas",
    slug: "areas-clasificadas",
    title: "Áreas clasificadas",
    description:
      "Iluminación, gabinetes Ex, comando y señalización, climatización y accesorios certificados.",
    image: "/categories/clasificada.webp",
    galleryImage: "/common/5.jpg",
    subcategories: [
      "Iluminación",
      "Seguridad aumentada",
      "Comando y señalización",
      "Climatización",
      "Prensacables",
    ],
  },
];

export function isCategoryPublished(slug: string): boolean {
  return Boolean(getCategoryBySlug(slug));
}

export function getCategoryHref(slug: string): string | undefined {
  return isCategoryPublished(slug) ? `/products/${slug}` : undefined;
}
