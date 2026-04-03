/* @/lib/constants/economics/ledger-entities.ts */

export const LEDGER_ENTITIES = {
    'buyer':'Buyer',
    'platform':'Platform',
    'creator':'Creator'
}

export type LedgerEntities = typeof LEDGER_ENTITIES[keyof typeof LEDGER_ENTITIES];