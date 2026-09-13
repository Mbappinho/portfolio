import Folio from '@/components/Folio';
import ReportageHero from '@/components/reportages/ReportageHero';
import ChapitresNav from '@/components/reportages/ChapitresNav';
import type { Chapitre } from '@/components/reportages/ChapitresNav';
import ChapterHeading from '@/components/reportages/ChapterHeading';
import Filigrane from '@/components/reportages/Filigrane';
import Reveal from '@/components/reportages/Reveal';
import FigureReveal from '@/components/reportages/FigureReveal';
import CodeBlock from '@/components/reportages/CodeBlock';
import Checklist from '@/components/reportages/Checklist';
import EncartChiffre from '@/components/reportages/EncartChiffre';
import ResultatsBandeau from '@/components/reportages/ResultatsBandeau';
import PoursuivreLecture from '@/components/reportages/PoursuivreLecture';
import MiniScanner from '@/components/reportages/MiniScanner';
import { EDITION, IDENTITY } from '@/lib/identity';

const NBSP = ' ';

const CHAPITRES: Chapitre[] = [
  { id: 'chapitre-01', label: '01 Le problème' },
  { id: 'chapitre-02', label: '02 Le produit' },
  { id: 'chapitre-03', label: '03 Sous le capot' },
  { id: 'chapitre-04', label: '04 La mise en ligne' },
  { id: 'chapitre-05', label: '05 Les résultats' },
];

const CODE_MARGE = [
  '// Marge nette d\u2019un échange, taxes incluses',
  'const marge = valeurRevente(troc.recu)',
  '            - coutComposants(troc.demande)',
  '            - taxesMarche(troc.recu);',
];

const CHECKLIST_DEPLOIEMENT = [
  'Site statique sans serveur',
  'Déploiement continu via GitHub',
  'Aucune inscription requise',
  'Gratuit, pour toujours',
];

