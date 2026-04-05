/* @/lib/constants/economics/transaction-types.ts */

export const TRANSACTION_TYPES = {
    'sale':'Sale',
    'residual':'Residual',
    'disbursment': 'Disbursment',
    'payout': "Payout",
    'refund':'Refund'
}

export type TransactionTypes = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];