import { Catalog } from "@/components/products/catalog";
import { CTASection } from "@/components/cta-section";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
    title: "Productos",
    description:
        "Catálogo de productos para el control y la conducción de fluidos: válvulas, actuadores, cañerías, bridas, accesorios e instrumentación.",
    path: "/products",
});

export default function ProductsPage() {
    return (
        <section >
            <Catalog />
            <CTASection />
        </section>
    );
}