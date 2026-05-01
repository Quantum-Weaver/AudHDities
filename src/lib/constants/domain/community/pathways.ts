// lib/constants/domain/community/pathways.ts
import { 
  AUDIENCE_TYPES, 
  AUDIENCE_CATEGORIES,
  COLLABORATION_TYPES, 
  SUPPORT_TYPES, 
  COMMITMENT_LEVELS,
  type AudienceType, CommitmentLevel 
} from './engagement';

export const AUDIENCE_PATHWAYS = {
  // Emergence Economy Core
  [AUDIENCE_TYPES.EMERGENCE_INVESTORS]: {
    title: "Emergence Investors",
    description: "Front row seats to authentic human potential unfolding through sovereign collaboration",
    capacity: "Premium access to our collaborative web design miracle and capability emergence journey",
    collaborationTypes: [COLLABORATION_TYPES.EMERGENCE_STORYTELLING, COLLABORATION_TYPES.WITNESS_ECONOMY] as const,
    idealProjects: ["Capability emergence case studies", "Trauma-to-treasure documentation", "Sovereign collaboration research"] as const,
    commitmentLevel: COMMITMENT_LEVELS.INVEST
  },
  [AUDIENCE_TYPES.TRANSFORMATION_WITNESSES]: {
    title: "Transformation Witnesses",
    description: "Experience the magic of collaborative skill manifestation from zero to sovereign capability",
    capacity: "Content engagement, community amplification, authentic support through witness economy",
    collaborationTypes: [SUPPORT_TYPES.TRANSFORMATION_AMPLIFICATION, COLLABORATION_TYPES.WITNESS_ECONOMY] as const,
    idealProjects: ["Web design miracle storytelling", "Sovereign economy pioneering", "Authenticity commerce spreading"] as const,
    commitmentLevel: COMMITMENT_LEVELS.WITNESS
  },
  [AUDIENCE_TYPES.COLLABORATIVE_PARTNERS]: {
    title: "Collaborative Partners", 
    description: "Co-create the AudHDities platform while transparently sharing our building process",
    capacity: "Technical architecture through collaborative learning, not expert services",
    collaborationTypes: [COLLABORATION_TYPES.TRANSPARENT_DEVELOPMENT, COLLABORATION_TYPES.CAPABILITY_EMERGENCE] as const,
    idealProjects: ["Emergence economics demonstration", "Disability-advantage systems", "Authentic collaboration models"] as const,
    commitmentLevel: COMMITMENT_LEVELS.CO_CREATE
  },

  // Co-Creation Network
  [AUDIENCE_TYPES.RESEARCH_PARTNERS]: {
    title: "Research Partners",
    description: "Study capability emergence economics and disability innovation models",
    capacity: "Documented research on our collaborative learning process and economic transformation",
    collaborationTypes: [COLLABORATION_TYPES.EMERGENCE_STORYTELLING, COLLABORATION_TYPES.DISABILITY_INNOVATION] as const,
    idealProjects: ["Capability emergence research", "Trauma-informed economic models", "Sovereign collaboration studies"] as const,
    commitmentLevel: COMMITMENT_LEVELS.CO_CREATE
  },
  [AUDIENCE_TYPES.CREATIVE_AMPLIFIERS]: {
    title: "Creative Amplifiers",
    description: "Transform our emergence story into art and spread the witness economy movement",
    capacity: "Artistic interpretation of our web design miracle and collaborative emergence journey",
    collaborationTypes: [SUPPORT_TYPES.TRANSFORMATION_AMPLIFICATION, COLLABORATION_TYPES.EMERGENCE_STORYTELLING] as const,
    idealProjects: ["Digital art installations", "Visual storytelling", "Movement building campaigns"] as const,
    commitmentLevel: COMMITMENT_LEVELS.WITNESS
  },
  [AUDIENCE_TYPES.TECHNICAL_CO_CREATORS]: {
    title: "Technical Co-Creators",
    description: "Build sovereign infrastructure together through transparent learning partnerships",
    capacity: "Collaborative development while publicly sharing our learning process and challenges",
    collaborationTypes: [COLLABORATION_TYPES.TRANSPARENT_DEVELOPMENT, COLLABORATION_TYPES.CAPABILITY_EMERGENCE] as const,
    idealProjects: ["AudHDities platform features", "Sovereign technology systems", "Accessibility infrastructure"] as const,
    commitmentLevel: COMMITMENT_LEVELS.CO_CREATE
  },

  // Community Support
  [AUDIENCE_TYPES.COMMUNITY_WITNESSES]: {
    title: "Community Witnesses",
    description: "Join the authenticity economy movement and support disability innovation",
    capacity: "Organic sharing of our emergence story and witness economy participation",
    collaborationTypes: [COLLABORATION_TYPES.WITNESS_ECONOMY, SUPPORT_TYPES.TRANSFORMATION_AMPLIFICATION] as const,
    idealProjects: ["Community building", "Story amplification", "Movement growth"] as const,
    commitmentLevel: COMMITMENT_LEVELS.WITNESS
  },
  [AUDIENCE_TYPES.MUTUAL_AID_NETWORK]: {
    title: "Mutual Aid Network",
    description: "Support sustainable emergence through disability-informed resource sharing",
    capacity: "Capacity-aware support that honors our energy limitations and processing needs",
    collaborationTypes: [SUPPORT_TYPES.MUTUAL_LEARNING, COLLABORATION_TYPES.DISABILITY_INNOVATION] as const,
    idealProjects: ["Sustainable support systems", "Disability-informed resource networks", "Authentic community care"] as const,
    commitmentLevel: COMMITMENT_LEVELS.WITNESS
  },
  [AUDIENCE_TYPES.DISABILITY_INNOVATORS]: {
    title: "Disability Innovators",
    description: "Co-create commercial advantage models from neurodivergent lived experience",
    capacity: "Collaborative development of disability-as-advantage economic frameworks",
    collaborationTypes: [COLLABORATION_TYPES.DISABILITY_INNOVATION, COLLABORATION_TYPES.CAPABILITY_EMERGENCE] as const,
    idealProjects: ["Neurodivergent business models", "Accessibility innovation", "Inclusive economic systems"] as const,
    commitmentLevel: COMMITMENT_LEVELS.CO_CREATE
  }
} as const;


