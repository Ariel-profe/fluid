import { PartnersShowcase } from "@/components/partners/partners-showcase";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = createMetadata({
    title: "Clientes",
    description:
        "Empresas líderes de distintos sectores productivos del país confían en Fluid Soluciones Dinámicas para el control y la conducción de fluidos.",
    path: "/partners",
});

export default function PartnersPage() {
    return (
        <section>
            <PartnersShowcase />
            <CTASection />
        </section>
    );
}