/** Page 05 · Reportage N°2 : « L'économie du troc » (projet-scanner.md) */
export default function ProjetScanner() {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* Dateline de page */}
        <div className="pt-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {EDITION.dateline} · PAGE 05 / 07
          </p>
          <div aria-hidden="true" className="mt-3 border-t border-ink" />
        </div>

        {/* ── Section 1 · Hero de reportage ─────────────────────────── */}
        <ReportageHero
          kicker="REPORTAGE N°2 · PAGE 05"
          title="L'économie du troc"
          subtitle={
            <>
              Dans <em>Escape from Tarkov</em>, chaque objet cache une équation. Le
              Barter Scanner la résout{NBSP}: quels échanges avec les marchands sont
              rentables, à l'instant où on les consulte{NBSP}?
            </>
          }
          image="/assets/tarkov-hero.jpg"
          imageAlt="Nature morte noir et blanc façon inventaire de jeu : objets de troc disposés en grille avec étiquettes de prix, halftone"
          caption="FIG. 01 · UN INVENTAIRE N'EST PAS UN FOURBI : C'EST UN PORTEFEUILLE."
          pastille="Application web"
          metas={[
            'RÔLE : CONCEPTION · DÉVELOPPEMENT · PUBLICATION',
            'STACK : HTML, JAVASCRIPT, DONNÉES DE MARCHÉ, GITHUB PAGES',
            'STATUT : EN LIGNE',
          ]}
        />

        {/* ── Section 2 · Sommaire du reportage (ancres) ────────────── */}
        <ChapitresNav chapitres={CHAPITRES} />

        {/* ── Section 3 · Chapitre 01 : Le problème ─────────────────── */}
        <section id="chapitre-01" aria-label="Chapitre 1 : le problème" className="py-16 md:py-24">
          <ChapterHeading num="01" title="Le problème" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Le troc de Tarkov propose des centaines d'échanges{NBSP}: objets
                  contre objets. Leur rentabilité dépend des prix du marché, qui
                  bougent en permanence. Calculer à la main, c'est ouvrir trois
                  tableurs et abandonner.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Les joueurs francophones et anglophones partagent le même problème{NBSP}:
                  aucun outil simple, gratuit, sans inscription. La rédaction a donc
                  sorti sa calculatrice et en a fait un produit.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <EncartChiffre kicker="Le constat">
                  Des centaines de troc possibles, des prix qui changent chaque heure,
                  zéro outil accessible.
                </EncartChiffre>
              </Reveal>
            </div>
            <div className="hidden lg:col-start-10 lg:col-span-3 lg:block">
              <Filigrane>01</Filigrane>
            </div>
          </div>
        </section>

        {/* ── Section 4 · Chapitre 02 : Le produit ──────────────────── */}
        <section id="chapitre-02" aria-label="Chapitre 2 : le produit" className="py-16 md:py-24">
          <ChapterHeading num="02" title="Le produit" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <Reveal className="lg:sticky lg:top-20">
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Un tableau, trois idées{NBSP}: ce que le marchand demande, ce qu'il
                  donne, et la marge nette. Tri, recherche, mise à jour des prix. Rien
                  d'autre. La rédaction déteste les usines à gaz.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-start-4 lg:col-span-9">
              <Reveal>
                <FigureReveal
                  src="/assets/tarkov-ui.jpg"
                  alt="Maquette noir et blanc de l'interface du Barter Scanner : tableau de rentabilité, flèches en hachures, barres de progression"
                  caption="FIG. 02 · LE TABLEAU DES ÉCHANGES, TRIÉ PAR MARGE."
                />
              </Reveal>
            </div>
          </div>

          {/* Démo interactive encastrée */}
          <Reveal className="mt-14" delay={0.1}>
            <MiniScanner />
          </Reveal>
        </section>

        {/* ── Section 5 · Chapitre 03 : Sous le capot ───────────────── */}
        <section id="chapitre-03" aria-label="Chapitre 3 : sous le capot" className="py-16 md:py-24">
          <ChapterHeading num="03" title="Sous le capot" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  L'application récupère les données de prix du marché, les normalise,
                  puis calcule la marge de chaque échange{NBSP}: coût des composants
                  contre valeur de revente, taxes du marché déduites. Un échange n'est
                  rentable que si l'écart survit aux frais.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Tout le rendu se fait côté client, sans backend. Choix assumé du
                  vanilla JS{NBSP}: la vitesse d'abord, et la pérennité{NBSP}: pas de
                  framework à maintenir, pas de build qui vieillit mal. Le code
                  d'aujourd'hui tournera encore dans cinq ans.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-start-8 lg:col-span-5">
              <Reveal className="lg:sticky lg:top-20">
                <CodeBlock lines={CODE_MARGE} file="marge.js" />
                <p className="mt-4 font-body text-[0.8rem] italic leading-relaxed text-ink-soft">
                  Trois lignes de calcul, et des heures de tableur économisées à
                  chaque raid.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Section 6 · Chapitre 04 : La mise en ligne ────────────── */}
        <section id="chapitre-04" aria-label="Chapitre 4 : la mise en ligne" className="py-16 md:py-24">
          <ChapterHeading num="04" title="La mise en ligne" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Hébergement statique via GitHub Pages, déploiement à chaque commit,
                  README documenté, zéro coût d'infrastructure. Pas de compte à créer,
                  pas de serveur à réveiller{NBSP}: on ouvre l'adresse, on consulte, on
                  repart jouer.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-black italic leading-tight">
                  «{NBSP}Un produit utile ne demande parfois qu'un dépôt et de la
                  discipline.{NBSP}»
                </p>
              </Reveal>
            </div>
            <div className="lg:col-start-8 lg:col-span-5">
              <Reveal className="lg:sticky lg:top-20">
                <Checklist title="Le déploiement, point par point" items={CHECKLIST_DEPLOIEMENT} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Section 7 · Chapitre 05 : Les résultats ───────────────── */}
        <section id="chapitre-05" aria-label="Chapitre 5 : les résultats" className="py-16 md:py-24">
          <ChapterHeading num="05" title="Les résultats" />
          <div className="mt-10">
            <Reveal>
              <ResultatsBandeau
                items={[
                  { valeur: '100 %', label: 'CÔTÉ CLIENT, AUCUN SERVEUR' },
                  { valeur: '< 1 s', label: 'DE TEMPS DE CHARGEMENT VISÉ' },
                  { valeur: '3', label: 'IDÉES PAR LIGNE : DEMANDE, DON, MARGE' },
                  { valeur: '0 €', label: `D'INFRASTRUCTURE` },
                ]}
              />
            </Reveal>

            <Reveal className="mt-10" delay={0.1}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={IDENTITY.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OUVRIR"
                  className="group inline-flex items-center gap-3 border-[1.5px] border-ink bg-paper px-6 py-3.5 font-grotesk text-sm font-extrabold uppercase tracking-[0.1em] transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  Ouvrir l'application
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </a>
                <a
                  href={IDENTITY.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border-[1.5px] border-ink/40 bg-paper px-6 py-3.5 font-grotesk text-sm font-extrabold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
                >
                  Voir le code source
                </a>
              </div>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
                {IDENTITY.github} · pages.github.io
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Section 8 · Poursuivre la lecture ─────────────────────── */}
        <PoursuivreLecture
          prev={{ titre: 'Traduire l\u2019intraduisible', route: '/projets/localisation-wttg3' }}
          next={{ titre: 'Hors-champ', route: '/hors-champ', etiquette: 'Dossier suivant →' }}
        />

        <Folio page="05" />
      </div>
    </div>
  );
}
