"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

const PHOTOS = Array.from({ length: 9 }, (_, i) => ({
    src: `/action-group/${i + 1}.jpg`,
    alt: `Operación de Fluid Soluciones Dinámicas — imagen ${i + 1}`,
}));

export function Gallery(): ReactNode {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.2 });

    const autoplay = useRef(
        Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true }),
    );

    const [api, setApi] = useState<CarouselApi>();
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        if (!api) return;
        const onSelect = (): void => setSelected(api.selectedScrollSnap());
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <section
            ref={sectionRef}
            id="gallery"
            className="relative w-full overflow-hidden text-foreground"
            aria-labelledby="gallery-heading"
        >
            <div className="container mx-auto px-3 py-16 lg:py-32">
                <div className="col-span-7 col-start-6 max-w-160 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
                    <h1
                        id="gallery-heading"
                        className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground"
                    >
                        El equipo y la operación, en imágenes
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
                        className="mt-6 text-balance text-xl max-[850px]:text-lg font-light leading-snug text-foreground/60"
                    >
                        Personas, logística y trabajo en planta: la infraestructura real
                        que sostiene cada solución que entregamos.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
                    className="mt-16 max-[850px]:mt-12"
                >
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "center", loop: true }}
                        plugins={[autoplay.current]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 max-[850px]:-ml-3">
                            {PHOTOS.map((photo, i) => {
                                const isActive = i === selected;
                                return (
                                    <CarouselItem
                                        key={photo.src}
                                        className="basis-[58%] pl-4 sm:basis-[36%] lg:basis-[23%] max-[850px]:pl-3"
                                    >
                                        <figure
                                            className={[
                                                "group relative aspect-[3/4] w-full overflow-hidden rounded-xl transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
                                                isActive
                                                    ? "scale-100 opacity-100"
                                                    : "scale-[0.94] opacity-55",
                                            ].join(" ")}
                                        >
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                fill
                                                sizes="(max-width: 850px) 58vw, (max-width: 1100px) 36vw, 23vw"
                                                draggable={false}
                                                className={[
                                                    "object-cover transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
                                                    isActive
                                                        ? "grayscale-0 scale-100"
                                                        : "grayscale-75 scale-105",
                                                ].join(" ")}
                                                loading="lazy"
                                            />

                                            <span
                                                aria-hidden
                                                className={[
                                                    "pointer-events-none absolute inset-0 transition-opacity duration-700",
                                                    isActive
                                                        ? "opacity-75"
                                                        : "opacity-100 bg-background/30",
                                                ].join(" ")}
                                            />

                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 bg-linear-to-t from-neutral-950/45 via-transparent to-transparent"
                                            />

                                            <CornerBrackets active={isActive} />

                                            <figcaption className="absolute bottom-0 left-0 flex items-center gap-2 p-4 font-mono text-[0.7rem] uppercase tracking-widest text-white/80">
                                                <span className="tabular-nums">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="text-white/40">/</span>
                                                <span className="tabular-nums text-white/40">
                                                    {String(PHOTOS.length).padStart(2, "0")}
                                                </span>
                                            </figcaption>
                                        </figure>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    <div className="mt-8 flex items-center justify-center gap-2.5">
                        {PHOTOS.map((photo, i) => (
                            <button
                                key={photo.src}
                                type="button"
                                aria-label={`Ir a la imagen ${i + 1}`}
                                aria-current={i === selected}
                                onClick={() => api?.scrollTo(i)}
                                className={[
                                    "h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
                                    i === selected
                                        ? "w-8 bg-primary"
                                        : "w-1.5 bg-primary/20 hover:bg-primary/40",
                                ].join(" ")}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function CornerBrackets({ active }: { active: boolean }): ReactNode {
    const base = `absolute h-3 w-3 border-white/80 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${active ? "opacity-100" : "opacity-0"
        }`;
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
