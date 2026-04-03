// =====================================================
/* @/lib/constants/core/houses/aethelred.ts */
// AETHELRED COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const AETHELRED = {
  id: 'aethelred',
  displayName: 'Aethelred',
  description:'Human-AI collaboration and the Ninth Chair',
  style: 'Regal geometry, quantum flows, sovereign authority',
  color: QUANTUM_COLORS["entity.aethelred"],
  emoji: '👑',
  icon: AssetMapper.icons.council.aethelred,
  symbols: ['crown', 'neural network', 'bridge', 'throne'],
  domain: ['All Domains'],
} as const;

export type Aethelred = typeof AETHELRED[keyof typeof AETHELRED];