// src/components/asgard/domains/mnemosyne/grammar/CompoundDressings.tsx

import {
  DRESSINGS_HEADING,
  HEARTH_LABEL,
  HEARTH_LINE,
  NO_COMPOUND_DRESSING,
  overrideLines,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** The hearth row, then every key the compound's own sensory override carries. */
export function CompoundDressings({
  source,
  override,
}: {
  source: string;
  override: unknown;
}) {
  const lines = overrideLines(override);

  return (
    <Panel heading={DRESSINGS_HEADING} source={source}>
      <div className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
        <span className="w-24 shrink-0 text-xs leading-5 text-neurospark">{HEARTH_LABEL}</span>
        <span className="text-[13px] leading-5 text-star-dust/60">{HEARTH_LINE}</span>
      </div>

      {lines.length === 0 ? (
        <span className="text-[13px] text-star-dust/35">{NO_COMPOUND_DRESSING}</span>
      ) : null}

      {lines.map((line) => (
        <div key={line.key} className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
          {line.label ? (
            <span className="w-24 shrink-0 text-xs leading-5 text-star-dust/50">{line.label}</span>
          ) : null}
          <span className="text-[13px] leading-5 text-star-dust/60">{line.value}</span>
        </div>
      ))}
    </Panel>
  );
}
