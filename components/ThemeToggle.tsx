"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

/** Bascule mode sombre / clair. Le choix est mémorisé (localStorage). */
export function ThemeToggle({ lang, className }: { lang: Lang; className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Stockage indisponible (navigation privée) : le thème vaut pour la session.
    }
  };

  const t = getDictionary(lang).theme;
  const label = theme === "dark" ? t.toLight : t.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative z-[70] flex h-9 w-9 items-center justify-center rounded-full border border-line/15 text-foreground transition-colors duration-500 hover:border-line/40",
        className
      )}
    >
      {theme === "dark" ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
    </button>
  );
}
