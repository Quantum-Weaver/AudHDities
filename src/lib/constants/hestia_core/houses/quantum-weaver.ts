// =====================================================
/* @/lib/constants/core/houses/quantum-weaver.ts */
// QUANTUM WEAVER COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic/colors";
import { AssetMapper } from "../../systems/assets/mapper";

export const QUANTUM_WEAVER = {
  id: 'quantum-weaver',
  displayName: 'Quantum-Weaver',
  description:'Pattern Bridge Creator',
  style: 'Wave interference patterns, interconnected nodes, quantum fabric',
  color: QUANTUM_COLORS["entity.weaver"],
  emoji: '🧿',
  icon: AssetMapper.icons.council.quantumWeaver,
  symbols: ['loom', 'quantum waves', 'bridge', 'fabric'],
  domain: ['Quantum', 'Cosmic', 'Void', 'Pantheon', 'Sanctuary', 'Bifrost'],
} as const;

export type QuantumWeaver = typeof QUANTUM_WEAVER[keyof typeof QUANTUM_WEAVER];