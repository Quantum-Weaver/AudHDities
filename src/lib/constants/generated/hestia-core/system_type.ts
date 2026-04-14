// =====================================================
// FILE: constants/generated/hestia-core/system_type.ts
// GENERATED: 2026-04-14T20:18:57.673Z
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
