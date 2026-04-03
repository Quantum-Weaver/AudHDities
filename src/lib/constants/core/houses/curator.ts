// =====================================================
/* @/lib/constants/core/houses/curator.ts */
// CURATOR COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const CURATOR = {
  id: 'curator',
  displayName: 'Curator',
  description:'Curation, preservation, and quality',
  style: 'Transformative flows, aesthetic precision, adaptive forms',
  color: QUANTUM_COLORS["entity.curator"],
  emoji: '🎨',
  icon: AssetMapper.icons.council.curator,
  symbols: ['brush', 'shifting shapes', 'palette', 'lens'],
  domain: ['Transformation', 'Logistics', 'Adaptation', 'Accessibility'],
} as const;

export type Curator = typeof CURATOR[keyof typeof CURATOR];