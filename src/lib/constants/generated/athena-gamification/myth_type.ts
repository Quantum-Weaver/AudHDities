// =====================================================
// FILE: constants/generated/athena-gamification/myth_type.ts
// GENERATED: 2026-05-01T15:32:00.085Z
// SOURCE: Constants.public.Enums.myth_type
// VALUES: 5 entries
// =====================================================

export const MYTH_TYPE = {
  ORIGIN: 'origin',
  PARABLE: 'parable',
  RITUAL: 'ritual',
  PROPHECY: 'prophecy',
  CHRONICLE: 'chronicle',
} as const;

export type MythType = typeof MYTH_TYPE[keyof typeof MYTH_TYPE];
