"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Hero() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fluid-hero.webp"
          alt="hero-valve-image"
          className={`w-full h-full object-cover transition-transform duration-[2s] ease-out  ${visible ? "scale-100" : "scale-110"
            }`}
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-20 md:pb-20">
        <div className="max-w-5xl">
          <div
            className={`transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h1 className="text-[clamp(1.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-background text-balance">
              FLUID
            </h1>
            <h3 className="text-[clamp(0.25rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-background text-balance">
              Soluciones Dinámicas
            </h3>
          </div>
        </div>

        <div
          className={`mt-16 md:mt-20 flex items-center gap-6 transition-all duration-1000 delay-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="w-12 h-px bg-background/30" />
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] tracking-[0.2em] uppercase text-background/40">
              Tu socio estratégico en la provisión de productos <br /> para control y conducción de fluidos.
            </span>
            <Link href="/" className="text-[12px] tracking-[0.2em] uppercase text-slate-800 bg-slate-50 p-3 rounded-xl">Quiero cotizar</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
