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
      className="bg-white group cursor-pointer transition-all duration-700 shadow group py-5"
      href={href || ""}
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} - ${product.brand}`}
          className="w-full object-cover transition-all duration-800 ease-out md:group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex items-start justify-between relative">
        <div className="flex items-start gap-4">
          <div>
          <span className="text-[9px] tracking-[0.15em] text-muted-foreground/50 mt-1.5 tabular-nums">
            {product.categoryId}
          </span>
            <h3 className="text-lg font-light tracking-tight text-primary mb-1.5">
              {product.name}
            </h3>
            <p className="hidden md:block text-[10px] tracking-widest uppercase text-muted-foreground max-w-3xs">
              {product.description}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className="h-4 w-4 absolute bottom-1 right-3 text-muted-foreground/40 transition-all duration-300 mt-1.5 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5 md:group-hover:text-blue-500"
        />
      </div>
    </Link>
  );
}
