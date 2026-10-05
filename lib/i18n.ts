export const locales = ["fr", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "fr";

/** Nom du cookie qui mémorise le choix de langue du visiteur (lu par le middleware). */
export const LANG_COOKIE = "lang";

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

/**
 * Chemin public d'une page dans une langue : le français est servi à la racine
 * (« / », « /projects/x »), l'anglais sous « /en ».
 *   localePath("en", "/")            → "/en"
 *   localePath("en", "/#work")       → "/en#work"
 *   localePath("en", "/projects/x")  → "/en/projects/x"
 */
export function localePath(lang: Lang, path = "/"): string {
  if (lang === defaultLang) return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/**
 * Même page dans l'autre langue. Le chemin reçu peut être l'adresse publique
 * (« /en/projects/x ») ou le chemin interne réécrit par le middleware
 * (« /fr/projects/x ») : on retire le préfixe de langue dans les deux cas.
 */
export function switchLangPath(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/(?:en|fr)(?=\/|$)/, "") || "/";
  return localePath(to, bare);
}
