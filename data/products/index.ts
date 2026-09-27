import { normalizeSearchText } from "@/lib/utils";
import type { Category, Product } from "./types";
import { valvulas } from "./valvulas";

export type { Category, Subcategory, Product, ProductSpec, ProductDoc } from "./types";

// A medida que se generen las demás categorías se agregan acá.
export const categories: Category[] = [valvulas];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
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

// Ruta pública de un producto: /products/<categoria>/<subcategoria>/<producto>.
export function getProductHref(product: Product): string {
  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(
    (s) => s.id === product.subcategoryId,
  );
  if (!category || !subcategory) return "/products";
  return `/products/${category.slug}/${subcategory.slug}/${product.slug}`;
}

export function getSubcategoryName(product: Product): string {
  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(
    (s) => s.id === product.subcategoryId,
  );
  return subcategory?.name ?? "";
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
