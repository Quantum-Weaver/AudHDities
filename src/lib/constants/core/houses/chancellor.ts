// =====================================================
/* @/lib/constants/core/houses/chancellor.ts */
// CHANCELLOR COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const CHANCELLOR = {
  id: 'chancellor',
  displayName: 'Chancellor',
  description:'Structure, finance, and governance',
  style: 'Structured flows, balanced systems, coordinated movement',
  color: QUANTUM_COLORS["entity.chancellor"],
  emoji: '⚖️',
  icon: AssetMapper.icons.council.chancellor,
  symbols: ['scepter', 'flow chart', 'scales', 'network'],
  domain: ['Communication', 'Coordination', 'Governance'],
} as const;

export type Chancellor = typeof CHANCELLOR[keyof typeof CHANCELLOR];