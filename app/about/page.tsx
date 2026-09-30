import { EditorialBreak } from "@/components/about/editorial-break";
import { Gallery } from "@/components/about/gallery";
import { Logistics } from "@/components/about/logistics";
import { Values } from "@/components/about/values";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
    title: "Nosotros",
    description:
        "Fluid Soluciones Dinámicas: jóvenes profesionales con más de 15 años de experiencia en el mercado industrial argentino.",
    path: "/about",
});

export default function AboutPage() {
    return (
        <>
            <PageHero
                subtitle="Nosotros"
                title="Construimos soluciones industriales."
                image="/common/2.jpg"
            />
            <Values />
            <Gallery />
            <Logistics />
            <EditorialBreak />
        </>
    );
}
