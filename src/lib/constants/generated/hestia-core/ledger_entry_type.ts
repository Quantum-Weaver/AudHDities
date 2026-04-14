// =====================================================
// FILE: constants/generated/hestia-core/ledger_entry_type.ts
// GENERATED: 2026-04-14T20:18:57.650Z
// SOURCE: Constants.public.Enums.ledger_entry_type
// VALUES: 4 entries
// =====================================================

export const LEDGER_ENTRY_TYPE = {
  SALE: 'sale',
  RESIDUAL: 'residual',
  PLATFORM_FEE: 'platform_fee',
  PAYOUT: 'payout',
} as const;

export type LedgerEntryType = typeof LEDGER_ENTRY_TYPE[keyof typeof LEDGER_ENTRY_TYPE];
