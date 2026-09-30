"use client"

import { StudioSection } from "@/components/studio-section"
import { ApproachSection } from "@/components/homepage/approach-section"
import { Partners } from "@/components/homepage/partners"
import { Hero } from "@/components/homepage/hero"
import { ProductsSection } from "@/components/homepage/products-section"
import { PlantStrip } from "@/components/homepage/plant-strip"

export default function Page() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <StudioSection />
      <ApproachSection />
      <PlantStrip />
      <Partners />
    </>
  )
}
