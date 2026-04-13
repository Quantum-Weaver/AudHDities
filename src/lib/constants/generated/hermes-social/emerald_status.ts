// =====================================================
// FILE: constants/hermes-social/emerald_status.ts
// GENERATED: 2026-04-13T16:36:33.083Z
// SOURCE: Constants.public.Enums.emerald_status
// VALUES: 3 entries
// =====================================================

export const EMERALD_STATUS = {
  ACTIVE: 'active',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type EmeraldStatus = typeof EMERALD_STATUS[keyof typeof EMERALD_STATUS];
