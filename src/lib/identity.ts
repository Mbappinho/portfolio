/**
 * Résout l'URL d'un asset statique (public/assets/) en respectant la base
 * Vite (racine en preview Kimi, /portfolio/ sur GitHub Pages).
 */
export const asset = (file: string): string => `${import.meta.env.BASE_URL}assets/${file}`;

/**
 * Identité centralisée du site.
 * Toute l'identité visible du site transite par ce fichier.
 */
export const IDENTITY = {
  /** Nom complet affiché (masthead, folios…) */
  name: 'Théo Bourgeois',
  /** Prénom seul (ligne 1 du masthead) */
  firstName: 'THÉO',
  /** Nom seul (ligne 2 du masthead, en capitales) */
  lastName: 'BOURGEOIS',
  /** Logotype (barre de une, footer) */
  logotype: 'TB.',
  /** Portrait halftone (page Profil) */
  photo: asset('portrait.jpg'),
  /** Visuel de couverture : nature morte de rédaction, halftone N&B */
  couverture: asset('couverture-hero.jpg'),
  email: 'theo25pro@gmail.com',
  github: 'github.com/Mbappinho',
  githubUrl: 'https://github.com/Mbappinho',
} as const;

export const EDITION = {
  numero: 'N°1',
  date: 'SEPTEMBRE 2026',
  dateline: 'ÉDITION N°1 · SEPTEMBRE 2026',
  issn: 'ISSN 2026-0001',
  baseline: 'Revue personnelle publiée à tirage unique.',
  copyright: '© MMXXVI · REPRODUCTION INTERDITE, DIFFUSION ENCOURAGÉE',
} as const;

export interface PageRef {
  /** Numéro de page du magazine (01–07) */
  num: string;
  /** Titre de rubrique */
  title: string;
  route: string;
}

/** Sommaire complet du numéro (hors couverture) */
export const SOMMAIRE: PageRef[] = [
  { num: '02', title: 'LE MANIFESTE', route: '/profil' },
  { num: '03', title: 'RUBRIQUES', route: '/competences' },
  { num: '04', title: 'REPORTAGE N°1', route: '/projets/localisation-wttg3' },
  { num: '05', title: 'REPORTAGE N°2', route: '/projets/tarkov-barter-scanner' },
  { num: '06', title: 'HORS-CHAMP', route: '/hors-champ' },
  { num: '07', title: 'COLOPHON', route: '/contact' },
];

/** Toutes les pages, couverture comprise (pour le sommaire overlay) */
export const PAGES: PageRef[] = [
  { num: '01', title: 'COUVERTURE', route: '/' },
  ...SOMMAIRE,
];
