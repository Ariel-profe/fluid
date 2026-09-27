"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const principles = [
  {
    number: "01",
    title: "Asesoramiento técnico-comercial",
    description:
      "Acompañamos al cliente en la selección de productos y soluciones industriales, desde la detección de necesidades hasta el cierre, con una gestión consultiva de largo plazo.",
  },
  {
    number: "02",
    title: "Cotización y provisión",
    description:
      "Elaboramos y gestionamos cotizaciones en tiempo y forma, con precios, plazos de entrega y el respaldo técnico de nuestro equipo comercial.",
  },
  {
    number: "03",
    title: "Compras y abastecimiento",
    description:
      "Gestionamos presupuestos, negociaciones y órdenes de compra, asegurando el abastecimiento de materiales en tiempo y forma y optimizando costos y plazos.",
  },
  {
    number: "04",
    title: "Stock estratégico",
    description:
      "Mantenemos stock propio de válvulas, actuadores, cañerías y accesorios industriales para optimizar la disponibilidad y habilitar la entrega inmediata.",
  },
]

function PrincipleCard({ principle, index }: { principle: typeof principles[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15)

  return (
    <div
      ref={ref}
      className={`bg-background p-8 md:p-12 group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      <div className="flex items-start justify-between mb-10">
        <span className="text-[11px] tracking-[0.15em] text-muted-foreground/40">
          ({principle.number})
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-extralight tracking-tight text-foreground mb-5 group-hover:translate-x-1 transition-transform duration-500">
        {principle.title}
      </h3>
      <div className="w-8 h-px bg-border mb-5 group-hover:w-12 transition-all duration-500" />
      <p className="text-sm leading-[1.75] text-muted-foreground max-w-sm">
        {principle.description}
      </p>
    </div>
  )
}

export function ApproachSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="approach" className="container mx-auto px-3 py-10 lg:py-20">
      <div
        ref={ref}
        className={`mb-20 pb-6 border-b border-border transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-[2.75rem] font-extralight tracking-tight text-foreground">
          Soluciones integrales <br /> para la industria
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.number} principle={principle} index={index} />
        ))}
      </div>
    </section>
  )
}
