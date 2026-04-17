// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/maintenance_type.ts
// GENERATED: 2026-04-17T22:45:09.211Z
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
