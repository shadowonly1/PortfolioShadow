"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { HeroVideo } from "./HeroVideo";
import { Hairline, Plus, Reveal } from "./Reveal";

export function Hero({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).hero;
  const { profile } = getContent(lang);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label={t.aria}
      // Toujours sombre, même en mode clair : la vidéo est tournée sur fond noir.
      data-theme="dark"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background pt-[var(--header-h)] text-foreground"
    >
      {/* Vidéo : bloc en haut sur mobile, colonne centrale pleine hauteur sur desktop */}
      <div className="relative -z-10 mx-auto min-h-[50svh] w-full max-w-md flex-1 lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-[min(42vw,680px)] lg:max-w-none lg:flex-none lg:-translate-x-[42%]">
        <HeroVideo y={videoY} scale={videoScale} opacity={videoOpacity} />
      </div>

      <div className="section-padding relative mx-auto -mt-[22svh] grid w-full max-w-content grid-cols-1 lg:flex-1 gap-10 sm:-mt-[18svh] lg:mt-0 lg:grid-cols-12 lg:gap-6 lg:pb-8 lg:pt-10">
        {/* Colonne gauche : identité */}
        <div className="flex flex-col justify-end lg:col-span-5 lg:pb-6">
          <Reveal immediate delay={0.4} as="div">
            <h1 className="display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.86]">
              {profile.name}
              <span className="sr-only"> — {t.h1}</span>
            </h1>
            <p className="mt-4 max-w-md text-lg leading-snug text-foreground/85 sm:text-xl">{t.pitch}</p>
            <a
              href="#work"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-mono text-label uppercase text-accent-ink transition-transform duration-500 ease-editorial hover:-translate-y-0.5"
            >
              {t.cta}
              <span aria-hidden className="transition-transform duration-500 ease-editorial group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Barre basse */}
      <div className="section-padding relative mx-auto mt-14 w-full max-w-content pb-14 sm:pb-16 lg:mt-0">
        <Hairline immediate delay={1} />
        <Reveal immediate delay={1.3} y={8} className="flex flex-wrap items-center justify-between gap-3 pt-4 font-mono text-label uppercase text-muted">
          <span>
            <span className="text-foreground">{profile.location}</span>
            <span className="hidden sm:inline"> — 14.69° N / 17.44° W</span>
          </span>
          <span className="flex items-center gap-2">
            {t.available} <Plus />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
