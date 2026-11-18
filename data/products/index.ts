import { normalizeSearchText } from "../../lib/utils";
import {
  categoryPath,
  productPath,
  routes,
  subcategoryPath,
} from "../../lib/routes";
import type { Category, Product, Subcategory } from "./types";
import { valvulas } from "./valvulas";

export type { Category, Subcategory, Product, ProductSpec, ProductDoc } from "./types";

/** Categorías del catálogo. Solo `valvulas` tiene productos navegables en v1. */
export const categories: Category[] = [
  valvulas,
  {
    id: "actuadores-y-accesorios",
    slug: "actuadores-y-accesorios",
    name: "Actuadores y Accesorios",
    description:
      "Accionamientos manuales, actuadores neumáticos y eléctricos para válvulas industriales.",
    image: "/categories/actuadores.webp",
    subcategories: [],
  },
  {
    id: "canos-bridas-y-accesorios",
    slug: "canos-bridas-y-accesorios",
    name: "Caños, Bridas y Accesorios",
    description:
      "Caños y tubos de acero, bridas y accesorios para conducción industrial.",
    image: "/categories/brida.webp",
    subcategories: [],
  },
  {
    id: "caudal-presion-temperatura",
    slug: "caudal-presion-temperatura",
    name: "Caudal, Presión y Temperatura",
    description:
      "Instrumentos de medición de caudal, presión y temperatura.",
    image: "/categories/manometro.webp",
    subcategories: [],
  },
  {
    id: "areas-clasificadas",
    slug: "areas-clasificadas",
    name: "Áreas Clasificadas",
    description:
      "Iluminación, gabinetes, cajas de comando, shelters y accesorios para zonas clasificadas.",
    image: "/categories/clasificada.webp",
    subcategories: [],
  },
];

export const NAVIGABLE_CATEGORY_IDS = new Set(["valvulas"]);

export function isCategoryNavigable(categoryId: string): boolean {
  return NAVIGABLE_CATEGORY_IDS.has(categoryId);
}

export function getCategoryBySlug(slug: string) {
  if (!slug) return undefined;
  
  // Buscamos ignorando espacios extras al inicio o al final
  return categories.find(
    (cat) => cat.slug.trim() === slug.trim()
  );
}

export function getAllProducts(): Product[] {
  return categories.flatMap((c) =>
    c.subcategories.flatMap((s) => s.products),
  );
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getProductBySlugs(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
): Product | undefined {
  const category = getCategoryBySlug(categorySlug);
  const subcategory = category?.subcategories.find(
    (s) => s.slug === subcategorySlug,
  );
  return subcategory?.products.find((p) => p.slug === productSlug);
}

export function getCategoryHref(category: Category): string {
  return categoryPath(category.slug);
}

export function getSubcategoryHref(
  category: Category,
  subcategory: Subcategory,
): string {
  return subcategoryPath(category.slug, subcategory.slug);
}

/** Public product URL: /productos/<categoria>/<subcategoria>/<producto>. */
export function getProductHref(product: Product): string {
  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(
    (s) => s.id === product.subcategoryId,
  );
  if (!category || !subcategory) return routes.products;
  return productPath(category.slug, subcategory.slug, product.slug);
}

export function getSubcategoryName(product: Product): string {
  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(
    (s) => s.id === product.subcategoryId,
  );
  return subcategory?.name ?? "";
}

/** Cover image for a valve family card (common photo or first product). */
export function getSubcategoryCover(subcategory: Subcategory): string {
  const covers: Record<string, string> = {
    mariposa: "/common/valvula-mariposa.jpg",
    esfericas: "/common/valvula-esferica.jpg",
    retencion: "/common/valvula-de-retencion.jpg",
    "guillotina-y-compuertas": "/common/valvula-guillotina.jpg",
    esclusas: "/common/valvula-esclusa.jpg",
    aire: "/common/valvula-de-aire.webp",
  };
  return covers[subcategory.slug] ?? subcategory.products[0]?.image ?? "";
}

export function searchProducts(query: string): Product[] {
  const q = normalizeSearchText(query.trim());
  if (!q) return [];
  return getAllProducts().filter((p) => {
    const haystack = normalizeSearchText(
      [
        p.name,
        p.description ?? "",
        p.brand ?? "",
        ...(p.specs?.map((s) => `${s.label} ${s.value}`) ?? []),
      ].join(" "),
    );
    return haystack.includes(q);
  });
}
