"use client";

import { usePathname } from "next/navigation";
import { LANG_COOKIE, switchLangPath, type Lang } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { cn } from "@/lib/utils";

/** Sélecteur FR / EN : mène à la même page dans l'autre langue et mémorise le choix. */
export function LangSwitch({ lang, className }: { lang: Lang; className?: string }) {
  const pathname = usePathname() || "/";
  const other: Lang = lang === "fr" ? "en" : "fr";

  const remember = () => {
    document.cookie = `${LANG_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <a
      href={switchLangPath(pathname, other)}
      hrefLang={other}
      lang={other}
      onClick={remember}
      aria-label={getDictionary(lang).header.switchTo}
      title={getDictionary(lang).header.switchTo}
      className={cn(
        "relative z-[70] flex h-9 items-center gap-1 rounded-full border border-line/15 px-3 font-mono text-label uppercase transition-colors duration-500 hover:border-line/40",
        className
      )}
    >
      <span className={lang === "fr" ? "text-foreground" : "text-muted"}>FR</span>
      <span aria-hidden className="text-muted">/</span>
      <span className={lang === "en" ? "text-foreground" : "text-muted"}>EN</span>
    </a>
  );
}
