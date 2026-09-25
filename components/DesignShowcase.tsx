"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { designWorks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { EASE, Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

const INITIAL = 9;
// Les PNG détourés sont des logos : présentés sur fond, sans recadrage.
const isLogo = (src: string) => src.toLowerCase().endsWith(".png");

export function DesignShowcase() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const visible = expanded ? designWorks : designWorks.slice(0, INITIAL);

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % designWorks.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + designWorks.length) % designWorks.length));
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <section id="design" className="section">
      <Container>
        <SectionIntro
          index="07"
          label="Graphic design"
          title={["Pixel", "& Identity"]}
          aside={
            <>
              Logos, affiches et supports de communication — l&apos;autre moitié du métier, celle qui
              donne un visage aux produits que je construis.{" "}
              <a href={profile.behance} target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">
                Behance ↗
              </a>
            </>
          }
        />

        <ul className="mt-16 columns-2 gap-3 sm:mt-24 sm:gap-4 lg:columns-3 lg:gap-6">
          {visible.map((work, i) => (
            <Reveal as="li" key={work.src} delay={(i % 3) * 0.06} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-6">
              <button
                type="button"
                data-cursor="Open"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setActive(i);
                }}
                className="group relative block w-full overflow-hidden bg-surface text-left"
                aria-label={`Agrandir : ${work.alt}`}
              >
                <div className={cn("relative w-full", isLogo(work.src) ? "aspect-square" : "aspect-[4/5]")}>
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className={cn(
                      "transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]",
                      isLogo(work.src) ? "object-contain p-8 sm:p-12" : "object-cover"
                    )}
                  />
                </div>
                <span className="label absolute bottom-0 left-0 right-0 flex justify-between bg-gradient-to-t from-background/90 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="truncate text-foreground">{work.alt}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        {designWorks.length > INITIAL && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group flex items-center gap-3 border px-6 py-3.5 font-mono text-label uppercase text-foreground transition-colors duration-500 hover:border-foreground"
            >
              {expanded ? "Réduire" : `Voir les ${designWorks.length} créations`}
              <span aria-hidden className={cn("transition-transform duration-500", expanded && "rotate-45")}>
                +
              </span>
            </button>
          </div>
        )}
      </Container>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={designWorks[active].alt}
            className="fixed inset-0 z-[90] flex flex-col bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={close}
          >
            <div className="section-padding flex h-[var(--header-h)] items-center justify-between font-mono text-label uppercase">
              <span className="text-muted">
                {String(active + 1).padStart(2, "0")} / {String(designWorks.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={close} autoFocus className="text-foreground">
                Fermer ✕
              </button>
            </div>
            <div className="relative mx-4 mb-4 flex-1 sm:mx-12" onClick={(e) => e.stopPropagation()}>
              <Image
                key={designWorks[active].src}
                src={designWorks[active].src}
                alt={designWorks[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div
              className="section-padding flex items-center justify-between pb-6 font-mono text-label uppercase"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive((active - 1 + designWorks.length) % designWorks.length)}
                className="text-muted transition-colors hover:text-foreground"
              >
                ← Préc.
              </button>
              <span className="hidden text-foreground sm:inline">{designWorks[active].alt}</span>
              <button
                type="button"
                onClick={() => setActive((active + 1) % designWorks.length)}
                className="text-muted transition-colors hover:text-foreground"
              >
                Suiv. →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
