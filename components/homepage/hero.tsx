"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full min-w-0 overflow-hidden bg-background">
      <div className="relative isolate md:flex md:min-h-[min(88vh,44rem)] md:flex-col md:justify-end">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:h-full">
          <img
            src="/hero6.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[center_40%]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background md:hidden"
            aria-hidden
          />
          <div
            className="absolute inset-0 hidden bg-linear-to-t from-background via-background/55 to-transparent md:block"
            aria-hidden
          />
        </div>

        <div
          className={cn(
            "relative z-10 container mx-auto bg-background px-3 pb-12 pt-2 md:bg-transparent md:pb-20 md:pt-28",
            "transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            visible ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs">
            Control y conducción de fluidos
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-foreground">
            <span className="block text-[clamp(1.75rem,8vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              Fluid
            </span>
            <span className="mt-1 block text-[clamp(1.125rem,4.2vw,2rem)] font-light leading-snug text-tertiary">
              Soluciones dinámicas para la industria.
            </span>
          </h1>
          <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
            Válvulas, actuadores y conducción con criterio técnico y stock para operar sin
            interrupciones.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Pedir cotización
            </Link>
            <Link href="/products" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
