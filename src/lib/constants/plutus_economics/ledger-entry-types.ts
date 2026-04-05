/* @/lib/constants/economics/ledger-entry-types.ts */

export const LEDGER_ENTRY_TYPES = {
    'sale':'Sale',
    'residual':'Residual',
    'platform_fee':'Platform Fee'
}

export type LedgerEntryTypes = typeof LEDGER_ENTRY_TYPES[keyof typeof LEDGER_ENTRY_TYPES];