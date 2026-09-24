"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const categories = [
  {
    category: "Válvulas",
    subcategories: ["Mariposa - Esférica - Retención - Esclusa - Guillotina"],
    image: "/categories/valvulas.webp",
  },
  {
    category: "Actuadores y accesorios",
    subcategories: ["Manuales - Automáticos - Eléctricos"],
    image: "/categories/actuadores.webp",
  },
  {
    category: "Caños, bridas y accesorios",
    subcategories: ["Caños de acero - Bridas - Accesorios"],
    image: "/categories/brida.webp",
  },
  {
    category: "Caudal, presión y temperatura",
    subcategories: ["Caudal - Presión - Temperatura"],
    image: "/categories/manometro.webp",
  },
  {
    category: "Áreas clasificadas",
    subcategories: ["Iluminación - Gabinetes de seguridad aumentada - Cajas de comando y señalización - ..."],
    image: "/categories/clasificada.webp",
  },
]

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`bg-background group cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${(index % 2) * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
        <img
          src={category.image || "/placeholder.svg"}
          alt={`${category.category} - ${category.subcategories}`}
          className={`w-full  object-cover transition-all duration-[800ms] ease-out ${
            hovered ? "scale-[0.80]" : "scale-75"
          }`}
        />
      </div>
      <div className="p-6 md:p-8 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <span className="text-[11px] tracking-[0.15em] text-muted-foreground/50 mt-1.5 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-light tracking-tight text-foreground mb-1.5">
              {category.category}
            </h3>
            <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
              {category.subcategories}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className={`h-4 w-4 text-muted-foreground/40 transition-all duration-300 mt-1.5 ${
            hovered ? "translate-x-0.5 -translate-y-0.5 text-blue-500" : ""
          }`}
        />
      </div>
    </div>
  )
}

export function ProductsSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="products" className="px-6 py-28 md:px-12 lg:px-20 md:py-36">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
            Productos
          </h2>
        </div>
        <span className="text-[11px] tracking-[0.15em] text-muted-foreground/50 mt-4 md:mt-0">
          ({String(categories.length).padStart(2, "0")}) Productos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-border">
        {categories.map((category, index) => (
          <CategoryCard key={category.category} category={category} index={index} />
        ))}
      </div>
    </section>
  )
}
