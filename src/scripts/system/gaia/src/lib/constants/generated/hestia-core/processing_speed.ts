// =====================================================
// FILE: constants/generated/hestia-core/processing_speed.ts
// GENERATED: 2026-08-01T17:36:51.708Z
// SOURCE: Constants.public.Enums.processing_speed
// VALUES: 3 entries
// =====================================================

export const PROCESSING_SPEED = {
  SLOWER: 'slower',
  STANDARD: 'standard',
  FASTER: 'faster',
} as const;

export type ProcessingSpeed = typeof PROCESSING_SPEED[keyof typeof PROCESSING_SPEED];