export const INVITATION_UTILS = {
  getAudienceByType: (type: AudienceType) => 
    AUDIENCE_PATHWAYS[type],
  
  getAudiencesByCategory: (category: keyof typeof AUDIENCE_CATEGORIES) =>
    AUDIENCE_CATEGORIES[category].map(type => AUDIENCE_PATHWAYS[type]),
  
  getPriorityAudiences: () => [
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.EMERGENCE_INVESTORS],
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.COLLABORATIVE_PARTNERS],
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.TRANSFORMATION_WITNESSES]
  ],
  
  getAudienceCommitmentLevel: (type: AudienceType): CommitmentLevel =>
    AUDIENCE_PATHWAYS[type].commitmentLevel,

  // NEW: Emergence Economics Specific Utilities
  getEmergenceInvestmentPathways: () => [
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.EMERGENCE_INVESTORS],
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.TRANSFORMATION_WITNESSES]
  ],
  
  getTransparentCoCreationPathways: () => [
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.COLLABORATIVE_PARTNERS],
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.TECHNICAL_CO_CREATORS]
  ],
  
  getTransformationAmplificationPathways: () => [
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.CREATIVE_AMPLIFIERS],
    AUDIENCE_PATHWAYS[AUDIENCE_TYPES.COMMUNITY_WITNESSES]
  ]
} as const;

export type AudiencePathwayConfig = typeof AUDIENCE_PATHWAYS[AudienceType];