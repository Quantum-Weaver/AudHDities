// src/components/asgard/domains/mnemosyne/grammar/DressingBeside.tsx

import Link from 'next/link';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  FOLKSONOMY_DRESSINGS_HEADING,
  FOLKSONOMY_SOURCE,
  HEARTH_LABEL,
  HOUSE_WORDS_ADDRESS,
  NO_DEFINITION,
  NO_FOLKSONOMY_DRESSING,
  NO_HEARTH_WORD,
  WEARING_CATEGORY_FACE,
  dressingCountLine,
  type DressingBeside as DressingBesideShape,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** One dressing, and the hearth atom it dresses beside it, never over it. */
function DressingRow({ dressing }: { dressing: DressingBesideShape }) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 md:grid-cols-2">
      <div className="flex items-start gap-3">
        {dressing.emoji ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg">
            {dressing.emoji}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="flex items-center gap-2 text-sm font-semibold text-star-dust">
            {dressing.word}
            {dressing.colour ? (
              <span
                className="inline-block h-3.5 w-3.5 shrink-0 rounded"
                style={{ backgroundColor: dressing.colour }}
              />
            ) : null}
            {dressing.colour ? (
              <span className="text-[11px] font-normal text-star-dust/40">{dressing.colour}</span>
            ) : null}
          </span>
          <span
            className={
              dressing.definition
                ? 'text-[13px] leading-relaxed text-star-dust/60'
                : 'text-[13px] text-star-dust/35'
            }
          >
            {dressing.definition
              ? withHouseWords(dressing.definition, HOUSE_WORDS_ADDRESS)
              : NO_DEFINITION}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
        <span className="w-16 shrink-0 text-xs leading-5 text-neurospark">{HEARTH_LABEL}</span>
        {dressing.hearth ? (
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="flex items-center gap-2">
              {dressing.hearth.face ? (
                <span
                  className="text-base"
                  title={dressing.hearth.faceFromCategory ? WEARING_CATEGORY_FACE : undefined}
                >
                  {dressing.hearth.face}
                </span>
              ) : null}
              <Link
                href={dressing.hearth.address}
                className="text-sm font-semibold text-star-dust hover:text-neurospark"
              >
                {dressing.hearth.word}
              </Link>
              {dressing.hearth.categoryName ? (
                <span className="text-[11px] text-star-dust/35">
                  {dressing.hearth.categoryName}
                </span>
              ) : null}
            </span>
            <span
              className={
                dressing.hearth.definition
                  ? 'text-[13px] leading-relaxed text-star-dust/60'
                  : 'text-[13px] text-star-dust/35'
              }
            >
              {dressing.hearth.definition
                ? withHouseWords(dressing.hearth.definition, HOUSE_WORDS_ADDRESS)
                : NO_DEFINITION}
            </span>
          </div>
        ) : (
          <span className="text-[13px] leading-5 text-star-dust/35">{NO_HEARTH_WORD}</span>
        )}
      </div>
    </div>
  );
}

/** Every dressing this folksonomy holds, each one beside the hearth it dresses. */
export function DressingsBesideHearth({
  dressings,
}: {
  dressings: readonly DressingBesideShape[];
}) {
  return (
    <Panel heading={FOLKSONOMY_DRESSINGS_HEADING} source={FOLKSONOMY_SOURCE}>
      {dressings.length === 0 ? (
        <p className="text-[13px] text-star-dust/35">{NO_FOLKSONOMY_DRESSING}</p>
      ) : (
        <>
          <span className="text-[11px] text-star-dust/40">
            {dressingCountLine(dressings.length)}
          </span>
          <div className="flex flex-col gap-3">
            {dressings.map((dressing) => (
              <DressingRow key={dressing.key} dressing={dressing} />
            ))}
          </div>
        </>
      )}
    </Panel>
  );
}
