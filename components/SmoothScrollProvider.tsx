"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Vrai si la page vient d'être rafraîchie (et non ouverte via un lien). */
function isReload() {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  // Un rafraîchissement ramène toujours en haut (sur le hero), sans toucher au
  // bouton Retour : la restauration du navigateur n'est coupée qu'au moment où la
  // page se décharge (rafraîchissement), puis réactivée au chargement suivant.
  useEffect(() => {
    let raf = 0;
    const settle = () => {
      raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        history.scrollRestoration = "auto";
      });
    };

    if (isReload()) {
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
      // Le navigateur peut encore repositionner la page jusqu'à la fin du chargement.
      if (document.readyState === "complete") settle();
      else window.addEventListener("load", settle, { once: true });
    } else {
      history.scrollRestoration = "auto";
    }

    const disableRestore = () => {
      history.scrollRestoration = "manual";
    };
    window.addEventListener("beforeunload", disableRestore);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", settle);
      window.removeEventListener("beforeunload", disableRestore);
    };
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
      autoRaf: true,
    });
    if (isReload()) lenis.scrollTo(0, { immediate: true });

    return () => lenis.destroy();
  }, [prefersReduced]);

  return <>{children}</>;
}
