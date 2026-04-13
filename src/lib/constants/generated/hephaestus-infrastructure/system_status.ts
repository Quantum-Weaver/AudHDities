// =====================================================
// FILE: constants/hephaestus-infrastructure/system_status.ts
// GENERATED: 2026-04-13T16:36:33.093Z
// SOURCE: Constants.public.Enums.system_status
// VALUES: 4 entries
// =====================================================

export const SYSTEM_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  OUTAGE: 'outage',
  MAINTENANCE: 'maintenance',
} as const;

export type SystemStatus = typeof SYSTEM_STATUS[keyof typeof SYSTEM_STATUS];
