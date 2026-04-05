/* @/lib/constants/economics/payout-status.ts */

export const PAYOUT_STATUS = {
  'pending': 'Pending',
  'processing': 'Processing',
  'completed': 'Completed',
  'failed': 'Failed'
}

export type PayoutStatus = typeof PAYOUT_STATUS[keyof typeof PAYOUT_STATUS];