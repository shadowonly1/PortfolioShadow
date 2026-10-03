"use client";

import { useEffect, useRef } from "react";
import { motion, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE } from "./Reveal";

const VIDEO_SRC = "/images/hero.mp4";
// Même résolution, compression plus forte (1,3 Mo au lieu de 2,4 Mo) pour la 4G.
const VIDEO_MOBILE_SRC = "/images/hero-mobile.mp4";
// Première image de la vidéo elle-même : affichée tant que la lecture n'a pas démarré
// (Safari en économie d'énergie bloque la lecture automatique jusqu'au premier geste).
const POSTER_SRC = "/images/hero-frame.jpg";

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReduced) {
      video.pause();
      return;
    }

    // React n'écrit pas l'attribut `muted` dans le HTML serveur : on le force,
    // sinon Safari refuse la lecture automatique.
    video.muted = true;
    video.defaultMuted = true;

    let visible = true;
    const gestures = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    const retryOnGesture = () => {
      if (visible) tryPlay();
    };
    const removeGestures = () => gestures.forEach((g) => window.removeEventListener(g, retryOnGesture));
    const tryPlay = () =>
      video
        .play()
        .then(removeGestures)
        // Lecture bloquée (économie d'énergie, réglages du navigateur) : on réessaie
        // au premier geste de l'utilisateur, ce que tous les navigateurs autorisent.
        .catch(() => gestures.forEach((g) => window.addEventListener(g, retryOnGesture, { passive: true })));

    // Lecture seulement quand la vidéo est visible (économie CPU / batterie).
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      removeGestures();
    };
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
          preload="auto"
          poster={POSTER_SRC}
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src={VIDEO_MOBILE_SRC} type="video/mp4" media="(max-width: 767px)" />
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  );
}
