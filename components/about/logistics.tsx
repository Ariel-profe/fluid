"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { MapPin, Warehouse, Building2, type LucideIcon } from "lucide-react";
import { useRef, type ReactNode } from "react";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

type NodeStatus = "Operativo" | "Proyectado";

interface LogisticsNode {
    id: string;
    name: string;
    location: string;
    role: string;
    status: NodeStatus;
    icon: LucideIcon;
}

const NODES: LogisticsNode[] = [
    {
        id: "gral-pacheco",
        name: "Centro de Operaciones",
        location: "General Pacheco, Buenos Aires",
        role: "Depósito propio y núcleo de la operación logística.",
        status: "Operativo",
        icon: Building2,
    },
    {
        id: "cordoba",
        name: "Warehouse estratégico",
        location: "Córdoba",
        role: "Almacenamiento y distribución para la región centro.",
        status: "Operativo",
        icon: Warehouse,
    },
    {
        id: "salta",
        name: "Nuevo punto logístico",
        location: "Salta",
        role: "Ampliación de cobertura hacia el NOA.",
        status: "Proyectado",
        icon: MapPin,
    },
    {
        id: "bahia-blanca",
        name: "Nuevo punto logístico",
        location: "Bahía Blanca",
        role: "Mejora de tiempos de respuesta en el sur del país.",
        status: "Proyectado",
        icon: MapPin,
    },
];

export function Logistics(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            id="logistics"
            className="relative w-full bg-background text-foreground"
            aria-labelledby="logistics-heading"
        >
            <div className="container mx-auto px-3 py-16 lg:py-32">
                <div className="col-span-7 col-start-6 max-w-160 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
                    <h2
                        id="logistics-heading"
                        className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground"
                    >
                        Infraestructura para responder con rapidez.
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
                        className="mt-6 text-balance text-xl font-light leading-snug text-muted-foreground max-[850px]:text-lg"
                    >
                        Una red integrada de almacenamiento y distribución que optimiza la
                        disponibilidad de productos, reduce los tiempos de entrega y brinda
                        cobertura a distintas regiones del país.
                    </motion.p>
                </div>

                <div className="mt-20 max-[850px]:mt-12 grid grid-cols-12 items-stretch gap-12 max-[1100px]:grid-cols-1 max-[1100px]:gap-10">
                    <motion.figure
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.15 }}
                        className="group relative col-span-5 max-[1100px]:col-span-1 max-[1100px]:mx-auto max-[1100px]:w-full max-[1100px]:max-w-sm overflow-hidden rounded-sm border border-border bg-card"
                    >
                        <div className="relative h-full w-full max-[1100px]:h-auto max-[1100px]:aspect-[4/5]">
                            <Image
                                src="/map.jpg"
                                alt="Mapa de Argentina con la ubicación de Fluid y su cobertura de distribución en el país"
                                fill
                                sizes="(max-width: 1100px) 90vw, 40vw"
                                unoptimized
                                className="object-contain p-6"
                            />
                            <MapBrackets />
                        </div>
                    </motion.figure>

                    <div className="col-span-7 max-[1100px]:col-span-1 grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
                        {NODES.map((node, i) => {
                            const Icon = node.icon;
                            const projected = node.status === "Proyectado";
                            return (
                                <motion.article
                                    key={node.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: easeOutExpo,
                                        delay: 0.25 + i * 0.08,
                                    }}
                                    className={[
                                        "group relative flex min-h-[220px] flex-col justify-between rounded-sm border border-border p-8 max-[850px]:p-7",
                                        "transition-colors",
                                        projected
                                            ? "border-dashed bg-muted"
                                            : "bg-card",
                                    ].join(" ")}
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={[
                                                "flex h-10 w-10 items-center justify-center rounded-sm",
                                                projected
                                                    ? "border border-border text-muted-foreground"
                                                    : "bg-primary text-primary-foreground",
                                            ].join(" ")}
                                            aria-hidden
                                        >
                                            <Icon className="h-5 w-5" strokeWidth={1.6} />
                                        </div>
                                        <span
                                            className={[
                                                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
                                                projected
                                                    ? "text-foreground/45"
                                                    : "text-foreground/70",
                                            ].join(" ")}
                                        >
                                            <span
                                                aria-hidden
                                                className={[
                                                    "h-1.5 w-1.5 rounded-full",
                                                    projected ? "bg-foreground/30" : "bg-accent",
                                                ].join(" ")}
                                            />
                                            {node.status}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
                                            {node.name}
                                        </p>
                                        <h3 className="mt-3 text-xl font-medium leading-tight tracking-tight">
                                            {node.location}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                                            {node.role}
                                        </p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function MapBrackets(): ReactNode {
    const base =
        "absolute h-3 w-3 border-neutral-900/30 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100";
    return (
        <>
            <span className={`${base} left-3 top-3 border-l border-t`} aria-hidden />
            <span className={`${base} right-3 top-3 border-r border-t`} aria-hidden />
            <span
                className={`${base} bottom-3 left-3 border-b border-l`}
                aria-hidden
            />
            <span
                className={`${base} bottom-3 right-3 border-b border-r`}
                aria-hidden
            />
        </>
    );
}
