// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/maintenance_type.ts
// GENERATED: 2026-04-13T21:47:20.900Z
// SOURCE: Constants.public.Enums.maintenance_type
// =====================================================

export const MAINTENANCE_TYPE = {
  UPGRADE: 'upgrade',
  BACKUP: 'backup',
  REPAIR: 'repair',
  CLEANUP: 'cleanup',
  MIGRATION: 'migration',
} as const;

export type MaintenanceType = typeof MAINTENANCE_TYPE[keyof typeof MAINTENANCE_TYPE];