// Priorité : NEXT_PUBLIC_SITE_URL → domaine officiel en production Vercel →
// URL du déploiement courant (previews) → localhost.
const PRODUCTION_URL = "https://www.elimaneba.dev";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production"
    ? PRODUCTION_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
