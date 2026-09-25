"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroVideo } from "./HeroVideo";
import { EASE, Hairline, Plus, Reveal } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const bgX = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Présentation"
      className="noise relative isolate overflow-hidden pt-[var(--header-h)] lg:flex lg:min-h-[100svh] lg:flex-col"
    >
      {/* Typographie géante d'arrière-plan */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] -z-20 select-none whitespace-nowrap text-center font-display text-[34vw] uppercase leading-[0.8] text-foreground/[0.045] lg:top-1/2 lg:-translate-y-1/2 lg:text-[26vw]"
        style={prefersReduced ? undefined : { x: bgX }}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: EASE }}
      >
        {profile.name}
      </motion.div>

      {/* Vidéo : bloc en haut sur mobile, colonne centrale pleine hauteur sur desktop */}
      <div className="relative -z-10 mx-auto h-[62svh] w-full max-w-md sm:h-[70svh] lg:absolute lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-[min(36vw,560px)] lg:max-w-none lg:-translate-x-[42%]">
        <HeroVideo y={videoY} scale={videoScale} opacity={videoOpacity} />
      </div>

      <div className="section-padding relative mx-auto -mt-[22svh] grid w-full max-w-content flex-1 grid-cols-1 gap-10 sm:-mt-[18svh] lg:mt-0 lg:grid-cols-12 lg:gap-6 lg:pb-8 lg:pt-10">
        {/* Colonne gauche : identité */}
        <div className="flex flex-col justify-end lg:col-span-5 lg:pb-6">
          <h1 className="sr-only">
            {profile.name} — Full-Stack Developer, Web, Mobile &amp; Backend
          </h1>
          <Reveal immediate delay={0.6} as="p" className="flex flex-col gap-2">
            <span className="font-serif text-4xl italic text-foreground sm:text-5xl">Full-Stack Developer</span>
            <span className="font-mono text-label uppercase text-muted">Web · Mobile · Backend</span>
          </Reveal>
        </div>
      </div>

      {/* Barre basse */}
      <div className="section-padding relative mx-auto mt-14 w-full max-w-content pb-6 lg:mt-0">
        <Hairline immediate delay={1} />
        <Reveal immediate delay={1.3} y={8} className="flex flex-wrap items-center justify-between gap-3 pt-4 font-mono text-label uppercase text-muted">
          <span>
            <span className="text-foreground">{profile.location}</span>
            <span className="hidden sm:inline"> — 14.69° N / 17.44° W</span>
          </span>
          <span className="hidden md:inline">Scroll to explore ↓</span>
          <span className="flex items-center gap-2">
            Available for selected projects <Plus />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
