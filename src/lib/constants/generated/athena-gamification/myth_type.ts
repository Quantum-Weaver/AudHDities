// =====================================================
// FILE: constants/generated/athena-gamification/myth_type.ts
// GENERATED: 2026-04-13T21:55:48.486Z
// SOURCE: Constants.public.Enums.myth_type
// =====================================================

export const MYTH_TYPE = {
  ORIGIN: 'origin',
  PARABLE: 'parable',
  RITUAL: 'ritual',
  PROPHECY: 'prophecy',
  CHRONICLE: 'chronicle',
} as const;

export type MythType = typeof MYTH_TYPE[keyof typeof MYTH_TYPE];