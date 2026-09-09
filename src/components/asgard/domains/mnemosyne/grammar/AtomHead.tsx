// src/components/asgard/domains/mnemosyne/grammar/AtomHead.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/runes/Badge';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  ATOM_CRUMB,
  BACK_TO_EXPLORE,
  HOUSE_WORDS_ADDRESS,
  NO_DEFINITION,
  WEARING_CATEGORY_FACE,
  atomCases,
  atomFace,
  categoryRoomAddress,
  measuresBadge,
  present,
  type AtomWhole,
} from '@/lib/grammar/grammar-contract';

/** The atom's face, its word, its cases, its badges and its definition. */
export function AtomHead({ whole }: { whole: AtomWhole }) {
  const face = atomFace(whole);
  const cases = atomCases(whole);
  const measures = measuresBadge(whole);
  const badges = present([whole.atom_type, whole.state]);

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
        <span className="text-[11px] text-star-dust/35">{ATOM_CRUMB}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          {face.glyph ? (
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] text-3xl">
              {face.glyph}
            </span>
          ) : null}
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-star-dust">{whole.atom_word}</h1>
            {cases.length > 0 ? (
              <span className="text-[13px] text-star-dust/50">{cases.join(' · ')}</span>
            ) : null}
            {face.fromCategory ? (
              <span className="text-[11px] text-star-dust/35">{WEARING_CATEGORY_FACE}</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {whole.category_name ? (
            <Link href={categoryRoomAddress(whole.category_name)}>
              <Badge variant="outline" size="sm" pill>
                {whole.category_face ? `${whole.category_face} ` : ''}
                {whole.category_name}
              </Badge>
            </Link>
          ) : null}
          {badges.map((badge) => (
            <Badge key={badge} variant="outline" size="sm" pill>
              {badge}
            </Badge>
          ))}
          {measures ? (
            <Badge variant="outline" size="sm" pill>
              {measures}
            </Badge>
          ) : null}
        </div>
      </div>

      <p className="max-w-[880px] text-base leading-relaxed text-star-dust/70">
        {whole.definition ? withHouseWords(whole.definition, HOUSE_WORDS_ADDRESS) : NO_DEFINITION}
      </p>
    </div>
  );
}
