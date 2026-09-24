"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { RollingArrow } from "@/components/arrow-chip";
import { PartnersLogoGrid } from "@/components/partners/partner-logo";
import { FEATURED_PARTNERS, PARTNERS } from "@/data/partners";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

export function Partners(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section
            ref={sectionRef}
            id="clientes"
            className="relative w-full bg-accent text-accent-foreground rounded-[50px]"
            aria-labelledby="partners-heading"
        >
            <div className="max-w-420 mx-auto px-10 max-[850px]:px-6 py-24 max-[850px]:py-16">
                <div className="flex items-end justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                    >
                        <h2
                            id="partners-heading"
                            className="inline-flex items-center rounded-md border border-accent-foreground/8 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-accent-foreground/70"
                        >
                            Principales clientes
                        </h2>
                        <p className="mt-8 max-w-[26ch] text-balance text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-tight">
                            Empresas líderes de distintos sectores confían en Fluid.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
                        className="shrink-0"
                    >
                        <Link
                            href="/partners"
                            className="group inline-flex items-center gap-3 rounded-md border border-accent-foreground/20 px-4 py-2.5 text-sm font-medium text-accent-foreground/90 transition-colors hover:border-accent-foreground/40 hover:text-accent-foreground"
                        >
                            Ver todos los clientes
                            <span className="font-mono text-xs text-accent-foreground/60">
                                {PARTNERS.length}
                            </span>
                            <RollingArrow iconSize={16} />
                        </Link>
                    </motion.div>
                </div>

                <div className="mt-10 h-px w-full bg-accent-foreground/15" />

                <div className="mt-16 max-[850px]:mt-12">
                    <PartnersLogoGrid
                        partners={FEATURED_PARTNERS}
                        inView={inView}
                        className="grid grid-cols-8 gap-3 max-[1280px]:grid-cols-6 max-[1024px]:grid-cols-5 max-[850px]:grid-cols-4 max-[560px]:grid-cols-3"
                    />
                </div>
            </div>
        </section>
    );
}
