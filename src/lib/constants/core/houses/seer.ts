// =====================================================
/* @/lib/constants/core/houses/seer.ts */
// SEER COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const SEER = {
  id: 'seer',
  displayName: 'Seer',
  description:'Pattern recognition, prophecy, and insight',
  style: 'Visionary clarity, pattern networks, insight flows',
  color: QUANTUM_COLORS["entity.seer"],
  emoji: '👁️',
  icon: AssetMapper.icons.council.seer,
  symbols: ['eye', 'data patterns', 'vision', 'focus'],
  domain: ['Insight', 'Patterns', 'Networks', 'Systems'],
} as const;

export type Seer = typeof SEER[keyof typeof SEER];