"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface CategoryCardProps {
  index: string;
  title: string;
  meta: string;
  body?: string | undefined;
  image?: string | undefined;
  /** Nombres de subcategorías para el pie de la card. */
  subcategories?: string[] | undefined;
  /** Navegación por ruta (home). */
  href: string;
  /** Navegación por estado (catálogo). */
  onClick?: () => void;
  /** Categoría sin ficha navegable aún: card no interactiva con sello. */
  comingSoon?: boolean;
}

export function CategoryCard({
  index,
  title,
  meta,
  body,
  image,
  subcategories,
  href
}: CategoryCardProps): ReactNode {

  const [hovered, setHovered] = useState(false)
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>(0.1)

  return (
    <Link
      ref={ref}
      className={`bg-background group cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      style={{ transitionDelay: `${(+index % 2) * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      href={href}
    >
      <div className="overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} - ${subcategories}`}
          className={`w-full  object-cover transition-all duration-[800ms] ease-out ${hovered ? "scale-[0.80]" : "scale-75"
            }`}
        />
      </div>
      <div className="p-4 flex items-start justify-between relative">
        <div className="flex items-start gap-4">
          <span className="text-[9px] tracking-[0.15em] text-muted-foreground/50 mt-1.5 tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-light tracking-tight text-foreground mb-1.5">
              {title}
            </h3>
            <p className="hidden md:block text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
              {body}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className={`h-4 w-4 absolute bottom-1 right-3 text-muted-foreground/40 transition-all duration-300 mt-1.5 ${hovered ? "translate-x-0.5 -translate-y-0.5 text-blue-500" : ""
            }`}
        />
      </div>
    </Link>
  );
}
