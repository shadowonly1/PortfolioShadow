// Contenu du site dans la langue demandée. Le français (data.ts, editorial.ts,
// process.ts) est la source ; l'anglais applique content.en.ts par-dessus, si bien
// que liens, images et stacks restent toujours identiques entre les deux versions.
import {
  about,
  certifications,
  designWorks,
  earlierExperiences,
  education,
  experiences,
  profile,
  projects,
  skillGroups,
  stats,
  type Project,
} from "./data";
import {
  aboutEn,
  certificationDateEn,
  designAltEn,
  earlierRoleEn,
  educationEn,
  experiencesEn,
  processStepsEn,
  profileEn,
  projectCategoryEn,
  projectsEn,
  servicesEn,
  skillGroupsEn,
  statementEn,
} from "./content.en";
import { projectCategory, services, statement } from "./editorial";
import type { Lang } from "./i18n";
import { processSteps } from "./process";

const fr = {
  profile,
  about,
  skillGroups,
  experiences,
  earlierExperiences,
  projects,
  designWorks,
  education,
  certifications,
  stats,
  services,
  statement,
  projectCategory,
  processSteps,
};

export type Content = typeof fr;

function translateProject(project: Project): Project {
  const t = projectsEn[project.slug];
  if (!t) return project;
  const { linkLabels, ...text } = t;
  return {
    ...project,
    ...text,
    links: project.links?.map((link, i) => ({ ...link, label: linkLabels?.[i] ?? link.label })),
  };
}

const en: Content = {
  profile: { ...profile, ...profileEn },
  about: aboutEn,
  skillGroups: skillGroups.map((g) => {
    const t = skillGroupsEn[g.title];
    return t
      ? { ...g, title: t.title, description: t.description, items: g.items.map((i) => t.items?.[i] ?? i) }
      : g;
  }),
  experiences: experiences.map((e) => ({ ...e, ...experiencesEn[e.company] })),
  earlierExperiences: earlierExperiences.map((e) => ({ ...e, role: earlierRoleEn[e.role] ?? e.role })),
  projects: projects.map(translateProject),
  designWorks: designWorks.map((w) => ({ ...w, alt: designAltEn[w.src] ?? w.alt })),
  education: education.map((e) => educationEn[e.name] ?? e),
  certifications: certifications.map((c) => ({ ...c, date: certificationDateEn[c.date] ?? c.date })),
  stats,
  services: services.map((s, i) => ({ ...s, ...servicesEn[i] })),
  statement: statementEn,
  projectCategory: projectCategoryEn,
  processSteps: processSteps.map((s, i) => ({ ...s, ...processStepsEn[i] })),
};

export function getContent(lang: Lang): Content {
  return lang === "en" ? en : fr;
}
