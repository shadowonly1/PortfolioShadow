// Contenu éditorial de la refonte (libellés, services, statement).
// Les descriptions reprennent les informations déjà présentes dans data.ts et chatbotFaq.ts.
import type { Project } from "./data";

/** Section « What I build ». */
export const services = [
  {
    title: "Web Applications",
    description: "Plateformes métier, sites institutionnels et SaaS — Next.js, React, Laravel, API REST.",
    stack: ["Next.js", "React", "Laravel"],
  },
  {
    title: "Mobile Applications",
    description: "Applications iOS & Android en Flutter, de la maquette à la publication sur les stores.",
    stack: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Backend Systems",
    description: "API, bases de données, authentification JWT/RBAC, cache Redis et déploiement VPS.",
    stack: ["Express.js", "PostgreSQL", "Redis"],
  },
  {
    title: "Digital Products",
    description: "Du cahier des charges à la mise en production, sans dépendre d'une équipe pour chaque étage.",
    stack: ["Architecture", "Conception produit"],
  },
  {
    title: "UI / UX & Branding",
    description: "Identité visuelle, logos, supports de communication — certifié Adobe en design graphique.",
    stack: ["Photoshop", "Illustrator", "InDesign"],
  },
];

/** Liste « What I do » de la section About. */
export const whatIDo = ["Web", "Mobile", "Backend", "UI / UX", "Digital Products"];

/** Statement typographique (formule artistique, pas une donnée factuelle). */
export const statement = {
  first: ["I don't just", "write code."],
  second: ["I build", "digital products."],
};

/** Catégorie courte affichée sur les cartes projet, dérivée du résumé existant. */
export const projectCategory: Record<string, string> = {
  orbitsx: "Plateforme VTC",
  "scan-tickets": "SaaS de tickets QR Code",
  "aprosi-materiaux": "Plateforme métier interne",
  "nioro-du-rip": "Plateformes municipales",
  "sunurh-pro": "Solution RH",
  "helping-yourself": "Plateforme multi-services — concept",
};

/** Disciplines d'un projet, déduites de sa stack réelle. */
export function projectDisciplines(project: Project): string[] {
  const has = (...names: string[]) => project.stack.some((s) => names.includes(s));
  const out: string[] = [];
  if (has("Next.js", "React", "Vue.js", "Tailwind CSS", "Chart.js")) out.push("Web");
  if (has("Flutter", "Dart")) out.push("Mobile");
  if (has("Laravel", "PHP", "Express.js", "PostgreSQL", "MySQL", "Prisma", "Redis", "REST API")) out.push("Backend");
  if (project.stack.includes("Architecture")) out.push("Architecture");
  return out;
}

export type ProjectCover = {
  src: string | null;
  /** portrait → colonne étroite (5/12), landscape → colonne large (7/12) */
  frame: "portrait" | "landscape";
  fit: "cover" | "contain";
  position?: string;
};

/** Visuel de couverture de chaque projet dans la grille « Selected work ». */
export const projectCovers: Record<string, ProjectCover> = {
  orbitsx: { src: "/images/orbits (2).jpeg", frame: "portrait", fit: "cover", position: "50% 20%" },
  "scan-tickets": { src: "/images/scanT (2).png", frame: "landscape", fit: "cover", position: "50% 0%" },
  "aprosi-materiaux": { src: "/images/aprosi (1).png", frame: "landscape", fit: "cover", position: "0% 0%" },
  "nioro-du-rip": { src: "/images/nioro-2.png", frame: "portrait", fit: "contain" },
  "sunurh-pro": { src: "/images/SunuRH.jpg", frame: "portrait", fit: "contain" },
  "helping-yourself": { src: null, frame: "landscape", fit: "cover" },
};
