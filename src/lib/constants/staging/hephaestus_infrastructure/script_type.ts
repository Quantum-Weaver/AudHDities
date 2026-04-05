// =====================================================
// FILE: constants/script_type.ts
// GENERATED: 2026-04-05T19:46:33.374Z
// SOURCE: Constants.public.Enums.script_type
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
