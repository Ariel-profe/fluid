"use client"

import { CategoryGrid } from "@/components/products/catalog-views"
import { SectionHeader } from "@/components/section-header"
import { CATALOG_CATEGORIES } from "@/data/catalog-categories"

export function ProductsSection() {
  return (
    <section id="products" className="container mx-auto px-3 py-16 lg:py-24" aria-labelledby="home-products-heading">
      <SectionHeader
        as="h2"
        title={<span id="home-products-heading">Productos</span>}
        kicker="Líneas comerciales"
        aside={`(${String(CATALOG_CATEGORIES.length).padStart(2, "0")}) categorías`}
      />
      <CategoryGrid />
    </section>
  )
}
