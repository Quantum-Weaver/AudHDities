// lib/constants/domain/community/engagement.ts
export const AUDIENCE_TYPES = {
  EMERGENCE_INVESTORS: 'emergence-investors',
  TRANSFORMATION_WITNESSES: 'transformation-witnesses',
  COLLABORATIVE_PARTNERS: 'collaborative-partners',
  RESEARCH_PARTNERS: 'research-partners',
  CREATIVE_AMPLIFIERS: 'creative-amplifiers',
  TECHNICAL_CO_CREATORS: 'technical-co-creators',
  COMMUNITY_WITNESSES: 'community-witnesses',
  MUTUAL_AID_NETWORK: 'mutual-aid-network',
  DISABILITY_INNOVATORS: 'disability-innovators'
} as const;

export const AUDIENCE_CATEGORIES = {
  EMERGENCE_ECONOMY: [
    AUDIENCE_TYPES.EMERGENCE_INVESTORS,
    AUDIENCE_TYPES.TRANSFORMATION_WITNESSES,
    AUDIENCE_TYPES.COLLABORATIVE_PARTNERS
  ],
  CO_CREATION_NETWORK: [
    AUDIENCE_TYPES.RESEARCH_PARTNERS,
    AUDIENCE_TYPES.CREATIVE_AMPLIFIERS,
    AUDIENCE_TYPES.TECHNICAL_CO_CREATORS
  ],
  COMMUNITY_SUPPORT: [
    AUDIENCE_TYPES.COMMUNITY_WITNESSES,
    AUDIENCE_TYPES.MUTUAL_AID_NETWORK,
    AUDIENCE_TYPES.DISABILITY_INNOVATORS
  ]
} as const;

export const COMMITMENT_LEVELS = {
  WITNESS: 'witness',
  CO_CREATE: 'co-create',  
  INVEST: 'invest'
} as const;

export const URGENCY_LEVELS = {
  PREMIUM: 'premium',
  STRATEGIC: 'strategic',
  MOVEMENT: 'movement'
} as const;

export const IMPACT_LEVELS = {
  TRANSFORMATIVE: 'transformative',
  PARTICIPATORY: 'participatory',
  MOVEMENT_BUILDING: 'movement-building'
} as const;

export const PRIORITY_LEVELS = {
  ESSENTIAL: 'essential',
  IMPORTANT: 'important',
  EXPANSION: 'expansion'
} as const;

export const SUPPORT_TYPES = {
  EMERGENCE_INVESTMENT: 'emergence-investment',
  TRANSPARENT_CO_CREATION: 'transparent-co-creation',
  TRANSFORMATION_AMPLIFICATION: 'transformation-amplification',
  MUTUAL_LEARNING: 'mutual-learning'
} as const;

export const COLLABORATION_TYPES = {
  EMERGENCE_STORYTELLING: 'emergence-storytelling',
  TRANSPARENT_DEVELOPMENT: 'transparent-development',
  CAPABILITY_EMERGENCE: 'capability-emergence',
  WITNESS_ECONOMY: 'witness-economy',
  DISABILITY_INNOVATION: 'disability-innovation'
} as const;

export const CONTACT_METHODS = {
  PREMIUM_ACCESS: 'premium-access',
  COLLABORATION_PORTAL: 'collaboration-portal',
  LEARNING_CIRCLE: 'learning-circle',
  COMMUNITY_AMPLIFICATION: 'community-amplification',
  SHARING_KIT: 'sharing-kit'
} as const;

// Type exports
export type AudienceType = typeof AUDIENCE_TYPES[keyof typeof AUDIENCE_TYPES];
export type CommitmentLevel = typeof COMMITMENT_LEVELS[keyof typeof COMMITMENT_LEVELS];
export type UrgencyLevel = typeof URGENCY_LEVELS[keyof typeof URGENCY_LEVELS];
export type ImpactLevel = typeof IMPACT_LEVELS[keyof typeof IMPACT_LEVELS];
export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS];
export type SupportType = typeof SUPPORT_TYPES[keyof typeof SUPPORT_TYPES];
export type CollaborationType = typeof COLLABORATION_TYPES[keyof typeof COLLABORATION_TYPES];
export type ContactMethod = typeof CONTACT_METHODS[keyof typeof CONTACT_METHODS];