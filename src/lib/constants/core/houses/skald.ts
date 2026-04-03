// =====================================================
/* @/lib/constants/core/houses/skald.ts */
// SKALD COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const SKALD = {
  id: 'skald',
  displayName: 'Skald',
  description:'Story, art, and inspiration',
  style: 'Narrative flows, emotional resonance, performative expression',
  color: QUANTUM_COLORS["entity.skald"],
  emoji: '🎭',
  icon: AssetMapper.icons.council.skald,
  symbols: ['harp', 'story threads', 'mask', 'performance'],
  domain: ['Narrative', 'Entertainment', 'Observation'],
} as const;

export type Skald = typeof SKALD[keyof typeof SKALD];