// =====================================================
// FILE: constants/plutus-economics/ledger_entity.ts
// GENERATED: 2026-04-13T01:15:57.355Z
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
