// Traduction anglaise du contenu de data.ts / editorial.ts / process.ts.
// Seuls les textes sont traduits ; liens, images et stacks restent ceux de la version française.

export const profileEn = {
  role: "Web, Mobile & Backend Developer",
  location: "Dakar, Senegal",
  tagline: "I build products, from the terminal to the pixel.",
  subTagline:
    "6 years of holding backend, mobile and visual identity together — without ever sacrificing one for the other.",
};

export const aboutEn = {
  paragraphs: [
    "A Web, Mobile & Backend developer for more than 6 years, I work across the whole chain — from technical architecture to production. My main playground: Flutter, Laravel and the JavaScript/TypeScript ecosystem.",
    "Today at APROSI, a Senegalese government agency, I don't just ship code: I also lead the agency's visual communication and branding from end to end. A rare dual skill set, backed by an Adobe certification in graphic design — the kind of detail that shows in the execution, not just in the pitch.",
  ],
};

/** Par titre de groupe français. */
export const skillGroupsEn: Record<string, { title: string; description: string; items?: Record<string, string> }> = {
  Langages: { title: "Languages", description: "The foundation — from business logic to quick scripts." },
  "Frameworks & Mobile": { title: "Frameworks & Mobile", description: "Building complete products, from server to app." },
  "Données & Infrastructure": {
    title: "Data & Infrastructure",
    description: "Running it properly in production.",
    items: { "Déploiement VPS": "VPS deployment" },
  },
  Design: { title: "Design", description: "Visual identity and branding — the skill that sets me apart." },
};

/** Par entreprise. */
export const experiencesEn: Record<string, { role: string; period: string; description: string }> = {
  APROSI: {
    role: "Full-Stack Developer & Graphic Designer",
    period: "November 2022 — Present",
    description:
      "Leads the agency's visual communication and branding. Designs and deploys business web platforms (materials management: Next.js, Express, PostgreSQL, Redis, JWT/RBAC). Builds the institutional website and a WordPress ERP platform. Manages network, servers and security.",
  },
  "Yulcom Technologie": {
    role: "Developer Intern (Canada, remote)",
    period: "May — August 2023",
    description:
      "Modified the Openclinic GA medical application in Java. Wrote technical and financial proposals for tenders.",
  },
};

export const earlierRoleEn: Record<string, string> = { Développeur: "Developer" };

type ProjectText = {
  name?: string;
  role?: string;
  summary: string;
  problem: string;
  solution: string;
  architecture?: string;
  challenges?: string[];
  results?: string[];
  lessons?: string;
  highlights: string[];
  imageAlt: string;
  linkLabels?: string[];
  stack?: string[];
};

