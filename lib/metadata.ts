import type { Metadata } from "next";

export const siteConfig = {
  name: "Fluid",
  shortDescription: "Soluciones dinámicas.",
  description:
    "Fluid es tu socio estratégico en la provisión de productos para control y conducción de fluidos.",
  url: "https://fluidsoluciones.com",
  ogImage: "/og-image.png",
  creator: "@amn",
  authors: [
    {
      name: "AMN Consultora Informática",
      url: "https://amn.com.ar",
    },
  ],
  keywords: [
    "Fluid",
    "Soluciones dinámicas",
    "Productos para control de fluidos",
    "Conducción de fluidos",
    "AMN Consultora Informática"
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  category: "industry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const finalTitle = title ?? `${siteConfig.name} — ${siteConfig.shortDescription}`;
  const finalDesc = description ?? siteConfig.description;

  return {
    title: title ?? null,
    description: finalDesc,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      title: finalTitle,
      description: finalDesc,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
