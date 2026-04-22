// =====================================================
// FILE: constants/generated/plutus-economics/bid_type.ts
// GENERATED: 2026-04-22T18:24:20.321Z
// SOURCE: Constants.public.Enums.bid_type
// VALUES: 3 entries
// =====================================================

export const BID_TYPE = {
  CPM: 'cpm',
  CPC: 'cpc',
  CPA: 'cpa',
} as const;

export type BidType = typeof BID_TYPE[keyof typeof BID_TYPE];
