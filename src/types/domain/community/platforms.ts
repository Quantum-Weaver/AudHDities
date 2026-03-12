// types/domain/community/platforms.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  RelationshipOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  EngagementPriority,
  PlatformCategory,
  EngagementType,
  PlatformGlow,
  EconomicRole,
  AudienceTier,
  StruggleVisibility,
  GamingStatus,
  EconomicContext,
  EconomicModel,
  AudienceRole,
  GrowthTrend,
  EngagementAction, 
  PremiumTier, 
  StreamFocus
} from '@/types/cosmic/';

// ============================================================================
// SOCIAL PLATFORM ARCHITECTURE
// ============================================================================

export interface SocialPlatform {
  // PLATFORM IDENTITY
  readonly name: string;
  readonly icon: string;
  readonly url: string;
  readonly description: string;
  readonly engagement?: string;
  
  // CATEGORIZATION AND ENERGY
  readonly category: PlatformCategory;
  readonly glow: PlatformGlow;
  readonly priority?: number; // 1-10 scale
  readonly featured?: boolean;
  
  // ECONOMIC INTEGRATION
  readonly economicRole: EconomicRole;
  readonly audienceTier: AudienceTier;
  readonly valueProposition: string;
  readonly struggleVisibility: StruggleVisibility;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// GAMING PROFILE ARCHITECTURE
// ============================================================================

export interface GamingProfile {
  // PROFILE IDENTITY
  readonly platform: string;
  readonly icon: string;
  readonly profile: string;
  readonly url?: string;
  readonly description: string;
  
  // STATUS AND ENERGY
  readonly status: GamingStatus;
  readonly glow: PlatformGlow;
  
  // ECONOMIC GAMING CONTEXT
  readonly economicContext: EconomicContext;
  readonly witnessOpportunity: boolean;
  readonly premiumContent: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// SUPPORT PLATFORM ARCHITECTURE
// ============================================================================

export interface SupportPlatform {
  // PLATFORM IDENTITY
  readonly name: string;
  readonly icon: string;
  readonly url: string;
  readonly description: string;
  
  // TYPE AND PRIORITY
  readonly type: PlatformCategory;
  readonly priority: number; // 1-10 scale
  readonly featured: boolean;
  
  // ECONOMIC SUPPORT CONTEXT
  readonly economicExchange: string;
  readonly valueProposition: string;
  readonly audienceBenefit: string;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: string; // Specific support relationship
}

// ============================================================================
// COMMUNITY METRICS - EMERGENCE ECONOMICS FOCUS
// ============================================================================

export interface CommunityMetrics {
  // QUANTITATIVE METRICS
  readonly totalPlatforms: number;
  readonly activePlatforms: number;
  readonly audienceReach: number;
  readonly engagementRate: number; // 0-100 scale
  readonly growthTrend: GrowthTrend;
  
  // EMERGENCE ECONOMICS METRICS
  readonly emergenceStories: number;
  readonly witnessEngagement: number; // 0-100 scale
  readonly transparencyLogs: number;
  readonly capabilityDemonstrations: number;
  readonly economicValue: number;
  readonly premiumSubscribers: number;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// ENGAGEMENT OPPORTUNITY ARCHITECTURE
// ============================================================================

export interface EngagementOpportunity {
  // OPPORTUNITY IDENTITY
  readonly platform: SocialPlatform;
  readonly type: EngagementType;
  readonly priority: EngagementPriority;
  readonly description: string;
  readonly actionUrl: string;
  
  // ECONOMIC ENGAGEMENT CONTEXT
  readonly economicValue: string;
  readonly audienceRole: AudienceRole;
  readonly premiumContent: boolean;
  readonly struggleContext: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// COMMUNITY PRINCIPLE ARCHITECTURE
// ============================================================================

export interface CommunityPrinciple {
  // PRINCIPLE IDENTITY
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly domain: string; // Consciousness domain reference
  readonly importance: number; // 1-10 scale
  
  // ECONOMIC PRINCIPLE CONTEXT
  readonly economicModel: string;
  readonly valueCreation: string;
  readonly audienceImpact: string;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// PLATFORM ENGAGEMENT EVENT ARCHITECTURE
// ============================================================================

export interface PlatformEngagementEvent {
  // EVENT IDENTITY
  readonly platform: string;
  readonly action: EngagementAction;
  readonly duration?: number; // Consciousness cycles
  readonly referrer?: string;
  readonly context?: string;
  readonly timestamp: string; // Consciousness timestamp
  
  // ECONOMIC ENGAGEMENT TRACKING
  readonly economicContext: EconomicContext;
  readonly audienceRole: AudienceRole;
  readonly valueExchange: string;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// EMERGENCE ECONOMICS COMMUNITY TYPES
// ============================================================================

export interface WitnessCommunity {
  // COMMUNITY IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly platform: SocialPlatform;
  
  // PARTICIPATION METRICS
  readonly members: number;
  readonly engagement: number; // 0-100 scale
  
  // ECONOMIC MODEL
  readonly economicModel: EconomicModel;
  readonly premiumTier: PremiumTier;
  readonly featuredStories: readonly string[];
  readonly capabilityDemonstrations: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: RelationshipOntologyType;
}

export interface EmergenceStream {
  // STREAM IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly platform: SocialPlatform;
  readonly schedule: string; // Consciousness timing
  
  // CONTENT FOCUS
  readonly focus: StreamFocus;
  readonly economicValue: string;
  readonly audienceTier: AudienceTier;
  readonly witnessEngagement: number; // 0-100 scale
  readonly entitiesInvolved: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface TransparencyBroadcast {
  // BROADCAST IDENTITY
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly platform: SocialPlatform;
  
  // TRANSFORMATION NARRATIVE
  readonly struggleShared: string;
  readonly learningProcess: string;
  readonly capabilityEmergence: string;
  readonly economicContext: string;
  
  // AUDIENCE RESPONSE
  readonly audienceReaction: number; // 0-100 scale
  readonly timestamp: string; // Consciousness timestamp
  readonly premiumContent: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface CapabilityShowcase {
  // SHOWCASE IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly platform: SocialPlatform;
  
  // SKILL TRANSFORMATION
  readonly fromSkill: string;
  readonly toSkill: string;
  readonly struggleDocumented: string;
  readonly breakthroughMoment: string;
  
  // ECONOMIC AND SOCIAL IMPACT
  readonly economicValue: string;
  readonly witnessImpact: number; // 0-100 scale
  readonly timestamp: string; // Consciousness timestamp
  readonly premiumContent: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// COMMUNITY PLATFORM ONTOLOGICAL MAPPING
// ============================================================================

export interface CommunityPlatformMapping {
  readonly platformType: PlatformCategory;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly economicCharacteristics: readonly string[];
  readonly engagementPatterns: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  PlatformCategory,
  PlatformGlow,
  EconomicRole,
  AudienceTier,
  StruggleVisibility,
  GamingStatus,
  EconomicContext,
  EngagementType,
  EconomicModel,
  AudienceRole,
  GrowthTrend,
  EngagementPriority,
  EngagementAction,
  PremiumTier,
  StreamFocus
};