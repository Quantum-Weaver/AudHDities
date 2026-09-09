// src/components/asgard/domains/mnemosyne/grammar/SchemeShelf.tsx

import Link from 'next/link';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  HOUSE_WORDS_ADDRESS,
  NO_SCHEME,
  NO_SCHEME_DESCRIPTION,
  schemeCardLine,
  shelfLine,
  type SchemeKindShelf,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** One kind of scheme as a shelf: its count, then each scheme as a door. */
export function SchemeShelf({ shelf }: { shelf: SchemeKindShelf }) {
  return (
    <Panel heading={shelf.kind} source={shelfLine(shelf)}>
      {shelf.cards.length === 0 ? (
        <p className="text-xs text-star-dust/35">{NO_SCHEME}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {shelf.cards.map((card) => (
            <Link
              key={card.name}
              href={card.address}
              className="flex flex-col gap-1 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 hover:border-neurospark/30"
            >
              <span className="text-sm font-semibold text-star-dust">{card.name}</span>
              <span className="text-[11px] text-star-dust/40">{schemeCardLine(card)}</span>
              <span
                className={
                  card.description
                    ? 'text-[13px] leading-relaxed text-star-dust/60'
                    : 'text-[13px] text-star-dust/35'
                }
              >
                {card.description ? withHouseWords(card.description, HOUSE_WORDS_ADDRESS) : NO_SCHEME_DESCRIPTION}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Panel>
  );
}
