"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SERVICES } from "@/data/site"

function PrincipleCard({ principle, index }: { principle: (typeof SERVICES)[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.15)

  return (
    <article
      ref={ref}
      className={`min-w-0 bg-background p-6 group transition-all duration-700 md:p-12 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      <p className="mb-10 font-mono text-xs text-muted-foreground">
        ({principle.number})
      </p>
      <h3 className="mb-5 text-xl font-extralight tracking-tight text-foreground md:text-2xl">
        {principle.title}
      </h3>
      <div className="mb-5 h-px w-8 bg-border transition-all duration-500 group-hover:w-12" />
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {principle.description}
      </p>
    </article>
  )
}

export function ApproachSection() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <section id="approach" className="container mx-auto px-3 py-16 lg:py-32" aria-labelledby="approach-heading">
      <div
        ref={ref}
        className={`mb-16 border-b border-border pb-6 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 id="approach-heading" className="text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]">
          Soluciones integrales <br /> para la industria
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        {SERVICES.map((principle, index) => (
          <PrincipleCard key={principle.number} principle={principle} index={index} />
        ))}
      </div>
    </section>
  )
}
