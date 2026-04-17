// =====================================================
// FILE: constants/generated/plutus-economics/ledger_entry_type.ts
// GENERATED: 2026-04-17T22:45:09.202Z
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
