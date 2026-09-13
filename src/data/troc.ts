/**
 * Données d'exemple du mini-scanner (projet-scanner.md §4) ·
 * échantillon factice de 6 échanges, prix figés pour la démo.
 */

export interface Troc {
  id: string;
  /** Composants demandés par le marchand */
  demande: string;
  /** Objet donné en échange */
  recu: string;
  marchand: string;
  /** Coût total des composants au marché (₽) */
  cout: number;
  /** Valeur de revente de l'objet reçu (₽) */
  revente: number;
}

export const TROCS: Troc[] = [
  {
    id: 'fast-mt',
    demande: '4× Composant électronique',
    recu: 'Casque FAST MT',
    marchand: 'Peacekeeper',
    cout: 68400,
    revente: 91200,
  },
  {
    id: '6b23',
    demande: '2× Filtre à air FP-100',
    recu: 'Gilet pare-balles 6B23',
    marchand: 'Ragman',
    cout: 41200,
    revente: 38600,
  },
  {
    id: 'mp153',
    demande: '8× Cartouche 12/70',
    recu: 'Fusil MP-153',
    marchand: 'Jaeger',
    cout: 9400,
    revente: 15800,
  },
  {
    id: 'docs',
    demande: '3× Lampe UV',
    recu: 'Valise à documents',
    marchand: 'Therapist',
    cout: 27300,
    revente: 52100,
  },
  {
    id: 'kolpak',
    demande: '5× Tube de dentifrice',
    recu: 'Casque Kolpak-1S',
    marchand: 'Prapor',
    cout: 12500,
    revente: 9800,
  },
  {
    id: 'munitions',
    demande: '2× Carburant condensé',
    recu: 'Caisse de munitions',
    marchand: 'Mechanic',
    cout: 58700,
    revente: 71400,
  },
];

const ESPACE_FINE = ' ';

/** Formatage presse : « 22 800 ₽ » (espaces fines insécables, signe typographique) */
export function formatRoubles(n: number): string {
  const groupe = Math.abs(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ESPACE_FINE);
  return `${n < 0 ? '−' : ''}${groupe}${ESPACE_FINE}₽`;
}

/** Marge avec signe explicite : « +22 800 ₽ » */
export function formatMarge(n: number): string {
  return `${n >= 0 ? '+' : ''}${formatRoubles(n)}`;
}
