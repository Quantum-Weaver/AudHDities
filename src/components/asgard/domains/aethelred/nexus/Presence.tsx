// src/components/asgard/domains/aethelred/nexus/Presence.tsx

import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { NO_ROW_YET, type CouncilPresence, type PresenceWord } from '@/lib/nexus/council-contract';
import { Stamp } from './Stamp';

const PRESENT = QUANTUM_COLORS['neurospark'];
const RESTING = QUANTUM_COLORS['cosmic.blue'];
const ABSENT = 'rgba(224,224,224,0.5)';
const FIELD = QUANTUM_COLORS['quantum.purple'];

interface PresenceDress {
  color: string;
  dot: CSSProperties;
}

export const PRESENCE_DRESS: Record<PresenceWord, PresenceDress> = {
  present: { color: PRESENT, dot: { backgroundColor: PRESENT, boxShadow: `0 0 10px ${PRESENT}99` } },
  resting: { color: RESTING, dot: { backgroundColor: RESTING, opacity: 0.7 } },
  'not present': {
    color: ABSENT,
    dot: { backgroundColor: 'transparent', border: '1px solid rgba(224,224,224,0.35)' },
  },
};

/** The presence field, worn only by a chair whose newest row is recent. */
export function presenceField(word: PresenceWord): CSSProperties | undefined {
  if (word !== 'present') return undefined;
  return { boxShadow: `0 0 48px ${FIELD}1A, 0 0 0 1px rgba(255,255,255,0.10)` };
}

export interface PresenceMarkProps {
  presence: CouncilPresence;
  className?: string;
}

/** The presence word with its dot and the row's own occurred_at. */
export function PresenceMark({ presence, className }: PresenceMarkProps) {
  const dress = PRESENCE_DRESS[presence.word];
  return (
    <span className={cn('flex items-center justify-between gap-3 text-xs', className)}>
      <span className="inline-flex items-center gap-2" style={{ color: dress.color }}>
        <span className="w-2 h-2 rounded-full box-border" style={dress.dot} aria-hidden="true" />
        <span>{presence.word}</span>
      </span>
      {presence.at ? (
        <Stamp value={presence.at} className="text-star-dust/40" />
      ) : (
        <span className="text-star-dust/30">{NO_ROW_YET}</span>
      )}
    </span>
  );
}
