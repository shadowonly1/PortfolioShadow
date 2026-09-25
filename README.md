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

Portfolio éditorial « poster / magazine » : fond quasi-noir, typographie display condensée géante,
filets fins, labels monospace numérotés, indigo utilisé avec parcimonie.

- **Tokens** : variables CSS dans `app/globals.css` (`--background`, `--surface`, `--foreground`, `--muted`, `--accent`, `--accent-soft`), exposées dans `tailwind.config.ts`. Échelle `text-display-{xl,lg,md,sm}` + `text-label`.
- **Typographies** : Bebas Neue (display), Inter (texte), JetBrains Mono (labels), Instrument Serif italique (accents éditoriaux ponctuels).
- **Hero** : vidéo portrait (`public/images/video.MP4`) fondue dans le fond par un masque radial, texte géant d'arrière-plan, léger parallaxe au scroll (`components/Hero.tsx`, `HeroVideo.tsx`).
- **Motion** : primitives dans `components/Reveal.tsx` (`RevealText`, `Reveal`, `Hairline`, `ClipReveal`). Toutes respectent `prefers-reduced-motion`.
- **Curseur** : pastille « VIEW + » sur les éléments `data-cursor="…"` (desktop uniquement).

## Structure

```
app/page.tsx                 Hero → About → Selected work → Services → Tech stack →
                             Experience → Process → Graphic design → Statement → Education → Contact
app/projects/[slug]/page.tsx étude de cas éditoriale
components/                  une section = un composant (SectionIntro, BackgroundType… réutilisables)
lib/data.ts                  TOUT le contenu factuel (profil, projets, expériences…)
lib/editorial.ts             libellés éditoriaux, services, couvertures des projets
lib/process.ts               étapes de la méthode
```

## Personnaliser le contenu

Tout le texte du site vit dans **`lib/data.ts`** — modifie ce fichier pour changer nom, accroche,
compétences, expériences, projets, certifications, sans toucher aux composants.

### Médias

- Les visuels sont dans `public/images/` (projets) et `public/images/logo/` (design). Garde-les sous ~2000 px de large.
- Vidéo du hero : `bash scripts/compress-video.sh` (nécessite `brew install ffmpeg`).
- `_archive/` (ignoré par Git) contient les originaux haute définition et les fichiers retirés du site.

### Formulaire de contact

`components/Contact.tsx` envoie via [FormSubmit](https://formsubmit.co) (AJAX) avec un champ honeypot anti-spam.
Pour passer sur Resend : crée `app/api/contact/route.ts` et remplace l'appel `fetch` dans `Contact.tsx`.

## Accessibilité & performance

- Contrastes AA minimum sur tout le texte, focus visible personnalisé (anneau bleu clair).
- Navigation clavier complète (skip link, menu mobile avec `aria-expanded`).
- `prefers-reduced-motion` respecté : toutes les animations Framer Motion et le typewriter du Hero sont désactivés/instantanés si l'utilisateur l'a demandé.
- Images passeront par `next/image` (AVIF/WebP, lazy loading) une fois ajoutées.

## Déployer sur Vercel

1. Pousse ce projet sur GitHub.
2. Sur [vercel.com](https://vercel.com), "New Project" → importe le repo.
3. Définis `NEXT_PUBLIC_SITE_URL` (ex. `https://elimaneba.dev`) : utilisé pour les URL canoniques, Open Graph et le sitemap.
4. Déploie — build command `next build`, aucune config supplémentaire nécessaire.

## Marque personnelle

L'alias **ShadowOnly — THE DSGN GEEK** apparaît discrètement dans le footer (`components/Footer.tsx`)
et dans le `alt` du favicon (`public/favicon.svg`) — signature sans détourner l'attention du profil
professionnel.
