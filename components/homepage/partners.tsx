"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PartnersLogoGrid } from "@/components/partners/partner-logo";
import { FEATURED_PARTNERS, PARTNERS } from "@/data/partners";
import { Button } from "../ui/button";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

export function Partners(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section
            ref={sectionRef}
            id="clientes"
            className="relative w-full bg-primary text-accent-foreground rounded-md"
            aria-labelledby="partners-heading"
        >
            <div className="max-w-420 mx-auto px-10 max-[850px]:px-6 py-24 max-[850px]:py-16">
                <div className="flex items-end justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                    >
                        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-slate-200">
                            Empresas líderes <br /> que confían en nosotros.
                        </h2>
                    </motion.div>

                    <Button variant="outline">
                        <Link href="/contact">Ver clientes</Link>
                    </Button>
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
