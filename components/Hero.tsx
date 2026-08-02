"use client";

import { useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Sparkles,
  Star,
  Twitter,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import HeroBackground from "./backgrounds/HeroBackground";
import { Container } from "./Container";
import { BehanceIcon } from "./icons/BehanceIcon";
import { KineticHeadline } from "./KineticHeadline";
import { HeroStatsCard } from "./HeroStatsCard";
import { HeroTechMarquee } from "./HeroTechMarquee";
import { MagneticButton } from "./MagneticButton";
import { TypingRole } from "./TypingRole";

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const glowX = useTransform(springRotateY, [-8, 8], [-40, 40]);
  const glowY = useTransform(springRotateX, [-8, 8], [40, -40]);

  const handleFrameMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  };

  const handleFrameLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pt-40 lg:pt-16"
    >
      <HeroBackground />

      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="order-1 lg:order-1">
          <motion.div
            initial={prefersReducedMotion ? undefined : item.hidden}
            animate={prefersReducedMotion ? undefined : item.show}
            className="glass-panel inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-electric"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-electric opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-electric" />
            </span>
            Software Engineer · Next Gen
            <Star size={12} className="fill-yellow-400 text-yellow-400" aria-hidden />
          </motion.div>

          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute -left-10 -top-10 -z-10 h-64 w-64 rounded-full bg-accent-electric/40 blur-[60px]"
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.2 }}
              animate={prefersReducedMotion ? undefined : { opacity: [0, 0.9, 0], scale: [0.2, 1.6, 2] }}
              transition={prefersReducedMotion ? undefined : { duration: 1.1, ease: "easeOut", delay: 0.3 }}
            />
            <motion.div
              aria-hidden
              className="absolute left-0 top-1/2 -z-10 h-40 w-40 -translate-y-1/2 rounded-full border-2 border-accent-electric/60"
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.3 }}
              animate={prefersReducedMotion ? undefined : { opacity: [0, 0.8, 0], scale: [0.3, 3.2] }}
              transition={prefersReducedMotion ? undefined : { duration: 0.9, ease: "easeOut", delay: 0.35 }}
            />
            <KineticHeadline
              className="mt-5 leading-[1.05] tracking-tight"
              lines={[
                {
                  text: profile.name,
                  className: "font-display text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl",
                },
              ]}
            />
            <p className="text-glow mt-2 font-display text-2xl font-semibold text-foreground/90 sm:text-3xl lg:text-4xl">
              Développeur{" "}
              <TypingRole />
            </p>
          </div>

          <motion.p
            initial={prefersReducedMotion ? undefined : item.hidden}
            animate={prefersReducedMotion ? undefined : item.show}
            transition={{ ...item.show.transition, delay: 0.9 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80"
          >
            {profile.tagline} {profile.subTagline}
          </motion.p>

          <motion.div
            variants={prefersReducedMotion ? undefined : item}
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "show"}
            transition={{ delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(79,93,255,0.55)] transition-colors hover:bg-accent-bright hover:shadow-[0_0_45px_rgba(94,234,255,0.6)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Voir les projets</span>
              <ArrowRight
                size={16}
                className="relative transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-electric hover:text-accent-electric"
            >
              <Mail size={16} aria-hidden />
              Me contacter
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={prefersReducedMotion ? undefined : item}
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "show"}
            transition={{ delay: 1.2 }}
            className="mt-14 flex flex-col gap-4"
          >
            <HeroStatsCard />
            <HeroTechMarquee />
          </motion.div>

          <motion.div
            variants={prefersReducedMotion ? undefined : item}
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "show"}
            transition={{ delay: 1.3 }}
            className="mt-6 flex items-center gap-3"
          >
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
              >
                <Github size={15} aria-hidden />
              </a>
            )}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
            >
              <Linkedin size={15} aria-hidden />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
            >
              <Mail size={15} aria-hidden />
            </a>
            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
              >
                <Twitter size={15} aria-hidden />
              </a>
            )}
            {profile.instagram && (
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
              >
                <Instagram size={15} aria-hidden />
              </a>
            )}
            {profile.behance && (
              <a
                href={profile.behance}
                target="_blank"
                rel="noreferrer"
                aria-label="Behance"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-electric/50 hover:text-accent-electric"
              >
                <BehanceIcon size={15} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }
          }
          className="order-2 relative mx-auto w-full max-w-md lg:order-2 lg:max-w-lg"
          style={{ perspective: 1200 }}
        >
          {/* Deep, layered backdrop — two soft-focus color pools instead of one flat blob */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[100px] sm:h-[500px] sm:w-[500px]"
            style={prefersReducedMotion ? undefined : { x: glowX, y: glowY }}
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-10 -right-6 -z-10 h-64 w-64 rounded-full bg-accent-electric/25 blur-[90px]"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Corner brackets — an editorial "focus frame" instead of a spinning border */}
          {[
            "-left-2.5 -top-2.5 border-l-2 border-t-2 rounded-tl-xl",
            "-right-2.5 -top-2.5 border-r-2 border-t-2 rounded-tr-xl",
            "-left-2.5 -bottom-2.5 border-l-2 border-b-2 rounded-bl-xl",
            "-right-2.5 -bottom-2.5 border-r-2 border-b-2 rounded-br-xl",
          ].map((cls) => (
            <span
              key={cls}
              aria-hidden
              className={`absolute z-10 h-8 w-8 border-accent-electric/60 ${cls}`}
            />
          ))}

          <div aria-hidden className="absolute -right-2 -top-6 hidden grid-cols-4 gap-1.5 sm:grid">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-accent-electric/40" />
            ))}
          </div>

          <motion.div
            ref={frameRef}
            onMouseMove={handleFrameMove}
            onMouseLeave={handleFrameLeave}
            style={{
              rotateX: prefersReducedMotion ? 0 : springRotateX,
              rotateY: prefersReducedMotion ? 0 : springRotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/5"
          >
            <Image
              src="/images/Profil.png"
              alt={`Portrait de ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 576px, 90vw"
              className="object-cover"
              priority
            />
            {/* Screen-blend the accent colors onto the photo — pure black areas of the
                portrait pick up this color exactly, blending into the Hero's blue glow
                instead of sitting as a flat black rectangle. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(79,93,255,0.85), transparent 65%), radial-gradient(ellipse 70% 50% at 100% 0%, rgba(94,234,255,0.5), transparent 60%)",
                mixBlendMode: "screen",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

            <motion.div
              aria-hidden
              className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-accent-electric/20 via-accent-electric/5 to-transparent blur-md will-change-transform"
              animate={prefersReducedMotion ? undefined : { y: [-100, 700] }}
              transition={prefersReducedMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "linear", repeatDelay: 1.6 }}
            />

            <motion.div
              variants={prefersReducedMotion ? undefined : item}
              initial={prefersReducedMotion ? undefined : "hidden"}
              animate={prefersReducedMotion ? undefined : "show"}
              transition={{ delay: 1.4 }}
              className="glass-panel absolute bottom-4 left-4 right-4 flex items-center gap-2.5 rounded-xl px-4 py-3"
            >
              <Sparkles size={16} className="shrink-0 text-accent-bright" aria-hidden />
              <p className="text-xs leading-snug text-foreground/90">
                Idée → Code → Produit — en temps réel.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      <motion.a
        href="#about"
        aria-label="Défiler vers la section suivante"
        className="absolute inset-x-0 bottom-0 mx-auto hidden w-fit flex-col items-center gap-2 text-muted sm:flex"
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="relative h-8 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-accent-electric to-transparent will-change-transform"
            animate={prefersReducedMotion ? undefined : { y: [0, 20] }}
            transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ChevronDown size={14} aria-hidden className="opacity-60" />
      </motion.a>
    </section>
  );
}
