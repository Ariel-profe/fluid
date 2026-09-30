"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getValveLines } from "@/data/valve-lines";
import { cn } from "@/lib/utils";

export function ValveExperience(): ReactNode {
  const lines = getValveLines();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = lines[activeIndex];

  if (!active) return null;

  return (
    <section
      className="border-b border-border bg-muted/40"
      aria-labelledby="valve-experience-heading"
    >
      <div className="container mx-auto px-3 pt-24 pb-10 lg:pt-28 lg:pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Catálogo
        </p>
        <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h1
              id="valve-experience-heading"
              className="text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]"
            >
              Productos
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Hoy está publicada la línea de válvulas. El resto de las familias se incorpora
              con su ficha técnica.
            </p>
          </div>
          <Link href={active.href} className={cn(buttonVariants({ size: "lg" }), "w-fit")}>
            Ver {active.name}
          </Link>
        </div>

        <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:items-start">
          <div>
            <div
              className="-mx-3 flex gap-1 overflow-x-auto overscroll-x-contain border-b border-border px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Familias de válvulas"
            >
              {lines.map((line, i) => (
                <button
                  key={line.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "shrink-0 border-b-2 px-3 py-2.5 text-left text-sm transition-colors",
                    i === activeIndex
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {line.name.replace(/^Válvulas\s+/i, "")}
                </button>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {active.intro}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {String(activeIndex + 1).padStart(2, "0")} / {String(lines.length).padStart(2, "0")}
              {" · "}
              {active.productCount} productos
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-xs overflow-hidden rounded-sm border border-border bg-white">
            <img
              src={active.image}
              alt=""
              className="h-full w-full object-contain p-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
