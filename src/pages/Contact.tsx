import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Github, Mail } from 'lucide-react';
import Folio from '@/components/Folio';
import Marquee from '@/components/Marquee';
import CopyButton from '@/components/contact/CopyButton';
import { asset, EDITION, IDENTITY } from '@/lib/identity';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NBSP = ' ';

/** Découpage manuel en mots, chaque mot dans un masque overflow-hidden (SplitText sûr avec React) */
function Words({ text, wordClass, className }: { text: string; wordClass: string; className?: string }) {
  return (
    <span className={className} role="text" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className={cn(wordClass, 'inline-block will-change-transform')}>{w}</span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

/** §3 · Les coordonnées : icône Lucide fine, label mono rouge, valeur Archivo 700, copie au clic */
const COORDS = [
  {
    icon: Mail,
    label: 'COURRIER',
    value: IDENTITY.email,
    href: `mailto:${IDENTITY.email}`,
    external: false,
    note: `La voie royale. Réponse sous 48${NBSP}h, souvent moins.`,
  },
  {
    icon: Github,
    label: 'DÉPÔTS',
    value: IDENTITY.github,
    href: IDENTITY.githubUrl,
    external: true,
    note: `Le code, les README, les releases${NBSP}: toute la preuve par les dépôts.`,
  },
] as const;

/** §4 · Le vrai colophon (mentions de revue) */
const MENTIONS_LEFT = [
  `DIRECTION DE LA PUBLICATION${NBSP}: ${IDENTITY.name.toUpperCase()}`,
  `RÉDACTION, MAQUETTE, CODE${NBSP}: ${IDENTITY.name.toUpperCase()}`,
  `PHOTOGRAPHIES${NBSP}: ILLUSTRATIONS GÉNÉRÉES, HALFTONE N&B`,
  `TYPOGRAPHIES${NBSP}: PLAYFAIR DISPLAY, ARCHIVO, SPACE MONO, NEWSREADER`,
];
const MENTIONS_RIGHT = [
  { text: `DÉPÔT LÉGAL${NBSP}: SEPTEMBRE 2026`, red: false },
  { text: `ISSN${NBSP}: 2026-0001 (FICTIF)`, red: false },
  { text: `TIRAGE${NBSP}: UNIQUE, NUMÉRIQUE`, red: false },
  { text: `PRIX${NBSP}: LIBRE${NBSP}·${NBSP}L'EMBAUCHE EST APPRÉCIÉE`, red: true },
];

/**
 * Page 07 · Colophon (contact.md).
 * Le Footer global est masqué sur /contact par Layout : la section 6 ci-dessous
 * en est la version complète (filet triple, trois colonnes, marquee).
 */
export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return; // contenu visible tel quel, révélation simple

      // §1 · En-tête : kicker scaleX, titre par mots (stagger 0.04), chapo fondu retard 0.4
      gsap.from('.ct-rule-top', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.inOut' });
      gsap.from('.ct-kicker', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power3.out', delay: 0.2 });
      gsap.from('.ct-title-word', { yPercent: 110, rotate: 2, stagger: 0.04, duration: 1, ease: 'power4.out', delay: 0.25 });
      gsap.from('.ct-chapo', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', delay: 0.4 });

      // §2 · Annonce : filets dessinés (0.8s), pastille back.out(2), mots retard 0.4, bouton retard 1
      const st2: ScrollTrigger.Vars = { trigger: '.ct-annonce', start: 'top 80%' };
      gsap.from('.ct-border-h', { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st2 });
      gsap.from('.ct-border-v', { scaleY: 0, transformOrigin: 'center top', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st2 });
      gsap.from('.ct-pastille', { scale: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.7, scrollTrigger: st2 });
      gsap.from('.ct-annonce-word', { yPercent: 110, rotate: 2, stagger: 0.05, duration: 1, ease: 'power4.out', delay: 0.4, scrollTrigger: st2 });
      gsap.from('.ct-annonce-sub', { opacity: 0, y: 12, duration: 0.7, ease: 'power2.out', delay: 0.9, scrollTrigger: st2 });
      gsap.from('.ct-annonce-btn', { scale: 0.9, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 1, scrollTrigger: st2 });
      gsap.from('.ct-stamp', { opacity: 0, rotate: -30, duration: 0.7, ease: 'power2.out', delay: 1.1, scrollTrigger: st2 });

      // §3 · Coordonnées : blocs stagger 0.12 (y 30px, trigger 80%)
      gsap.utils.toArray<HTMLElement>('.ct-coord').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      });

      // §4 · Mentions : lignes stagger 0.05 (x -16 fondu, trigger 85%)
      gsap.utils.toArray<HTMLElement>('.ct-mention').forEach((el, i) => {
        gsap.from(el, {
          x: -16,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: i * 0.05,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // §5 · Citation mot par mot (stagger 0.05, trigger 75%), barcode scaleY depuis le bas (0.6s)
      gsap.from('.ct-quote-word', {
        yPercent: 110,
        stagger: 0.05,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ct-quote', start: 'top 75%' },
      });
      gsap.from('.ct-barcode', {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-barcode', start: 'top 90%' },
      });
      gsap.from('.ct-retour', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.ct-retour', start: 'top 90%' },
      });

      // §6 · Colophon complet : colonnes fondu simple (trigger 90%)
      gsap.from('.ct-foot-col', {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.ct-footer', start: 'top 90%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root}>
      <div className="mx-auto max-w-container px-5 py-12 md:px-8 md:py-16">
        {/* Dateline + folio courant (règle éditoriale §3) */}
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
          {EDITION.dateline} · PAGE 07 / 07
        </p>
        <div aria-hidden="true" className="ct-rule-top mt-3 border-t border-ink" />

        {/* §1 · En-tête */}
        <header className="mt-10">
          <p className="ct-kicker kicker text-red">Colophon · Page 07</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-black leading-[0.95] tracking-[-0.02em]">
            <Words text="Le mot de la fin" wordClass="ct-title-word" />
          </h1>
          <p className="ct-chapo mt-6 max-w-[62ch] font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65] text-ink-soft">
            Dans une revue, le colophon liste l'imprimeur et l'encre. Ici, il liste les moyens de
            joindre la rédaction, et une seule annonce, répétée sans honte.
          </p>
        </header>

        {/* §2 · L'annonce (CTA principal) */}
        <section aria-label="Annonce : stage ou alternance" className="ct-annonce relative mx-auto mt-24 max-w-5xl">
          {/* Encadré double filet 3px, dessiné au scroll */}
          <div aria-hidden="true" className="ct-border-h absolute inset-x-0 top-0 border-t-[3px] border-double border-ink" />
          <div aria-hidden="true" className="ct-border-h absolute inset-x-0 bottom-0 border-b-[3px] border-double border-ink" />
          <div aria-hidden="true" className="ct-border-v absolute inset-y-0 left-0 border-l-[3px] border-double border-ink" />
          <div aria-hidden="true" className="ct-border-v absolute inset-y-0 right-0 border-r-[3px] border-double border-ink" />
          {/* Pastille rouge centrée sur le filet */}
          <p className="ct-pastille absolute -top-[0.9rem] left-1/2 -translate-x-1/2 -rotate-[1.5deg] bg-red px-3 py-1 font-grotesk text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper">
            Annonce
          </p>
          {/* Tampon « DISPONIBLE » réutilisé en petit */}
          <img
            src={asset('stamp-dispo.svg')}
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            className="ct-stamp absolute -top-14 right-2 hidden w-24 rotate-[-8deg] md:block lg:-right-8 lg:w-28"
          />
          <div className="px-6 py-14 text-center md:px-16 md:py-20">
            <h2 className="font-display text-[clamp(2rem,5.5vw,5rem)] font-black leading-[1.02] tracking-[-0.02em]">
              <Words text="La rédaction recherche un stage ou une alternance." wordClass="ct-annonce-word" />
            </h2>
            <p className="ct-annonce-sub mx-auto mt-6 max-w-[52ch] font-body italic leading-relaxed text-ink-soft">
              Numérique · Communication · Technologies. Disponible dès septembre 2026, mobile,
              motivé, déjà publié.
            </p>
            <a
              href={`mailto:${IDENTITY.email}`}
              data-cursor="ÉCRIRE"
              className="ct-annonce-btn group mt-10 inline-flex items-center gap-3 bg-red px-8 py-4 font-grotesk text-sm font-extrabold uppercase tracking-[0.14em] text-paper transition-all duration-[250ms] hover:scale-[1.02] hover:bg-red-deep md:px-10 md:py-5 md:text-base"
            >
              Écrire à la rédaction
              <span aria-hidden="true" className="inline-block transition-transform duration-[250ms] group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </section>

        {/* §3 · Les coordonnées (deux colonnes filetées) */}
        <section aria-label="Coordonnées de la rédaction" className="mt-24">
          <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            <span>Les coordonnées</span>
            <span aria-hidden="true">Copie au clic</span>
          </div>
          <div className="mt-8 grid border-y border-ink md:grid-cols-2">
            {COORDS.map((c, i) => (
              <article
                key={c.label}
                className={cn(
                  'ct-coord flex flex-col gap-4 px-1 py-8 md:px-8 md:py-10',
                  i > 0 && 'border-t border-ink md:border-l md:border-t-0',
                  i === 0 && 'md:pl-1',
                  i === COORDS.length - 1 && 'md:pr-1',
                )}
              >
                <c.icon aria-hidden="true" strokeWidth={1.5} className="h-6 w-6 text-ink" />
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-red">{c.label}</p>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="link-ink inline-block w-fit break-all font-grotesk text-lg font-bold transition-transform duration-200 hover:translate-x-1 md:text-xl"
                >
                  {c.value}
                </a>
                <p className="font-body text-[0.95rem] italic leading-relaxed text-ink-soft">{c.note}</p>
                <CopyButton value={c.value} className="mt-auto self-start" />
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* §4 · Le vrai colophon (mentions de revue) */}
      <section aria-label="Mentions de la revue" className="mt-24 border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-container px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <ul className="space-y-2 font-mono text-[0.75rem] uppercase leading-relaxed tracking-[0.08em] text-ink">
              {MENTIONS_LEFT.map((l) => (
                <li key={l} className="ct-mention">
                  {l}
                </li>
              ))}
            </ul>
            <ul className="space-y-2 font-mono text-[0.75rem] uppercase leading-relaxed tracking-[0.08em] text-ink">
              {MENTIONS_RIGHT.map((m) => (
                <li key={m.text} className={cn('ct-mention', m.red && 'text-red')}>
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* §5 · Mot de la fin + retour couverture */}
        <section aria-label="Mot de la fin" className="mt-24 text-center">
          <blockquote className="ct-quote mx-auto max-w-3xl font-display text-[clamp(1.4rem,3vw,2.4rem)] font-black italic leading-snug">
            <Words
              text={`«${NBSP}Fin du premier numéro. Merci de l'avoir lu jusqu'au bout. Le deuxième se rédige déjà.${NBSP}»`}
              wordClass="ct-quote-word"
            />
          </blockquote>
          <div className="ct-barcode mt-10 inline-block">
            <img
              src={asset('barcode.svg')}
              alt="Code-barres décoratif, ISSN 2026-0001"
              width={300}
              height={120}
              className="h-auto w-[220px]"
            />
          </div>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {EDITION.dateline}
          </p>
          <p className="ct-retour mt-12">
            <Link
              to="/"
              data-cursor="OUVRIR"
              className="group inline-flex items-center gap-3 font-grotesk text-xl font-extrabold uppercase tracking-[0.06em] transition-colors duration-200 hover:italic hover:text-red md:text-2xl"
            >
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:-translate-x-2">
                ←
              </span>
              Relire depuis la couverture
            </Link>
          </p>
        </section>

        <Folio page="07" />
      </div>

      {/* §6 · Footer global, version complète (masqué par Layout sur /contact) */}
      <footer className="ct-footer mt-16">
        <div className="mx-auto max-w-container px-5 md:px-8">
          {/* Filet triple */}
          <div aria-hidden="true" className="border-t-2 border-ink" />
          <div aria-hidden="true" className="mt-[3px] border-t border-ink" />

          <div className="grid gap-10 py-12 md:grid-cols-3">
            {/* Logotype + baseline */}
            <div className="ct-foot-col">
              <Link to="/" className="font-display text-4xl font-black tracking-tight">
                {IDENTITY.logotype.slice(0, -1)}
                <span className="text-red">.</span>
              </Link>
              <p className="mt-3 max-w-[28ch] font-body italic text-ink-soft">{EDITION.baseline}</p>
            </div>

            {/* Liens */}
            <nav aria-label="Liens externes" className="ct-foot-col md:justify-self-center">
              <p className="kicker text-red">Écrire au rédacteur</p>
              <ul className="mt-4 space-y-2 font-grotesk font-bold uppercase tracking-[0.08em]">
                <li>
                  <a className="link-ink" href={`mailto:${IDENTITY.email}`}>
                    {IDENTITY.email}
                  </a>
                </li>
                <li>
                  <a className="link-ink" href={IDENTITY.githubUrl} target="_blank" rel="noreferrer">
                    {IDENTITY.github}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mentions */}
            <div className="ct-foot-col md:justify-self-end md:text-right">
              <p className="font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
                {EDITION.copyright}
                <br />
                {EDITION.issn} · {EDITION.dateline}
              </p>
            </div>
          </div>
        </div>

        {/* Marquee bas · 35 s, pause au survol */}
        <Marquee
          variant="ink"
          items={['MERCI DE VOTRE LECTURE', 'STAGE', 'ALTERNANCE', 'NUMÉRIQUE', 'COMMUNICATION']}
        />
      </footer>
    </div>
  );
}
