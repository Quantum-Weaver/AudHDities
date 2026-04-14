// =====================================================
// FILE: constants/generated/hestia-core/maintenance_type.ts
// GENERATED: 2026-04-14T20:18:57.652Z
// SOURCE: Constants.public.Enums.maintenance_type
// VALUES: 5 entries
// =====================================================

export const MAINTENANCE_TYPE = {
  UPGRADE: 'upgrade',
  BACKUP: 'backup',
  REPAIR: 'repair',
  CLEANUP: 'cleanup',
  MIGRATION: 'migration',
} as const;

export type MaintenanceType = typeof MAINTENANCE_TYPE[keyof typeof MAINTENANCE_TYPE];
