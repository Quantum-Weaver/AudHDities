// src/components/asgard/domains/mnemosyne/grammar/FolksonomyCard.tsx

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/runes/Badge';
import { Card } from '@/components/runes/Card';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  NO_FOLKSONOMY_PURPOSE,
  STARTER_MARK,
  dressingCountLine,
  type FolksonomyCard as FolksonomyCardShape,
} from '@/lib/grammar/grammar-contract';

/** One umbrella: its name, its purpose, its standing and its counted dressings. */
export function FolksonomyCardFace({ card }: { card: FolksonomyCardShape }) {
  return (
    <Link href={card.address} className="block h-full">
      <Card
        data={{ id: card.name, type: 'value', title: card.name, value: card.status }}
        variant="interactive"
        size="full"
        radius="lg"
        shadow="sm"
        className="flex h-full flex-col gap-3 p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-star-dust">{card.name}</h3>
          <Badge variant="outline" size="sm" pill>
            {card.status}
          </Badge>
        </div>

        <span className="text-[11px] text-star-dust/40">{dressingCountLine(card.dressings)}</span>

        <p
          className={
            card.purpose
              ? 'text-sm leading-relaxed text-star-dust/60'
              : 'text-sm text-star-dust/35'
          }
        >
          {card.purpose ? withHouseWords(card.purpose) : NO_FOLKSONOMY_PURPOSE}
        </p>

        {card.starter ? (
          <span className="text-[11px] text-neurospark">{STARTER_MARK}</span>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1 text-xs text-neurospark">
          Open <ArrowRight size={12} />
        </span>
      </Card>
    </Link>
  );
}
