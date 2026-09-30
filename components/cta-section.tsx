"use client"

import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { COMPANY } from "@/data/site"

export function CTASection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  return (
    <section id="contact-cta" className="relative overflow-hidden bg-primary text-primary-foreground" aria-labelledby="cta-heading">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden>
        <img src="/common/5.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-l from-transparent via-primary/55 to-primary" />
      </div>

      <div className="relative container mx-auto grid grid-cols-1 gap-16 px-3 py-20 lg:grid-cols-2 lg:gap-28">
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="mb-8 text-xs tracking-[0.3em] uppercase text-primary-foreground/70">
            Contáctenos
          </p>
          <h2 id="cta-heading" className="text-balance text-3xl font-extralight leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]">
            Estamos a tu servicio para lo que necesites
          </h2>
          <div className="mt-10">
            <a
              href={`mailto:${COMPANY.email}`}
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-primary-foreground/85 transition-colors duration-200 hover:text-primary-foreground"
            >
              <span className="border-b border-primary-foreground/30 pb-0.5 transition-colors duration-200 group-hover:border-primary-foreground/70">
                {COMPANY.email}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <div
          ref={bodyRef}
          className={`flex flex-col justify-end transition-all delay-200 duration-1000 ${
            bodyVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="mb-5 text-xs tracking-[0.3em] uppercase text-primary-foreground/70">
                Centro de operaciones
              </p>
              <p className="text-sm leading-[1.75] text-primary-foreground/85">
                {COMPANY.address.line}
              </p>
              <p className="mt-4 text-sm text-primary-foreground/85">
                {COMPANY.phones.map((p) => p.label).join(" · ")}
              </p>
            </div>
            <div>
              <p className="mb-5 text-xs tracking-[0.3em] uppercase text-primary-foreground/70">
                {COMPANY.warehouse.label}
              </p>
              <p className="text-sm leading-[1.75] text-primary-foreground/85">
                {COMPANY.warehouse.line}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
