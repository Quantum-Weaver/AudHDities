// src/components/asgard/domains/mnemosyne/grammar/SenseWall.tsx

import Link from 'next/link';
import {
  NO_MARK_WORN,
  SENSES_SOURCE,
  SENSES_TRUNCATED,
  WALL_HEADING,
  wallLine,
  type SensesWall,
} from '@/lib/grammar/grammar-contract';

/** Every mark the lexicon carries once, with the atoms wearing it, each a door. */
export function SenseWall({ wall }: { wall: SensesWall }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {WALL_HEADING}
        </h2>
        <span className="text-xs text-star-dust/40">{wallLine(wall)}</span>
        <span className="text-[11px] text-star-dust/35">{SENSES_SOURCE}</span>
      </div>

      {wall.truncated ? (
        <p className="text-[11px] text-star-dust/40">{SENSES_TRUNCATED}</p>
      ) : null}

      {wall.marks.length === 0 ? (
        <p className="text-xs text-star-dust/35">{NO_MARK_WORN}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {wall.marks.map((mark) => (
            <Link
              key={mark.emoji}
              href={mark.address}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[13px] text-star-dust hover:border-neurospark/30"
            >
              <span className="text-base">{mark.emoji}</span>
              <span className="text-star-dust/40">{mark.count.toLocaleString('en')}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
