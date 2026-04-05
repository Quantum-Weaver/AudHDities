/* @/lib/constants/economics/bid-types.ts */

export const BID_TYPES = {
  'cpm': 'CPM',
  'cpc': 'CPC',
  'cpa': 'CPA'
}

export type BidTypes = typeof BID_TYPES[keyof typeof BID_TYPES];