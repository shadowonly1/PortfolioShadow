import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE } from "@/lib/i18n";

/**
 * Le français est servi sans préfixe (« / », « /projects/x ») et l'anglais sous « /en ».
 * En interne, les pages vivent sous app/[lang] : on réécrit donc « /… » vers « /fr/… ».
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  // « /fr/… » n'est pas une adresse publique : on redirige vers la version sans préfixe.
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Un visiteur qui a choisi l'anglais le retrouve en revenant sur l'accueil.
  if (pathname === "/" && request.cookies.get(LANG_COOKIE)?.value === "en") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Tout sauf les fichiers statiques (avec extension), _next et _vercel.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
