"use client"

import { useEffect, useRef, useState } from "react"

// Añadimos un tipo genérico <T extends HTMLElement> que por defecto es HTMLDivElement
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  // Ahora la referencia utiliza el tipo genérico T
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