/** Par slug. */
export const projectsEn: Record<string, ProjectText> = {
  orbitsx: {
    summary: "A complete ride-hailing platform for the New York market, designed and delivered end to end.",
    problem:
      "Launching a credible ride-hailing platform in a demanding market without an established product team: two apps (rider, driver), a robust backend and an admin panel — while guaranteeing reliable payments and real-time tracking.",
    solution:
      "End-to-end design of the Rider and Driver Flutter apps, the Laravel backend and the admin panel. Real-time geolocation, ride booking and management, secure Stripe payments, a digital wallet handling commissions and driver payouts, push notifications and an analytics dashboard.",
    architecture:
      "A Laravel backend exposing a REST API consumed by two Flutter apps (Rider, Driver) and an admin panel. MySQL for persistence, Firebase (FCM) for real-time notifications, Stripe for payments, Google Maps Platform for geolocation and ride tracking.",
    results: [
      "Two separate mobile apps published (Rider and Driver)",
      "Payment system and digital wallet running in production",
      "Admin panel for real-time tracking of rides, drivers and payments",
    ],
    lessons:
      "Designing for two user profiles from the architecture stage — not as an afterthought — avoids heavy technical debt on a multi-app product. A clear separation of roles in the API was the most structuring decision of the project.",
    highlights: [
      "Complete architecture designed for two distinct user profiles (rider / driver)",
      "Built-in digital wallet with fine-grained commission and payout management",
      "Real-time tracking and secure payments in production",
    ],
    imageAlt: "Marketing visuals and interface of the Orbits app",
    linkLabels: [
      "Rider app — App Store",
      "Rider app — Google Play",
      "Driver app — App Store",
      "Driver app — Google Play",
    ],
  },
  "scan-tickets": {
    summary:
      "A SaaS for managing and validating meal tickets with QR codes, designed to eliminate fraud and paper tracking.",
    problem:
      "Traditional paper systems make meal-ticket tracking difficult and invite errors and fraud: no traceability, no detection of double use, no real-time visibility on consumption.",
    solution:
      "A digital platform to generate, manage and instantly validate tickets, each with a unique QR code. A dedicated scanner validates every ticket in real time (available / already used / expired), with a complete admin dashboard to manage tickets, users and statistics.",
    architecture:
      "A Next.js frontend (TypeScript, Tailwind CSS, Framer Motion) consuming a Laravel/PHP REST API with JWT authentication and a MySQL database. Unique QR codes generated when each ticket is created, a dedicated scanner for instant validation, role management (Administrator, Control agent, User) with full traceability of actions.",
    challenges: [
      "Real-time validation handling to avoid any conflict during simultaneous scans",
      "Securing QR codes against duplication and forgery",
      "Optimizing scanner performance for near-instant validation",
      "Designing clear role management between administrators, control agents and users",
    ],
    results: [
      "Less fraud thanks to automatic detection of double use",
      "Ticket validation much faster than manual checks",
      "Full traceability: every scan and every action is logged",
      "Admin dashboard giving real-time visibility on consumption",
    ],
    lessons:
      "On a real-time validation system, reliability comes before everything else — the real challenge wasn't scanning a QR code, but guaranteeing that the same ticket can never be validated twice, even with near-simultaneous scans.",
    highlights: [
      "A unique QR code generated automatically for each ticket",
      "Scanner with animated visual feedback (valid / already used / expired)",
      "Admin dashboard with statistics and activity charts",
      "Fine-grained roles: Administrator, Control agent, User",
    ],
    imageAlt: "Scan Tickets mobile app and back office",
  },
  "aprosi-materiaux": {
    name: "Materials Management Platform — APROSI",
    role: "Full-Stack Developer",
    summary: "An internal business platform, secure and deployed in production.",
    problem:
      "APROSI needed a reliable internal tool to manage its materials, with strict access control based on user roles.",
    solution:
      "Built a platform with JWT authentication and fine-grained role management (RBAC), deployed in production on a VPS.",
    architecture:
      "A Next.js frontend consuming an Express.js API, a PostgreSQL database through Prisma ORM, Redis caching for frequently accessed data, JWT authentication with role-based access control (RBAC), deployed on a VPS.",
    results: [
      "Platform deployed and used in production internally at APROSI",
      "Role-based access control in place, reducing the risk of handling errors",
      "User documentation delivered with the project",
    ],
    lessons:
      "On an internal business tool, ease of use matters more than technical sophistication — the real challenge wasn't the code, but making access control clear for non-technical users.",
    highlights: [
      "JWT authentication and RBAC for precise access control",
      "Deployment and maintenance in production on a VPS",
      "Backend architecture built for day-to-day reliability",
    ],
    imageAlt: "Screenshots of the APROSI materials management platform",
  },
  "nioro-du-rip": {
    name: "Municipal Platforms — Nioro du Rip City Hall",
    role: "Full-Stack Developer",
    summary: "A complete institutional redesign for a local authority.",
    problem:
      "The city hall needed to modernize its online presence and digitize paper-based administrative processes (land permits, document management).",
    solution:
      "A complete redesign of the institutional website, plus a land-permit management platform (QR codes, analytics dashboards) and a document management platform with an audit trail and Excel/PDF export.",
    architecture:
      "A PHP/MySQL stack for three separate deliverables: the institutional website, a land-permit platform generating verifiable QR codes, and a document management platform with an audit trail. Chart.js for the analytics dashboards.",
    results: [
      "Three platforms delivered for a local authority",
      "Paper processes (land permits) digitized and verifiable by QR code",
      "Complete audit trail for document management, with Excel/PDF exports",
    ],
    lessons:
      "Working with a public administration means designing for traceability from day one. The audit trail wasn't a side feature — it was a structuring requirement of the project.",
    highlights: [
      "Land permits verifiable by QR code",
      "Analytics dashboards for administrative follow-up",
      "Complete audit trail and Excel/PDF exports for document management",
    ],
    imageAlt: "Screenshots of the Nioro du Rip City Hall institutional website",
  },
  "aprosi-site-institutionnel": {
    name: "Institutional Website — APROSI",
    role: "Web Developer",
    summary: "The institutional website of Senegal's Industrial Sites Promotion Agency, live at aprosi.sn.",
    problem:
      "Presenting the agency's industrial sites (DID, P2ID, Ecopark), business sectors, allocation conditions and procedures to investors and companies on a single website.",
    solution:
      "An institutional website of about fifty pages: major projects and industrial sites, business sectors, allocation conditions, procedures, tenders, events, reports and statistics, a company directory, with a built-in chat assistant.",
    architecture:
      "Built in HTML, CSS and JavaScript on Bootstrap, with dynamic PHP pages (company directory), AOS animations, Swiper carousels, a GLightbox gallery and a Botpress chat assistant, hosted on an Apache server.",
    results: [
      "Website in production at www.aprosi.sn",
      "About fifty pages covering the agency's offer, procedures and news",
      "Chat assistant available from every page",
    ],
    highlights: [
      "Presentation of the DID, P2ID and Ecopark industrial sites",
      "Company directory and step-by-step procedures",
      "Complete mobile version and built-in chat assistant",
    ],
    imageAlt: "Home page of the APROSI institutional website",
    linkLabels: ["Visit the website"],
  },
  "sunurh-pro": {
    role: "Product strategy & functional adaptation",
    summary: "Rebranding and localization of an HR solution for West Africa.",
    problem:
      "An existing open-source HR solution didn't meet the expectations of the Senegalese and West African market, neither in features nor in identity.",
    solution: "Defined a rebranding strategy and adapted the solution's features to local practices.",
    architecture:
      "Adaptation of an existing open-source codebase (React, Vue.js, Tailwind CSS), with a new visual identity and functional localization (CFA franc currency, West African HR practices).",
    results: [
      "Rebranding strategy defined end to end",
      "Solution adapted to the specifics of the Senegalese and West African market",
    ],
    lessons:
      "Adapting an existing product to a new market is a different exercise from building one from scratch — it's about translating local practices into product decisions, not just the interface.",
    highlights: [
      "Complete rebranding strategy, from the name to the interface",
      "Functional adaptation targeting the Senegalese and West African market",
    ],
    imageAlt: "SunuRH Pro interface",
  },
  fanyris: {
    role: "Web design & development",
    summary: "Showcase website for an accounting and advisory firm, with a client area.",
    problem:
      "Presenting the firm, its areas of expertise and its job openings online, and giving clients a dedicated access point.",
    solution:
      "A website built around the firm, its areas of expertise (accounting & tax, management consulting, payroll & corporate secretarial), recruitment and news, with a digital business card (vCard) and a client area.",
    highlights: [
      "Presentation of the firm's three areas of expertise",
      "Client area and digital business card (vCard)",
      "Recruitment and news sections",
    ],
    imageAlt: "Home page of the FANYRIS Expertise-Conseil website",
  },
  ergec: {
    role: "Web design & development",
    summary: "Showcase website for a civil engineering company, presenting its services and completed projects.",
    problem: "Presenting the company, its services and its completed worksites to clients and partners.",
    solution:
      "A website built around the company presentation, its services, its completed projects and direct contact, with a home page focused on the field: “Delivering projects exactly as our clients ordered them”.",
    highlights: [
      "Showcase of worksites and completed projects",
      "Services and direct contact pages",
      "Home page illustrated with on-site photos",
    ],
    imageAlt: "Home page of the E.R.GE.C website",
  },
  "helping-yourself": {
    role: "Design & architecture — conceptual work",
    summary: "A multi-service platform with 17 modules, at the design/architecture stage.",
    problem:
      "Exploring the feasibility of a unified multi-service platform covering a wide range of everyday needs under a single coherent architecture.",
    solution:
      "Designed the technical and functional architecture of a 17-module platform — presented here as a design exercise, not as a product delivered to production.",
    architecture:
      "A modular architecture designed for 17 interconnected modules (banking, social network, payments, health, education), documented in a complete technical specification. The project remained at the design stage, with no production release.",
    results: [
      "Complete technical specification delivered",
      "Feasibility of a 17-module architecture validated on paper",
    ],
    lessons:
      "Designing a system at this scale forces you to think about modularity and decoupling from the very first diagram — otherwise complexity quickly becomes unmanageable, even at the design stage.",
    highlights: [
      "Architecture designed for 17 interconnected modules",
      "A large-scale design exercise, ahead of development",
    ],
    imageAlt: "Presentation visual of the Helping Yourself (HYS) project",
    stack: ["Architecture", "Product design"],
  },
};

