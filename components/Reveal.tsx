"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-10% 0px" } as const;

/**
 * Titre révélé ligne par ligne : chaque ligne glisse depuis sous un masque.
 * Le texte complet reste lisible par les lecteurs d'écran.
 */
export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Anime au montage plutôt qu'à l'entrée dans le viewport (hero). */
  immediate?: boolean;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // L'observation se fait sur le conteneur : les lignes, décalées sous leur masque,
  // seraient sinon considérées comme invisibles par l'IntersectionObserver.
  const MotionTag = motionTags[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

/** Apparition douce (opacité + léger décalage). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  immediate = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
  as?: "div" | "li" | "p";
}) {
  const prefersReduced = useReducedMotion();
  const Tag = as === "li" ? motion.li : as === "p" ? motion.p : motion.div;

  if (prefersReduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT })}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Filet horizontal qui se dessine de gauche à droite. */
export function Hairline({
  className,
  delay = 0,
  immediate = false,
}: {
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) {
    return <span aria-hidden className={cn("block h-px w-full bg-line/10", className)} />;
  }
  return (
    <motion.span
      aria-hidden
      className={cn("block h-px w-full origin-left bg-line/10", className)}
      initial={{ scaleX: 0 }}
      {...(immediate ? { animate: { scaleX: 1 } } : { whileInView: { scaleX: 1 }, viewport: VIEWPORT })}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

/** Image révélée par un clip-path vertical. */
export function ClipReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Petite croix « + » décorative. */
export function Plus({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-block font-mono leading-none text-accent", className)}>
      +
    </span>
  );
}
