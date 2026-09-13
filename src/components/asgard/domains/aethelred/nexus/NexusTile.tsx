// src/components/asgard/domains/aethelred/nexus/NexusTile.tsx

import { Card } from '@/components/runes/Card';
import type { CardData } from '@/types/components/runes/card.types';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { Stamp } from './Stamp';
import { withHouseWords } from './HouseWords';

const FIELD = QUANTUM_COLORS['quantum.purple'];

export interface TileLine {
  key: string;
  value: string;
}

export interface NexusTileProps {
  id: string;
  /** The sentence a glance answers. */
  word: string;
  /** The stamp beside the sentence. */
  at?: string | null;
  /** What the stamp is of. */
  atLabel?: string;
  /** The sentence when there is no stamp. */
  atEmpty?: string;
  lines: readonly TileLine[];
  /** The field is worn only when what it shows is true. */
  glowing?: boolean;
}

/** One breathing tile: a sentence, its stamp, and lines counted from rows. */
export function NexusTile({
  id,
  word,
  at,
  atLabel,
  atEmpty,
  lines,
  glowing,
}: NexusTileProps) {
  const data: CardData = { id, type: 'council', title: word };
  return (
    <Card
      data={data}
      variant="glass"
      size="full"
      radius="xl"
      shadow="sm"
      className="p-6 sm:p-8 flex flex-col gap-5 motion-reduce:transition-none"
      style={
        glowing
          ? { boxShadow: `0 0 48px ${FIELD}1A, 0 0 0 1px rgba(255,255,255,0.10)` }
          : undefined
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-xl text-star-dust">{withHouseWords(word)}</span>
        <span className="text-xs text-star-dust/40">
          {at ? (
            <>
              {atLabel ? `${atLabel} ` : null}
              <Stamp value={at} />
            </>
          ) : (
            atEmpty
          )}
        </span>
      </div>
      {lines.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/[0.06] pt-4">
          {lines.map((line) => (
            <div key={line.key} className="flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.12em] uppercase text-star-dust/55">
                {line.key}
              </span>
              <span className="text-sm text-star-dust">{withHouseWords(line.value)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
