// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/maintenance_status.ts
// GENERATED: 2026-04-23T02:40:26.756Z
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
