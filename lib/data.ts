export const profile = {
  name: "Elimane BA",
  alias: "ShadowOnly — THE DSGN GEEK",
  role: "Développeur Web, Mobile & Backend",
  location: "Dakar, Sénégal",
  email: "hello@elimaneba.dev",
  phone: "+221 77 398 14 94",
  linkedin: "https://linkedin.com/in/elimane-ba",
  github: "https://github.com/shadowonly1",
  twitter: "https://x.com/baelimaneba3?s=11",
  instagram: "https://www.instagram.com/shadow_design1?igsh=MXc4emU3c3NyYXl3eA%3D%3D&utm_source=qr",
  behance: "https://www.behance.net/petitba",
  tagline: "Je construis des produits, du terminal jusqu'au pixel.",
  subTagline:
    "6 ans à faire tenir ensemble backend, mobile et identité visuelle — sans jamais sacrifier l'un pour l'autre.",
};

export const about = {
  paragraphs: [
    "Développeur Web, Mobile & Backend depuis plus de 6 ans, j'interviens sur toute la chaîne — de l'architecture technique jusqu'à la mise en production. Mon terrain de jeu principal : Flutter, Laravel, et l'écosystème JavaScript/TypeScript.",
    "Aujourd'hui chez APROSI, une agence gouvernementale sénégalaise, je ne me contente pas de livrer du code : je pilote aussi, de bout en bout, la communication visuelle et le branding de la structure. Une double compétence rare, entretenue par une certification Adobe en design graphique — le genre de détail qui se voit à l'exécution, pas seulement à l'annonce.",
  ],
};

export const skillGroups = [
  {
    title: "Langages",
    description: "La base — de la logique métier au script rapide.",
    items: ["JavaScript", "TypeScript", "PHP", "Python", "Dart", "Java"],
  },
  {
    title: "Frameworks & Mobile",
    description: "Construire des produits complets, du serveur à l'app.",
    items: ["Laravel", "Next.js", "React", "Flutter", "Express.js", "Firebase"],
  },
  {
    title: "Données & Infrastructure",
    description: "Faire tourner ça en production, correctement.",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Git", "Déploiement VPS"],
  },
  {
    title: "Design",
    description: "Identité visuelle et branding — la compétence qui distingue.",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Canva"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    company: "APROSI",
    role: "Développeur Web & Mobile, Designer Graphique & Administrateur Réseaux",
    period: "Novembre 2022 — Aujourd'hui",
    description:
      "Pilote la communication visuelle et le branding de l'agence. Conçoit et déploie des plateformes web métier (gestion des matériaux : Next.js, Express, PostgreSQL, Redis, JWT/RBAC). Développe le site institutionnel et une plateforme ERP WordPress. Administre réseau, serveurs et sécurité.",
    current: true,
  },
  {
    company: "Yulcom Technologie",
    role: "Stagiaire Développeur (Canada, télétravail)",
    period: "Mai — Août 2023",
    description:
      "Modification en Java de l'application médicale Openclinic GA. Rédaction de propositions techniques et financières pour appels d'offres.",
  },
];

export const earlierExperiences = [
  { company: "Touba Faadel Service", role: "Développeur" },
  { company: "K.A Trans", role: "Développeur" },
  { company: "Electro Info", role: "Développeur" },
  { company: "Wave Sénégal", role: "Développeur" },
];

