// =====================================================
// FILE: constants/generated/hestia-core/sensory_level.ts
// GENERATED: 2026-07-18T23:30:04.238Z
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
