"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { earlierExperiences, experiences } from "@/lib/data";
import SectionGlow from "./backgrounds/SectionGlow";
import { Container } from "./Container";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SectionNumberBg } from "./SectionNumberBg";

export function Experience() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experience" className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32">
      <SectionGlow color="rgba(79, 93, 255, 0.16)" position="left" />
      <SectionNumberBg number="03" />

      <Container>
        <ScrollReveal>
          <SectionHeading eyebrow="03 — Expérience" title="Parcours professionnel" />
        </ScrollReveal>

        <ol ref={trackRef} className="relative mt-14 flex flex-col gap-10 pl-8 sm:pl-10">
          <span
            aria-hidden
            className="absolute left-0 top-1.5 h-[calc(100%-0.375rem)] w-px bg-border sm:left-0"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute left-0 top-1.5 h-[calc(100%-0.375rem)] w-px origin-top bg-gradient-to-b from-accent-electric via-accent to-transparent sm:left-0"
          />

          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.company} as="li" delay={i * 0.1} className="relative">
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(8,9,13,1),0_0_16px_rgba(79,93,255,0.6)] sm:-left-[calc(2.5rem+5px)]"
              />
              <div className="glass-panel rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-electric/40 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wide text-accent-bright">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-muted">{exp.role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal as="li" delay={experiences.length * 0.1} className="relative">
            <span
              className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-border ring-4 ring-background sm:-left-[calc(2.5rem+5px)]"
              aria-hidden
            />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Expériences antérieures
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {earlierExperiences.map((e) => e.company).join(" · ")}
            </p>
          </ScrollReveal>
        </ol>
      </Container>
    </section>
  );
}
