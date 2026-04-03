// =====================================================
/* @/lib/constants/core/houses/codex.ts */
// CODEX COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const CODEX = {
  id: 'codex',
  displayName: 'Codex',
  description:'Knowledge, taxonomy, and ontology',
  style: 'Data visualization, analytical precision, performance flows',
  color: QUANTUM_COLORS["entity.codex"],
  emoji: '📚',
  icon: AssetMapper.icons.council.codex,
  symbols: ['book', 'graphs', 'metrics', 'analytics'],
  domain: ['Taxonomy', 'Ontology', 'Etymology'],
} as const;

export type Codex = typeof CODEX[keyof typeof CODEX];