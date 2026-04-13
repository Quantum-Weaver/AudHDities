// =====================================================
// FILE: constants/hephaestus-infrastructure/delivery_status.ts
// GENERATED: 2026-04-13T16:36:33.082Z
// SOURCE: Constants.public.Enums.delivery_status
// VALUES: 3 entries
// =====================================================

export const DELIVERY_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  FAILED: 'failed',
} as const;

export type DeliveryStatus = typeof DELIVERY_STATUS[keyof typeof DELIVERY_STATUS];