/** Par fichier image. */
export const designAltEn: Record<string, string> = {
  "/images/logo/DESIGN SHADOWONLY.jpg": "ShadowOnly visual identity",
  "/images/logo/3f1cd391042f41bb0f95600a57bcd616.jpg": "Visual identity — stationery and packaging",
  "/images/logo/ramadan design.jpg": "Communication visual — Ramadan",
  "/images/logo/d002469b093c36baae1db36c29de46fd.jpg": "Visual identity — brand applications",
  "/images/logo/JUMMAH.jpg": "Communication visual — Jummah",
  "/images/logo/391b2e91f6d224fce04482ef2b3b3ac4.jpg": "Visual identity — bag, mug and cap applications",
  "/images/logo/LOGO_EVA-01-removebg-preview.png": "Eva Fragrances logo",
  "/images/logo/kretivm.jpg": "Kre'Tiv'M logo — “On tourne tu brilles !”",
  "/images/logo/fapp.jpg": "Business card — FAPP Fallou American Auto Parts",
  "/images/logo/soin-de-soi.jpg": "Soin de Soi logo",
  "/images/logo/aprosi-hub-minier.jpg": "Stage backdrop — Regional Mining Hub revival workshop, APROSI",
  "/images/logo/aprosi-banniere.jpg": "APROSI banner — “We are building the future”",
  "/images/logo/Panneau 1 pizza.jpg": "Advertising board — Pizza",
  "/images/logo/d406ec1b0024dc3ed473af235a9143dd.jpg": "Packaging mockup — AKG bags",
  "/images/logo/bonne Annee 2026.jpg": "Greeting visual — New Year 2026",
  "/images/logo/ACHOURA.jpg": "Communication visual — Ashura",
  "/images/logo/food.jpg": "Food & restaurant visual",
  "/images/logo/Panneau 1 Petit dej.jpg": "Advertising board — Breakfast",
  "/images/logo/Panneau 1 pizza (2).jpg": "Advertising board — Pizza, version 2",
  "/images/logo/Panneau 1 pizza (3).jpg": "Advertising board — Pizza, version 3",
  "/images/logo/b26007d05dbadb4ef69c1d8a1e10ec7f.jpg": "Event poster — Ziaar",
  "/images/logo/aprosi Pancarte 1.jpg": "APROSI institutional sign",
  "/images/logo/roll-up-aprosi.jpg": "APROSI institutional roll-up banner",
  "/images/logo/8d23ee4d579700e9194cd437005043ed.jpg": "Packaging mockup — bag",
  "/images/logo/bag.jpg": "Packaging mockup / bag",
  "/images/logo/madya-removebg-preview.png": "Madya logo — variant",
  "/images/logo/logo-shadow.png": "Personal logo — ShadowOnly",
  "/images/logo/20260102_001348_0000.png": "Khalil Style logo",
  "/images/logo/LOGO JAUNE-100.jpg": "Never Diambatt Club logo",
  "/images/logo/Logo MADYA@2x-100.jpg": "Madya logo",
  "/images/logo/LOGO KYANOS (1).png": "Kyanos logo",
  "/images/logo/Fichier 1.png": "Gayeta Expertise & Conseil logo",
};

