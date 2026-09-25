"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Mot géant décoratif en arrière-plan. Il déborde volontairement du viewport
 * et glisse très légèrement à l'horizontale au scroll.
 */
export function BackgroundType({
  word,
  className,
  outline = false,
  drift = 80,
}: {
  word: string;
  className?: string;
  outline?: boolean;
  /** Amplitude du glissement horizontal en px (0 = fixe). */
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 select-none overflow-hidden", className)}
    >
      <motion.span
        style={prefersReduced ? undefined : { x }}
        className={cn(
          "block whitespace-nowrap text-center font-display uppercase leading-[0.8]",
          outline ? "text-outline" : "text-foreground/[0.035]"
        )}
      >
        {word}
      </motion.span>
    </div>
  );
}
