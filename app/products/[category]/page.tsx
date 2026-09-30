import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
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
    <section className="relative w-full text-foreground">
      <div className="container mx-auto px-3 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <SiteBreadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/products" },
            { label: cat.name },
          ]}
        />

        <h1 className="mt-8 text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]">
          {cat.name}
        </h1>

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
