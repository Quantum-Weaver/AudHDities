// src/components/asgard/domains/mnemosyne/grammar/DressedCard.tsx

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  NO_DEFINITION,
  WEARING_CATEGORY_FACE,
  type DressedCard as DressedCardShape,
} from '@/lib/grammar/grammar-contract';

/** The one card the Grammar has: a face, a name, a definition, its chips. */
export function DressedCardFace({ card }: { card: DressedCardShape }) {
  return (
    <Card
      data={{ id: card.key, type: 'value', title: card.title, value: card.tier }}
      variant="glass"
      size="full"
      radius="lg"
      shadow="sm"
      className="flex h-full flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-3">
        {card.face ? (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg"
            title={card.faceFromCategory ? WEARING_CATEGORY_FACE : undefined}
          >
            {card.face}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-col gap-0.5">
          <Link href={card.address} className="truncate font-semibold text-star-dust hover:text-neurospark">
            {card.title}
          </Link>
          {card.categoryName ? (
            <span className="text-[11px] text-star-dust/35">
              {card.categoryFace ? `${card.categoryFace} ` : ''}
              {card.categoryName}
            </span>
          ) : null}
          {card.faceFromCategory ? (
            <span className="text-[11px] text-star-dust/35">{WEARING_CATEGORY_FACE}</span>
          ) : null}
        </div>
      </div>

      {card.parts.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-star-dust/60">
          {card.parts.map((part, index) => (
            <span key={`${part}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-star-dust/30">·</span> : null}
              {part}
            </span>
          ))}
        </div>
      ) : null}

      <p className="text-sm leading-relaxed text-star-dust/60">
        {card.definition ? withHouseWords(card.definition) : NO_DEFINITION}
      </p>

      {card.badges.length > 0 ? (
        <div className="mt-auto flex flex-wrap gap-1.5">
          {card.badges.map((badge) => (
            <Badge key={badge} variant="outline" size="sm" pill>
              {badge}
            </Badge>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
