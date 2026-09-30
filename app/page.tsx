"use client"
import { StudioSection } from "@/components/studio-section"
import { ApproachSection } from "@/components/homepage/approach-section"
import { Partners } from "@/components/homepage/partners"
import { Hero } from "@/components/homepage/hero"
import { ProductsSection } from "@/components/homepage/products-section"
import VerticalTabs from "@/components/vertical-tabs"
import { SvgScroll } from "@/components/svg-scroll"
import { DynamicGallery } from "@/components/dynamic-gallery"

export default function Page() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <StudioSection />
      <DynamicGallery />
      <ApproachSection />
      <Partners />
    </main>
  ) 
}
