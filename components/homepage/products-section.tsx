"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { CategoryCard } from "../products/category-card";


interface Tile {
  index: string;
  title: string;
  body: string;
  href: string;
  image: string;
  subcategories: string[];
}

const TILES: Tile[] = [
  {
    index: "01",
    title: "Válvulas",
    body: "Mariposas, Esféricas, Esclusas, de Retención, de Aire, Guillotina y compuertas, y más.",
    href: "/products/valves",
    image: "/categories/valvulas.webp",
    subcategories: ["Mariposa", "Esférica", "Retención", "Esclusa", "Guillotina", "Aire"],
  },
  {
    index: "02",
    title: "Actuadores y accesorios",
    body: "Actuadores neumáticos, eléctricos e hidráulicos, junto con accesorios y componentes relacionados.",
    href: "/products",
    image: "/categories/actuadores.webp",
    subcategories: ["Manuales", "Neumáticos", "Eléctricos"],
  },
  {
    index: "03",
    title: "Caños, bridas y accesorios",
    body: "Caños de acero, galvanizados, bridas, juntas y accesorios relacionados para sistemas industriales.",
    href: "/products",
    image: "/categories/brida.webp",
    subcategories: ["Caños de acero", "Bridas", "Accesorios"],

  },
  {
    index: "04",
    title: "Caudal, presión y temperatura",
    body: "Placas, bombas generadoras, manómetros y sensores para el manejo y prevención de contingencias.",
    href: "/products",
    image: "/categories/manometro.webp",
    subcategories: ["Caudal", "Presión", "Temperatura"],
  },
  {
    index: "05",
    title: "Áreas clasificadas",
    body: "Iluminación, gabinetes de seguridad aumentada, comando y señalización, climatización y accesorios certificados Ex.",
    href: "/products/areas-clasificadas",
    image: "/categories/clasificada.webp",
    subcategories: ["Iluminación", "Seguridad aumentada", "Comando y señalización", "Climatización", "Prensacables", "Control edge"],
  },
];

export function ProductsSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="products" className="container mx-auto px-3 py-10 lg:py-20">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-border transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div>
          <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
            Productos
          </h2>
        </div>
        <span className="text-[11px] tracking-[0.15em] text-muted-foreground/50 mt-4 md:mt-0">
          ({String(TILES.length).padStart(2, "0")}) Categorías
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px">
        {TILES.map((tile) => (
          <CategoryCard
            key={tile.index}
            index={tile.index}
            title={tile.title}
            body={tile.body}
            image={tile.image}
            subcategories={tile.subcategories}
            meta="Ver categoría"
            href={tile.href}
          />
        ))}
      </div>
    </section>
  )
}
