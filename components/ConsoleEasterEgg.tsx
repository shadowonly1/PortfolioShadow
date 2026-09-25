"use client";

import { useEffect } from "react";
import { profile } from "@/lib/data";

export function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = [
      "color: #6875FF",
      "font-size: 14px",
      "font-family: monospace",
      "font-weight: bold",
    ].join(";");

    console.log(
      "%c</> ShadowOnly — THE DSGN GEEK",
      styles
    );
    console.log(
      `%cSalut, curieux du DevTools 👋\n${profile.name} — ${profile.role}\nSi tu regardes le code ici, tu regarderais peut-être aussi une opportunité ensemble ?\n→ ${profile.email}`,
      "color: #9A9CA6; font-family: monospace; font-size: 12px; line-height: 1.6"
    );
  }, []);

  return null;
}
