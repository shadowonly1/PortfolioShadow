"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import HeroVideoBackground from "./backgrounds/HeroVideoBackground";
import { Container } from "./Container";
import { KineticHeadline } from "./KineticHeadline";
import { TypingRole } from "./TypingRole";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end justify-center overflow-hidden pb-16 pt-32 sm:pb-24"
    >
      <HeroVideoBackground />

      <Container className="flex flex-col items-center text-center">
        <KineticHeadline
          lines={[
            {
              text: profile.name,
              className:
                "font-display text-6xl font-bold text-foreground sm:text-8xl lg:text-9xl",
            },
          ]}
        />
        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="text-glow mt-4 font-display text-3xl font-semibold text-foreground/90 sm:text-4xl lg:text-5xl"
        >
          Développeur <TypingRole />
        </motion.p>
      </Container>
    </section>
  );
}
