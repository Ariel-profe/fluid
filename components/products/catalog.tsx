import type { ReactNode } from "react";
import { CategoryGrid } from "./catalog-views";
import { SectionHeader } from "@/components/section-header";

export function Catalog(): ReactNode {
  return (
    <section className="relative w-full text-foreground container mx-auto px-3 py-10 lg:py-24" aria-labelledby="catalog-heading">
      <SectionHeader
        as="h2"
        title={<span id="catalog-heading">Líneas de suministro</span>}
        kicker="Portafolio comercial"
        aside="Una línea publicada · cuatro en preparación"
      />
      <CategoryGrid />
    </section>
  );
}
