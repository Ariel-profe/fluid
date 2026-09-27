"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stats = [
  { value: "2018", label: "Fundación de la empresa" },
  { value: "2023", label: "Expansión a nuevos mercados" },
  { value: "2026", label: "Consolidación y transformación digital" },
]

export function StudioSection() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  return (
    <section id="studio" className="bg-primary text-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 container mx-auto px-3 py-10 lg:py-20">
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-background/65 mb-8">
            Un poco de nosotros
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
            Jóvenes profesionales con más de 15 años de experiencia en el mercado Industrial.
          </h2>
        </div>

        <div
          ref={bodyRef}
          className={`flex flex-col justify-end gap-10 transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col gap-6 max-w-lg">
            <p className="text-sm leading-[1.75] text-background/75">
              Somos una empresa Argentina y nuestro objetivo es estar presente y agregar valor a toda la cadena productiva del país, creando procesos de abastecimiento 
              innovadores para contribuir en la mejora constante de los negocios.
            </p>
            <p className="text-sm leading-[1.75] text-background/75">
              Comercializamos válvulas industriales, caños, bridas, accesorios e instrumentos de medición fabricados por 
              los líderes del mercado, cuidando así la calidad y seguridad productiva ofreciendo excelencia.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-background/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-extralight text-background tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-background/65 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