export type Project = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  architecture?: string;
  results?: string[];
  lessons?: string;
  deviceType?: "browser" | "phone";
  stack: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  images?: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "orbitsx",
    name: "Orbits",
    deviceType: "phone",
    role: "Lead Software Engineer & Full-Stack Mobile Developer",
    summary:
      "Plateforme VTC complète pour le marché de New York, pensée et livrée de bout en bout.",
    problem:
      "Faire émerger, sans équipe produit établie, une plateforme VTC crédible sur un marché exigeant : deux applications (passager, chauffeur), un backend robuste et un panel d'administration — tout en garantissant fiabilité des paiements et suivi temps réel.",
    solution:
      "Conception de bout en bout des apps Flutter Passager et Chauffeur, du backend Laravel et du panel admin. Géolocalisation temps réel, réservation et gestion des courses, paiements sécurisés via Stripe, portefeuille numérique avec gestion des commissions et retraits chauffeurs, notifications push et dashboard analytique.",
    architecture:
      "Backend Laravel exposant une API REST consommée par deux apps Flutter (Passager, Chauffeur) et un panel d'administration. MySQL pour la persistance, Firebase (FCM) pour les notifications temps réel, Stripe pour les paiements, Google Maps Platform pour la géolocalisation et le suivi des courses.",
    results: [
      "Deux applications mobiles distinctes publiées (Passager et Chauffeur)",
      "Système de paiement et portefeuille numérique opérationnel en production",
      "Panel d'administration permettant le suivi des courses, chauffeurs et paiements en temps réel",
    ],
    lessons:
      "Concevoir pour deux profils utilisateurs dès l'architecture — pas après coup — évite une dette technique lourde sur un produit multi-apps. La séparation claire des rôles côté API a été la décision la plus structurante du projet.",
    stack: ["Flutter", "Dart", "Laravel", "PHP", "MySQL", "Firebase", "Google Maps Platform", "Stripe", "REST API", "FCM"],
    highlights: [
      "Architecture complète pensée pour deux profils utilisateurs distincts (passager / chauffeur)",
      "Portefeuille numérique intégré avec gestion fine des commissions et des retraits",
      "Suivi temps réel et paiements sécurisés en production",
    ],
    image: "/images/projects/orbitsx.jpg",
    imageAlt: "Visuels marketing et interface de l'application Orbits",
    images: [
      "/images/orbits (2).jpeg",
      "/images/orbits (3).jpeg",
      "/images/orbits (1).jpeg",
      "/images/orbits (4).jpeg",
      "/images/orbits (5).jpeg",
      "/images/orbits (6).jpeg",
    ],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/developer?id=Odace+Studio&hl=fr",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/sn/developer/orbits-networks/id1867233521?l=fr-FR",
      },
    ],
    featured: true,
  },
  {
    slug: "aprosi-materiaux",
    name: "Plateforme de gestion des matériaux — APROSI",
    role: "Développeur Full-Stack",
    summary: "Plateforme métier interne, sécurisée et déployée en production.",
    problem:
      "APROSI avait besoin d'un outil interne fiable pour gérer ses matériaux, avec un contrôle d'accès strict selon les rôles des utilisateurs.",
    solution:
      "Développement d'une plateforme avec authentification JWT et gestion fine des rôles (RBAC), déployée en production sur VPS.",
    architecture:
      "Frontend Next.js consommant une API Express.js, base de données PostgreSQL via Prisma ORM, cache Redis pour les données fréquemment consultées, authentification JWT avec contrôle d'accès par rôle (RBAC), déploiement sur VPS.",
    results: [
      "Plateforme déployée et utilisée en production en interne chez APROSI",
      "Contrôle d'accès par rôle opérationnel, réduisant les risques d'erreurs de manipulation",
      "Documentation utilisateur livrée avec le projet",
    ],
    lessons:
      "Sur un outil métier interne, la simplicité d'usage prime sur la sophistication technique — le vrai défi n'était pas le code, mais la clarté du contrôle d'accès pour des utilisateurs non techniques.",
    stack: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "Redis"],
    highlights: [
      "Authentification JWT et RBAC pour un contrôle d'accès précis",
      "Déploiement et maintenance en production sur VPS",
      "Architecture backend pensée pour la fiabilité au quotidien",
    ],
    image: "/images/aprosi (1).png",
    imageAlt: "Captures d'écran de la plateforme de gestion des matériaux APROSI",
    images: [
      "/images/aprosi (1).png",
      "/images/aprosi (2).png",
      "/images/aprosi (3).png",
      "/images/aprosi (4).png",
      "/images/aprosi (5).png",
      "/images/aprosi (6).png",
    ],
  },
  {
    slug: "nioro-du-rip",
    name: "Plateformes municipales — Mairie de Nioro du Rip",
    role: "Développeur Full-Stack",
    summary: "Refonte institutionnelle complète pour une collectivité locale.",
    problem:
      "La mairie avait besoin de moderniser sa présence numérique et de digitaliser des processus administratifs papier (autorisations foncières, gestion documentaire).",
    solution:
      "Refonte complète du site institutionnel, plus une plateforme de gestion des autorisations foncières (QR codes, tableaux de bord analytiques) et une plateforme de gestion documentaire avec piste d'audit et export Excel/PDF.",
    architecture:
      "Stack PHP/MySQL pour trois livrables distincts : site institutionnel, plateforme d'autorisations foncières avec génération de QR codes vérifiables, et plateforme de gestion documentaire avec piste d'audit. Chart.js pour les tableaux de bord analytiques.",
    results: [
      "Trois plateformes livrées pour une collectivité locale",
      "Processus papier (autorisations foncières) digitalisés et vérifiables par QR code",
      "Piste d'audit complète pour la gestion documentaire, avec exports Excel/PDF",
    ],
    lessons:
      "Travailler avec une administration publique impose de concevoir pour la traçabilité dès le départ. La piste d'audit n'était pas une fonctionnalité annexe, c'était une exigence structurante du projet.",
    stack: ["PHP", "MySQL", "Chart.js"],
    highlights: [
      "Autorisations foncières vérifiables par QR code",
      "Tableaux de bord analytiques pour le suivi administratif",
      "Piste d'audit complète et exports Excel/PDF pour la gestion documentaire",
    ],
    image: "/images/projects/nioro-du-rip.jpg",
    imageAlt: "Captures d'écran du site institutionnel de la Mairie de Nioro du Rip",
    images: ["/images/nioro-2.png", "/images/nioro-1.png"],
  },
  {
    slug: "sunurh-pro",
    name: "SunuRH Pro",
    role: "Stratégie produit & adaptation fonctionnelle",
    summary: "Rebranding et localisation d'une solution RH pour l'Afrique de l'Ouest.",
    problem:
      "Une solution RH open-source existante ne répondait pas aux attentes du marché sénégalais et ouest-africain, ni en fonctionnalités ni en identité.",
    solution:
      "Définition d'une stratégie de rebranding et adaptation fonctionnelle de la solution pour coller aux usages locaux.",
    architecture:
      "Adaptation d'une base open-source existante (React, Vue.js, Tailwind CSS), avec refonte de l'identité visuelle et localisation fonctionnelle (devise FCFA, usages RH ouest-africains).",
    results: [
      "Stratégie de rebranding définie de bout en bout",
      "Solution adaptée aux spécificités du marché sénégalais et ouest-africain",
    ],
    lessons:
      "Adapter un produit existant à un nouveau marché est un exercice différent de le construire à partir de rien — il s'agit de traduire des usages locaux dans les choix produit, pas seulement l'interface.",
    stack: ["React", "Vue.js", "Tailwind CSS"],
    highlights: [
      "Stratégie de rebranding complète, du nom à l'interface",
      "Adaptation fonctionnelle ciblée marché sénégalais et ouest-africain",
    ],
    image: "/images/projects/sunurh-pro.jpg",
    imageAlt: "Capture d'écran de SunuRH Pro — à remplacer par Elimane",
  },
  {
    slug: "helping-yourself",
    name: "Helping Yourself (HYS)",
    role: "Conception & architecture — travail conceptuel",
    summary: "Plateforme multi-services à 17 modules, à l'état de conception/architecture.",
    problem:
      "Explorer la faisabilité d'une plateforme multi-services unifiée, couvrant un large éventail de besoins du quotidien sous une seule architecture cohérente.",
    solution:
      "Conception de l'architecture technique et fonctionnelle d'une plateforme à 17 modules — présentée ici comme un exercice de conception, pas comme un produit livré en production.",
    architecture:
      "Architecture modulaire pensée pour 17 modules interconnectés (banque, réseau social, paiements, santé, éducation), documentée dans un cahier des charges technique complet. Projet resté au stade de conception, pas de mise en production.",
    results: [
      "Cahier des charges technique complet livré",
      "Faisabilité d'une architecture à 17 modules validée sur le papier",
    ],
    lessons:
      "Concevoir l'architecture d'un système à cette échelle oblige à penser modularité et découplage dès le premier schéma — sans quoi la complexité devient vite ingérable, même en conception.",
    stack: ["Architecture", "Conception produit"],
    highlights: [
      "Architecture pensée pour 17 modules interconnectés",
      "Exercice de conception à grande échelle, en amont du développement",
    ],
    image: "/images/projects/helping-yourself.jpg",
    imageAlt: "Schéma d'architecture de Helping Yourself (HYS) — à remplacer par Elimane",
  },
];

