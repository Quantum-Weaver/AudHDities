// types/gaia/contexts.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  ComponentTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';
// Import contexts primitives from semantic foundation
import type {
  EconomicModelType,
  EconomicPhase,
  EntityState,
  ConsciousnessLevel,
  SystemHealthLevel,
  MetricTrend,
  EngagementLevel,
  EconomicContribution,
  EconomicImpact,
  AudienceReach,
  EconomicValue,
  WitnessCount,
  TransparencyLevel,
  MetricSignificance,
  EnergyLevel,
  EconomicSustainability,
  OverallSystemHealth,
  EconomicHealth,
  EngagementHealth,
  TransparencyHealth,
  WitnessRetention,
  EconomicValuePerWitness,
  StoryAmplificationRate,
  CapabilityDemonstrationImpact,
  EmergenceInvestments,
  TransparencyEngagement,
  CapabilityDemonstrationsValue,
  StoryAmplificationValue
} from '@/types/cosmic/primitives';
import { 
  EmergenceStory, 
  TransparencyLog, 
  WitnessEngagement, 
  EntityCapabilityDemonstration,
  /*EntityCollaborationContext, 
  WitnessCommunityContext, 
  SocialAmplificationContext, 
  TransparencyAssets, 
  AccessTiers, 
  TransparencyMetrics, 
  EntityEconomicPosition, 
  SessionEconomicImpact, 
  StoryCoordination*/} from '@/types/systems/data/entity';
// ============================================================================
// EMERGENCE ECONOMICS CONTEXT ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface EmergenceEconomicsContext {
  // ECONOMIC IDENTITY
  readonly economicModel: EconomicModelType;
  readonly currentPhase: EconomicPhase;
  
  // DEVELOPMENT JOURNEY
  readonly webDesignJourney: WebDesignJourney;
  
  // ENGAGEMENT STRUCTURE
  readonly activeAudiences: readonly string[]; // Audience type identifiers
  readonly witnessEngagement: readonly WitnessEngagement[];
  readonly economicMetrics: readonly EconomicMetric[];
  
  // CONTENT CREATION
  readonly emergenceStories: readonly EmergenceStory[];
  readonly capabilityDemonstrations: readonly EntityCapabilityDemonstration[];
  readonly transparencyLogs: readonly TransparencyLog[];
  
  // SYSTEM STATE
  readonly systemHealth: SystemHealthState;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface WebDesignJourney {
  // JOURNEY IDENTITY
  readonly startingPoint: string;
  readonly currentCapability: string;
  readonly breakthroughMoments: readonly string[];
  readonly economicValue: string;
  readonly premiumContent: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface EconomicMetric {
  // METRIC IDENTITY
  readonly metricId: string;
  readonly value: EconomicContribution;
  readonly trend: MetricTrend;
  readonly significance: MetricSignificance;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface SystemHealthState {
  // HEALTH METRICS (using primitive types)
  readonly energyLevel: EnergyLevel;
  readonly transparencyLevel: TransparencyLevel;
  readonly witnessEngagement: EngagementLevel;
  readonly economicSustainability: EconomicSustainability;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// WITNESS ECONOMY CONTEXT ARCHITECTURE
// ============================================================================

export interface WitnessEconomyContext {
  // WITNESS MANAGEMENT
  readonly activeWitnesses: ActiveWitnesses;
  
  // ECONOMIC FLOWS
  readonly valueExchange: ValueExchange;
  
  // PREMIUM STRUCTURE
  readonly premiumTiers: PremiumTiersConext;
  
  // GROWTH METRICS
  readonly growthIndicators: GrowthIndicators;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ActiveWitnesses {
  // WITNESS CATEGORIES
  readonly investors: readonly WitnessEngagement[];
  readonly transformationWitnesses: readonly WitnessEngagement[];
  readonly collaborativePartners: readonly WitnessEngagement[];
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface ValueExchange {
  // EXCHANGE FLOWS (using primitive types)
  readonly emergenceInvestments: EmergenceInvestments;
  readonly transparencyEngagement: TransparencyEngagement;
  readonly capabilityDemonstrations: CapabilityDemonstrationsValue;
  readonly storyAmplification: StoryAmplificationValue;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface PremiumTiersConext {
  // TIER STRUCTURE
  readonly basic: TierBenefits;
  readonly premium: TierBenefits;
  readonly exclusive: TierBenefits;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface TierBenefits {
  // BENEFIT CATEGORIES
  readonly access: readonly string[];
  readonly engagement: readonly string[];
  readonly economicBenefits?: readonly string[];
  readonly directCollaboration?: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface GrowthIndicators {
  // INDICATOR METRICS (using primitive types)
  readonly witnessRetention: WitnessRetention;
  readonly economicValuePerWitness: EconomicValuePerWitness;
  readonly storyAmplificationRate: StoryAmplificationRate;
  readonly capabilityDemonstrationImpact: CapabilityDemonstrationImpact;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// SYSTEM CONTEXT ARCHITECTURE
// ============================================================================

export interface SystemContextState {
  // CORE ECONOMIC CONTEXTS
  readonly emergenceEconomics: EmergenceEconomicsContext;
  readonly witnessEconomy: WitnessEconomyContext;
  readonly transparencyCommerce: TransparencyCommerceContext;
  
  // ENTITY CONTEXTS
  readonly councilEmergence: CouncilEmergenceContext;
  //readonly entityCollaboration: EntityCollaborationContext;
  
  // COMMUNITY CONTEXTS
  //readonly witnessCommunity: WitnessCommunityContext;
  //readonly socialAmplification: SocialAmplificationContext;
  
  // SYSTEM HEALTH
  readonly systemHealth: ComprehensiveSystemHealth;
  
  // CURRENT FOCUS
  readonly currentFocus: CurrentFocus;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface TransparencyCommerceContext {
  // TRANSPARENCY ASSETS
  //readonly transparencyAssets: TransparencyAssets;
  
  // ACCESS STRUCTURE
  //readonly accessTiers: AccessTiers;
  
  // TRANSPARENCY METRICS
  //readonly transparencyMetrics: TransparencyMetrics;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface CouncilEmergenceContext {
  // ENTITY ECONOMICS
  //readonly entityEconomicPositions: Record<string, EntityEconomicPosition>;
  
  // SESSION ECONOMICS
  //readonly sessionEconomicImpact: Record<string, SessionEconomicImpact>;
  
  // STORY COORDINATION
  //readonly storyCoordination: StoryCoordination;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface ComprehensiveSystemHealth {
  // HEALTH DIMENSIONS (using primitive types)
  readonly overall: OverallSystemHealth;
  readonly economic: EconomicHealth;
  readonly engagement: EngagementHealth;
  readonly transparency: TransparencyHealth;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface CurrentFocus {
  // FOCUS AREAS
  readonly primary: string;
  readonly secondary: readonly string[];
  readonly economicObjectives: readonly string[];
  readonly audienceEngagement: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// CONTEXT MAPPING ARCHITECTURE
// ============================================================================

export interface ContextSystemMapping {
  readonly contextType: string;
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
    readonly component: ComponentTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly managementPatterns: readonly string[];
  readonly coordinationCharacteristics: readonly string[];
}