"use client";

import { motion, useInView } from "motion/react";
import {
    Mail,
    MapPin,
    Phone,
    Instagram,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { useRef, type ReactNode } from "react";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Santiago de Chile 2555, General Pacheco, Buenos Aires");

interface Action {
    text: string;
    href: string;
    external?: boolean;
}

interface Channel {
    id: string;
    label: string;
    icon: LucideIcon;
    actions: Action[];
}

const CHANNELS: Channel[] = [
    {
        id: "email",
        label: "Correo",
        icon: Mail,
        actions: [
            {
                text: "cotizaciones@fluidsoluciones.com",
                href: "mailto:cotizaciones@fluidsoluciones.com",
            },
        ],
    },
    {
        id: "phone",
        label: "Teléfono",
        icon: Phone,
        actions: [
            { text: "+54 9 351 530-5318", href: "tel:+5493515305318" },
            { text: "+54 9 11 7609-4341", href: "tel:+5491176094341" },
        ],
    },
    {
        id: "address",
        label: "Centro de Operaciones",
        icon: MapPin,
        actions: [
            {
                text: "Santiago de Chile 2555, General Pacheco, Buenos Aires",
                href: MAPS_URL,
                external: true,
            },
        ],
    },
    {
        id: "instagram",
        label: "Instagram",
        icon: Instagram,
        actions: [
            {
                text: "@fluidsoluciones",
                href: "https://www.instagram.com/fluidsoluciones",
                external: true,
            },
        ],
    },
];

const CARD_BASE =
    "group relative flex min-h-[220px] flex-col rounded-2xl border border-foreground/8 bg-foreground/[0.02] p-8 max-[850px]:p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-brand-blue/40 hover:bg-brand-blue/[0.04] hover:shadow-[0_1px_45px_-14px_rgba(47,121,159,0.35)]";

function externalProps(a: Action) {
    return a.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function CardHead({ Icon }: { Icon: LucideIcon }): ReactNode {
    return (
        <div className="flex items-start justify-between">
            <div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue transition-colors duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:bg-brand-blue group-hover:text-white"
                aria-hidden
            >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                aria-hidden
            >
                <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                />
            </span>
        </div>
    );
}

export function ContactDetails(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            id="contact-details"
            className="relative w-full text-foreground border-y border-border bg-zinc-100"
            aria-labelledby="contact-details-heading"
        >
            <div className="max-w-420 mx-auto px-10 max-[850px]:px-6 py-32 max-[850px]:py-16">
                <div className="grid grid-cols-12 gap-x-10 gap-y-6 max-[850px]:grid-cols-1 ">
                    <div className="col-span-3 max-[1100px]:col-span-12 max-[850px]:col-span-1 pt-2">
                        <motion.span
                            initial={{ opacity: 0, y: 8 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                            transition={{ duration: 0.6, ease: easeOutExpo }}
                            className="inline-flex items-center rounded-md border border-foreground/8 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70"
                        >
                            Contacto
                        </motion.span>
                    </div>

                    <div className="col-span-7 col-start-6 max-w-[40rem] max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
                        <h1
                            id="contact-details-heading"
                            className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground"
                        >
                            Estamos para ayudarte.
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
                            className="mt-6 text-balance text-xl max-[850px]:text-lg font-light leading-snug text-foreground/60"
                        >
                            Escribinos para solicitar una cotización o resolver cualquier
                            consulta técnica. Nuestro equipo comercial responde a la brevedad.
                        </motion.p>
                    </div>
                </div>

                <div className="mt-20 max-[850px]:mt-12 grid grid-cols-4 gap-5 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                    {CHANNELS.map((channel, i) => {
                        const Icon = channel.icon;
                        const single = channel.actions.length === 1;
                        const first = channel.actions[0]!;

                        return (
                            <motion.div
                                key={channel.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.8,
                                    ease: easeOutExpo,
                                    delay: 0.25 + i * 0.08,
                                }}
                            >
                                {single ? (
                                    <a href={first.href} {...externalProps(first)} className={CARD_BASE}>
                                        <CardHead Icon={Icon} />
                                        <div className="mt-auto pt-8">
                                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
                                                {channel.label}
                                            </p>
                                            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                                                {first.text}
                                            </p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className={CARD_BASE}>
                                        <CardHead Icon={Icon} />
                                        <div className="mt-auto pt-8">
                                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
                                                {channel.label}
                                            </p>
                                            <div className="mt-3 space-y-1.5">
                                                {channel.actions.map((a) => (
                                                    <a
                                                        key={a.href}
                                                        href={a.href}
                                                        {...externalProps(a)}
                                                        className="block text-sm leading-relaxed text-foreground/80 transition-colors hover:text-foreground"
                                                    >
                                                        {a.text}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
