import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Boxes } from "lucide-react";
import { getCategoryBySlug, type Category, type Product } from "@/data/products";
import { ProductCard } from "./product-card";
import {
  ValveIcon,
  ActuatorIcon,
  PipeFlangeIcon,
  GaugeIcon,
  ExAreaIcon,
} from "./category-icons";
import { CategoryCard } from "./category-card";

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
  index: string;
  title: string;
  image: string;
  subcategories: string[];
  slug: string;
}[] = [
    {
      index: "valvulas",
      title: "Válvulas",
      image: "/categories/valvulas.webp",
      subcategories: ["Mariposa", "Esférica", "Retención", "Esclusa", "Guillotina", "Aire"],
      slug: "valves",
    },
    {
      index: "actuadores-y-accesorios",
      title: "Actuadores y accesorios",
      image: "/categories/actuadores.webp",
      subcategories: ["Manuales", "Neumáticos", "Eléctricos"],
      slug: "actuadores-accesorios",
    },
    {
      index: "canos-bridas-y-accesorios",
      title: "Caños, bridas y accesorios",
      image: "/categories/brida.webp",
      subcategories: ["Caños de acero", "Bridas", "Accesorios"],
      slug: "canos-bridas-accesorios",
    },
    {
      index: "caudal-presion-temperatura",
      title: "Caudal, presión y temperatura",
      image: "/categories/manometro.webp",
      subcategories: ["Caudal", "Presión", "Temperatura"],
      slug: "caudal-presion-temperatura",
    },
    {
      index: "areas-clasificadas",
      title: "Áreas clasificadas",
      image: "/categories/clasificada.webp",
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
          <div key={tile.index} className="grow basis-[220px] max-w-[280px]">
            <CategoryCard
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
  return (
    <>
      <BackLink href="/products" label="Todas las categorías" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px">
        {category.subcategories.map((s, index) => (
          <Link
            key={s.id}
            href={`/products/${category.slug}/${s.slug}`}
            className="bg-white group cursor-pointer transition-all duration-700 shadow group"
          >
            <div className="overflow-hidden">
              <img
                src={s.products[0].image}
                alt={`${category.name} - ${category.id}`}
                className="w-full  object-cover transition-all duration-800 ease-out md:group-hover:scale-[102%]"
              />
            </div>
            <div className="p-4 flex items-start justify-between relative">
              <div className="flex items-start gap-4">
                <div>
                  <span className="text-[9px] tracking-[0.15em] text-muted-foreground/50 mt-1.5 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-light tracking-tight text-foreground mb-1.5">
                    {s.name}
                  </h3>
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 absolute bottom-1 right-3 text-muted-foreground/40 transition-all duration-300 mt-1.5 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5 md:group-hover:text-blue-500"
              />
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
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}