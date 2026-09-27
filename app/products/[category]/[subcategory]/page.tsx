import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { RevealHeadline } from "@/components/reveal-headline";
import { FinalCta } from "@/components/final-cta";
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
          <Link
            href={`/products/${cat.slug}`}
            className="transition-colors hover:text-foreground/80"
          >
            {cat.name}
          </Link>
          <span aria-hidden className="text-foreground/25">/</span>
          <span className="text-foreground/70">{sub.name}</span>
        </nav>

        <RevealHeadline
          as="h1"
          className="mt-4 text-balance text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.98] tracking-tight"
        >
          {sub.name}
        </RevealHeadline>

        <ProductGrid
          products={sub.products}
          backHref={`/products/${cat.slug}`}
          backLabel={cat.name}
        />
      </div>
      <FinalCta />
    </section>
  );
}
