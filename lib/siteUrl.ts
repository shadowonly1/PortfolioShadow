// Priorité : NEXT_PUBLIC_SITE_URL (ton domaine, à définir sur Vercel) → domaine de
// production Vercel → URL du déploiement courant → localhost.
// VERCEL_URL seul change à chaque déploiement : ne jamais s'en servir comme canonique.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
