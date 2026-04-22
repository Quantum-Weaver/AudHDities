// =====================================================
// FILE: constants/generated/aethelred-connections/platform_status.ts
// GENERATED: 2026-04-22T04:38:07.132Z
// SOURCE: Constants.public.Enums.platform_status
// VALUES: 4 entries
// =====================================================

export const PLATFORM_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  OUTAGE: 'outage',
  MAINTENANCE: 'maintenance',
} as const;

export type PlatformStatus = typeof PLATFORM_STATUS[keyof typeof PLATFORM_STATUS];
