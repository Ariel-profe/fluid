"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero6.webp"
          alt="Fluid hero image"
          className={`w-full h-full object-cover object-center transition-transform duration-[2s] ease-out ${visible ? "scale-100" : "scale-110"}`}
        />
        
        <div className="absolute top-0 left-0 right-0 h-1/12 bg-linear-to-b from-[#fafaf9] via-[#fafaf9]/70 to-transparent pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 py-16 lg:py-32">
        <div className="w-fit rounded-sm backdrop-blur-[1px] p-3">
          <div
            className={`overflow-hidden mb-6 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-slate-900 text-balance">
              FLUID
            </h1>
            <h2 className="text-[clamp(1.5rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-slate-900 text-balance">
              Soluciones Dinámicas
            </h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >

            <p className="text-[14px] tracking-[0.3em] uppercase text-slate-800">
              Tu socio estratégico en productos para <br />
              control y conducción de fluidos.
            </p>
          </div>
        </div>

        <div
          className={`mt-16 md:mt-20 flex items-center gap-4 transition-all duration-1000 delay-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="w-8 h-px bg-slate-800" />
          <Button>
            Pedir cotización
          </Button>
        </div>
      </div>
    </section>
  )
}
