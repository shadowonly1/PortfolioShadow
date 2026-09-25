"use client";

import { useEffect, useRef } from "react";
import { motion, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE } from "./Reveal";

const VIDEO_SRC = "/images/hero.mp4";
const POSTER_SRC = "/images/hero-poster.jpg";

/**
 * Vidéo portrait du hero, fondue dans le fond par un masque radial :
 * elle fait partie de la composition, pas d'une carte posée dessus.
 */
export function HeroVideo({
  y,
  scale,
  opacity,
}: {
  y?: MotionValue<number>;
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lecture seulement quand la vidéo est visible (économie CPU / batterie).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReduced) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <motion.div
      aria-hidden
      className="relative h-full w-full"
      style={prefersReduced ? undefined : { y, scale, opacity }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={prefersReduced ? false : { opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
        style={{
          maskImage: "radial-gradient(closest-side at 50% 46%, #000 62%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side at 50% 46%, #000 62%, transparent 100%)",
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-[50%_30%]"
          autoPlay={!prefersReduced}
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  );
}
