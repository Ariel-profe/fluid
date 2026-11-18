import { FAQ_ITEMS } from '../../lib/faq-data';

/**
 * Copy table del sitio Fluid (español único).
 */
export const es = {
  site: {
    description:
      'Fluid Soluciones Dinámicas brinda soluciones industriales integrales: válvulas, actuadores, cañerías, bridas, accesorios e instrumentos de medición, con asesoramiento técnico y cobertura nacional.',
    descriptionShort:
      'Soluciones industriales para control y conducción de fluidos.',
    ogTitle: 'Fluid — Soluciones Dinámicas',
    ogDescription:
      'Aliado estratégico para la industria argentina. Productos de calidad, respaldo técnico especializado y una red logística en crecimiento.',
  },

  layout: {
    skipToContent: 'Saltar al contenido',
    changeLanguage: 'Cambiar idioma',
    toggleNavigation: 'Abrir o cerrar menú',
    darkTheme: 'Activar tema oscuro',
    lightTheme: 'Activar tema claro',
    toggleTheme: 'Cambiar tema',
    searchPlaceholder: 'Buscar productos…',
    searchNoResults: 'No encontramos productos para esa búsqueda.',
    searchHint: 'Escribí al menos 2 caracteres',
  },

  nav: {
    labels: {
      about: 'Nosotros',
      products: 'Productos',
      services: 'Servicios',
      contact: 'Contacto',
    },
    footer: {
      sectionTitles: {
        explore: 'Explorar',
        company: 'Empresa',
      },
      links: {
        products: 'Productos',
        services: 'Servicios',
        about: 'Nosotros',
        contact: 'Contacto',
        clients: 'Clientes',
      },
      hiringBadge: '',
      stayUpToDate: 'Cotizaciones',
      stayUpToDateContent:
        'Escribinos a cotizaciones@fluidsoluciones.com y te respondemos con una propuesta a medida.',
      craftedBy: 'Desarrollado por',
      newsletterDemoMessage:
        'Gracias. (Demo visual — el formulario aún no está conectado a un servicio de correo.)',
    },
    megaMenu: {
      services: {
        guides: { title: '', description: '' },
        integrations: { title: '', description: '' },
        experts: { title: '', description: '' },
        tools: { title: '', description: '' },
        plans: { title: '', description: '' },
        community: { title: '', description: '' },
      },
      successStories: '',
      successStory: { description: '', imageAlt: '' },
      learnMore: 'Conocer más',
    },
  },

  forms: {
    email: 'Email',
    emailAddress: 'Correo electrónico',
    emailPlaceholder: 'tu@empresa.com',
    emailInvalid: 'Incluí un correo válido para que podamos responderte',
    subscribe: 'Enviar',
    phone: 'Teléfono',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    passwordHint: 'Mínimo 8 caracteres',
    passwordMismatch: 'Las contraseñas no coinciden',
    rememberMe: 'Recordarme',
    acceptTerms: 'Acepto los ',
    termsAndConditions: 'Términos y Condiciones',
    or: 'O',
    demoFallbackMessage:
      'Demo visual — este formulario no está conectado a un backend.',
  },

  auth: {
    logIn: 'Ingresar',
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    signInWithGoogle: 'Continuar con Google',
    signUpWithGoogle: 'Registrarse con Google',
    noAccountYet: '¿Todavía no tenés cuenta?',
    signUpHere: 'Registrate acá',
    alreadyHaveAccount: '¿Ya tenés cuenta?',
    signInHere: 'Iniciá sesión',
    forgotPasswordTitle: '¿Olvidaste tu contraseña?',
    rememberYourPassword: '¿Recordás tu contraseña?',
    resetPassword: 'Restablecer contraseña',
    credentialsDemoNotice: 'Demo — no hay autenticación conectada.',
    recoveryDemoNotice: 'Demo — recuperación no conectada.',
    signInDemoMessage: 'Demo — inicio de sesión no conectado.',
    registerDemoMessage: 'Demo — registro no conectado.',
    recoverDemoMessage: 'Demo — recuperación no conectada.',
  },

  share: {
    share: 'Compartir',
    shareOn: (platform: string) => `Compartir en ${platform}`,
    copied: 'Copiado',
    copyLink: 'Copiar enlace',
  },

  banner: {
    dismiss: 'Cerrar',
    region: 'Banner informativo',
  },

  blog: {
    readMore: 'Leer más',
    minRead: (minutes: number) => `${minutes} min de lectura`,
    relatedArticles: 'Artículos relacionados',
    wasHelpful: '¿Te resultó útil?',
    yes: 'Sí',
    no: 'No',
    ogSection: 'Blog',
  },

  insights: {
    readMore: 'Leer más',
    tableOfContents: 'Contenido',
    ogSection: 'Insights',
  },

  products: {
    ogSection: 'Productos',
    tabs: 'Pestañas',
    comingSoon: 'Próximamente',
    viewCatalog: 'Ver catálogo',
    specs: 'Especificaciones',
    docs: 'Documentación',
    requestQuote: 'Solicitar cotización',
    backToCategory: 'Volver a la categoría',
    backToProducts: 'Volver a productos',
  },

  notFound: {
    title: 'Página no encontrada',
    subTitle: 'Esta ruta no forma parte del sitio de Fluid.',
    content:
      'Podés volver al inicio o explorar el catálogo de productos industriales.',
    goHome: 'Ir al inicio',
    goBack: 'Volver',
  },

  home: {
    banner: '',
    hero: {
      title:
        'Soluciones industriales <span class="text-fluid-cyan">para procesos que no se detienen</span>',
      subTitle:
        'Válvulas, actuadores, cañerías, bridas, accesorios e instrumentos de medición, con asesoramiento técnico y cobertura nacional.',
      primaryBtn: 'Ver productos',
      secondaryBtn: 'Hablar con ventas',
      rating: '',
      reviews: '',
      imageAlt: 'Soluciones Fluid para control y conducción de fluidos',
      eyebrow: 'Fluid Soluciones Dinámicas',
      trustLine: 'Más de 20 años de experiencia industrial · Origen Córdoba · Cobertura nacional',
    },
    clients: {
      title: 'Empresas que confían en Fluid',
      subTitle:
        'Acompañamos a distintos sectores productivos con productos de calidad y un servicio ágil.',
    },
    categories: {
      title: 'Catálogo industrial',
      subTitle:
        'Una cartera amplia para control, conducción e instrumentación. Empezá por válvulas — el resto se habilita a medida que completamos el catálogo.',
    },
    value: {
      title: 'Un aliado estratégico para la industria',
      subTitle:
        'Orientamos nuestros esfuerzos a optimizar el abastecimiento industrial con propuestas eficientes y adaptadas a cada proyecto.',
      items: [
        {
          title: 'Productos de marcas líderes',
          body: 'Válvulas, cañerías, bridas, accesorios e instrumentos con altos estándares de calidad, seguridad y confiabilidad.',
        },
        {
          title: 'Respaldo técnico especializado',
          body: 'Asesores técnico-comerciales que acompañan desde la detección de necesidades hasta el cierre.',
        },
        {
          title: 'Stock y logística',
          body: 'Centro de Operaciones en General Pacheco y warehouse en Córdoba para mejorar disponibilidad y tiempos de entrega.',
        },
      ],
    },
    logistics: {
      title: 'Red logística en expansión',
      subTitle:
        'Infraestructura diseñada para responder con rapidez a las demandas del mercado industrial.',
      cta: 'Conocer la empresa',
    },
    faqTitle: 'Preguntas frecuentes',
    heroAlt: {
      title: '¿Necesitás una cotización?',
      subTitle:
        'Escribinos a cotizaciones@fluidsoluciones.com o contactanos por WhatsApp. Armamos propuestas en tiempo y forma.',
      btn: 'Ir a contacto',
    },
  },

  about: {
    title: 'Nosotros',
    metaDescription:
      'Fluid Soluciones Dinámicas: historia, misión, visión, valores, organigrama y red logística.',
    ogTitle: 'Nosotros | Fluid',
    heading: 'Quiénes somos',
    intro:
      'Desde Córdoba, con expansión sostenida al resto del país, construimos una estructura moderna, dinámica y eficiente para acompañar a la industria argentina.',
  },

  services: {
    title: 'Servicios',
    metaDescription:
      'Asesoramiento técnico-comercial, abastecimiento industrial, stock estratégico y cobertura nacional.',
    ogTitle: 'Servicios | Fluid',
    intro: {
      title: 'Soluciones que acompañan cada proceso',
      subTitle:
        'Brindamos soluciones integrales para la industria: productos de alta calidad, respaldo técnico especializado y mejora continua en cada proceso.',
      cta: 'Solicitar cotización',
    },
    articles: {
      guidance: {
        title: 'Asesoramiento técnico-comercial',
        subTitle:
          'Acompañamos la selección de productos y soluciones industriales con una gestión consultiva y de largo plazo.',
        imageAlts: ['Asesoramiento técnico industrial', 'Equipo comercial Fluid'],
      },
      craftsmanship: {
        title: 'Abastecimiento y stock',
        subTitle:
          'Stock estratégico de válvulas, actuadores, cañerías y accesorios para entrega ágil.',
        imageAlts: ['Depósito industrial'],
        cta: 'Ver productos',
      },
      oversight: {
        title: 'Cobertura comercial',
        subTitle:
          'Equipo comercial por zonas y red logística que fortalece la atención en todo el país.',
        imageAlts: ['Cobertura nacional', 'Red logística'],
      },
      maintenance: {
        title: 'Proyectos especiales',
        subTitle:
          'Participamos en soluciones especiales, ensambles y atención de emergencias operativas.',
        imageAlts: ['Proyecto industrial'],
      },
      bespoke: {
        title: 'Gestión eficiente',
        subTitle:
          'Procesos, CRM y mejora continua para responder con rapidez a las demandas del mercado.',
        imageAlts: ['Gestión industrial', 'Indicadores de operación'],
        cta: 'Contactar',
      },
    },
    stats: {
      title: 'Compromiso operativo',
      subTitle:
        'Trabajamos para superar expectativas y construir relaciones de largo plazo basadas en confianza y transparencia.',
      mainStatTitle: 'Nacional',
      mainStatSubTitle: 'Cobertura comercial y técnica en expansión',
      stats: [
        { stat: 'Pacheco', description: 'Centro de Operaciones' },
        { stat: 'Córdoba', description: 'Warehouse estratégico' },
        { stat: 'NOA / Sur', description: 'Expansión proyectada' },
      ],
    },
  },

  contact: {
    title: 'Contacto',
    metaDescription:
      'Contactá a Fluid Soluciones Dinámicas por email, teléfono, WhatsApp o visitá nuestro Centro de Operaciones en General Pacheco.',
    ogTitle: 'Contacto | Fluid',
    heading: 'Hablemos de tu proyecto',
    subTitle:
      'Cotizaciones, consultas técnicas y seguimiento comercial. Elegí el canal que te resulte más cómodo.',
    formTitle: 'Envianos un mensaje',
    formSubTitle: 'Demo visual — te responderemos cuando el formulario esté conectado.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    details: 'Detalle de la consulta',
    send: 'Enviar mensaje',
    demoMessage:
      'Gracias. (Demo visual — el formulario aún no envía mensajes reales.)',
    knowledgeHeading: 'Productos',
    knowledgeContent: 'Explorá el catálogo industrial de Fluid.',
    knowledgeLink: 'Ver productos',
    faqHeading: 'FAQ',
    faqContent: 'Respuestas rápidas sobre cobertura, stock y cotizaciones.',
    faqLink: 'Ver preguntas frecuentes',
    officeHeading: 'Centro de Operaciones',
    officeContent: 'Santiago de Chile 2555, General Pacheco, Buenos Aires',
    emailHeading: 'Correo',
    emailContent: 'Escribinos a',
  },

  blogIndex: {
    title: 'Blog',
    metaDescription: '',
    ogTitle: '',
    heading: '',
    subTitle: '',
    insightsHeading: '',
    insightsSubTitle: '',
    noPosts: '',
    noInsights: '',
  },

  productsIndex: {
    title: 'Productos',
    metaDescription:
      'Catálogo Fluid: válvulas, actuadores, caños, bridas, instrumentación y áreas clasificadas.',
    ogTitle: 'Productos | Fluid',
    heading: 'Productos industriales',
    subTitle:
      'Cartera orientada a control y conducción de fluidos. Hoy podés explorar en detalle la categoría Válvulas.',
    customerStories: '',
    testimonials: { title: '', quotes: [] },
    stats: {
      title: 'Calidad y confiabilidad',
      subTitle:
        'Trabajamos con marcas líderes nacionales e internacionales para los procesos productivos de nuestros clientes.',
      benefits: [
        'Asesoramiento técnico-comercial especializado.',
        'Stock estratégico para respuesta ágil.',
        'Documentación y fichas técnicas disponibles en válvulas.',
      ],
    },
  },

  data: {
    faqs: {
      subTitle: 'Consultas frecuentes sobre productos, cobertura y cotizaciones.',
      faqs: FAQ_ITEMS.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    },
    features: [],
    pricing: [],
  },
};
