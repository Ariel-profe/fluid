import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Download } from "lucide-react";
import type { Category, Product, Subcategory } from "@/data/products";
import { buttonVariants } from "../ui/button";
import { COMPANY } from "@/data/site";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { CatalogCard, CatalogGrid } from "@/components/catalog-card";
import { getProductHref } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductDetail({
  product,
  category,
  subcategory,
}: {
  product: Product;
  category: Category;
  subcategory: Subcategory;
}): ReactNode {
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    `Consulta: ${product.name} (${category.name})`,
  )}`;
  const related = subcategory.products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <article className="text-foreground">
      <div className="container mx-auto px-3 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <SiteBreadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/products" },
            { label: category.name, href: `/products/${category.slug}` },
            { label: subcategory.name, href: `/products/${category.slug}/${subcategory.slug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7 lg:col-start-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {subcategory.name}
              {product.brand ? ` · ${product.brand}` : null}
            </p>
            <h1 className="mt-3 text-balance text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]">
              {product.name}
            </h1>
            {product.description ? (
              <p className="mt-5 max-w-[52ch] text-pretty text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={mailto} className={buttonVariants()}>
                Solicitar cotización
              </Link>
              <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
                Contacto
              </Link>
            </div>

            {product.specs && product.specs.length > 0 ? (
              <div className="mt-12">
                <h2 className="text-sm font-medium tracking-tight text-foreground">
                  Ficha técnica
                </h2>
                <dl className="mt-4 border-t border-border">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid gap-1 border-b border-border py-3.5 sm:grid-cols-3 sm:gap-4"
                    >
                      <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                      <dd className="text-sm leading-relaxed text-foreground sm:col-span-2">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-border bg-white p-8">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {product.docs && product.docs.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-sm font-medium tracking-tight text-foreground">
                  Documentación técnica
                </h2>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {product.docs.map((doc) => (
                    <li key={doc.url}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 py-3 text-sm text-foreground transition-colors hover:text-foreground/70"
                      >
                        <Download className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="mb-8 text-2xl font-extralight tracking-tight text-foreground"
            >
              Más en {subcategory.name}
            </h2>
            <CatalogGrid>
              {related.map((item, index) => (
                <CatalogCard
                  key={item.id}
                  index={String(index + 1).padStart(2, "0")}
                  title={item.name}
                  image={item.image}
                  meta={subcategory.name}
                  href={getProductHref(item)}
                  media="product"
                />
              ))}
            </CatalogGrid>
          </section>
        ) : null}

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href={`/products/${category.slug}/${subcategory.slug}`}
            className={cn(
              "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
            )}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden />
            Volver a {subcategory.name}
          </Link>
        </div>
      </div>
    </article>
  );
}
