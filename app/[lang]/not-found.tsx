"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Lang } from "@/lib/i18n";

// not-found ne reçoit pas les paramètres de route : la langue se déduit de l'adresse.
export default function NotFound() {
  const pathname = usePathname() || "/";
  const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
  const t = getDictionary(lang).notFound;

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="relative flex min-h-[100svh] items-center overflow-hidden">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[48vw] leading-none text-outline"
        >
          404
        </p>
        <Container className="relative">
          <p className="label">{t.label}</p>
          <h1 className="display mt-6 text-display-lg">
            {t.title[0]}
            <br />
            {t.title[1]}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted">{t.text}</p>
          <Link
            href={localePath(lang, "/")}
            className="mt-10 inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-label uppercase text-background transition-colors duration-500 hover:bg-accent hover:text-accent-ink"
          >
            {t.back}
          </Link>
        </Container>
      </main>
    </>
  );
}
