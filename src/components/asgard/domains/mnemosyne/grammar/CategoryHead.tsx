// src/components/asgard/domains/mnemosyne/grammar/CategoryHead.tsx

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  BACK_TO_EXPLORE,
  CATEGORY_CRUMB,
  CATEGORY_PILL,
  HOUSE_WORDS_ADDRESS,
  NO_CATEGORY_DESCRIPTION,
  categoryCountLine,
  type CategoryFace,
} from '@/lib/grammar/grammar-contract';

/** The face large, the category's name, its description and its counted atoms. */
export function CategoryHead({ row, total }: { row: CategoryFace; total: number }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/grammar/explore"
          className="inline-flex items-center gap-1.5 text-xs text-neurospark hover:text-star-dust"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {BACK_TO_EXPLORE}
        </Link>
        <span className="text-[11px] text-star-dust/35">{CATEGORY_CRUMB}</span>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
        <BookOpen size={14} className="text-neurospark" />
        <span className="text-sm text-neurospark">{CATEGORY_PILL}</span>
      </div>

      <div className="flex items-center gap-5">
        {row.icon_emoji ? (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] text-3xl">
            {row.icon_emoji}
          </span>
        ) : null}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-star-dust">{row.name}</h1>
          <span className="text-xs text-star-dust/40">{categoryCountLine(total)}</span>
        </div>
      </div>

      <p
        className={
          row.description
            ? 'max-w-[880px] text-base leading-relaxed text-star-dust/70'
            : 'max-w-[880px] text-base text-star-dust/35'
        }
      >
        {row.description ? withHouseWords(row.description, HOUSE_WORDS_ADDRESS) : NO_CATEGORY_DESCRIPTION}
      </p>
    </div>
  );
}
