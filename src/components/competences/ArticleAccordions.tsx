import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export type ArticleTag = 'LANGAGE' | 'OUTIL' | 'PRATIQUE';

export interface ArticleLink {
  /** Libellé du lien (ex. « Voir le reportage, p. 04 ») */
  label: string;
  to: string;
  external?: boolean;
}

export interface Article {
  title: string;
  tag: ArticleTag;
  body: string;
  link?: ArticleLink;
}

interface ArticleAccordionsProps {
  articles: Article[];
  /** Préfixe d'id unique par rubrique (aria) */
  idPrefix: string;
}

const EASE_INOUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/**
 * Accordéons « articles » (competences.md §2) · filet haut, titre Archivo 700,
 * pastille Space Mono, chevron « + » qui tourne en « × ». Un seul ouvert à la
 * fois ; hauteur animée 0→auto, contenu fondu. L'entrée de la liste (stagger)
 * est animée par la page (GSAP) sur .acc-item.
 */
export default function ArticleAccordions({ articles, idPrefix }: ArticleAccordionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : 0.45;

  return (
    <ul className="acc-list">
      {articles.map((article, i) => {
        const open = openIndex === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const buttonId = `${idPrefix}-button-${i}`;
        return (
          <li key={article.title} className="acc-item border-t border-ink/40 last:border-b">
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : i)}
              className="group flex w-full items-center gap-4 px-1 py-4 text-left transition-colors duration-200 hover:bg-paper-deep"
            >
              <span className="font-grotesk text-base font-bold leading-snug md:text-lg">
                {article.title}
              </span>
              <span className="ml-auto flex shrink-0 items-center gap-4">
                <span className="hidden -rotate-[1.5deg] bg-red px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper sm:inline-block">
                  {article.tag}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center border-[1.5px] border-ink font-grotesk text-lg font-bold leading-none transition-colors duration-200 group-hover:bg-ink group-hover:text-paper"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                >
                  +
                </motion.span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration, ease: EASE_INOUT }}
                >
                  <motion.div
                    className="px-1 pb-6"
                    initial={reduced ? false : { y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.1 }}
                  >
                    <p className="max-w-[62ch] font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65] text-ink-soft">
                      {article.body}
                    </p>
                    {article.link &&
                      (article.link.external ? (
                        <a
                          href={article.link.to}
                          target="_blank"
                          rel="noreferrer"
                          className="link-ink mt-3 inline-block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-red"
                          data-cursor="LIRE"
                        >
                          {article.link.label} →
                        </a>
                      ) : (
                        <Link
                          to={article.link.to}
                          className="link-ink mt-3 inline-block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-red"
                          data-cursor="LIRE"
                        >
                          {article.link.label} →
                        </Link>
                      ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
