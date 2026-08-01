// =====================================================
// FILE: constants/generated/hestia-core/sensory_level.ts
// GENERATED: 2026-08-01T16:03:07.240Z
// SOURCE: Constants.public.Enums.sensory_level
// VALUES: 4 entries
// =====================================================

export const SENSORY_LEVEL = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  EXTREME: 'extreme',
} as const;

export type SensoryLevel = typeof SENSORY_LEVEL[keyof typeof SENSORY_LEVEL];