export type DesignWork = { src: string; alt: string };

export const designWorks: DesignWork[] = [
  { src: "/images/logo/LOGO_EVA-01-removebg-preview.png", alt: "Logo Eva Fragrances" },
  { src: "/images/logo/LOGO JAUNE-100.jpg", alt: "Logo Never Diambatt Club" },
  { src: "/images/logo/Logo MADYA@2x-100.jpg", alt: "Logo Madya" },
  { src: "/images/logo/LOGO KYANOS (1).png", alt: "Logo Kyanos" },
  { src: "/images/logo/madya-removebg-preview.png", alt: "Logo Madya — variante" },
  { src: "/images/logo/logo-shadow.png", alt: "Logo personnel — ShadowOnly" },
  { src: "/images/logo/DESIGN SHADOWONLY.jpg", alt: "Identité visuelle ShadowOnly" },
  { src: "/images/logo/roll up aprosi2-Récupéré.jpg", alt: "Roll-up institutionnel APROSI" },
  { src: "/images/logo/ramadan design.jpg", alt: "Visuel de communication — Ramadan" },
  { src: "/images/logo/bonne Annee 2026.jpg", alt: "Visuel de vœux — Nouvel An 2026" },
  { src: "/images/logo/ACHOURA.jpg", alt: "Visuel de communication — Achoura" },
  { src: "/images/logo/JUMMAH.jpg", alt: "Visuel de communication — Jummah" },
  { src: "/images/logo/food.jpg", alt: "Visuel food & restauration" },
  { src: "/images/logo/bag.jpg", alt: "Mockup packaging / sac" },
  { src: "/images/logo/Panneau 1 Petit dej.jpg", alt: "Panneau publicitaire — Petit déjeuner" },
  { src: "/images/logo/Panneau 1 pizza.jpg", alt: "Panneau publicitaire — Pizza" },
  { src: "/images/logo/Panneau 1 pizza (2).jpg", alt: "Panneau publicitaire — Pizza, variante 2" },
  { src: "/images/logo/Panneau 1 pizza (3).jpg", alt: "Panneau publicitaire — Pizza, variante 3" },
  { src: "/images/logo/aprosi Pancarte 1.jpg", alt: "Pancarte institutionnelle APROSI" },
  { src: "/images/logo/20260102_001348_0000.png", alt: "Création graphique" },
  { src: "/images/logo/Gemini_Generated_Image_20anlo20anlo20an.png", alt: "Illustration graphique générée" },
  { src: "/images/logo/391b2e91f6d224fce04482ef2b3b3ac4.jpg", alt: "Création graphique" },
  { src: "/images/logo/3f1cd391042f41bb0f95600a57bcd616.jpg", alt: "Création graphique" },
  { src: "/images/logo/8d23ee4d579700e9194cd437005043ed.jpg", alt: "Création graphique" },
  { src: "/images/logo/b26007d05dbadb4ef69c1d8a1e10ec7f.jpg", alt: "Création graphique" },
  { src: "/images/logo/d002469b093c36baae1db36c29de46fd.jpg", alt: "Création graphique" },
  {
    src: "/images/logo/Gemini_Generated_Image_q98pqnq98pqnq98p-removebg-preview.png",
    alt: "Illustration graphique générée",
  },
  { src: "/images/logo/d406ec1b0024dc3ed473af235a9143dd.jpg", alt: "Création graphique" },
  { src: "/images/logo/Fichier 1.png", alt: "Création graphique" },
];

export const education = [
  {
    name: "Master en Génie Logiciel",
    issuer: "ESTM — Ecole Supérieure de Technologie et de Management",
    date: "2019 — 2020",
  },
];

export const certifications = [
  {
    name: "Graphic Design — Adobe Certified",
    issuer: "GoMyCode",
    date: "Mars 2026",
  },
];

export const heroCodeLines = [
  "const developer = {",
  "  name: 'Elimane BA',",
  "  role: 'Web · Mobile · Backend',",
  "  based_in: 'Dakar, SN',",
  "  also: 'designer graphique certifié',",
  "};",
];
