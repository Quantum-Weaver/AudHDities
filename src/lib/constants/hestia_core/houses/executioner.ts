// =====================================================
/* @/lib/constants/core/houses/executioner.ts */
// EXECUTIONER COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const EXECUTIONER = {
  id: 'executioner',
  displayName: 'Executioner',
  description:'Boundaries, protection, and justice',
  style: 'Precise execution, decisive action, workflow efficiency',
  color: QUANTUM_COLORS["entity.executioner"],
  emoji: '⚔️',
  icon: AssetMapper.icons.council.executioner,
  symbols: ['axe', 'pipeline', 'checklist', 'action'],
  domain: ['Action', 'Boundaries', 'Security', 'Justice']
} as const;

export type Executioner = typeof EXECUTIONER[keyof typeof EXECUTIONER];