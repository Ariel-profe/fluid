import Link from "next/link";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    img: string;
    href: string;
    label: string;
  }>;
}

const defaultSections = [
  {
    title: "Productos",
    links: [
      { name: "Válvulas", href: "#" },
      { name: "Actuadores y accesorios", href: "#" },
      { name: "Caños, bridas y accesorios", href: "#" },
      { name: "Caudal, presión y temperatura", href: "#" },
      { name: "Áreas clasificadas", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Nosotros", href: "#" },
      { name: "Servicios", href: "#" },
      { name: "Clientes", href: "#" }
    ],
  },
  {
    title: "Legales",
    links: [
      { name: "Términos y condiciones", href: "#" },
      { name: "Política de privacidad", href: "#" }
    ],
  },
];

const defaultSocialLinks = [
  { img: "/socials/instagram.svg", href: "https://", label: "Instagram" },
  { img: "/socials/facebook.svg", href: "https://", label: "Facebook" },
  { img: "/socials/whatsapp.svg", href: "https://", label: "Whatsapp" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer = ({
  logo = {
    url: "/",
    src: "/logo.webp",
    alt: "Fluid-logo",
    title: "FLUID - Soluciones Dinámicas",
  },
  sections = defaultSections,
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks
}: Footer7Props) => {

  const year = new Date().getFullYear();

  return (
    <section className="container mx-auto py-16 lg:pt-10 px-3">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="">
              <Link href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="size-12"
                />
              </Link>
              <h2 className="text-xl font-semibold mt-3">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="size-7 md:hover:scale-105 transition">
                  <a href={social.href} aria-label={social.label} >
                    <img src={social.img} alt={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 ">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-light hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">
            {`© ${year} Desarrollado por`}
            <a href="https://amn.com.ar" target="_blank" className="ml-1 text-primary md:hover:opacity-80 transition">AMN Consultora Informática</a>
          </p>
          <p className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            Todos los derechos reservados.
          </p>
        </div>
    </section>
  );
};

