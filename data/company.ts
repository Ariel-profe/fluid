/** Contenido institucional extraído de data/company-manual.md — no inventar. */

export const company = {
  legalName: 'Fluid Soluciones Dinámicas S.A.',
  brandName: 'Fluid',
  tagline: 'Soluciones Dinámicas',
  origin: 'Córdoba, Argentina',
  summary:
    'Empresa argentina integrada por profesionales con más de veinte años de experiencia en el mercado industrial, comprometidos con el desarrollo de soluciones que aporten valor a los distintos sectores productivos del país.',
  purpose:
    'Contribuir al crecimiento de la industria nacional, fortaleciendo la cadena de valor a través de un servicio confiable, ágil y de excelencia.',
  mission:
    'Brindar soluciones industriales integrales a través de productos de calidad, asesoramiento técnico especializado y una gestión eficiente, contribuyendo al desarrollo y la continuidad operativa de nuestros clientes.',
  vision:
    'Ser una empresa referente en soluciones industriales a nivel nacional e internacional, reconocida por la calidad de sus productos, la excelencia en el servicio y la confianza generada en clientes, proveedores y colaboradores.',
  values:
    'Compromiso, responsabilidad e integridad; relaciones basadas en la confianza, la transparencia y el respeto. Orientación al cliente, trabajo en equipo, mejora continua e innovación.',
  portfolio:
    'Válvulas industriales, cañerías, bridas, accesorios e instrumentos de medición fabricados por marcas líderes a nivel nacional e internacional.',
  sectors: ['Industria general', 'Agro', 'Minería'],
} as const;

export const timeline = [
  {
    year: '2018',
    title: 'Fundación de la empresa',
    items: [
      'Constitución de Fluid Soluciones Dinámicas.',
      'Inicio del desarrollo del proyecto empresarial y definición de la estrategia comercial.',
      'Construcción de relaciones con proveedores y análisis de oportunidades dentro del mercado industrial.',
    ],
  },
  {
    year: '2022',
    title: 'Inicio de operaciones',
    items: [
      'Comienzo formal de las operaciones comerciales.',
      'Incorporación de un perfil de Gerente de Operaciones.',
      'Primera venta a Promaiz (febrero 2022).',
      'Implementación de Bejerman como sistema de gestión empresarial.',
      'Desarrollo de la red inicial de proveedores y clientes.',
      'Operación logística mediante un Warehouse inteligente.',
      'Primera inversión en stock propio (diciembre 2022).',
    ],
  },
  {
    year: '2023',
    title: 'Expansión a nuevos mercados',
    items: [
      'Crecimiento de la presencia comercial en nuevos mercados.',
      'Incorporación de Asesores Técnicos Comerciales para Córdoba y San Luis.',
      'Consolidación de la estructura comercial y ampliación de la cartera de clientes.',
    ],
  },
  {
    year: '2024',
    title: 'Nuevos logros y mercados',
    items: [
      'Ejecución del primer proyecto integral para Promaiz.',
      'Ampliación del equipo comercial en la región centro.',
      'Incorporación de Ventas Internas y Cotizaciones.',
      'Inicio de operaciones comerciales en Buenos Aires.',
      'Primera compra de stock de accesorios industriales para entrega inmediata.',
    ],
  },
  {
    year: '2025',
    title: 'Consolidación y crecimiento',
    items: [
      'Incorporación de un Gerente Comercial.',
      'Apertura del primer depósito propio en General Pacheco, Buenos Aires.',
      'Desarrollo del área de Compras y Abastecimiento.',
      'Incremento del stock estratégico de válvulas, actuadores, cañerías y accesorios.',
      'Implementación de CRM Dynamics y expansión de la estructura comercial.',
      'Incorporación de activos propios, incluyendo flota vehicular comercial y utilitaria.',
    ],
  },
  {
    year: '2026',
    title: 'Profesionalización y transformación digital',
    items: [
      'Incorporación de consultoría externa para optimización de procesos, gestión y auditoría interna.',
      'Incorporación de Asistente de Dirección.',
      'Expansión hacia nuevos mercados, incluyendo el sector minero y agro.',
      'Implementación de tableros de gestión e indicadores.',
      'Inicio del proyecto de migración tecnológica CRM + ERP.',
      'Incorporación del área de Comercio Exterior (Comex).',
    ],
  },
] as const;

