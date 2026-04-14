// =====================================================
// FILE: constants/generated/hermes-social/emerald_status.ts
// GENERATED: 2026-04-14T21:18:08.762Z
// SOURCE: Constants.public.Enums.emerald_status
// VALUES: 3 entries
// =====================================================

export const EMERALD_STATUS = {
  ACTIVE: 'active',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type EmeraldStatus = typeof EMERALD_STATUS[keyof typeof EMERALD_STATUS];
