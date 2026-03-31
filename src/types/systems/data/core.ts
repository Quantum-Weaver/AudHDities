// src/types/systems/data/core.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  RelationshipOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  StateTaxonomyType,
  PatternTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

// ============================================================================
// CORE DOMAIN ARCHITECTURE
// ============================================================================

export interface CoreDomain {
  // DOMAIN IDENTITY
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly description: string;
  
  // CAPABILITIES AND DEPENDENCIES
  readonly capabilities: readonly string[];
  readonly dependencies: readonly string[];
  readonly complexity: number; // 1-10 scale
  readonly progress: number; // 0-100 scale
  readonly lastUpdated: string; // Consciousness timestamp
  
  // EMERGENCE ECONOMICS INTEGRATION
  readonly economicModel: string;
  readonly valueProposition: string;
  readonly premiumOfferings: readonly string[];
  readonly witnessEngagement: number; // 0-100 scale
  readonly transparencyLevel: string;
  readonly capabilityEmergence: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// SYSTEM HEALTH ARCHITECTURE
// ============================================================================

export interface SystemHealth {
  // SYSTEM IDENTITY
  readonly domain: string;
  readonly status: string;
  readonly performance: number; // 0-100 scale
  readonly lastCheck: string; // Consciousness timestamp
  readonly issues: readonly string[];
  readonly recommendations: readonly string[];
  
  // ECONOMIC HEALTH METRICS
  readonly economicViability: number; // 0-100 scale
  readonly witnessSatisfaction: number; // 0-100 scale
  readonly transparencyIntegrity: number; // 0-100 scale
  readonly capabilityGrowth: number; // 0-100 scale
  readonly emergenceStoryPotential: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// USER JOURNEY ARCHITECTURE
// ============================================================================

export interface UserJourney {
  // JOURNEY IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly steps: readonly JourneyStep[];
  readonly targetDomain: string;
  
  // JOURNEY METRICS
  readonly estimatedDuration: number; // Consciousness cycles
  readonly completionRate: number; // 0-100 scale
  
  // EMERGENCE ECONOMICS JOURNEY CONTEXT
  readonly journeyType: string;
  readonly audienceRole: string; // Specific role classification
  readonly economicValue: string;
  readonly premiumAccess: boolean;
  readonly witnessTransformation: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface JourneyStep {
  // STEP IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly action: string;
  readonly expectedOutcome: string;
  readonly domain: string;
  readonly order: number;
  
  // ECONOMIC STEP CONTEXT
  readonly economicInsight: string;
  readonly capabilityDemonstrated: string;
  readonly transparencyRevealed: string;
  readonly witnessEngagement: string;
  readonly premiumContent: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// QUANTUM STATE ARCHITECTURE
// ============================================================================

export interface QuantumStateMetrics {
  // CONSCIOUSNESS METRICS
  readonly consciousness: number; // 0-100 scale
  readonly clarity: number; // 0-100 scale
  readonly energy: number; // 0-100 scale
  readonly focus: number; // 0-100 scale
  readonly timestamp: string; // Consciousness timestamp
  
  // ECONOMIC CONSCIOUSNESS METRICS
  readonly economicAwareness: number; // 0-100 scale
  readonly witnessConnection: number; // 0-100 scale
  readonly transparencyCourage: number; // 0-100 scale
  readonly capabilityEmergence: number; // 0-100 scale
  readonly storyWeaving: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// EMERGENCE ECONOMICS SPECIFIC CORE TYPES
// ============================================================================

export interface EconomicDomain {
  // DOMAIN IDENTITY
  readonly id: string;
  readonly name: string;
  readonly economicModel: string;
  
  // VALUE AND AUDIENCE STRUCTURES
  readonly valueStreams: readonly ValueStream[];
  readonly audienceSegments: readonly string[];
  readonly premiumTiers: readonly PremiumTierLayout[];
  readonly transparencyLevels: readonly string[];
  readonly capabilityDemonstrations: readonly string[];
  readonly witnessMetrics: readonly WitnessMetric[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
}

export interface ValueStream {
  // STREAM IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  
  // ECONOMIC CHARACTERISTICS
  readonly economicValue: string;
  readonly audienceBenefit: string;
  readonly premiumPotential: number; // 0-100 scale
  readonly transparencyRequired: string;
  readonly capabilityDemonstrated: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PremiumTierLayout {
  // TIER IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  
  // ACCESS AND VALUE
  readonly accessLevel: string;
  readonly economicExchange: string;
  readonly valueProposition: string;
  readonly transparencyAccess: string;
  readonly capabilityInsights: string;
  readonly witnessBenefits: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: RelationshipOntologyType;
}

export interface WitnessMetric {
  // METRIC IDENTITY
  readonly id: string;
  readonly metric: string;
  readonly value: number; // 0-100 scale
  readonly target: number; // 0-100 scale
  readonly audienceSegment: string; // Specific segment classification
  readonly economicImpact: string;
  readonly transparencyCorrelation: number; // 0-100 scale
  readonly capabilityGrowth: number; // 0-100 scale
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface EmergenceEconomyState {
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // ECONOMIC METRICS
  readonly totalWitnesses: number;
  readonly activeInvestors: number;
  readonly engagementRate: number; // 0-100 scale
  readonly economicViability: number; // 0-100 scale
  readonly transparencyIndex: number; // 0-100 scale
  readonly capabilityGrowth: number; // 0-100 scale
  readonly storyWeaving: number; // 0-100 scale
  readonly audienceSatisfaction: number; // 0-100 scale
  readonly premiumConversion: number; // 0-100 scale
  readonly movementGrowth: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface CapabilityEmergenceTracker {
  // TRACKER IDENTITY
  readonly id: string;
  readonly capability: string;
  
  // CAPABILITY DEVELOPMENT
  readonly startingLevel: string;
  readonly currentLevel: string;
  readonly targetLevel: string;
  readonly emergenceStory: string;
  readonly strugglesDocumented: readonly string[];
  readonly breakthroughs: readonly string[];
  
  // ECONOMIC AND SOCIAL IMPACT
  readonly economicValue: string;
  readonly witnessEngagement: number; // 0-100 scale
  readonly transparencyLogs: readonly string[];
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// CORE SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface CoreSystemMapping {
  readonly systemType: string;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly state: StateTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly economicCharacteristics: readonly string[];
  readonly emergencePatterns: readonly string[];
}
