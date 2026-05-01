// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/system_type.ts
// GENERATED: 2026-05-01T15:32:00.121Z
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
