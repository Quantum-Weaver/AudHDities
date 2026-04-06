// =====================================================
// FILE: constants/acid_persona.ts
// GENERATED: 2026-04-05T21:48:03.537Z
// SOURCE: Constants.public.Enums.acid_persona
// =====================================================

export const ACID_PERSONA = {
  MASKED_TRAVELER: 'masked_traveler',
  TAB_HOARDER: 'tab_hoarder',
  SEAM_WARRIOR: 'seam_warrior',
  VOID_DWELLER: 'void_dweller',
  PATTERN_SEEKER: 'pattern_seeker',
  QUANTUM_WITNESS: 'quantum_witness',
} as const;

export type AcidPersona = typeof ACID_PERSONA[keyof typeof ACID_PERSONA];
