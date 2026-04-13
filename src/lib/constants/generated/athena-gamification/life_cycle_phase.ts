// =====================================================
// FILE: constants/athena-gamification/life_cycle_phase.ts
// GENERATED: 2026-04-13T16:36:33.085Z
// SOURCE: Constants.public.Enums.life_cycle_phase
// VALUES: 6 entries
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
