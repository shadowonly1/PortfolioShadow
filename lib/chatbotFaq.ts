import {
  about,
  certifications,
  earlierExperiences,
  experiences,
  profile,
  projects,
  skillGroups,
} from "./data";

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faq: FaqEntry[] = [
  {
    id: "who",
    question: "Qui es-tu ?",
    answer: `${profile.tagline} ${profile.subTagline}\n\n${about.paragraphs.join("\n\n")}`,
  },
  {
    id: "services",
    question: "Quels sont tes services ?",
    answer:
      "Je couvre toute la chaîne produit :\n" +
      "• Développement web (Next.js, Laravel, API REST)\n" +
      "• Développement mobile (Flutter, iOS/Android)\n" +
      "• Backend & infrastructure (bases de données, sécurité, déploiement VPS)\n" +
      "• Design graphique & identité visuelle (Adobe Suite, Canva, branding)\n\n" +
      "Le plus : je peux prendre un projet du cahier des charges jusqu'à la mise en production, sans dépendre d'une équipe pour chaque étage.",
  },
  {
    id: "path",
    question: "Quel est ton parcours ?",
    answer:
      experiences
        .map((e) => `• ${e.role} — ${e.company} (${e.period})`)
        .join("\n") +
      `\n\nExpériences antérieures : ${earlierExperiences.map((e) => e.company).join(", ")}.`,
  },
  {
    id: "projects",
    question: "Quels projets as-tu réalisés ?",
    answer: projects.map((p) => `• ${p.name} — ${p.summary}`).join("\n"),
  },
  {
    id: "skills",
    question: "Quelles technologies maîtrises-tu ?",
    answer: skillGroups.map((g) => `${g.title} : ${g.items.join(", ")}`).join("\n"),
  },
  {
    id: "certifications",
    question: "As-tu des certifications ?",
    answer: certifications.map((c) => `${c.name} — ${c.issuer} (${c.date})`).join("\n"),
  },
  {
    id: "availability",
    question: "Es-tu disponible pour une mission ?",
    answer:
      "Oui, je suis actuellement disponible pour de nouvelles missions — à distance ou sur site à Dakar. Le plus simple est de me laisser un message via le formulaire de contact ou par email, je réponds rapidement.",
  },
  {
    id: "contact",
    question: "Comment te contacter ?",
    answer: `Par email : ${profile.email}\nPar téléphone : ${profile.phone}\nLinkedIn : ${profile.linkedin}\n\nOu directement via le formulaire de contact en bas de page.`,
  },
];

export function findFaqAnswer(input: string): FaqEntry | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  const exact = faq.find((f) => f.question.toLowerCase() === normalized);
  if (exact) return exact;

  const keywordMap: Record<string, string[]> = {
    who: ["qui es-tu", "qui est elimane", "présente", "présentation", "toi"],
    services: ["service", "que fais-tu", "propose", "offre"],
    path: ["parcours", "expérience", "carrière", "cv"],
    projects: ["projet", "réalisation", "portfolio", "travaux"],
    skills: ["techno", "compétence", "stack", "langage", "outils"],
    certifications: ["certification", "diplôme", "formation"],
    availability: ["disponible", "disponibilité", "libre", "mission"],
    contact: ["contact", "email", "téléphone", "joindre", "appeler"],
  };

  for (const entry of faq) {
    const keywords = keywordMap[entry.id] ?? [];
    if (keywords.some((k) => normalized.includes(k))) return entry;
  }

  return null;
}
