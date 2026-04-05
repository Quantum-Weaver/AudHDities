// =====================================================
// FILE: constants/life_cycle_phase.ts
// GENERATED: 2026-04-05T19:46:33.300Z
// SOURCE: Constants.public.Enums.life_cycle_phase
// =====================================================

export const LIFE_CYCLE_PHASE = {
  SEEDLING: 'seedling',
  SPROUT: 'sprout',
  BLOOM: 'bloom',
  HARVEST: 'harvest',
  DORMANT: 'dormant',
  RENEWAL: 'renewal',
} as const;

export type LifeCyclePhase = typeof LIFE_CYCLE_PHASE[keyof typeof LIFE_CYCLE_PHASE];
