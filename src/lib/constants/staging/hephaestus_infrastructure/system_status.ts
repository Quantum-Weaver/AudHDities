// =====================================================
// FILE: constants/system_status.ts
// GENERATED: 2026-04-05T21:48:03.744Z
// SOURCE: Constants.public.Enums.system_status
// =====================================================

export const SYSTEM_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  OUTAGE: 'outage',
  MAINTENANCE: 'maintenance',
} as const;

export type SystemStatus = typeof SYSTEM_STATUS[keyof typeof SYSTEM_STATUS];
