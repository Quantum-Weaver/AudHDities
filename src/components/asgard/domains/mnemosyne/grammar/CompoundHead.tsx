// src/components/asgard/domains/mnemosyne/grammar/CompoundHead.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/runes/Badge';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  BACK_TO_EXPLORE,
  NO_DEFINITION,
  type GrammarTier,
  tierCrumb,
} from '@/lib/grammar/grammar-contract';

/** The compound's face, its name, its cases, its badges and its definition. */
export function CompoundHead({
  tier,
  face,
  name,
  cases,
  badges,
  definition,
}: {
  tier: GrammarTier;
  face: string | null;
  name: string;
  cases: readonly string[];
  badges: readonly string[];
  definition: string | null;
}) {
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
        <span className="text-[11px] text-star-dust/35">{tierCrumb(tier)}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          {face ? (
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] text-3xl">
              {face}
            </span>
          ) : null}
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-star-dust">{name}</h1>
            {cases.length > 0 ? (
              <span className="text-[13px] text-star-dust/50">{cases.join(' · ')}</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {badges.map((badge) => (
            <Badge key={badge} variant="outline" size="sm" pill>
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      <p className="max-w-[880px] text-base leading-relaxed text-star-dust/70">
        {definition ? withHouseWords(definition) : NO_DEFINITION}
      </p>
    </div>
  );
}