export const logistics = {
  title: 'Red logística e infraestructura operativa',
  description:
    'Fluid cuenta con una infraestructura logística diseñada para acompañar el crecimiento de sus operaciones y garantizar una respuesta eficiente a las necesidades de sus clientes.',
  hubs: [
    {
      name: 'Centro de Operaciones',
      location: 'General Pacheco, Buenos Aires',
      detail: 'Depósito propio y operación comercial en zona norte del AMBA.',
    },
    {
      name: 'Warehouse estratégico',
      location: 'Provincia de Córdoba',
      detail: 'Nodo logístico que optimiza disponibilidad y tiempos de entrega en la región centro.',
    },
  ],
  planned: [
    { name: 'Salta', detail: 'Punto logístico proyectado para ampliar cobertura en el NOA.' },
    {
      name: 'Bahía Blanca',
      detail: 'Centro de distribución proyectado para el sur de la provincia de Buenos Aires.',
    },
  ],
} as const;

export type OrgNode = {
  id: string;
  title: string;
  name?: string;
  description?: string;
  children?: OrgNode[];
};

/** Organigrama según el manual (roles públicos; sin datos sensibles). */
export const orgChart: OrgNode = {
  id: 'ceo',
  title: 'Director General — CEO',
  description:
    'Responsable máximo de la empresa. Supervisa la estrategia general y toma decisiones clave para el desarrollo y crecimiento del negocio.',
  children: [
    {
      id: 'asistente',
      title: 'Asistente de Dirección',
      name: 'Laura Pommerenck',
      description:
        'Soporte estratégico a la Dirección mediante análisis de información, documentación y mejora de procesos.',
    },
    {
      id: 'ops',
      title: 'Gerente de Operaciones',
      name: 'Natalia Andrés',
      description:
        'Coordina y optimiza los procesos operativos (logística, compras, postventa), asegurando eficiencia y cumplimiento de objetivos.',
      children: [
        {
          id: 'ventas-internas',
          title: 'Analista de ventas internas',
          description: 'Armado y gestión de cotizaciones y soporte al equipo comercial.',
        },
        {
          id: 'compras',
          title: 'Analista de compras y abastecimiento',
          description:
            'Gestión de compras, negociación con proveedores y aseguramiento del abastecimiento.',
        },
        {
          id: 'deposito',
          title: 'Responsable de almacén y logística',
          description:
            'Recepción, organización y despacho de mercadería, con control de stock y trazabilidad.',
        },
      ],
    },
    {
      id: 'comercial',
      title: 'Gerente Comercial',
      name: 'Daniel Bernotti',
      description:
        'Lidera la estrategia de ventas, desarrollo de negocios y gestión de clientes.',
      children: [
        {
          id: 'v-cba',
          title: 'Vendedor Córdoba y San Luis',
          description: 'Asesoramiento técnico-comercial y desarrollo de ventas.',
        },
        {
          id: 'v-norte',
          title: 'Vendedor Bs. As. — Zona Norte',
          description: 'Asesoramiento técnico-comercial y desarrollo de ventas.',
        },
        {
          id: 'v-oeste',
          title: 'Vendedor Bs. As. — Zona Oeste',
          description: 'Asesoramiento técnico-comercial y desarrollo de ventas.',
        },
        {
          id: 'v-sur-amba',
          title: 'Vendedor Bs. As. — Zona Sur AMBA',
          description: 'Asesoramiento técnico-comercial y desarrollo de ventas.',
        },
        {
          id: 'v-sur-resto',
          title: 'Vendedor Bs. As. — Zona Sur Resto',
          description: 'Asesoramiento técnico-comercial y desarrollo de ventas.',
        },
        {
          id: 'v-noa',
          title: 'Vendedor NOA',
          description: 'Asesoramiento técnico-comercial y desarrollo de ventas.',
        },
      ],
    },
  ],
};

export const services = [
  {
    id: 'asesoramiento',
    title: 'Asesoramiento técnico-comercial',
    description:
      'Acompañamos al cliente en la selección de productos y soluciones industriales, desde la detección de necesidades hasta el cierre, con una gestión consultiva y de largo plazo.',
  },
  {
    id: 'abastecimiento',
    title: 'Abastecimiento industrial',
    description:
      'Optimizamos los procesos de abastecimiento industrial con propuestas eficientes y adaptadas a las necesidades de cada proyecto.',
  },
  {
    id: 'stock',
    title: 'Stock estratégico y entrega',
    description:
      'Mantenemos stock estratégico de válvulas, actuadores, cañerías y accesorios para mejorar disponibilidad y reducir tiempos de entrega.',
  },
  {
    id: 'cobertura',
    title: 'Cobertura comercial y técnica',
    description:
      'Estructura moderna y dinámica con cobertura a distintas regiones del país a través de nuestra red logística y equipo comercial.',
  },
  {
    id: 'proyectos',
    title: 'Proyectos y soluciones especiales',
    description:
      'Participamos en proyectos de soluciones especiales, armado de ensambles y atención de emergencias de clientes o del equipo comercial.',
  },
] as const;
