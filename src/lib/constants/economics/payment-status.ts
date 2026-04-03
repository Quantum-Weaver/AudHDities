/* @/lib/constants/economics/payment-status.ts */

export const PAYMENT_STATUS = {
  'pending': 'Pending',
  'completed': 'Completed',
  'refunded': 'Refunded',  
  'failed': 'Failed'
}

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];