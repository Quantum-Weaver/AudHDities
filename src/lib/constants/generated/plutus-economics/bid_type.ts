// =====================================================
// FILE: constants/generated/plutus-economics/bid_type.ts
// GENERATED: 2026-04-13T21:55:48.466Z
// SOURCE: Constants.public.Enums.bid_type
// =====================================================

export const BID_TYPE = {
  CPM: 'cpm',
  CPC: 'cpc',
  CPA: 'cpa',
} as const;

export type BidType = typeof BID_TYPE[keyof typeof BID_TYPE];