export const educationEn: Record<string, { name: string; issuer: string; date: string }> = {
  "Master en Génie Logiciel": {
    name: "Master's in Software Engineering",
    issuer: "ESTM — École Supérieure de Technologie et de Management",
    date: "2019 — 2020",
  },
};

export const certificationDateEn: Record<string, string> = { "Mars 2026": "March 2026" };

export const servicesEn = [
  {
    title: "Web applications",
    description: "Business platforms, institutional websites and SaaS.",
  },
  {
    title: "Mobile applications",
    description: "iOS & Android apps in Flutter, from mockup to store release.",
  },
  {
    title: "Backend systems",
    description: "APIs, databases, JWT/RBAC authentication, Redis caching, VPS deployment.",
  },
  {
    title: "Digital products",
    description: "From specification to production, without needing a team for every layer.",
    stack: ["Architecture", "Product design"],
  },
  {
    title: "UI / UX & Branding",
    description: "Visual identity, logos, communication materials — Adobe-certified.",
  },
];

export const statementEn = {
  first: ["I don't just", "write code."],
  second: ["I build", "products."],
};

export const projectCategoryEn: Record<string, string> = {
  orbitsx: "Ride-hailing platform",
  "scan-tickets": "QR code ticketing SaaS",
  "aprosi-materiaux": "Internal business platform",
  "aprosi-site-institutionnel": "Institutional website",
  "nioro-du-rip": "Municipal platforms",
  "sunurh-pro": "HR solution",
  fanyris: "Accounting & advisory firm",
  ergec: "Civil engineering company",
  "helping-yourself": "Multi-service platform — concept",
};

export const processStepsEn = [
  { title: "Discover", subtitle: "Research & requirements", description: "Understand the real need, not just the brief." },
  { title: "Design", subtitle: "Architecture & UX", description: "Stack, data and security decided before the first line of code." },
  { title: "Build", subtitle: "Development", description: "Code and pixels move forward together." },
  { title: "Test", subtitle: "Quality & optimization", description: "Functional, access-control and performance checks." },
  { title: "Deploy", subtitle: "Production", description: "Deployment, documentation and handover." },
  { title: "Iterate", subtitle: "Continuous improvement", description: "Follow-up after delivery: fixes, improvements, metrics." },
];
