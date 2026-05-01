// =====================================================
// FILE: constants/generated/plutus-economics/ledger_entry_type.ts
// GENERATED: 2026-05-01T03:24:42.966Z
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
