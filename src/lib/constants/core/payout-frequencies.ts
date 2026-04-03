/* @/lib/constants/core/payout-frequencies.ts */

export const PAYOUT_FREQUENCIES = {
  "weekly": "Weekly",
  "monthly": "Monthly",
  "quarterly": "Quarterly"
}

export type PayoutFrequencies = typeof PAYOUT_FREQUENCIES[keyof typeof PAYOUT_FREQUENCIES];