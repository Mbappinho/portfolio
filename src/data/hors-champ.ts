/**
 * Données de la page Hors-champ (page 06) · articles de fond et entretien imaginaire.
 */

export interface EntretienQR {
  question: string;
  reponse: string;
}

/** L'entretien imaginaire · la rédaction se questionne elle-même */
export const ENTRETIEN: EntretienQR[] = [
  {
    question: 'Le foot, Tarkov, Marx : le point commun ?',
    reponse:
      'Trois systèmes à lire. Un match, un raid, un marché : celui qui comprend les règles cesse de les subir.',
  },
  {
    question: 'Et le rapport avec le code ?',
    reponse:
      'Le code est mon quatrième système. Je lis les règles, puis je les réécris quand elles ne me conviennent pas\u00A0: c\u2019est le principe du modding.',
  },
  {
    question: 'Une dernière pour la route ?',
    reponse:
      'Ce numéro est le N°1. J\u2019ai l\u2019intention de faire vivre la revue\u00A0: le N°2 s\u2019écrira en stage ou en alternance.',
  },
];

/** Liens croisés de l'article Tarkov vers les reportages */
export const LIENS_CROISES = [
  { label: `→ RELIRE : L'ÉCONOMIE DU TROC, P. 05`, route: '/projets/tarkov-barter-scanner' },
] as const;
