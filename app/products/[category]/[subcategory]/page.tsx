import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
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
      <div className="container mx-auto px-3 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <SiteBreadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/products" },
            { label: cat.name, href: `/products/${cat.slug}` },
            { label: sub.name },
          ]}
        />

        <h1 className="mt-8 text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]">
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
