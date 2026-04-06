// =====================================================
// FILE: constants/delivery_status.ts
// GENERATED: 2026-04-05T21:48:03.710Z
// SOURCE: Constants.public.Enums.delivery_status
// =====================================================

export const DELIVERY_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  FAILED: 'failed',
} as const;

export type DeliveryStatus = typeof DELIVERY_STATUS[keyof typeof DELIVERY_STATUS];
