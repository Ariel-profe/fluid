import { ContactDetails } from "@/components/contact/contact-details";
import { Faq } from "@/components/contact/faq";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
    title: "Contacto",
    description:
        "Contactá a Fluid Soluciones Dinámicas para solicitar una cotización o asesoramiento técnico. Correo, teléfonos y Centro de Operaciones en General Pacheco, Buenos Aires.",
    path: "/contact",
});

export default function ContactPage() {
    return (
        <section className="container mx-auto px-3">
            <PageHero
                subtitle="Contacto"
                title="Trabajemos juntos."
            />
            <ContactDetails />
            <Faq />
        </section>
    );
}
