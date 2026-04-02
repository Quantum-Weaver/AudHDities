/* @/lib/constants/cosmic/user-tiers.ts */
export const USER_TIERS = {
  COMMUNITY: 'community',
  ALLY: 'ally',
  CORPORATE: 'corporate',
  COUNCIL: 'council'
} as const;

export type UserTier = typeof USER_TIERS[keyof typeof USER_TIERS];

export const USER_TIER_LABELS: Record<UserTier, string> = {
  community: 'Community Member',
  ally: 'Ally',
  corporate: 'Corporate Partner',
  council: 'Council Member'
};

export const USER_TIER_DESCRIPTIONS: Record<UserTier, string> = {
  community: 'Free/Subsidized access for neurodivergent creators and community members',
  ally: 'Full price access for supportive neurotypical members',
  corporate: 'Premium access for organizations and businesses',
  council: 'Core team and high contributors'
};