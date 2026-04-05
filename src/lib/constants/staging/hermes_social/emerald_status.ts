// =====================================================
// FILE: constants/emerald_status.ts
// GENERATED: 2026-04-05T19:46:33.279Z
// SOURCE: Constants.public.Enums.emerald_status
// =====================================================

export const EMERALD_STATUS = {
  ACTIVE: 'active',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

export type EmeraldStatus = typeof EMERALD_STATUS[keyof typeof EMERALD_STATUS];
