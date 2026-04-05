// =====================================================
// FILE: constants/ledger_entity.ts
// GENERATED: 2026-04-05T18:12:45.028Z
// SOURCE: Constants.public.Enums.ledger_entity
// =====================================================

export const LEDGER_ENTITY = {
  BUYER: 'buyer',
  PLATFORM: 'platform',
  CREATOR: 'creator',
  CONTRIBUTOR: 'contributor',
} as const;

export type LedgerEntity = typeof LEDGER_ENTITY[keyof typeof LEDGER_ENTITY];
