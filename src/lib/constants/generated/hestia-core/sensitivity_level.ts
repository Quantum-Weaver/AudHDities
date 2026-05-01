// =====================================================
// FILE: constants/generated/hestia-core/sensitivity_level.ts
// GENERATED: 2026-05-01T15:32:00.109Z
// SOURCE: Constants.public.Enums.sensitivity_level
// VALUES: 4 entries
// =====================================================

export const SENSITIVITY_LEVEL = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  AVOIDANT: 'avoidant',
} as const;

export type SensitivityLevel = typeof SENSITIVITY_LEVEL[keyof typeof SENSITIVITY_LEVEL];
