// src/components/asgard/domains/mnemosyne/grammar/AtomDressings.tsx

import {
  DRESSINGS_HEADING,
  DRESSINGS_SOURCE,
  HEARTH_LABEL,
  HEARTH_LINE,
  NO_DRESSING,
  atomFace,
  splitDressings,
  type AtomDressing,
  type AtomWhole,
  type GrammarFault,
} from '@/lib/grammar/grammar-contract';
import { GrammarFaultBlock } from './GrammarFault';
import { Panel } from './Panel';

/** The hearth row, then every folksonomy's own dressing beside it, never over it. */
export function AtomDressings({
  whole,
  rows,
  fault,
}: {
  whole: AtomWhole;
  rows: readonly AtomDressing[] | null;
  fault: GrammarFault | null;
}) {
  const face = atomFace(whole);
  const split = rows ? splitDressings(rows) : null;

  return (
    <Panel heading={DRESSINGS_HEADING} source={DRESSINGS_SOURCE}>
      <div className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
        <span className="w-24 shrink-0 text-xs leading-5 text-neurospark">{HEARTH_LABEL}</span>
        <span className="text-[13px] leading-5 text-star-dust/60">
          {face.glyph ? `${face.glyph} · ` : ''}
          {HEARTH_LINE}
        </span>
      </div>

      {fault ? <GrammarFaultBlock fault={fault} /> : null}

      {split && split.dressings.length === 0 && !fault ? (
        <span className="text-[13px] text-star-dust/35">{NO_DRESSING}</span>
      ) : null}

      {split?.dressings.map((dressing) => (
        <div key={dressing.key} className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
          <span className="w-24 shrink-0 text-xs leading-5 text-star-dust/50">
            {dressing.folksonomy}
          </span>
          <span className="flex items-start gap-2 text-[13px] leading-5 text-star-dust/60">
            {dressing.emoji ? <span>{dressing.emoji}</span> : null}
            {dressing.colour ? (
              <span
                className="mt-1 inline-block h-3.5 w-3.5 shrink-0 rounded"
                style={{ backgroundColor: dressing.colour }}
              />
            ) : null}
            <span>{dressing.definition ?? NO_DRESSING}</span>
          </span>
        </div>
      ))}
    </Panel>
  );
}
