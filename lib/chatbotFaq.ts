import { getContent } from "./content";
import type { Lang } from "./i18n";

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

const keywordMap: Record<Lang, Record<string, string[]>> = {
  fr: {
    who: ["qui es-tu", "qui est elimane", "présente", "présentation", "toi"],
    services: ["service", "que fais-tu", "propose", "offre"],
    path: ["parcours", "expérience", "carrière", "cv"],
    projects: ["projet", "réalisation", "portfolio", "travaux"],
    skills: ["techno", "compétence", "stack", "langage", "outils"],
    certifications: ["certification", "diplôme", "formation"],
    availability: ["disponible", "disponibilité", "libre", "mission"],
    contact: ["contact", "email", "téléphone", "joindre", "appeler"],
  },
  en: {
    who: ["who are you", "who is elimane", "introduce", "about you", "yourself"],
    services: ["service", "what do you do", "offer", "hire"],
    path: ["background", "experience", "career", "resume", "cv"],
    projects: ["project", "work", "portfolio", "built"],
    skills: ["tech", "skill", "stack", "language", "tools"],
    certifications: ["certification", "degree", "education"],
    availability: ["available", "availability", "free", "freelance", "mission"],
    contact: ["contact", "email", "phone", "reach", "call"],
  },
};

export function buildFaq(lang: Lang): FaqEntry[] {
  const c = getContent(lang);
  const delivered = c.stats.deliveredProjects;

  if (lang === "en") {
    return [
      {
        id: "who",
        question: "Who are you?",
        answer: `${c.profile.tagline} ${c.profile.subTagline}\n\n${c.about.paragraphs.join("\n\n")}`,
      },
      {
        id: "services",
        question: "What services do you offer?",
        answer:
          "I cover the whole product chain:\n" +
          "• Web development (Next.js, Laravel, REST APIs)\n" +
          "• Mobile development (Flutter, iOS/Android)\n" +
          "• Backend & infrastructure (databases, security, VPS deployment)\n" +
          "• Graphic design & visual identity (Adobe Suite, Canva, branding)\n\n" +
          "The bonus: I can take a project from specification to production without needing a team for every layer.",
      },
      {
        id: "path",
        question: "What's your background?",
        answer:
          c.experiences.map((e) => `• ${e.role} — ${e.company} (${e.period})`).join("\n") +
          `\n\nEarlier experience: ${c.earlierExperiences
            .map((e) => (e.period ? `${e.company} (${e.period})` : e.company))
            .join(", ")}.`,
      },
      {
        id: "projects",
        question: "Which projects have you built?",
        answer:
          `${delivered} projects delivered. A few of them:\n` +
          c.projects.map((p) => `• ${p.name} — ${p.summary}`).join("\n"),
      },
      {
        id: "skills",
        question: "Which technologies do you master?",
        answer: c.skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`).join("\n"),
      },
      {
        id: "certifications",
        question: "Do you have certifications?",
        answer: c.certifications.map((x) => `${x.name} — ${x.issuer} (${x.date})`).join("\n"),
      },
      {
        id: "availability",
        question: "Are you available for a project?",
        answer:
          "Yes, I'm currently available for new projects — remotely or on site in Dakar. The easiest way is to leave me a message through the contact form or by email; I reply quickly.",
      },
      {
        id: "contact",
        question: "How can I contact you?",
        answer: `Email: ${c.profile.email}\nPhone: ${c.profile.phone}\nLinkedIn: ${c.profile.linkedin}\n\nOr directly through the contact form at the bottom of the page.`,
      },
    ];
  }

  return [
    {
      id: "who",
      question: "Qui es-tu ?",
      answer: `${c.profile.tagline} ${c.profile.subTagline}\n\n${c.about.paragraphs.join("\n\n")}`,
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
        c.experiences.map((e) => `• ${e.role} — ${e.company} (${e.period})`).join("\n") +
        `\n\nExpériences antérieures : ${c.earlierExperiences
          .map((e) => (e.period ? `${e.company} (${e.period})` : e.company))
          .join(", ")}.`,
    },
    {
      id: "projects",
      question: "Quels projets as-tu réalisés ?",
      answer:
        `${delivered} projets livrés. En voici quelques-uns :\n` +
        c.projects.map((p) => `• ${p.name} — ${p.summary}`).join("\n"),
    },
    {
      id: "skills",
      question: "Quelles technologies maîtrises-tu ?",
      answer: c.skillGroups.map((g) => `${g.title} : ${g.items.join(", ")}`).join("\n"),
    },
    {
      id: "certifications",
      question: "As-tu des certifications ?",
      answer: c.certifications.map((x) => `${x.name} — ${x.issuer} (${x.date})`).join("\n"),
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
      answer: `Par email : ${c.profile.email}\nPar téléphone : ${c.profile.phone}\nLinkedIn : ${c.profile.linkedin}\n\nOu directement via le formulaire de contact en bas de page.`,
    },
  ];
}

export function findFaqAnswer(faq: FaqEntry[], lang: Lang, input: string): FaqEntry | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  const exact = faq.find((f) => f.question.toLowerCase() === normalized);
  if (exact) return exact;

  for (const entry of faq) {
    const keywords = keywordMap[lang][entry.id] ?? [];
    if (keywords.some((k) => normalized.includes(k))) return entry;
  }
  return null;
}
