import { Link } from 'react-router';
import Folio from '@/components/Folio';
import NoteDeLaRedaction from '@/components/NoteDeLaRedaction';
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
import { asset, EDITION, IDENTITY } from '@/lib/identity';

const NBSP = ' ';

/** Dépôt public du patch · source unique des faits de ce reportage */
const REPO_URL = 'https://github.com/Mbappinho/WTTG3-FR-Traduction';

const CHAPITRES: Chapitre[] = [
  { id: 'chapitre-01', label: `01 Le constat` },
  { id: 'chapitre-02', label: '02 Le pipeline' },
  { id: 'chapitre-03', label: '03 La traduction' },
  { id: 'chapitre-04', label: `04 L'installeur` },
  { id: 'chapitre-05', label: '05 La publication' },
];

const CODE_PIPELINE = [
  '# 1. Extraire les assets legacy du jeu (Unreal Engine 5.6)',
  'retoc to-legacy .\\source\\ .\\source\\legacy_ui_steam',
  '# 2. Patcher les FStrings via UAssetGUI JSON + dictionnaires FR',
  'python scripts\\build_ui_uassetgui_patch.py',
  '# 3. Re-empaqueter en IoStore _P',
  'retoc to-zen --version UE5_6 .\\patched\\ WTTGSD-Windows_FR_P.pak',
  '# 4. Generer le pack debutant (INSTALLER.bat / DESINSTALLER.bat)',
  'powershell -File scripts\\build_beginner_pack.ps1',
];

const CHECKLIST_INSTALLEUR = [
  'Détection automatique du BuildID Steam',
  'Compatibilité signalée avant installation',
  'Désinstalleur propre inclus (DESINSTALLER.bat)',
  'Option AZERTY (ZQSD) au choix dans l’installeur',
  'Sous-titres de cinématiques en option (désactivés par défaut)',
];

