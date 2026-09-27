import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CTASection } from "@/components/cta-section";
import { SubcategoryGrid, ProductGrid } from "@/components/products/catalog-views";
import { categories, getCategoryBySlug } from "@/data/products";
import { createMetadata } from "@/lib/metadata";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return createMetadata({
    title: cat.name,
    description:
      cat.description ??
      `${cat.name}: productos para el control y la conducción de fluidos.`,
    path: `/products/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  return (
    <section className="relative w-full bg-background text-foreground">
      <div className="mx-auto max-w-420 px-10 max-[850px]:px-6 pt-28 max-[850px]:pt-24 pb-16 max-[850px]:pb-12">
        <nav
          aria-label="Ruta"
          className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/45"
        >
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Inicio
          </Link>
          <span aria-hidden className="text-foreground/25">/</span>
          <Link href="/products" className="transition-colors hover:text-foreground/80">
            Productos
          </Link>
          <span aria-hidden className="text-foreground/25">/</span>
          <span className="text-foreground/70">{cat.name}</span>
        </nav>

        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
          {cat.name}
        </h2>

        {cat.subcategories.length > 1 ? (
          <SubcategoryGrid category={cat} />
        ) : (
          <ProductGrid
            products={cat.subcategories.flatMap((s) => s.products)}
            backHref="/products"
            backLabel="Todas las categorías"
          />
        )}
      </div>
      <CTASection />
    </section>
  );
}
