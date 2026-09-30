import type { ReactNode } from "react";
import { CategoryGrid } from "./catalog-views";

export function Catalog(): ReactNode {
  return (
    <section className="relative w-full text-foreground container mx-auto px-3 py-10 lg:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/45">
        Soluciones industriales a medida.
      </p>
      <h1 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
        Productos
      </h1>
      <CategoryGrid />

    </section>
  );
}
