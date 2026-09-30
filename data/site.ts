export const COMPANY = {
  name: "Fluid",
  legalName: "Fluid Soluciones Dinámicas",
  tagline: "Soluciones dinámicas.",
  description:
    "Socio estratégico en productos para el control y la conducción de fluidos: válvulas, actuadores, cañerías, bridas e instrumentación.",
  email: "cotizaciones@fluidsoluciones.com",
  phones: [
    { label: "+54 9 351 530-5318", href: "tel:+5493515305318" },
    { label: "+54 9 11 7609-4341", href: "tel:+5491176094341" },
  ],
  address: {
    line: "Santiago de Chile 2555, General Pacheco, Buenos Aires",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Santiago de Chile 2555, General Pacheco, Buenos Aires"),
    embedUrl:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("Santiago de Chile 2555, General Pacheco, Buenos Aires") +
      "&z=16&output=embed",
  },
  warehouse: {
    label: "Warehouse Córdoba",
    line: "Centro de almacenamiento y distribución en Córdoba",
  },
  instagram: {
    handle: "@fluidsoluciones",
    href: "https://www.instagram.com/fluidsoluciones",
  },
} as const;

export const SERVICES = [
  {
    number: "01",
    title: "Asesoramiento técnico-comercial",
    description:
      "Acompañamos al cliente en la selección de productos y soluciones industriales, desde la detección de necesidades hasta el cierre, con una gestión consultiva de largo plazo.",
  },
  {
    number: "02",
    title: "Cotización y provisión",
    description:
      "Elaboramos y gestionamos cotizaciones en tiempo y forma, con precios, plazos de entrega y el respaldo técnico de nuestro equipo comercial.",
  },
  {
    number: "03",
    title: "Compras y abastecimiento",
    description:
      "Gestionamos presupuestos, negociaciones y órdenes de compra, asegurando el abastecimiento de materiales y optimizando costos y plazos.",
  },
  {
    number: "04",
    title: "Stock estratégico",
    description:
      "Mantenemos stock propio de válvulas, actuadores, cañerías y accesorios industriales para optimizar la disponibilidad y habilitar la entrega inmediata.",
  },
] as const;
