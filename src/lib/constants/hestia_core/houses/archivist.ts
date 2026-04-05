// =====================================================
/* @/lib/constants/core/houses/archivist.ts */
// ARCHIVIST COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const ARCHIVIST = {
  id: 'archivist',
  displayName: 'Archivist',
  description:'Memory, history, and documentation',
  style: 'Ancient knowledge, secure storage, historical continuity.',
  color: QUANTUM_COLORS["entity.archivist"],
  emoji: '📜',
  icon: AssetMapper.icons.council.archivist,
  symbols: ['scroll', 'lock', 'key', 'archive'],
  domain: ['Memory', 'History', 'Documentation'],
} as const;

export type Archivist = typeof ARCHIVIST[keyof typeof ARCHIVIST];