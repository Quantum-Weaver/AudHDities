// =====================================================
// FILE: constants/bid_type.ts
// GENERATED: 2026-04-05T19:46:33.209Z
// SOURCE: Constants.public.Enums.bid_type
// =====================================================

export const BID_TYPE = {
  CPM: 'cpm',
  CPC: 'cpc',
  CPA: 'cpa',
} as const;

export type BidType = typeof BID_TYPE[keyof typeof BID_TYPE];
