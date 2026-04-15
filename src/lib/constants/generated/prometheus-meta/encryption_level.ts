// =====================================================
// FILE: constants/generated/prometheus-meta/encryption_level.ts
// GENERATED: 2026-04-15T19:06:11.421Z
// SOURCE: Constants.public.Enums.encryption_level
// VALUES: 3 entries
// =====================================================

export const ENCRYPTION_LEVEL = {
  NONE: 'none',
  STANDARD: 'standard',
  HIGH: 'high',
} as const;

export type EncryptionLevel = typeof ENCRYPTION_LEVEL[keyof typeof ENCRYPTION_LEVEL];
