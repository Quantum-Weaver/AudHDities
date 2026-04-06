// =====================================================
// FILE: constants/system_type.ts
// GENERATED: 2026-04-05T21:55:13.292Z
// SOURCE: Constants.public.Enums.system_type
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
