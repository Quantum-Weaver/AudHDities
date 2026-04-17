// =====================================================
// FILE: constants/generated/hestia-core/sensitivity_level.ts
// GENERATED: 2026-04-17T22:45:09.268Z
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
