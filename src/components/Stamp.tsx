import { memo, useId } from 'react';
import { cn } from '@/lib/utils';

interface StampProps {
  /** Texte en arc (ex. « DISPONIBLE », « PROLÉTARIAT CRÉATIF ») */
  text: string;
  /** Mention intérieure en bas (ex. « ÉDITION N°1 ») */
  subtext?: string;
  size?: number;
  /** Rotation lente infinie (20s) ; sinon inclinaison statique */
  spin?: boolean;
  tilt?: number;
  className?: string;
}

/**
 * Tampon circulaire rouge · double cercle, texte en arc (textPath), étoile centrale.
 * Variantes : « DISPONIBLE », « OPEN SOURCE », « AUTODIDACTE », « PROLÉTARIAT CRÉATIF ».
 */
function StampInner({ text, subtext, size = 160, spin = false, tilt = -8, className }: StampProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arcTop = `stamp-top-${uid}`;
  const arcBottom = `stamp-bottom-${uid}`;
  const repeated = `${text} · ${text} · ${text} · `;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      role="img"
      aria-label={`Tampon : ${text.toLowerCase()}`}
      className={cn('pointer-events-none select-none', spin && 'animate-spin-slow', className)}
      style={spin ? undefined : { transform: `rotate(${tilt}deg)` }}
    >
      <defs>
        <path id={arcTop} d="M 200,200 m -138,0 a 138,138 0 1,1 276,0 a 138,138 0 1,1 -276,0" />
        <path id={arcBottom} d="M 200,200 m -104,0 a 104,104 0 1,1 208,0 a 104,104 0 1,1 -208,0" />
      </defs>
      <g fill="none" stroke="#E03A1E">
        <circle cx="200" cy="200" r="188" strokeWidth="6" />
        <circle cx="200" cy="200" r="176" strokeWidth="2" />
        <circle cx="200" cy="200" r="86" strokeWidth="2" />
        <circle cx="200" cy="200" r="80" strokeWidth="1" />
      </g>
      <g fill="#E03A1E" fontFamily="Archivo, sans-serif" fontWeight={700}>
        <text fontSize={text.length > 14 ? 30 : 36} letterSpacing="6">
          <textPath href={`#${arcTop}`}>{repeated}</textPath>
        </text>
        {subtext ? (
          <text fontSize="20" letterSpacing="3" transform="rotate(180 200 200)">
            <textPath href={`#${arcBottom}`}>{subtext}</textPath>
          </text>
        ) : null}
        <path d="M200 132 l16.5 42.5 45.5 2.5 -36 29.5 12.5 44 -38.5 -25.5 -38.5 25.5 12.5 -44 -36 -29.5 45.5 -2.5 z" />
      </g>
    </svg>
  );
}

const Stamp = memo(StampInner);
export default Stamp;
