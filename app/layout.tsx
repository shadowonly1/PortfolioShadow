import type { Metadata } from "next";
import { Bebas_Neue, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ConsoleEasterEgg } from "@/components/ConsoleEasterEgg";
import { CustomCursor } from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

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

const title = "Elimane Ba — Full-Stack Developer · Web, Mobile & Backend · Dakar";
const description =
  "Portfolio d'Elimane Ba, développeur full-stack Web, Mobile & Backend basé à Dakar, Sénégal. Flutter, Laravel, Next.js — de l'architecture à la mise en production, avec un œil de designer.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Elimane Ba",
  },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "Elimane Ba",
    "Full-Stack Developer",
    "développeur full-stack Dakar",
    "développeur web Dakar",
    "développeur mobile Sénégal",
    "développeur backend",
    "développeur Flutter Sénégal",
    "développeur Laravel",
    "développeur Next.js",
    "ShadowOnly",
  ],
  authors: [{ name: "Elimane Ba" }],
  creator: "Elimane Ba",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title,
    description,
    siteName: "Elimane Ba — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "ShadowOnly",
  jobTitle: "Full-Stack Developer — Web, Mobile & Backend",
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  sameAs: [profile.linkedin, profile.github, profile.behance, profile.instagram, profile.twitter],
  knowsAbout: ["Flutter", "Laravel", "Next.js", "React", "Node.js", "Design graphique"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ConsoleEasterEgg />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
