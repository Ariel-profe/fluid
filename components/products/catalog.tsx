import type { ReactNode } from "react";
import { CategoryGrid } from "./catalog-views";

export function Catalog(): ReactNode {
  return (
    <section className="relative w-full bg-background text-foreground">
      <div className="mx-auto max-w-420 px-10 max-[850px]:px-6 pt-28 max-[850px]:pt-24 pb-16 max-[850px]:pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/45">
          Soluciones industriales a medida.
        </p>
        <h1 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
          Productos
        </h1>
        <CategoryGrid />
      </div>
    </section>
  );
}
