"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type Tile =
  | { kind: "project"; slug: string; src: string; shape: "wide" | "tall" }
  | { kind: "design"; src: string; shape: "wide" | "tall" };

// Vrais visuels : sites, apps et créations graphiques, en alternant les formats.
const tiles: Tile[] = [
  { kind: "project", slug: "aprosi-site-institutionnel", src: "/images/aprosi-site-1.jpg", shape: "wide" },
  { kind: "project", slug: "orbitsx", src: "/images/orbits (2).jpeg", shape: "tall" },
  { kind: "project", slug: "scan-tickets", src: "/images/scanT (2).png", shape: "wide" },
  { kind: "design", src: "/images/logo/3f1cd391042f41bb0f95600a57bcd616.jpg", shape: "tall" },
  { kind: "project", slug: "nioro-du-rip", src: "/images/nioro-1.png", shape: "wide" },
  { kind: "project", slug: "orbitsx", src: "/images/orbits-app-2.jpg", shape: "tall" },
  { kind: "design", src: "/images/logo/d002469b093c36baae1db36c29de46fd.jpg", shape: "wide" },
  { kind: "design", src: "/images/logo/JUMMAH.jpg", shape: "tall" },
  { kind: "project", slug: "aprosi-materiaux", src: "/images/aprosi (3).png", shape: "wide" },
];

/** Bandeau d'images qui glisse latéralement au fil du scroll (pas d'animation en boucle). */
export function ImageBand({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { projects, designWorks } = getContent(lang);
  const t = getDictionary(lang).band;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-38%"]);

  const caption = (tile: Tile) =>
    tile.kind === "project"
      ? projects.find((p) => p.slug === tile.slug)?.name ?? ""
      : designWorks.find((w) => w.src === tile.src)?.alt ?? "";

  return (
    <section ref={ref} aria-label={t.label} className="relative overflow-hidden border-t py-16 sm:py-24">
      <div className="section-padding mx-auto mb-8 flex max-w-content items-center justify-between font-mono text-label uppercase text-muted">
        <span>{t.label}</span>
        <span aria-hidden className="text-accent">+</span>
      </div>

      <div className={cn(prefersReduced && "overflow-x-auto")}>
        <motion.ul
          className="flex w-max items-end gap-4 pl-4 sm:gap-6 sm:pl-8 lg:pl-12"
          style={prefersReduced ? undefined : { x }}
        >
          {tiles.map((tile, i) => {
            const label = caption(tile);
            return (
              <li key={`${tile.src}-${i}`} className="shrink-0">
                <figure>
                  <div
                    className={cn(
                      "relative overflow-hidden bg-surface",
                      tile.shape === "wide"
                        ? "h-48 w-[19rem] sm:h-72 sm:w-[29rem]"
                        : "h-48 w-36 sm:h-72 sm:w-56"
                    )}
                  >
                    <Image
                      src={tile.src}
                      alt={label}
                      fill
                      sizes={tile.shape === "wide" ? "464px" : "224px"}
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="label mt-3 max-w-[19rem] truncate">
                    <span className="text-foreground">{String(i + 1).padStart(2, "0")}</span> — {label}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
