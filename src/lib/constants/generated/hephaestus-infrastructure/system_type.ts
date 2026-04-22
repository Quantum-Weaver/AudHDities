// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/system_type.ts
// GENERATED: 2026-04-22T18:24:20.573Z
// SOURCE: Constants.public.Enums.system_type
// VALUES: 6 entries
// =====================================================

export const SYSTEM_TYPE = {
  DATABASE: 'database',
  API: 'api',
  STORAGE: 'storage',
  AUTH: 'auth',
  QUEUE: 'queue',
  CACHE: 'cache',
} as const;

export type SystemType = typeof SYSTEM_TYPE[keyof typeof SYSTEM_TYPE];
