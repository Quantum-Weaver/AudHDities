// src/components/asgard/domains/mnemosyne/grammar/FolksonomyHead.tsx

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Badge } from '@/components/runes/Badge';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  BACK_TO_FOLKSONOMIES,
  FOLKSONOMIES_PILL,
  FOLKSONOMY_CRUMB,
  HOUSE_WORDS_ADDRESS,
  KEPT_BY_LABEL,
  NOTES_LABEL,
  NO_FOLKSONOMY_PURPOSE,
  STARTER_MARK,
  dressingCountLine,
  isStarter,
  type FolksonomyFace,
} from '@/lib/grammar/grammar-contract';

/** The umbrella's name, its standing, its purpose, its notes and who keeps it. */
export function FolksonomyHead({ row, dressings }: { row: FolksonomyFace; dressings: number }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/grammar/folksonomies"
          className="inline-flex items-center gap-1.5 text-xs text-neurospark hover:text-star-dust"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {BACK_TO_FOLKSONOMIES}
        </Link>
        <span className="text-[11px] text-star-dust/35">{FOLKSONOMY_CRUMB}</span>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
        <BookOpen size={14} className="text-neurospark" />
        <span className="text-sm text-neurospark">{FOLKSONOMIES_PILL}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-star-dust">{row.name}</h1>
          <span className="text-xs text-star-dust/40">{dressingCountLine(dressings)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          <Badge variant="outline" size="sm" pill>
            {row.status}
          </Badge>
          {isStarter(row) ? (
            <Badge variant="outline" size="sm" pill>
              {STARTER_MARK}
            </Badge>
          ) : null}
        </div>
      </div>

      <p
        className={
          row.purpose
            ? 'max-w-[880px] text-base leading-relaxed text-star-dust/70'
            : 'max-w-[880px] text-base text-star-dust/35'
        }
      >
        {row.purpose
          ? withHouseWords(row.purpose, HOUSE_WORDS_ADDRESS)
          : NO_FOLKSONOMY_PURPOSE}
      </p>

      {row.notes ? (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wider text-star-dust/35">
            {NOTES_LABEL}
          </span>
          <p className="max-w-[880px] text-[13px] leading-relaxed text-star-dust/60">
            {withHouseWords(row.notes, HOUSE_WORDS_ADDRESS)}
          </p>
        </div>
      ) : null}

      {row.created_by ? (
        <span className="text-[11px] text-star-dust/35">
          {KEPT_BY_LABEL} · {withHouseWords(row.created_by, HOUSE_WORDS_ADDRESS)}
        </span>
      ) : null}
    </div>
  );
}
