// =====================================================
// FILE: constants/generated/hermes-social/emerald_status.ts
// GENERATED: 2026-04-13T21:55:48.478Z
// SOURCE: Constants.public.Enums.emerald_status
// =====================================================

export const EMERALD_STATUS = {
  ACTIVE: 'active',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type EmeraldStatus = typeof EMERALD_STATUS[keyof typeof EMERALD_STATUS];