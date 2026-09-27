import type { ReactNode } from "react";
import { RevealHeadline } from "@/components/reveal-headline";
import { CategoryGrid } from "./catalog-views";

export function Catalog(): ReactNode {
  return (
    <section className="relative w-full bg-background text-foreground">
      <div className="mx-auto max-w-420 px-10 max-[850px]:px-6 pt-28 max-[850px]:pt-24 pb-16 max-[850px]:pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/45">
          Productos
        </p>
        <RevealHeadline
          as="h1"
          className="mt-4 text-balance text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.98] tracking-tight"
        >
          Soluciones industriales a medida.
        </RevealHeadline>
        <CategoryGrid />
      </div>
    </section>
  );
}
