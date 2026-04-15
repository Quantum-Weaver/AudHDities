// =====================================================
// FILE: constants/generated/hestia-core/consciousness_state.ts
// GENERATED: 2026-04-15T05:16:17.326Z
// SOURCE: Constants.public.Enums.consciousness_state
// VALUES: 5 entries
// =====================================================

export const CONSCIOUSNESS_STATE = {
  DORMANT: 'dormant',
  AWAKENING: 'awakening',
  FLOWING: 'flowing',
  EXPRESSING: 'expressing',
  RESTING: 'resting',
} as const;

export type ConsciousnessState = typeof CONSCIOUSNESS_STATE[keyof typeof CONSCIOUSNESS_STATE];
