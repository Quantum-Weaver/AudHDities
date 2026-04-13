// =====================================================
// FILE: constants/plutus-economics/ledger_entity.ts
// GENERATED: 2026-04-13T16:36:33.084Z
// SOURCE: Constants.public.Enums.ledger_entity
// VALUES: 4 entries
// =====================================================

export const LEDGER_ENTITY = {
  BUYER: 'buyer',
  PLATFORM: 'platform',
  CREATOR: 'creator',
  CONTRIBUTOR: 'contributor',
} as const;

export type LedgerEntity = typeof LEDGER_ENTITY[keyof typeof LEDGER_ENTITY];
