import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/cta-section";
import { ProductGrid } from "@/components/products/catalog-views";
import { categories, getCategoryBySlug } from "@/data/products";
import { createMetadata } from "@/lib/metadata";

type Params = Promise<{ category: string; subcategory: string }>;

export function generateStaticParams() {
  return categories.flatMap((c) =>
    c.subcategories.map((s) => ({ category: c.slug, subcategory: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  const cat = getCategoryBySlug(category);
  const sub = cat?.subcategories.find((s) => s.slug === subcategory);
  if (!cat || !sub) return {};
  return createMetadata({
    title: sub.name,
    description: `${sub.name}: productos dentro de ${cat.name} para el control y la conducción de fluidos.`,
    path: `/products/${cat.slug}/${sub.slug}`,
  });
}

export default async function SubcategoryPage({ params }: { params: Params }) {
  const { category, subcategory } = await params;
  const cat = getCategoryBySlug(category);
  const sub = cat?.subcategories.find((s) => s.slug === subcategory);

  if (!cat || !sub) notFound();

  return (
    <section className="relative w-full text-foreground">
      <div className="container mx-auto px-3 py-10 lg:py-32">
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
          <Link
            href={`/products/${cat.slug}`}
            className="transition-colors hover:text-foreground/80"
          >
            {cat.name}
          </Link>
          <span aria-hidden className="text-foreground/25">/</span>
          <span className="text-foreground/70">{sub.name}</span>
        </nav>

         <h1 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground mt-10">
          {sub.name}
        </h1>

        <ProductGrid
          products={sub.products}
          backHref={`/products/${cat.slug}`}
          backLabel={cat.name}
        />
      </div>
      <CTASection />
    </section>
  );
}
