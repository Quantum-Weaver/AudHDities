// =====================================================
// FILE: constants/maintenance_status.ts
// GENERATED: 2026-04-05T21:55:13.223Z
// SOURCE: Constants.public.Enums.maintenance_status
// =====================================================

export const MAINTENANCE_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export type MaintenanceStatus = typeof MAINTENANCE_STATUS[keyof typeof MAINTENANCE_STATUS];
