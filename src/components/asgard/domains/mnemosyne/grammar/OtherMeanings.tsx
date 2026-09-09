// src/components/asgard/domains/mnemosyne/grammar/OtherMeanings.tsx

import Link from 'next/link';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  HOUSE_WORDS_ADDRESS,
  NO_DEFINITION,
  NO_OTHER_MEANING,
  OTHER_MEANINGS_HEADING,
  OTHER_MEANINGS_SOURCE,
  type SenseMeaning,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** The same mark as each folksonomy means it, one row per dressing, its room a door. */
export function OtherMeanings({ meanings }: { meanings: readonly SenseMeaning[] }) {
  return (
    <Panel heading={OTHER_MEANINGS_HEADING} source={OTHER_MEANINGS_SOURCE}>
      {meanings.length === 0 ? (
        <p className="text-[13px] text-star-dust/35">{NO_OTHER_MEANING}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {meanings.map((meaning) => (
            <div
              key={meaning.key}
              className="flex flex-col gap-1 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 md:flex-row md:items-start md:gap-4"
            >
              <span className="flex w-40 shrink-0 items-center gap-2">
                {meaning.colour ? (
                  <span
                    className="inline-block h-3.5 w-3.5 shrink-0 rounded"
                    style={{ backgroundColor: meaning.colour }}
                  />
                ) : null}
                <Link
                  href={meaning.address}
                  className="text-xs text-neurospark hover:text-star-dust"
                >
                  {meaning.folksonomy}
                </Link>
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold text-star-dust">{meaning.word}</span>
                <span
                  className={
                    meaning.definition
                      ? 'text-[13px] leading-relaxed text-star-dust/60'
                      : 'text-[13px] text-star-dust/35'
                  }
                >
                  {meaning.definition
                    ? withHouseWords(meaning.definition, HOUSE_WORDS_ADDRESS)
                    : NO_DEFINITION}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
