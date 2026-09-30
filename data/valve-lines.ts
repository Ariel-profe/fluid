import { getCategoryBySlug } from "@/data/products";

const VALVE_COVERS: Record<string, { image: string; intro: string }> = {
  mariposa: {
    image: "/common/valvula-mariposa.jpg",
    intro:
      "Dispositivo de cuarto de vuelta para interrumpir, iniciar o regular el flujo en una tubería.",
  },
  esfericas: {
    image: "/common/valvula-esferica.jpg",
    intro:
      "Apertura y cierre mediante una esfera perforada que gira 90 grados.",
  },
  retencion: {
    image: "/common/valvula-de-retencion.jpg",
    intro:
      "Permite el paso en un solo sentido y bloquea el retorno del fluido.",
  },
  esclusas: {
    image: "/common/valvula-esclusa.jpg",
    intro:
      "Compuerta para permitir o bloquear por completo el paso en la línea.",
  },
  aire: {
    image: "/common/valvula-de-aire.webp",
    intro:
      "Regula de forma automática la entrada y salida de aire en tuberías de agua.",
  },
  "guillotina-y-compuertas": {
    image: "/common/valvula-guillotina.jpg",
    intro:
      "Aislamiento de fluidos con sólidos en suspensión, lodos, pastas o materiales viscosos.",
  },
  "aplicaciones-especiales": {
    image: "/categories/valvulas.webp",
    intro:
      "Soluciones para servicios corrosivos, peligrosos y condiciones fuera de estándar.",
  },
};

export type ValveLine = {
  slug: string;
  name: string;
  intro: string;
  image: string;
  href: string;
  productCount: number;
};

export function getValveLines(): ValveLine[] {
  const category = getCategoryBySlug("valves");
  if (!category) return [];

  return category.subcategories.map((sub) => {
    const cover = VALVE_COVERS[sub.slug];
    return {
      slug: sub.slug,
      name: sub.name,
      intro: cover?.intro ?? `${sub.products.length} productos en esta línea.`,
      image: cover?.image ?? sub.products[0]?.image ?? category.image ?? "/categories/valvulas.webp",
      href: `/products/${category.slug}/${sub.slug}`,
      productCount: sub.products.length,
    };
  });
}
