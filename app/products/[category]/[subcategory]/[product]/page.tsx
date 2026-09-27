import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/products/product-detail";
import { CTASection } from "@/components/cta-section";
import {
  categories,
  getCategoryBySlug,
  getProductHref,
} from "@/data/products";
import { createMetadata } from "@/lib/metadata";

type Params = Promise<{
  category: string;
  subcategory: string;
  product: string;
}>;

export function generateStaticParams() {
  return categories.flatMap((c) =>
    c.subcategories.flatMap((s) =>
      s.products.map((p) => ({
        category: c.slug,
        subcategory: s.slug,
        product: p.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, subcategory, product } = await params;
  const cat = getCategoryBySlug(category);
  const sub = cat?.subcategories.find((s) => s.slug === subcategory);
  const prod = sub?.products.find((p) => p.slug === product);
  if (!cat || !sub || !prod) return {};
  return createMetadata({
    title: prod.name,
    description:
      prod.description ??
      `${prod.name} — ${sub.name}, ${cat.name}. Solicitá información y cotización en Fluid.`,
    path: getProductHref(prod),
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { category, subcategory, product } = await params;
  const cat = getCategoryBySlug(category);
  const sub = cat?.subcategories.find((s) => s.slug === subcategory);
  const prod = sub?.products.find((p) => p.slug === product);

  if (!cat || !sub || !prod) notFound();

  return (
    <section>
      <ProductDetail product={prod} category={cat} subcategory={sub} />
      <CTASection />
    </section>
  );
}
