// =====================================================
// FILE: constants/ledger_entry_type.ts
// GENERATED: 2026-04-05T18:10:53.197Z
// SOURCE: Constants.public.Enums.ledger_entry_type
// =====================================================

export const LEDGER_ENTRY_TYPE = {
  SALE: 'sale',
  RESIDUAL: 'residual',
  PLATFORM_FEE: 'platform_fee',
  PAYOUT: 'payout',
} as const;

export type LedgerEntryType = typeof LEDGER_ENTRY_TYPE[keyof typeof LEDGER_ENTRY_TYPE];
