# Elimane Ba — Portfolio

Portfolio premium pour Elimane Ba, Développeur Web, Mobile & Backend basé à Dakar, Sénégal.
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Direction artistique

- **Fond** quasi-noir `#08090D`, surfaces `#0F1117`, texte `#F2F3F7`.
- **Accent** bleu électrique/indigo `#4F5DFF`, utilisé avec parcimonie (liens, focus, un mot du hero).
- **Typographies** : Inter (texte) + Bricolage Grotesque (titres, display) + JetBrains Mono (labels/code) — toutes chargées via `next/font/google`, aucune police à télécharger manuellement.
- **Moment signature** : dans le Hero, un bloc terminal tape un extrait de code puis se transforme (morph Framer Motion via `layoutId`) en carte d'interface — symbolise le passage code → design. Composant : `components/TerminalMorph.tsx`.
- Un seul thème sombre, volontairement pas de mode clair (cohérent avec la direction "dark premium").

## Structure du projet

```
app/
  layout.tsx        # polices, metadata SEO/Open Graph
  page.tsx           # assemble les sections
  globals.css        # tokens Tailwind, reduced-motion, focus visible
components/
  Header.tsx          Hero.tsx           TerminalMorph.tsx
  About.tsx            Skills.tsx         Experience.tsx
  Projects.tsx          ProjectCard.tsx    Certifications.tsx
  Contact.tsx            Footer.tsx
  ScrollReveal.tsx        SectionHeading.tsx  Badge.tsx  Container.tsx
lib/
  data.ts             # TOUT le contenu texte (profil, projets, expériences...)
  utils.ts / useReducedMotion.ts
```

## Personnaliser le contenu

Tout le texte du site vit dans **`lib/data.ts`** — modifie ce fichier pour changer nom, accroche,
compétences, expériences, projets, certifications, sans toucher aux composants.

### Images à ajouter (placeholders actuels)

Voir `public/images/README.md`. Tant qu'elles ne sont pas fournies, le site affiche des
emplacements réservés stylisés (pas d'images cassées) :

- `public/images/profile.jpg` — photo de profil (référence à ajouter dans `components/About.tsx`)
- `public/images/projects/*.jpg` — captures/mockups des 5 projets (chemins déjà déclarés dans `lib/data.ts`)
- `public/og-image.png` (1200×630) — aperçu réseaux sociaux

Une fois les fichiers ajoutés, remplace le bloc placeholder dans `components/ProjectCard.tsx`
par un `next/image` classique :

```tsx
import Image from "next/image";
// ...
<Image src={project.image} alt={project.imageAlt} fill className="object-cover rounded-xl" />
```

### Liens à compléter

Dans `lib/data.ts` :
- `profile.github` — lien GitHub
- `profile.phone`, `profile.linkedin`, `profile.email` — coordonnées réelles
- `projects[0].links` (OrbitsX) — lien démo / store

### Brancher le formulaire de contact

`components/Contact.tsx` simule l'envoi (pas de backend réel). Pour le connecter :

**Option Resend (recommandée)**
1. `npm install resend`
2. Crée `app/api/contact/route.ts` avec un handler `POST` qui appelle l'API Resend
3. Dans `Contact.tsx`, remplace le `setTimeout` de simulation par :
   ```ts
   await fetch("/api/contact", { method: "POST", body: data });
   ```

**Option Formspree**
1. Crée un formulaire sur [formspree.io](https://formspree.io)
2. Remplace l'`action` du `<form>` et le `onSubmit` par une soumission native vers ton endpoint Formspree

## Accessibilité & performance

- Contrastes AA minimum sur tout le texte, focus visible personnalisé (anneau bleu clair).
- Navigation clavier complète (skip link, menu mobile avec `aria-expanded`).
- `prefers-reduced-motion` respecté : toutes les animations Framer Motion et le typewriter du Hero sont désactivés/instantanés si l'utilisateur l'a demandé.
- Images passeront par `next/image` (AVIF/WebP, lazy loading) une fois ajoutées.

## Déployer sur Vercel

1. Pousse ce projet sur GitHub.
2. Sur [vercel.com](https://vercel.com), "New Project" → importe le repo.
3. Aucune variable d'environnement requise par défaut (sauf si tu branches Resend : ajoute `RESEND_API_KEY`).
4. Déploie — build command `next build`, aucune config supplémentaire nécessaire.

## Marque personnelle

L'alias **ShadowOnly — THE DSGN GEEK** apparaît discrètement dans le footer (`components/Footer.tsx`)
et dans le `alt` du favicon (`public/favicon.svg`) — signature sans détourner l'attention du profil
professionnel.
