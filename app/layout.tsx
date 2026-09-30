import type { Viewport } from "next"
import { Roboto, Nunito_Sans } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { baseMetadata } from "@/lib/metadata"
import { COMPANY } from "@/data/site"

import "./globals.css"
import { cn } from "@/lib/utils"

const nunitoSansHeading = Nunito_Sans({ subsets: ["latin"], variable: "--font-heading" })
const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = baseMetadata

export const viewport: Viewport = {
  themeColor: "#263640",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  url: "https://fluidsoluciones.com",
  email: COMPANY.email,
  telephone: COMPANY.phones[0].label,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Santiago de Chile 2555",
    addressLocality: "General Pacheco",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={cn("bg-background font-sans", roboto.variable, nunitoSansHeading.variable)}>
      <body className="bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        <Navigation />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
