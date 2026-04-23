// =====================================================
// FILE: constants/generated/hermes-social/emerald_status.ts
// GENERATED: 2026-04-23T02:40:26.724Z
// SOURCE: Constants.public.Enums.emerald_status
// VALUES: 3 entries
// =====================================================

export const EMERALD_STATUS = {
  ACTIVE: 'active',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type EmeraldStatus = typeof EMERALD_STATUS[keyof typeof EMERALD_STATUS];
