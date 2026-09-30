"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { PartnersLogoGrid } from "@/components/partners/partner-logo";
import { FEATURED_PARTNERS } from "@/data/partners";
import { buttonVariants } from "../ui/button";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

export function Partners(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section
            ref={sectionRef}
            id="clientes"
            className="relative w-full bg-primary text-primary-foreground"
            aria-labelledby="partners-heading"
        >
            <div className="container mx-auto px-3 py-16 lg:py-32">
                <div className="flex items-end justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                    >
                        <h2 id="partners-heading" className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-primary-foreground">
                            Empresas líderes <br /> que confían en nosotros.
                        </h2>
                    </motion.div>

                    <Link href="/partners" className={buttonVariants({ variant: "inverse" })}>
                        Ver todos
                    </Link>
                </div>

                <div className="mt-10 h-px w-full bg-accent-foreground/15" />

                <div className="mt-16">
                    <PartnersLogoGrid
                        partners={FEATURED_PARTNERS}
                        inView={inView}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4"
                    />
                </div>
            </div>
        </section>
    );
}
