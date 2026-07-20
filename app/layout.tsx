import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import { ConsoleEasterEgg } from "@/components/ConsoleEasterEgg";
import { CustomCursor } from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "variable",
  style: ["italic", "normal"],
  axes: ["opsz", "SOFT", "WONK"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const title = "Elimane Ba — Développeur Web, Mobile & Backend";
const description =
  "Portfolio d'Elimane Ba, développeur Web, Mobile & Backend basé à Dakar. Flutter, Laravel, Next.js — de l'architecture à la mise en production, avec un œil de designer.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Elimane Ba",
  },
  description,
  keywords: [
    "Elimane Ba",
    "développeur web Dakar",
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
        <ConsoleEasterEgg />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
