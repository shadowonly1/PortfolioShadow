// Contenu éditorial de la refonte (libellés, services, statement).
// Les descriptions reprennent les informations déjà présentes dans data.ts et chatbotFaq.ts.
import type { Project } from "./data";

/** Section « Ce que je construis » : chaque service est illustré par un vrai projet. */
export const services = [
  {
    title: "Applications web",
    description: "Plateformes métier, sites institutionnels et SaaS.",
    stack: ["Next.js", "React", "Laravel"],
    image: "/images/aprosi-site-1.jpg",
  },
  {
    title: "Applications mobiles",
    description: "Applications iOS & Android en Flutter, de la maquette aux stores.",
    stack: ["Flutter", "Dart", "Firebase"],
    image: "/images/orbits (4).jpeg",
  },
  {
    title: "Systèmes backend",
    description: "API, bases de données, authentification JWT/RBAC, cache Redis, déploiement VPS.",
    stack: ["Express.js", "PostgreSQL", "Redis"],
    image: "/images/aprosi (3).png",
  },
  {
    title: "Produits numériques",
    description: "Du cahier des charges à la mise en production, sans dépendre d'une équipe pour chaque étage.",
    stack: ["Architecture", "Conception produit"],
    image: "/images/scanT (2).png",
  },
  {
    title: "UI / UX & Branding",
    description: "Identité visuelle, logos, supports de communication — certifié Adobe.",
    stack: ["Photoshop", "Illustrator", "InDesign"],
    image: "/images/logo/DESIGN SHADOWONLY.jpg",
  },
];

/** Statement typographique (formule artistique, pas une donnée factuelle). */
export const statement = {
  first: ["Je n'écris pas", "que du code."],
  second: ["Je construis", "des produits."],
};

/** Catégorie courte affichée sur les cartes projet, dérivée du résumé existant. */
export const projectCategory: Record<string, string> = {
  orbitsx: "Plateforme VTC",
  "scan-tickets": "SaaS de tickets QR Code",
  "aprosi-materiaux": "Plateforme métier interne",
  "aprosi-site-institutionnel": "Site institutionnel",
  "nioro-du-rip": "Plateformes municipales",
  "sunurh-pro": "Solution RH",
  fanyris: "Cabinet d'expertise comptable",
  ergec: "Entreprise de génie civil",
  "helping-yourself": "Plateforme multi-services — concept",
};

/** Disciplines d'un projet, déduites de sa stack réelle. */
export function projectDisciplines(project: Project): string[] {
  const has = (...names: string[]) => project.stack.some((s) => names.includes(s));
  const out: string[] = [];
  if (has("Next.js", "React", "Vue.js", "Tailwind CSS", "Chart.js", "HTML", "Bootstrap")) out.push("Web");
  if (has("Flutter", "Dart")) out.push("Mobile");
  if (has("Laravel", "PHP", "Express.js", "PostgreSQL", "MySQL", "Prisma", "Redis", "REST API")) out.push("Backend");
  if (project.stack.includes("Architecture")) out.push("Architecture");
  // Stack non renseignée : un site présenté dans un cadre navigateur relève du web.
  if (out.length === 0 && project.deviceType === "browser") out.push("Web");
  return out;
}

export type ProjectCover = {
  /** portrait → colonne étroite (5/12), landscape → colonne large (7/12) */
  frame: "portrait" | "landscape";
  /** Mise en scène : captures d'app en téléphones, captures web en navigateur. */
  kind: "phones" | "browser" | "logo" | "type";
  images: string[];
};

/** Couvertures de la grille « Projets » : même scène pour tous, seuls les cadres changent. */
export const projectCovers: Record<string, ProjectCover> = {
  orbitsx: { frame: "portrait", kind: "phones", images: ["/images/orbits (4).jpeg", "/images/orbits (5).jpeg"] },
  "scan-tickets": { frame: "landscape", kind: "browser", images: ["/images/scanT (2).png"] },
  "aprosi-materiaux": { frame: "landscape", kind: "browser", images: ["/images/aprosi (1).png"] },
  "aprosi-site-institutionnel": { frame: "landscape", kind: "browser", images: ["/images/aprosi-site-1.jpg"] },
  "nioro-du-rip": { frame: "portrait", kind: "browser", images: ["/images/nioro-1.png"] },
  "sunurh-pro": { frame: "portrait", kind: "logo", images: ["/images/SunuRH.jpg"] },
  fanyris: { frame: "landscape", kind: "browser", images: ["/images/fanyris-1.jpg"] },
  ergec: { frame: "portrait", kind: "browser", images: ["/images/ergec-1.jpg"] },
  "helping-yourself": { frame: "landscape", kind: "type", images: [] },
};

/**
 * Technologies mises en avant dans la section Stack (affichées en grand).
 * Les autres compétences de data.ts restent listées, en plus petit.
 */
export const coreSkills = new Set([
  "JavaScript",
  "TypeScript",
  "PHP",
  "Dart",
  "Laravel",
  "Next.js",
  "React",
  "Flutter",
  "Express.js",
  "PostgreSQL",
  "MySQL",
  "Adobe Photoshop",
  "Adobe Illustrator",
]);
