// =====================================================
// FILE: constants/plutus-economics/bid_type.ts
// GENERATED: 2026-04-13T01:15:57.346Z
// SOURCE: Constants.public.Enums.bid_type
// VALUES: 3 entries
// =====================================================

export const BID_TYPE = {
  CPM: 'cpm',
  CPC: 'cpc',
  CPA: 'cpa',
} as const;

export type BidType = typeof BID_TYPE[keyof typeof BID_TYPE];
