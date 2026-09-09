// src/components/asgard/domains/mnemosyne/grammar/DoorCards.tsx

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { GRAMMAR_DOORS, NOT_YET_WIRED } from '@/lib/grammar/grammar-contract';

/** The Grammar's four rooms, an unbuilt one carrying its own sentence and no link. */
export function DoorCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {GRAMMAR_DOORS.map((door) => {
        const face = (
          <Card
            data={{ id: door.title, type: 'value', title: door.title, value: door.line }}
            variant={door.href ? 'interactive' : 'glass'}
            size="full"
            radius="lg"
            shadow="sm"
            className="flex h-full flex-col gap-2 p-6"
          >
            <h3 className="text-lg font-semibold text-star-dust">{door.title}</h3>
            <p
              className={
                door.line === NOT_YET_WIRED
                  ? 'text-sm text-star-dust/35'
                  : 'text-sm text-star-dust/50'
              }
            >
              {door.line}
            </p>
            {door.href ? (
              <span className="mt-auto inline-flex items-center gap-1 text-xs text-neurospark">
                Open <ArrowRight size={12} />
              </span>
            ) : null}
          </Card>
        );

        return door.href ? (
          <Link key={door.title} href={door.href} className="block h-full">
            {face}
          </Link>
        ) : (
          <div key={door.title} className="h-full">
            {face}
          </div>
        );
      })}
    </div>
  );
}
