/* @/lib/constants/core/user-tiers.ts */

export const USER_TIERS = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  CORPORATE: 'corporate',
  COUNCIL: 'council'
} as const;

export type UserTiers = typeof USER_TIERS[keyof typeof USER_TIERS];