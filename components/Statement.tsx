"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Container } from "./Container";
import { Plus } from "./Reveal";

/**
 * Statement typographique : chaque mot s'allume au fil du scroll,
 * pour que la phrase se lise au rythme de la lecture.
 */
export function Statement({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).statement;
  const { statement } = getContent(lang);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 75%"] });

  const lines = [...statement.first, ...statement.second];
  const total = lines.reduce((n, l) => n + l.split(" ").length, 0);
  const full = `${statement.first.join(" ")} ${statement.second.join(" ")}`;

  return (
    <section aria-label={t.label} className="section overflow-hidden">
      <Container>
        <div className="flex items-center justify-between font-mono text-label uppercase text-muted">
          <span>{t.label}</span>
          <Plus />
        </div>
        <div ref={ref} className="mt-12 sm:mt-16">
          <p className="sr-only">{full}</p>
          <p aria-hidden className="display text-[clamp(3.25rem,10.5vw,11rem)] leading-[0.86]">
            {lines.map((line, li) => (
              <span key={li} className={li === statement.first.length ? "mt-[0.35em] block" : "block"}>
                {line.split(" ").map((word, wi) => {
                  const index = wordOffset(lines, li) + wi;
                  return (
                    <Word
                      key={wi}
                      word={word}
                      progress={scrollYProgress}
                      range={[index / total, (index + 1) / total]}
                      accent={li >= statement.first.length}
                      still={prefersReduced}
                    />
                  );
                })}
              </span>
            ))}
          </p>
        </div>
        <p className="mt-12 font-mono text-label uppercase text-muted">— Elimane Ba, Dakar</p>
      </Container>
    </section>
  );
}

function wordOffset(lines: string[], li: number) {
  return lines.slice(0, li).reduce((n, l) => n + l.split(" ").length, 0);
}

function Word({
  word,
  progress,
  range,
  accent,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.35, 1]);
  return (
    <motion.span
      style={still ? undefined : { opacity }}
      className={`mr-[0.22em] inline-block ${accent ? "text-accent-soft" : "text-foreground"}`}
    >
      {word}
    </motion.span>
  );
}
