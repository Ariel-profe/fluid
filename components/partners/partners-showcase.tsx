"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { PartnersLogoGrid } from "@/components/partners/partner-logo";
import { PARTNERS } from "@/data/partners";

export function PartnersShowcase(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.05 });

    return (
        <section
            ref={sectionRef}
            className="container mx-auto px-3 pt-24 pb-16 lg:pt-32 lg:pb-32 relative w-full text-foreground"
            aria-labelledby="partners-page-heading"
        >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-baseline">
                <h1
                    id="partners-page-heading"
                    className="text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]"
                >
                    Marcas que <br /> confían en nosotros
                </h1>
                <span className="font-mono text-lg uppercase tracking-widest tabular-nums text-foreground/40">
                    {PARTNERS.length} empresas
                </span>
            </div>
            <div className="mt-6 h-px w-full bg-foreground/10" />

            <div className="mt-12 max-[850px]:mt-8">
                <PartnersLogoGrid partners={PARTNERS} inView={inView} />
            </div>

            {/* Lista completa accesible/SEO. */}
            <ul className="sr-only">
                {PARTNERS.map((partner) => (
                    <li key={partner.id}>{partner.legalName}</li>
                ))}
            </ul>
        </section>
    );
}
