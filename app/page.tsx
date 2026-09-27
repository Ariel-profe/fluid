
import { StudioSection } from "@/components/studio-section"
import { ApproachSection } from "@/components/homepage/approach-section"
import { ValveExperience } from "@/components/homepage/valve-experience"
import { Partners } from "@/components/homepage/partners"
import { Hero } from "@/components/homepage/hero"
import { ProductsSection } from "@/components/homepage/products-section"

const valves = [
  {
    description: "Dispositivo mecánico de cuarto de vuelta que sirve para interrumpir, iniciar o regular el flujo de un fluido dentro de una tubería.",
    title: "Válvulas mariposa",
    src: "/common/valvula-mariposa.jpg"
  },
  {
    description: "Dispositivo mecánico que sirve para abrir, cerrar o regular el paso de fluidos (como agua, gas o aire) mediante una esfera perforada que gira un cuarto de vuelta (90 grados).",
    title: "Válvulas esféricas",
    src: "/common/valvula-esferica.jpg"
  },
  {
    description: "Dispositivo mecánico que permite que un fluido (líquido o gas) circule en una sola dirección y bloquea por completo el flujo en sentido contrario.",
    title: "Válvulas de retención",
    src: "/common/valvula-de-retencion.jpg"
  },
  {
    description: "También llamada válvula de compuerta, es un dispositivo mecánico que sirve para permitir o bloquear por completo el paso de un fluido a través de una tubería.",
    title: "Válvulas esclusa",
    src: "/common/valvula-esclusa.jpg"
  },
  {
    description: "Dispositivo hidromecánico que regula de forma automática la entrada y salida de aire en las tuberías de agua.",
    title: "Válvulas de aire",
    src: "/common/valvula-de-aire.webp"
  },
  {
    description: "Dispositivo industrial diseñado para abrir, cerrar o aislar el paso de fluidos que contienen altos niveles de sólidos en suspensión, lodos, pastas, fibras o materiales viscosos.",
    title: "Válvulas guillotina",
    src: "/common/valvula-guillotina.jpg"
  },
]

export default function Page() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <StudioSection />
      <ValveExperience valves={valves} />
      <ApproachSection />
      <Partners />
    </main>
  ) 
}
