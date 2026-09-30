import type { ReactNode } from "react";
import { CatalogCard, CatalogGrid } from "@/components/catalog-card";
import { getCategoryHref, CATALOG_CATEGORIES } from "@/data/catalog-categories";
import {
  getCategoryBySlug,
  getProductHref,
  getSubcategoryName,
  type Category,
  type Product,
} from "@/data/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function countProducts(category: Category): number {
  return category.subcategories.reduce((n, s) => n + s.products.length, 0);
}

export function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}): ReactNode {
  return (
    <Link
      href={href}
      className="group mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft
        className="h-4 w-4"
        strokeWidth={1.6}
        aria-hidden
      />
      {label}
    </Link>
  );
}

export function CategoryGrid(): ReactNode {
  return (
    <CatalogGrid>
      {CATALOG_CATEGORIES.map((tile, i) => {
        const category = getCategoryBySlug(tile.slug);
        const href = getCategoryHref(tile.slug);
        const meta = category
          ? `${countProducts(category)} productos`
          : "Próximamente";
        return (
          <CatalogCard
            key={tile.id}
            index={String(i + 1).padStart(2, "0")}
            title={tile.title}
            image={tile.image}
            tags={tile.subcategories}
            meta={meta}
            href={href}
            media="cover"
            comingSoon={!href}
          />
        );
      })}
    </CatalogGrid>
  );
}

export function SubcategoryGrid({ category }: { category: Category }): ReactNode {
  return (
    <>
      <BackLink href="/products" label="Todas las categorías" />
      <CatalogGrid>
        {category.subcategories.map((s, index) => (
          <CatalogCard
            key={s.id}
            index={String(index + 1).padStart(2, "0")}
            title={s.name}
            image={s.products[0]?.image ?? category.image ?? "/categories/valvulas.webp"}
            meta={`${s.products.length} productos`}
            href={`/products/${category.slug}/${s.slug}`}
            media="product"
            titleAs="h2"
          />
        ))}
      </CatalogGrid>
    </>
  );
}

export function ProductGrid({
  products,
  backHref,
  backLabel,
}: {
  products: Product[];
  backHref: string;
  backLabel: string;
}): ReactNode {
  return (
    <>
      <BackLink href={backHref} label={backLabel} />
      <CatalogGrid>
        {products.map((product, index) => (
          <CatalogCard
            key={product.id}
            index={String(index + 1).padStart(2, "0")}
            title={product.name}
            image={product.image}
            meta={getSubcategoryName(product)}
            href={getProductHref(product)}
            media="product"
            titleAs="h2"
          />
        ))}
      </CatalogGrid>
    </>
  );
}
