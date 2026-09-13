import { Link } from 'react-router';
import Marquee from '@/components/Marquee';
import { EDITION, IDENTITY } from '@/lib/identity';

/** Colophon abrégé (design §6.7) · toutes pages sauf Contact */
export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* Filet triple */}
        <div aria-hidden="true" className="border-t-2 border-ink" />
        <div aria-hidden="true" className="mt-[3px] border-t border-ink" />

        <div className="grid gap-10 py-12 md:grid-cols-3">
          {/* Logotype + baseline */}
          <div>
            <Link to="/" className="font-display text-4xl font-black tracking-tight">
              {IDENTITY.logotype.slice(0, -1)}
              <span className="text-red">.</span>
            </Link>
            <p className="mt-3 max-w-[28ch] font-body italic text-ink-soft">{EDITION.baseline}</p>
          </div>

          {/* Liens */}
          <nav aria-label="Liens externes" className="md:justify-self-center">
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
          <div className="md:justify-self-end md:text-right">
            <p className="font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
              {EDITION.copyright}
              <br />
              {EDITION.issn} · {EDITION.dateline}
            </p>
          </div>
        </div>
      </div>

      {/* Marquee bas */}
      <Marquee
        variant="ink"
        slow
        items={['STAGE', 'ALTERNANCE', 'NUMÉRIQUE', 'COMMUNICATION']}
      />
    </footer>
  );
}
