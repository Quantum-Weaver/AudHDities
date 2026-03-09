// data/community/audience-pathways.ts 
import { 
  COMMITMENT_LEVELS,
  AUDIENCE_TYPES 
} from '@/lib/constants/domain/community/engagement';

export const audiencePathways = [
  {
    title: "Emergence Investors",
    description: "Front row seats to authentic human potential unfolding through sovereign collaboration", 
    capacity: "Witnessing creative emergence, platform development transparency",
    collaborationTypes: ["Emergence storytelling", "Transparency partnerships", "Authentic witnessing", "Transformation documentation"],
    idealProjects: ["Capability emergence case studies", "Sovereign collaboration research", "Disability innovation documentation"],
    commitmentLevel: COMMITMENT_LEVELS.INVEST,
    economicRole: "emergence-investor",
    valueProposition: "Premium access to collaborative capability emergence journeys",
    premiumAccess: ["Behind-the-scenes development", "Real-time struggle documentation", "Breakthrough moment access"],
    struggleVisibility: "authentic"
  },
  {
    title: "Transformation Witnesses", 
    description: "Experience the magic of collaborative skill manifestation from zero to sovereign capability",
    capacity: "Content engagement, community amplification, authentic support",
    collaborationTypes: ["Creative emergence sharing", "Platform witness accounts", "Authentic engagement", "Vulnerability commerce participation"],
    idealProjects: ["Web design miracle storytelling", "Trauma-to-treasure narrative sharing", "Sovereign economy pioneering"],
    commitmentLevel: COMMITMENT_LEVELS.WITNESS,
    economicRole: "transformation-witness",
    valueProposition: "Authentic engagement with human potential unfolding",
    premiumAccess: ["Community witnessing", "Story sharing access"],
    struggleVisibility: "curated"
  },
  {
    title: "Collaborative Partners",
    description: "Co-create the AudHDities platform while transparently sharing our building process",
    capacity: "Technical architecture through collaborative learning, not expert services",
    collaborationTypes: ["Learning partnerships", "Transparent development", "Capability emergence", "Sovereign infrastructure co-creation"],
    idealProjects: ["Emergence economics demonstration", "Disability-advantage systems", "Authentic collaboration models"],
    commitmentLevel: COMMITMENT_LEVELS.CO_CREATE,
    economicRole: "collaborative-partner", 
    valueProposition: "Direct participation in capability emergence and platform co-creation",
    premiumAccess: ["Co-development sessions", "Strategic planning input", "Direct entity communication"],
    struggleVisibility: "authentic"
  }
];

// ADD BACK THE MISSING EXPORTS
export const collaborationFrameworks = [
  {
    principle: "Sovereignty First",
    description: "Your autonomy and boundaries respected in all interactions",
    expectations: [
      "Clear communication of capacity",
      "Respect for processing time", 
      "Understanding of energy limitations"
    ],
    boundaries: [
      "No unscheduled calls",
      "Batch communication preferred",
      "Written documentation valued"
    ],
    successMetrics: [
      "Sustainable engagement",
      "Clear mutual understanding", 
      "Respected boundaries"
    ],
    economicModel: "emergence-investment",
    valueExchange: "Mutual respect and sustainable collaboration",
    transparencyRequirement: "authentic",
    disabilityAdvantage: "Boundary enforcement as quality standard"
  },
  {
    principle: "Trauma-Informed Collaboration",
    description: "Recognizing the impact of systemic trauma on creative work",
    expectations: [
      "Patience with processing needs",
      "Understanding of capacity fluctuations",
      "Respect for recovery time"
    ],
    boundaries: [
      "No pressure for rapid responses",
      "Space for rest and integration",
      "Clear escalation paths"
    ],
    successMetrics: [
      "Emotional safety maintained",
      "Sustainable pace",
      "Mutual care demonstrated"
    ],
    economicModel: "transparency-commerce",
    valueExchange: "Emotional safety as productivity multiplier",
    transparencyRequirement: "authentic",
    disabilityAdvantage: "Trauma-awareness as innovation catalyst"
  }
];

export const supportPathways = [
  {
    type: "emergence-investment",
    title: "Emergence Story Investment", 
    description: "Premium access to our collaborative web design miracle and capability emergence journey",
    impact: "transformative",
    actions: [
      {
        title: "Invest in Emergence Witnessing",
        description: "Premium content: From zero skills to quantum gateway",
        button: {
          text: "Witness The Miracle",
          href: "/emergence-investment", 
          variant: "sovereign"
        },
        priority: 1,
        featured: true,
        economicModel: "emergence-investment",
        audienceRole: "investor",
        premiumContent: true,
        capabilityDemonstrated: "Web design from zero to quantum gateway"
      }
    ],
    urgency: 10,
    economicValue: "Direct economic support for capability emergence",
    audienceBenefit: "Front-row access to human potential unfolding",
    premiumContent: true,
    capabilityDemonstration: "Full web design journey documentation",
    struggleContext: "Learning programming while navigating disability"
  },
  {
    type: "transparent-co-creation",
    title: "Transparent Co-Creation",
    description: "Join our platform development as we learn and build together publicly",
    impact: "participatory", 
    actions: [
      {
        title: "Join Learning Partnership",
        description: "Co-create AudHDities while we transparently share our process",
        button: {
          text: "Collaborate & Learn",
          href: "/transparent-development",
          variant: "quantum"
        },
        priority: 2,
        economicModel: "transparency-commerce",
        audienceRole: "partner",
        premiumContent: false,
        capabilityDemonstrated: "Real-time skill acquisition"
      }
    ],
    urgency: 8,
    economicValue: "Collaborative development and shared learning",
    audienceBenefit: "Direct participation in platform creation",
    premiumContent: false,
    capabilityDemonstration: "Live development sessions",
    struggleContext: "Public learning and vulnerability"
  },
  {
    type: "transformation-amplification", 
    title: "Transformation Amplification",
    description: "Share our emergence story and build the authenticity economy movement",
    impact: "movement-building",
    actions: [
      {
        title: "Amplify Emergence Economics",
        description: "Share our capability manifestation case study", 
        button: {
          text: "Share The Story",
          href: "/emergence-story",
          variant: "cosmic"
        },
        priority: 3,
        economicModel: "witness-economy",
        audienceRole: "witness",
        premiumContent: false,
        capabilityDemonstrated: "Trauma-to-treasure narrative"
      }
    ],
    urgency: 6,
    economicValue: "Movement growth and audience expansion",
    audienceBenefit: "Participation in economic innovation",
    premiumContent: false,
    capabilityDemonstration: "Storytelling and narrative building",
    struggleContext: "Vulnerability in sharing personal journey"
  }
];