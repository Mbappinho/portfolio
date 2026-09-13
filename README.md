# Édition N°1 · Portfolio de Théo Bourgeois

Portfolio personnel conçu comme le numéro 1 d'une revue : un éditorial brutalisé, entre papier, encre et rouge unique. Développé en **React 19 + TypeScript + Vite + Tailwind CSS v3**, animé avec **GSAP**, **Framer Motion** et **Lenis**.

## Aperçu

Le site se feuillette comme un magazine, en 7 pages :

1. **Couverture** — la une du numéro
2. **Le Manifeste** — note de la rédaction
3. **Rubriques** — compétences, en articles
4. **Reportage 01 — WTTG3** — traduction française du jeu *Welcome to the Game III*
5. **Reportage 02 — Tarkov Barter Scanner** — scanner de troc pour *Escape from Tarkov*
6. **Hors-champ** — coulisses, cahier central, entretien imaginaire
7. **Colophon** — contact et mentions de fin de numéro

## Stack

- **React 19** + **TypeScript**
- **Vite** (dev server & build)
- **Tailwind CSS v3** + composants **shadcn/ui** (Radix UI)
- **GSAP**, **Framer Motion**, **Lenis** pour les animations et le scroll
- **React Router** pour la navigation

## Développement

```bash
npm install
npm run dev    # serveur de dev sur le port 3000
npm run build  # build de production (tsc -b && vite build)
```

> **Note :** les images de `public/assets/` (fichiers `.jpg`) ne sont pas incluses dans ce dépôt pour l'instant — elles sont à ajouter séparément.

## Voir aussi

- [WTTG3-FR-Traduction](https://github.com/Mbappinho/WTTG3-FR-Traduction) — mon autre repo : la traduction française de Welcome to the Game III, présentée dans le Reportage 01.
