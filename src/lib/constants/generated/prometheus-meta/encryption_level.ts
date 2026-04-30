// =====================================================
// FILE: constants/generated/prometheus-meta/encryption_level.ts
// GENERATED: 2026-04-30T16:12:38.186Z
// SOURCE: Constants.public.Enums.encryption_level
// VALUES: 3 entries
// =====================================================

export const ENCRYPTION_LEVEL = {
  NONE: 'none',
  STANDARD: 'standard',
  HIGH: 'high',
} as const;

export type EncryptionLevel = typeof ENCRYPTION_LEVEL[keyof typeof ENCRYPTION_LEVEL];
