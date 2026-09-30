import { PageHero } from "@/components/page-hero";
import { CTASection } from "@/components/cta-section";
import { SectionHeader } from "@/components/section-header";
import { SERVICES } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Servicios",
  description:
    "Asesoramiento técnico-comercial, cotización, abastecimiento y stock estratégico para la industria.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        subtitle="Servicios"
        title="Acompañamos el proceso, no solo el producto."
        image="/common/3.jpg"
      />
      <section className="container mx-auto px-3 pb-16 lg:pb-32" aria-labelledby="services-list-heading">
        <SectionHeader
          title={<span id="services-list-heading">Cómo operamos</span>}
          kicker="Criterio industrial"
        />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.number} className="bg-background p-8 md:p-12">
              <p className="mb-8 font-mono text-xs text-muted-foreground">
                ({service.number})
              </p>
              <h3 className="mb-5 text-xl font-extralight tracking-tight text-foreground md:text-2xl">
                {service.title}
              </h3>
              <div className="mb-5 h-px w-8 bg-border" />
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
