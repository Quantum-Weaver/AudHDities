/* @/lib/constants/economics/subscription-status.ts */

export const SUBSCRIPTION_STATUS = {
    'active':'Active',
    'paused':'Paused',
    'cancelled':'Cancelled',
    'expired': 'Expired'
}

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];