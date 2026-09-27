import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Download } from "lucide-react";
import type { Category, Product, Subcategory } from "@/data/products";

export function ProductDetail({
  product,
  category,
  subcategory,
}: {
  product: Product;
  category: Category;
  subcategory: Subcategory;
}): ReactNode {
  const mailto = `mailto:cotizaciones@fluidsoluciones.com?subject=${encodeURIComponent(
    `Consulta: ${product.name} (${category.name})`,
  )}`;

  return (
    <section className="relative w-full bg-background text-foreground">
      <div className="mx-auto max-w-420 px-10 max-[850px]:px-6 pt-28 max-[850px]:pt-24 pb-24 max-[850px]:pb-16">
        {/* Breadcrumb */}
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
          <Link href={`/products/${category.slug}`} className="transition-colors hover:text-foreground/80">
            {category.name}
          </Link>
          <span aria-hidden className="text-foreground/25">/</span>
          <Link
            href={`/products/${category.slug}/${subcategory.slug}`}
            className="transition-colors hover:text-foreground/80"
          >
            {subcategory.name}
          </Link>
        </nav>

        <div className="mt-10 grid grid-cols-12 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          {/* Imagen + documentación + acciones */}
          <div className="col-span-5 max-[900px]:col-span-1">
            <div className="mx-auto flex aspect-square max-w-100 items-center justify-center overflow-hidden rounded-3xl border border-foreground/8 bg-white p-8 max-[850px]:p-6">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Documentos */}
            {product.docs && product.docs.length > 0 ? (
              <div className="mx-auto mt-8 max-w-100">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                  Documentación técnica
                </h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {product.docs.map((doc) => (
                    <li key={doc.url}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 text-sm text-foreground/75 transition-colors hover:text-foreground"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-foreground/10 text-foreground/50 transition-colors group-hover:border-foreground/25 group-hover:text-foreground">
                          <Download className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                        </span>
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mx-auto mt-8 flex max-w-100 flex-wrap items-stretch gap-3">
              <a
                href={mailto}
                className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
              >
                Solicitar cotización
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-foreground/15 px-5 py-3 text-xs font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="col-span-7 max-[900px]:col-span-1">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
              {subcategory.name}
              {product.brand ? (
                <>
                  <span className="mx-2 text-foreground/25">·</span>
                  {product.brand}
                </>
              ) : null}
            </p>
            <h1
              className="mt-4 text-balance text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              {product.name}
            </h1>
            {product.description ? (
              <p className="mt-5 max-w-[52ch] text-pretty text-base leading-relaxed text-foreground/65">
                {product.description}
              </p>
            ) : null}

            {/* Ficha técnica */}
            {product.specs && product.specs.length > 0 ? (
              <div className="mt-12">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                  Ficha técnica
                </h2>
                <dl className="mt-4 divide-y divide-foreground/8 border-t border-foreground/8">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-3 gap-4 py-3.5 max-[560px]:grid-cols-1 max-[560px]:gap-1"
                    >
                      <dt className="col-span-1 text-sm font-medium text-foreground/60">
                        {spec.label}
                      </dt>
                      <dd className="col-span-2 max-[560px]:col-span-1 text-sm leading-relaxed text-foreground/85">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 border-t border-foreground/8 pt-8">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.6}
              aria-hidden
            />
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
