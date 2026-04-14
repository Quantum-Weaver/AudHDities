// =====================================================
// FILE: constants/generated/hestia-core/script_type.ts
// GENERATED: 2026-04-14T20:18:57.668Z
// SOURCE: Constants.public.Enums.script_type
// VALUES: 6 entries
// =====================================================

export const SCRIPT_TYPE = {
  DEPLOY: 'deploy',
  SEED: 'seed',
  MIGRATION: 'migration',
  CLEANUP: 'cleanup',
  BACKUP: 'backup',
  TEST: 'test',
} as const;

export type ScriptType = typeof SCRIPT_TYPE[keyof typeof SCRIPT_TYPE];
