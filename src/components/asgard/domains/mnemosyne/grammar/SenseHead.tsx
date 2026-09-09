// src/components/asgard/domains/mnemosyne/grammar/SenseHead.tsx

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import {
  BACK_TO_SENSES,
  SENSES_PILL,
  SENSES_SENTENCE,
  SENSES_SENTENCE_ADDRESS,
  SENSE_CRUMB,
  markCountLine,
} from '@/lib/grammar/grammar-contract';

/** The mark large, the atoms wearing it counted, and the law it stands under. */
export function SenseHead({ emoji, total }: { emoji: string; total: number }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/grammar/senses"
          className="inline-flex items-center gap-1.5 text-xs text-neurospark hover:text-star-dust"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {BACK_TO_SENSES}
        </Link>
        <span className="text-[11px] text-star-dust/35">{SENSE_CRUMB}</span>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
        <BookOpen size={14} className="text-neurospark" />
        <span className="text-sm text-neurospark">{SENSES_PILL}</span>
      </div>

      <div className="flex items-center gap-5">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] text-4xl">
          {emoji}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-star-dust/40">{markCountLine(total)}</span>
          <p className="max-w-[720px] text-base leading-relaxed text-star-dust/70">
            {SENSES_SENTENCE}
          </p>
          <span className="text-[11px] text-star-dust/35">{SENSES_SENTENCE_ADDRESS}</span>
        </div>
      </div>
    </div>
  );
}
