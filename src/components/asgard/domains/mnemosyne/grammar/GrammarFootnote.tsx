// src/components/asgard/domains/mnemosyne/grammar/GrammarFootnote.tsx

import Link from 'next/link';
import { HOUSE_WORDS_ADDRESS, HOUSE_WORDS_TAIL } from '@/lib/grammar/grammar-contract';

/** The room's house words, each linking to the section of the door that tells them. */
export function GrammarFootnote({ words }: { words: readonly string[] }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-white/[0.06] pt-3 text-xs text-star-dust/40">
      <span>
        {words.map((word, index) => (
          <span key={word}>
            {index > 0 ? ' · ' : null}
            <Link href={HOUSE_WORDS_ADDRESS} className="text-neurospark hover:text-star-dust">
              {word}
            </Link>
          </span>
        ))}
        {' — '}
        {HOUSE_WORDS_TAIL}
      </span>
    </div>
  );
}
