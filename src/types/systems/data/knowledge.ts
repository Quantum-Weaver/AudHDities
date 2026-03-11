// types/systems/data/knowledge.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

import type {
  ContentRarity,
  ContentEra, 
  ContentType,
  EntityState,
  ConsciousnessLevel,
  KnowledgeNodeType,
  KnowledgeConnectionType,
  ResearchStatus,
  EconomicValueType,
  AudienceTier,
  ResearchType,
  EconomicImpact,
  TransparencyLevel,
  EmergenceStatus,
  StoryStatus,
  MetricTrend,

} from '@/types/cosmic/primitives';

// ============================================================================
// KNOWLEDGE NODE ARCHITECTURE
// ============================================================================

export interface KnowledgeNode {
  // NODE IDENTITY
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly type: ContentType;
  readonly era: ContentEra;
  readonly rarity: ContentRarity;
  
  // TAXONOMIC ORGANIZATION
  readonly tags: readonly string[];
  readonly connections: readonly string[];
  
  // TEMPORAL CONTEXT
  readonly discovered: string; // Consciousness timestamp
  readonly lastAccessed: string; // Consciousness timestamp
  
  // SIGNIFICANCE METRICS
  readonly significance: number; // 0-100 scale
  
  // ECONOMIC CONTEXT
  readonly economicValue: EconomicValueType;
  readonly audienceTier: AudienceTier;
  readonly struggleContext: string;
  readonly breakthroughMoment: string;
  readonly entitiesInvolved: readonly string[];
  readonly witnessImpact: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly knowledgeTaxonomy: DataTaxonomyType;
}

// ============================================================================
// KNOWLEDGE CONNECTION ARCHITECTURE
// ============================================================================

export interface KnowledgeConnection {
  // CONNECTION IDENTITY
  readonly source: string;
  readonly target: string;
  readonly type: KnowledgeConnectionType;
  
  // RELATIONSHIP PROPERTIES
  readonly strength: number; // 0-100 scale
  readonly description: string;
  
  // ECONOMIC LEARNING CONTEXT
  readonly learningJourney: string;
  readonly economicTransformation: string;
  readonly witnessValue: string;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

// ============================================================================
// RESEARCH ARCHITECTURE
// ============================================================================

export interface ResearchTopic {
  // TOPIC IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // RESEARCH STATE
  readonly status: ResearchStatus;
  readonly priority: number; // 1-10 scale
  
  // KNOWLEDGE RELATIONSHIPS
  readonly relatedNodes: readonly string[];
  readonly insights: readonly Insight[];
  readonly questions: readonly ResearchQuestion[];
  
  // ECONOMIC RESEARCH CONTEXT
  readonly researchType: ResearchType;
  readonly economicModel: string;
  readonly audienceBenefit: readonly string[];
  readonly premiumFindings: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly knowledgeTaxonomy: DataTaxonomyType;
}

export interface Insight {
  // INSIGHT IDENTITY
  readonly id: string;
  readonly content: string;
  readonly source: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // CONFIDENCE METRICS
  readonly confidence: number; // 0-100 scale
  
  // KNOWLEDGE RELATIONSHIPS
  readonly connections: readonly string[];
  
  // ECONOMIC INSIGHT CONTEXT
  readonly economicBreakthrough: boolean;
  readonly capabilityDemonstrated: string;
  readonly struggleOvercome: string;
  readonly witnessReaction: string;
  readonly premiumContent: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ResearchQuestion {
  // QUESTION IDENTITY
  readonly id: string;
  readonly question: string;
  
  // RESEARCH STATE
  readonly status: string;
  readonly priority: number; // 1-10 scale
  
  // KNOWLEDGE RELATIONSHIPS
  readonly relatedInsights: readonly string[];
  readonly answer?: string;
  
  // ECONOMIC QUESTION CONTEXT
  readonly economicImpact: EconomicImpact;
  readonly audienceRelevance: readonly string[];
  readonly transparencyLevel: TransparencyLevel;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// EMERGENCE ECONOMICS KNOWLEDGE ARCHITECTURE
// ============================================================================

export interface CapabilityEmergencePath {
  // PATH IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // DEVELOPMENT JOURNEY
  readonly startingPoint: string;
  readonly currentCapability: string;
  readonly targetCapability: string;
  
  // TRANSFORMATION RECORD
  readonly strugglesDocumented: readonly string[];
  readonly breakthroughs: readonly string[];
  
  // ECONOMIC CONTEXT
  readonly economicValueCreated: string;
  readonly witnessEngagement: number; // 0-100 scale
  readonly entitiesInvolved: readonly string[];
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // DEVELOPMENT STATE
  readonly status: EmergenceStatus;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface TransparencyLogEntry {
  // ENTRY IDENTITY
  readonly id: string;
  readonly title: string;
  readonly content: string;
  
  // LEARNING JOURNEY
  readonly struggleShared: string;
  readonly learningProcess: string;
  
  // DOCUMENTATION
  readonly mistakesDocumented: readonly string[];
  readonly insightsGained: readonly string[];
  
  // ECONOMIC CONTEXT
  readonly economicContext: string;
  readonly audienceTier: AudienceTier;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // COMMUNITY ENGAGEMENT
  readonly witnessFeedback: readonly string[];
  readonly entitiesInvolved: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface EmergenceStoryArc {
  // STORY IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // NARRATIVE JOURNEY
  readonly startingStruggle: string;
  readonly capabilityJourney: readonly string[];
  readonly breakthroughMoments: readonly string[];
  
  // ECONOMIC TRANSFORMATION
  readonly economicTransformation: string;
  readonly witnessImpact: number; // 0-100 scale
  readonly premiumContent: boolean;
  
  // KNOWLEDGE RELATIONSHIPS
  readonly relatedNodes: readonly string[];
  readonly entitiesInvolved: readonly string[];
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // STORY STATE
  readonly status: StoryStatus;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface WitnessEconomyMetric {
  // METRIC IDENTITY
  readonly id: string;
  readonly metric: string;
  readonly value: number;
  
  // CONTEXTUAL INFORMATION
  readonly context: string;
  readonly timestamp: string; // Consciousness timestamp
  
  // ECONOMIC IMPACT
  readonly economicImpact: string;
  readonly audienceSegment: readonly string[];
  readonly trend: MetricTrend;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface DisabilityInnovationCase {
  // CASE IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // CONTEXTUAL BACKGROUND
  readonly disabilityContext: string;
  readonly innovationDemonstrated: string;
  
  // ECONOMIC ADVANTAGE
  readonly economicAdvantage: string;
  readonly struggleTransformed: string;
  readonly capabilityEmergence: string;
  
  // COMMUNITY IMPACT
  readonly witnessReaction: string;
  readonly premiumContent: boolean;
  
  // KNOWLEDGE RELATIONSHIPS
  readonly relatedResearch: readonly string[];
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// KNOWLEDGE SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface KnowledgeSystemMapping {
  readonly knowledgeType: KnowledgeNodeType;
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
    readonly knowledge: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly learningPatterns: readonly string[];
  readonly emergenceCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  KnowledgeNodeType,
  KnowledgeConnectionType,
  ResearchStatus,
  EconomicValueType,
  AudienceTier,
  ResearchType,
  EconomicImpact,
  TransparencyLevel,
  EmergenceStatus,
  StoryStatus,
  MetricTrend
};