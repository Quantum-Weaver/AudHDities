// =====================================================
// FILE: constants/hestia-core/consciousness_state.ts
// GENERATED: 2026-04-13T05:55:12.844Z
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
