// =====================================================
// FILE: constants/myth_type.ts
// GENERATED: 2026-04-05T19:46:33.313Z
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
