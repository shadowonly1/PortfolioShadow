import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Bebas_Neue, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ConsoleEasterEgg } from "@/components/ConsoleEasterEgg";
import { CustomCursor } from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { profile } from "@/lib/data";
import { getDictionary } from "@/lib/dictionary";
import { isLang, locales, localePath, type Lang } from "@/lib/i18n";
import { siteUrl } from "@/lib/siteUrl";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

// Seules les langues connues existent ; toute autre valeur donne une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLang(params.lang) ? params.lang : "fr";
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: "%s — Elimane Ba" },
    description: t.description,
    alternates: {
      canonical: localePath(lang, "/"),
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    keywords: [
      "Elimane Ba",
      "Full-Stack Developer",
      "développeur full-stack Dakar",
      "développeur web Dakar",
      "développeur mobile Sénégal",
      "Flutter developer Senegal",
      "Laravel developer",
      "Next.js developer",
      "web developer Dakar",
      "ShadowOnly",
    ],
    authors: [{ name: "Elimane Ba" }],
    creator: "Elimane Ba",
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      url: localePath(lang, "/"),
      title: t.title,
      description: t.description,
      siteName: t.siteName,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/og.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
    robots: { index: true, follow: true },
  };
}

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: "ShadowOnly",
    jobTitle: "Full-Stack Developer — Web, Mobile & Backend",
    url: siteUrl + localePath(lang, "/").replace(/^\/$/, ""),
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    sameAs: [profile.linkedin, profile.github, profile.behance, profile.instagram, profile.twitter],
    knowsAbout: ["Flutter", "Laravel", "Next.js", "React", "Node.js", lang === "en" ? "Graphic design" : "Design graphique"],
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang;

  return (
    <html
      lang={lang}
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        {/* Applique le thème mémorisé avant l'affichage (évite un flash de couleur). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }}
        />
        <ConsoleEasterEgg />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
