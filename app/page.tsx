import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProductsSection } from "@/components/products-section"
import { StudioSection } from "@/components/studio-section"
import { EditorialBreak } from "@/components/editorial-break"
import { ApproachSection } from "@/components/approach-section"
import { JournalSection } from "@/components/journal-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
     
      <Hero />
      <ProductsSection />
      <EditorialBreak />
      <StudioSection />
      <ApproachSection />
      <JournalSection />
      <ContactSection />
      
    </main>
  )
}
