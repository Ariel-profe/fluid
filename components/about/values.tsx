"use client";

import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import { useRef, type ReactNode } from "react";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

interface Value {
    name: string;
    body: string;
    features: string[];
}

const VALUES: Value[] = [
    {
        name: "Misión",
        body: "Brindar soluciones industriales integrales a través de productos de calidad, asesoramiento técnico especializado y una gestión eficiente.",
        features: [
            "Contribuir al desarrollo de nuestros clientes",
            "Acompañar su continuidad operativa",
            "Mejorar de forma continua nuestros procesos",
        ],
    },
    {
        name: "Visión",
        body: "Ser una empresa referente en soluciones industriales a nivel nacional e internacional, reconocida por la calidad y la excelencia en el servicio.",
        features: [
            "Productos confiables y de calidad",
            "Excelencia en cada servicio",
            "Confianza de clientes, proveedores y colaboradores",
        ],
    },
];

export function Values(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);

    const inView = useInView(sectionRef, { once: true, amount: 0.25 });

    return (
        <section
            ref={sectionRef}
            id="values"
            className="relative w-full bg-primary text-foreground"
            aria-labelledby="values-heading"
        >
            <div className="container mx-auto px-3 py-10 lg:py-20">
                <div className="col-span-7 col-start-6 max-w-[40rem] max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
                    <h2
                        id="values-heading"
                        className="text-3xl font-extralight tracking-tight text-primary-foreground md:text-[2.75rem]"
                    >
                        Pasión e innovación en cada proyecto que apoyamos.
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
                        className="mt-6 text-balance text-xl font-light leading-snug text-primary-foreground/80 max-[850px]:text-lg"
                    >
                        Cumplimos con los estándares más exigentes y superamos las expectativas de nuestros clientes. Cada proyecto es una oportunidad para demostrar nuestro compromiso con la calidad y la eficiencia.
                    </motion.p>
                </div>

                <div className="mt-20 max-[850px]:mt-12 grid grid-cols-2 gap-5 max-[1100px]:grid-cols-1 max-[1100px]:gap-4">
                    {VALUES.map((value, i) => (
                        <motion.article
                            key={value.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.8,
                                ease: easeOutExpo,
                                delay: 0.25 + i * 0.08,
                            }}
                            className="relative flex"
                        >
                            <div
                                className={[
                                    "group relative flex flex-1 flex-col",
                                    "rounded-sm p-10 max-[850px]:p-7",

                                    "bg-primary-foreground/6 hover:bg-hover-inverse",

                                    "transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                ].join(" ")}
                            >
                                <div>
                                    <h3 className="text-3xl font-medium leading-tight tracking-tight text-primary-foreground max-[850px]:text-2xl">
                                        {value.name}
                                    </h3>

                                    <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-primary-foreground/75">
                                        {value.body}
                                    </p>
                                </div>

                                <ul className="mt-10 space-y-4">
                                    {value.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-primary-foreground/90"
                                        >
                                            <Check
                                                className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground"
                                                strokeWidth={1.6}
                                                aria-hidden
                                            />
                                            <span className="leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
