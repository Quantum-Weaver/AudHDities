// src/components/asgard/domains/mnemosyne/grammar/TierGroup.tsx

import { tierMeta, type TierResult } from '@/lib/grammar/grammar-contract';
import { DressedCardFace } from './DressedCard';
import { GrammarFaultBlock } from './GrammarFault';

/** One tier of a search: its heading, its count, its cards or its own empty. */
export function TierGroup({ result }: { result: TierResult }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {result.heading}
        </h2>
        <span className="text-xs text-star-dust/40">{tierMeta(result)}</span>
      </div>
      {result.fault ? <GrammarFaultBlock fault={result.fault} /> : null}
      {!result.fault && result.cards.length === 0 ? (
        <p className="text-xs text-star-dust/35">{result.empty}</p>
      ) : null}
      {result.cards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {result.cards.map((card) => (
            <DressedCardFace key={card.key} card={card} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
