"use client";

import { useRef } from "react";

const HERO_POINTS = ["Ingeniería aplicada", "Suministro confiable", "Soporte técnico"] as const;

type PageHeroProps = {
  subtitle: string;
  title: string;
  image?: string;
  className?: string;
};

export const PageHero = ({ subtitle, title, image, className }: PageHeroProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  return (
    <section className={`relative isolate overflow-hidden py-10 ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_80%_18%,rgba(47,121,159,0.12),transparent_62%),linear-gradient(180deg,rgba(10,10,10,0.02),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgba(47,121,159,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,121,159,0.16)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-foreground/10" />

      <div className="container mx-auto grid min-w-0 grid-cols-1 gap-6 px-3 py-16 md:grid-cols-2 lg:py-32">
        <div ref={textRef} className="flex h-full min-w-0 max-w-xl flex-col justify-end">
          <nav
            aria-label="Ruta"
            className="mb-6 flex min-w-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <a href="/" className="transition-colors hover:text-foreground/80">
              Inicio
            </a>
            <span aria-hidden className="text-foreground/25">
              /
            </span>
            <span className="truncate text-foreground/70">{subtitle}</span>
          </nav>

          <h1 className="text-balance text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-[58ch] text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Soluciones industriales con criterio técnico, disponibilidad real y una presentación alineada con
            operaciones exigentes.
          </p>
        </div>

        <div className="flex min-w-0 items-end">
          <div className="relative w-full min-w-0 overflow-hidden rounded-sm border border-border bg-card">
            {image ? (
              <div className="relative aspect-[16/8] max-h-40 overflow-hidden md:max-h-none">
                <img src={image} alt="" className="h-full w-full object-cover grayscale-[0.25]" />
                <div
                  className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent"
                  aria-hidden
                />
              </div>
            ) : null}
            <div className="relative p-5 md:p-6">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
              />
              <div className="space-y-1">
                {HERO_POINTS.map((point, i) => (
                  <div
                    key={point}
                    className="group/row flex items-center justify-between gap-3 border-b border-foreground/8 py-3 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-sm tracking-tight text-foreground">{point}</span>
                    </div>
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/25"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
