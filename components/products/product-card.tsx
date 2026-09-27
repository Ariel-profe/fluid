import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { getProductHref, getSubcategoryName } from "@/data/products";

export function ProductCard({ product }: { product: Product }): ReactNode {
  const href = getProductHref(product);
  const subcategory = getSubcategoryName(product);

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/[0.02] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/16 hover:bg-foreground/4"
    >
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-white p-6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="max-h-full w-auto object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 max-[850px]:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
          {subcategory}
        </p>
        <h3 className="mt-2 text-lg font-medium leading-tight tracking-tight">
          {product.name}
        </h3>
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/55">
            {product.description}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 transition-colors group-hover:text-foreground">
          Ver ficha
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.6}
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
