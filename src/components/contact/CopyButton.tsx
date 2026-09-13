import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  /** Valeur copiée dans le presse-papiers au clic */
  value: string;
  className?: string;
}

/**
 * Bouton « COPIER » (contact.md §3) · au clic, copie la valeur puis affiche
 * « COPIÉ ✓ » en pastille rouge pendant 1,5 s (Framer Motion AnimatePresence).
 */
export default function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Repli pour les contextes sans API Clipboard (http, permissions refusées)
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-label={copied ? `${value} copié dans le presse-papiers` : `Copier ${value}`}
      className={cn(
        'inline-flex min-w-[7.5rem] items-center justify-center border-[1.5px] px-3 py-1.5 font-grotesk text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors duration-200',
        copied
          ? 'border-red bg-red text-paper'
          : 'border-ink bg-paper text-ink hover:bg-ink hover:text-paper',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copie"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            Copié ✓
          </motion.span>
        ) : (
          <motion.span
            key="copier"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            Copier
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
