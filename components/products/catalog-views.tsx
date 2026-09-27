import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Boxes } from "lucide-react";
import { getCategoryBySlug, type Category, type Product } from "@/data/products";
import { ProductCard } from "./product-card";
import { CategoryCard } from "./category-card";
import {
  ValveIcon,
  ActuatorIcon,
  PipeFlangeIcon,
  GaugeIcon,
  ExAreaIcon,
} from "./category-icons";

type CategoryIcon = (props: { className?: string }) => ReactNode;

const CATEGORY_ICONS: Record<string, CategoryIcon> = {
  valvulas: ValveIcon,
  "actuadores-y-accesorios": ActuatorIcon,
  "canos-bridas-y-accesorios": PipeFlangeIcon,
  "caudal-presion-temperatura": GaugeIcon,
  "areas-clasificadas": ExAreaIcon,
};

export function iconFor(categoryId: string): CategoryIcon {
  return CATEGORY_ICONS[categoryId] ?? Boxes;
}

export function countProducts(category: Category): number {
  return category.subcategories.reduce((n, s) => n + s.products.length, 0);
}

export function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}): ReactNode {
  return (
    <Link
      href={href}
      className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/55 transition-colors hover:text-foreground"
    >
      <ArrowLeft
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
        strokeWidth={1.6}
        aria-hidden
      />
      {label}
    </Link>
  );
}

// Las 5 categorías comerciales (mismo orden que el home). Las que ya tienen
// ficha en `data/products` (slug definido) son navegables; el resto se muestra
// como "Próximamente" sin navegación falsa.
const CATALOG_TILES: {
  id: string;
  title: string;
  image: string;
  subcategories: string[];
  slug?: string;
}[] = [
  {
    id: "valvulas",
    title: "Válvulas",
    image: "/categories/valvula.jpg",
    subcategories: ["Mariposa", "Esférica", "Retención", "Esclusa", "Guillotina", "Aire"],
    slug: "valvulas",
  },
  {
    id: "actuadores-y-accesorios",
    title: "Actuadores y accesorios",
    image: "/categories/actuador.webp",
    subcategories: ["Manuales", "Neumáticos", "Eléctricos"],
  },
  {
    id: "canos-bridas-y-accesorios",
    title: "Caños, bridas y accesorios",
    image: "/categories/canos-y-bridas.jpg",
    subcategories: ["Caños de acero", "Bridas", "Accesorios"],
  },
  {
    id: "caudal-presion-temperatura",
    title: "Caudal, presión y temperatura",
    image: "/categories/manometro.jpg",
    subcategories: ["Caudal", "Presión", "Temperatura"],
  },
  {
    id: "areas-clasificadas",
    title: "Áreas clasificadas",
    image: "/categories/areas-clasificadas.avif",
    subcategories: [
      "Iluminación",
      "Seguridad aumentada",
      "Comando y señalización",
      "Climatización",
      "Prensacables",
    ],
    slug: "areas-clasificadas",
  },
];

export function CategoryGrid(): ReactNode {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-5">
      {CATALOG_TILES.map((tile, i) => {
        const category = tile.slug ? getCategoryBySlug(tile.slug) : undefined;
        const subcategories = category
          ? category.subcategories.map((s) => s.name)
          : tile.subcategories;
        const total = category ? countProducts(category) : 0;
        const meta = category
          ? total > 0
            ? `${total} productos`
            : `${category.subcategories.length} subcategorías`
          : "Próximamente";
        return (
          <div key={tile.id} className="grow basis-[220px] max-w-[280px]">
            <CategoryCard
              icon={iconFor(tile.id)}
              index={String(i + 1).padStart(2, "0")}
              title={tile.title}
              meta={meta}
              image={tile.image}
              subcategories={subcategories}
              {...(category
                ? { href: `/products/${category.slug}` }
                : { comingSoon: true })}
            />
          </div>
        );
      })}
    </div>
  );
}

export function SubcategoryGrid({ category }: { category: Category }): ReactNode {
  const Icon = iconFor(category.id);
  return (
    <>
      <BackLink href="/products" label="Todas las categorías" />
      <div className="mt-6 grid grid-cols-4 gap-6 max-[1100px]:grid-cols-3 max-[850px]:grid-cols-2 max-[560px]:grid-cols-1">
        {category.subcategories.map((s) => (
          <Link
            key={s.id}
            href={`/products/${category.slug}/${s.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/2 text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/16 hover:bg-foreground/4"
          >
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden bg-white p-6">
              {s.products[0] ? (
                <img
                  src={s.products[0].image}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full w-auto object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              ) : (
                <Icon className="h-12 w-12 text-neutral-300 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-6 max-[850px]:p-5">
              <h3 className="text-lg font-medium leading-tight tracking-tight">
                {s.name}
              </h3>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 transition-colors group-hover:text-foreground">
                {s.products.length} productos
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.6}
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export function ProductGrid({
  products,
  backHref,
  backLabel,
}: {
  products: Product[];
  backHref: string;
  backLabel: string;
}): ReactNode {
  return (
    <>
      <BackLink href={backHref} label={backLabel} />
      <div className="mt-6 grid grid-cols-4 gap-6 max-[1100px]:grid-cols-3 max-[850px]:grid-cols-2 max-[560px]:grid-cols-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
