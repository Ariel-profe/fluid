import { Catalog } from "@/components/products/catalog";
import { CTASection } from "@/components/cta-section";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ValveExperience } from "@/components/homepage/valve-experience";

export const metadata: Metadata = createMetadata({
    title: "Productos",
    description:
        "Catálogo de válvulas industriales para el control y la conducción de fluidos. Actuadores, cañerías e instrumentación se publican a continuación.",
    path: "/products",
});

export default function ProductsPage() {
    return (
        <>
            <ValveExperience />
            <Catalog />
            <CTASection />
        </>
    );
}
