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
            className="container mx-auto px-3 py:16 lg:py-32 relative w-full text-foreground"
            aria-label="Logotipos de clientes"
        >
            <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
                    Marcas que <br /> confían en nosotros
                </h2>
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
