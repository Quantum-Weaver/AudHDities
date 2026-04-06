// =====================================================
// FILE: constants/platform_status.ts
// GENERATED: 2026-04-05T21:48:03.577Z
// SOURCE: Constants.public.Enums.platform_status
// =====================================================

export const PLATFORM_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  OUTAGE: 'outage',
  MAINTENANCE: 'maintenance',
} as const;

export type PlatformStatus = typeof PLATFORM_STATUS[keyof typeof PLATFORM_STATUS];
