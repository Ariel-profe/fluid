"use client";

import { useRef } from "react";

const HERO_POINTS = ["Ingeniería aplicada", "Suministro confiable", "Soporte técnico"] as const;

type PageHeroProps = {
    subtitle: string;
    title: string;
    className?: string;
};

export const PageHero = ({ subtitle, title, className }: PageHeroProps) => {
    const textRef = useRef<HTMLDivElement>(null);
    return (
        <section
            className={`relative isolate overflow-hidden ${className ?? ""}`}
        >

            {/* Grilla tipo blueprint, sutil, para dar carácter industrial. */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgba(47,121,159,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,121,159,0.16)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_75%)]" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-foreground/10" />

            <div className="relative z-10 mx-auto grid min-h-[36vh] grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)] gap-12 pb-16 pt-28 max-[850px]:min-h-[42vh] max-[850px]:grid-cols-1 max-[850px]:gap-8 max-[850px]:px-6 max-[850px]:pb-12 max-[850px]:pt-24">
                <div ref={textRef} className="flex h-full flex-col justify-end max-w-xl">
                    <nav
                        aria-label="Ruta"
                        className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/45"
                    >
                        <a href="/" className="transition-colors hover:text-foreground/80">
                            Inicio
                        </a>
                        <span aria-hidden className="text-foreground/25">/</span>
                        <span className="text-foreground/70">{subtitle}</span>
                    </nav>

                    <h1 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
                        {title}
                    </h1>
                    <p className="mt-5 max-w-[58ch] text-pretty text-base leading-relaxed text-foreground/60 max-[850px]:max-w-[46ch] max-[850px]:text-sm">
                        Soluciones industriales con criterio técnico, disponibilidad real y una presentación alineada con operaciones exigentes.
                    </p>
                </div>

                <div className="flex h-full items-end max-[850px]:items-start">
                    <div className="group/card relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-background/70 p-6 backdrop-blur-sm max-[850px]:p-5">
                        <span
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
                        />
                        <div className="mt-5 space-y-1">
                            {HERO_POINTS.map((point, i) => (
                                <div
                                    key={point}
                                    className="group/row flex items-center justify-between gap-4 border-b border-foreground/8 py-3 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[10px] tabular-nums text-foreground/35">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-sm font-medium tracking-tight text-foreground/88">
                                            {point}
                                        </span>
                                    </div>
                                    <span
                                        aria-hidden
                                        className="h-1.5 w-1.5 rounded-full bg-foreground/25 transition-colors duration-300 group-hover/row:bg-accent"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
