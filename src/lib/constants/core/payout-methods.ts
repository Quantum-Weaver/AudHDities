/* @/lib/constants/core/payout-methods.ts */

export const PAYOUT_METHODS = {
  "stripe": "Stripe",
  "paypal": "Paypal",
  "bank": "Bank",
  "crypto": "Crypto"
}

export type PayoutMethods = typeof PAYOUT_METHODS[keyof typeof PAYOUT_METHODS];