// TODO(Elimane): remplace par ton vrai domaine une fois acheté/configuré sur Vercel
// (ou définis NEXT_PUBLIC_SITE_URL dans les variables d'environnement Vercel).
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