/** Page 04 · Reportage N°1 : « Traduire l'intraduisible » (projet-localisation.md) */
export default function ProjetLocalisation() {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* Dateline de page */}
        <div className="pt-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {EDITION.dateline} · PAGE 04 / 07
          </p>
          <div aria-hidden="true" className="mt-3 border-t border-ink" />
        </div>

        {/* ── Section 1 · Hero de reportage ─────────────────────────── */}
        <ReportageHero
          kicker="REPORTAGE N°1 · PAGE 04"
          title="Traduire l'intraduisible"
          subtitle={
            <>
              Patch de localisation française non officiel pour <em>Welcome to the Game
              III</em>{NBSP}: pipeline d'extraction et de réinjection, installeur grand
              public et releases rebuildées après chaque mise à jour Steam.
            </>
          }
          image={asset('wttg3-hero.jpg')}
          imageAlt="Écran d'ordinateur CRT dans une pièce sombre, interface texte de Welcome to the Game III, noir et blanc halftone"
          caption="FIG. 01 · L'ANTRE DU JEU : UNE INTERFACE ENTIÈREMENT À REFAIRE PARLER FRANÇAIS."
          pastille="Open source"
          metas={[
            'RÔLE : TRADUCTEUR · DÉVELOPPEUR · ÉDITEUR',
            `STACK : PYTHON, POWERSHELL, RETOC, UASSETGUI, GIT`,
            'STATUT : PACK V1.7.2 · PUBLIÉ, MAINTENU',
          ]}
        />

        {/* ── Section 2 · Sommaire du reportage (ancres) ────────────── */}
        <ChapitresNav chapitres={CHAPITRES} />

        {/* ── Section 3 · Chapitre 01 : Le constat ──────────────────── */}
        <section id="chapitre-01" aria-label="Chapitre 1 : le constat" className="py-16 md:py-24">
          <ChapterHeading num="01" title="Le constat" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  <em>Welcome to the Game III</em> n'a jamais été traduit en français.
                  Un jeu d'horreur narratif dont toute la tension passe par l'écran{NBSP}:
                  menus, mails, chats chiffrés, sites fictifs. Pour un joueur
                  francophone, l'immersion s'arrête au premier écran.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  La rédaction a décidé de régler le problème. Entièrement. Pas un
                  patch partiel, pas une machine translation jetée par-dessus{NBSP}: une
                  localisation complète, relue, testée en jeu et publiée pour tout le
                  monde. Le pack actuel, <strong>v1.7.2</strong>, est calé sur le
                  BuildID Steam <strong>24463842</strong> (AppID 3869850){NBSP}: après
                  chaque mise à jour du jeu, la traduction peut casser, et le pack est
                  rebuildé.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <EncartChiffre kicker="Le chiffre">
                  v1.7.2, version actuelle du pack, distribuée en deux formats{NBSP}:
                  installeur Steam prêt à l'emploi et variante Nexus Mods.
                </EncartChiffre>
              </Reveal>
            </div>
            <div className="hidden lg:col-start-10 lg:col-span-3 lg:block">
              <Filigrane>01</Filigrane>
            </div>
          </div>
        </section>

        {/* ── Section 4 · Chapitre 02 : Le pipeline ─────────────────── */}
        <section id="chapitre-02" aria-label="Chapitre 2 : le pipeline" className="py-16 md:py-24">
          <ChapterHeading num="02" title="Sortir le texte de la machine" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Première étape{NBSP}: ouvrir les assets du jeu. Les textes sont des
                  FStrings enfouies dans des fichiers binaires Unreal Engine 5.6{NBSP}: rien
                  d'exploitable à la main. Le pipeline commence par une extraction des
                  assets legacy avec <em>retoc</em> (<code>to-legacy</code>), adossée à
                  un fichier de mappings <code>usmap</code> obtenu pour la bonne version
                  du moteur.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Viennent ensuite les scripts maison, publiés avec le dépôt{NBSP}: patch
                  des FStrings via des exports JSON d'UAssetGUI et des dictionnaires
                  français en CSV/JSON (<code>build_ui_uassetgui_patch.py</code>),
                  ré-empaquetage en conteneur IoStore <code>_P</code> avec{' '}
                  <code>retoc to-zen</code>, puis génération du pack débutant en
                  PowerShell (<code>build_beginner_pack.ps1</code>). Chaque build passe
                  par une QA en jeu{NBSP}: la chaîne tronquée, l'accent corrompu ou
                  l'écran qui refuse de s'afficher sont traqués, consignés et patchés.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <FigureReveal
                  src={asset('wttg3-tools.jpg')}
                  alt="Flux de traduction en noir et blanc : extraits de fichiers texte, tableur de chaînes françaises, fenêtre de terminal"
                  caption="FIG. 02 · LA CHAÎNE DE TRADUCTION : EXTRAIRE, TRADUIRE, RÉINJECTER."
                  className="mt-4"
                />
              </Reveal>
            </div>
            <div className="lg:col-start-8 lg:col-span-5">
              <Reveal className="lg:sticky lg:top-20">
                <CodeBlock lines={CODE_PIPELINE} file="build_ui_uassetgui_patch.py" />
                <p className="mt-4 font-body text-[0.8rem] italic leading-relaxed text-ink-soft">
                  Le pipeline complet (scripts Python et PowerShell, dictionnaires,
                  documentation) est versionné dans le dépôt, pas le jeu.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Section 5 · Chapitre 03 : La traduction ───────────────── */}
        <section id="chapitre-03" aria-label="Chapitre 3 : la traduction" className="py-16 md:py-24">
          <ChapterHeading num="03" title="La traduction" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Le jeu simule un ordinateur{NBSP}: le français doit sonner «{NBSP}système{NBSP}»,
                  pas «{NBSP}roman{NBSP}». Menus, interface, inventaire et DarkDrop sont
                  traduits avec leurs accents, encodés en UTF-16 au format FString,
                  ainsi que les prompts d'interaction du monde (Ouvrir, Déverrouiller,
                  Allumer, Se cacher…) et les prompts [RMB].
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Le gros du morceau se cache dans les chats{NBSP}: CryptChat et ACRS,
                  salon public et dialogues des agents, jusqu'aux 299 topics de spam du
                  lobby, plus les PDF accessibles en jeu, dont le document «{NBSP}Contestants{NBSP}».
                  Certains contenus sont volontairement exclus{NBSP}: les sites du Dark
                  Net et le doublage audio restent en anglais, et le HUD de mouvement
                  n'est tout simplement pas patchable (ses noms sont figés par Enhanced
                  Input). Chaque choix est documenté, et la revue linguistique (QA en
                  jeu, findings patchés) est publiée dans le dépôt.
                </p>
              </Reveal>
            </div>
            <div className="space-y-8 lg:col-start-9 lg:col-span-4">
              <Reveal className="lg:sticky lg:top-20">
                <blockquote className="border-l-2 border-red pl-6 font-display text-[clamp(1.3rem,2vw,1.8rem)] font-black italic leading-tight">
                  «{NBSP}Traduire un jeu, c'est doubler un acteur{NBSP}: il faut que les
                  lèvres suivent.{NBSP}»
                </blockquote>
                <NoteDeLaRedaction className="mt-8">
                  C'est ici que la formation Info-Com paie ses factures{NBSP}: registre,
                  cohérence, lectorat.
                </NoteDeLaRedaction>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Section 6 · Chapitre 04 : L'installeur ────────────────── */}
        <section id="chapitre-04" aria-label="Chapitre 4 : l'installeur" className="py-16 md:py-24">
          <ChapterHeading num="04" title="L'installeur automatisé" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-7">
              <Reveal>
                <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-black italic leading-tight">
                  «{NBSP}Une traduction que personne n'installe n'existe pas.{NBSP}»
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  La distribution est pensée pour le grand public{NBSP}: un pack «{NBSP}débutant{NBSP}»
                  prêt à l'emploi dans les Releases GitHub
                  (<code>WTTG3-FR-Traduction.zip</code> → <code>INSTALLER.bat</code> /{' '}
                  <code>DESINSTALLER.bat</code>), et une variante Nexus Mods
                  «{NBSP}drop-in{NBSP}» sans scripts, à dézipper dans le dossier du jeu.
                  L'installeur détecte automatiquement le BuildID Steam et signale si le
                  pack est compatible, parce qu'après chaque mise à jour du jeu, la
                  traduction peut casser, et qu'un vieux pack réinstallé ne suffit pas.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Deux options à la carte{NBSP}: un pack AZERTY (ZQSD) proposé à
                  l'installation, et des sous-titres de cinématiques (v1.7.0+, UE4SS
                  expérimental et fichiers <code>.srt</code>, contribution externe
                  d'«{NBSP}iPresing{NBSP}»), désactivés par défaut, comme toute bonne
                  fonctionnalité expérimentale.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-start-8 lg:col-span-5">
              <Reveal className="lg:sticky lg:top-20">
                <Checklist title="L'installeur, point par point" items={CHECKLIST_INSTALLEUR} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Section 7 · Chapitre 05 : La publication ──────────────── */}
        <section id="chapitre-05" aria-label="Chapitre 5 : la publication" className="py-16 md:py-24">
          <ChapterHeading num="05" title="La publication" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="max-w-[62ch] space-y-6 lg:col-span-4">
              <Reveal>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Le projet vit sur un dépôt GitHub public qui contient le code source
                  du pipeline (scripts Python et PowerShell, dictionnaires FR,
                  documentation d'installation et de compatibilité Steam), et pas le
                  jeu. C'est un projet communautaire, non affilié aux développeurs, et
                  il le dit noir sur blanc.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  Le savoir-faire ne reste pas dans un tiroir{NBSP}: le kit complet
                  (méthode, glossaire, outillage) a déjà été réexporté vers un autre
                  jeu, <em>Scrutinized</em>. Un pipeline documenté est un pipeline qui
                  se transmet.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-start-5 lg:col-span-8">
              <Reveal>
                <FigureReveal
                  src={asset('wttg3-github.jpg')}
                  alt="Page de dépôt GitHub en noir et blanc halftone : README avec badges, liste de releases, étoiles"
                  caption="FIG. 03 · LE DÉPÔT PUBLIC : PIPELINE, DICTIONNAIRES, RELEASES VERSIONNÉES."
                />
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-14">
            <ResultatsBandeau
              items={[
                { valeur: 'v1.7.2', label: 'VERSION ACTUELLE DU PACK' },
                { valeur: '100 %', label: `DE L'INTERFACE TRADUITE` },
                { valeur: '299', label: 'TOPICS CRYPTCHAT / ACRS TRADUITS' },
                { valeur: '2', label: 'FORMATS : STEAM + NEXUS MODS' },
              ]}
            />
          </Reveal>

          <Reveal className="mt-10">
            <div className="flex flex-wrap gap-4">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor="OUVRIR"
                className="group inline-flex items-center gap-3 border-[1.5px] border-ink bg-paper px-6 py-3.5 font-grotesk text-sm font-extrabold uppercase tracking-[0.1em] transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                Consulter le dépôt GitHub
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </a>
              <a
                href={`${REPO_URL}/blob/main/docs/INSTALL.md`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border-[1.5px] border-ink/40 bg-paper px-6 py-3.5 font-grotesk text-sm font-extrabold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                Lire le guide d'installation
              </a>
            </div>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
              <Link to="/contact" className="link-ink">
                {IDENTITY.github}
              </Link>
            </p>
          </Reveal>
        </section>

        {/* ── Section 8 · Poursuivre la lecture ─────────────────────── */}
        <PoursuivreLecture
          prev={{ titre: 'La couverture', route: '/' }}
          next={{ titre: `L'économie du troc`, route: '/projets/tarkov-barter-scanner' }}
        />

        <Folio page="04" />
      </div>
    </div>
  );
}
