import Folio from '@/components/Folio';
import { EDITION } from '@/lib/identity';

interface StubPageProps {
  /** Numéro de page du magazine (02–07) */
  page: string;
  /** Titre de rubrique */
  title: string;
  /** Sous-titre / rôle de la page */
  subtitle: string;
}

/**
 * Stub de rubrique · remplacé par l'implémentation complète de la page.
 * Ne pas ajouter de padding-top : la barre de une est compensée par Layout.
 */
export default function StubPage({ page, title, subtitle }: StubPageProps) {
  return (
    <div className="mx-auto max-w-container px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
        {EDITION.dateline} · PAGE {page} / 07
      </p>
      <div aria-hidden="true" className="mt-3 border-t border-ink" />
      <p className="kicker mt-10 text-red">Rubrique {page}</p>
      <h1 className="mt-4 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-black leading-[0.95] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-6 max-w-[62ch] font-body text-lg italic leading-relaxed text-ink-soft">
        {subtitle}
      </p>
      <p className="mt-10 border border-dashed border-ink/40 p-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
        Page en cours de composition. Revenez au prochain tirage.
      </p>
      <Folio page={page} />
    </div>
  );
}
