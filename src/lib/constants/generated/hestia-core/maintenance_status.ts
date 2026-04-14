// =====================================================
// FILE: constants/generated/hestia-core/maintenance_status.ts
// GENERATED: 2026-04-14T20:18:57.652Z
// SOURCE: Constants.public.Enums.maintenance_status
// VALUES: 5 entries
// =====================================================

export const MAINTENANCE_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export type MaintenanceStatus = typeof MAINTENANCE_STATUS[keyof typeof MAINTENANCE_STATUS];
