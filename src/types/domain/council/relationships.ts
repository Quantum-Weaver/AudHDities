// types/domain/council/relationships.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  RelationshipOntologyType,
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  RelationshipTaxonomyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType
} from '../../gaia';

// Import all council relationship primitives
import type {
  RelationshipFrequency,  
  RelationshipType,
  CollaborationMode,
  CouncilEntityID,
  InteractionDuration,
  InteractionType,
  EmotionalImpact,
  TrendDirection,
  RelationshipStrength,
  PatternCoherence,
  InteractionSignificance,
  OutcomeSuccess,
  OutcomeImpact,
  NetworkCoherence,
  MetricValueType,
  MetricScaleType,
  HistoryTimestamp,
  LearningCollection,
  ActionCollection,
  EmergentPatternCollection,
  ExpectedBehaviorCollection
} from '@/types/cosmic/primitives';

// ============================================================================
// COUNCIL RELATIONSHIP CORE TYPES (Using imported primitives)
// ============================================================================

export type CouncilRelationshipType = RelationshipOntologyType;

// ============================================================================
// COUNCIL RELATIONSHIP ARCHITECTURE
// ============================================================================

export interface CouncilRelationship {
  // RELATIONSHIP IDENTITY
  readonly id: string;
  readonly source: CouncilEntityID;
  readonly target: CouncilEntityID;
  
  // ONTOLOGICAL CLASSIFICATION
  readonly type: CouncilRelationshipType;
  readonly processType: ProcessOntologyType;
  readonly energyType: EnergyOntologyType;
  
  // RELATIONSHIP DYNAMICS (using primitives)
  readonly strength: RelationshipStrength;
  readonly frequency: RelationshipFrequency;
  readonly coherence: PatternCoherence;
  
  // COLLABORATION PATTERNS
  readonly collaboration: CollaborationPattern;
  readonly transformation: TransformationOntologyType;
  
  // HISTORICAL CONTEXT
  readonly history: readonly RelationshipHistory[];
  
  // TAXONOMIC INTEGRATION
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// COLLABORATION PATTERN FRAMEWORK
// ============================================================================

export interface CollaborationPattern {
  // COLLABORATION STRUCTURE (using primitives)
  readonly mode: CollaborationMode;
  readonly duration: InteractionDuration;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly relationshipOntology: RelationshipOntologyType;
  
  // PATTERN CHARACTERISTICS (using primitives)
  readonly methods: readonly string[];
  readonly metrics: readonly CollaborationMetric[];
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// COLLABORATION METRIC STRUCTURES
// ============================================================================

export interface CollaborationMetric {
  // METRIC IDENTITY
  readonly id: string;
  readonly description: string;
  
  // VALUE REPRESENTATION (using primitives)
  readonly valueType: MetricValueType;
  readonly scaleType: MetricScaleType;
  
  // TREND ANALYSIS (using primitives)
  readonly trend: TrendDirection;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// RELATIONSHIP HISTORICAL RECORD
// ============================================================================

export interface RelationshipHistory {
  // TEMPORAL CONTEXT (using primitives)
  readonly timestamp: HistoryTimestamp;
  readonly interactionType: InteractionType;
  
  // INTERACTION CONTENT
  readonly description: string;
  readonly significance: InteractionSignificance;
  
  // OUTCOME ANALYSIS
  readonly outcome: RelationshipOutcome;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
}

// ============================================================================
// RELATIONSHIP OUTCOME STRUCTURE
// ============================================================================

export interface RelationshipOutcome {
  // SUCCESS MEASUREMENT (using primitives)
  readonly success: OutcomeSuccess;
  readonly impact: OutcomeImpact;
  
  // DEVELOPMENTAL ASPECTS (using primitives)
  readonly learnings: LearningCollection;
  readonly actions: ActionCollection;
  
  // EMOTIONAL RESONANCE (using primitives)
  readonly emotionalImpact: EmotionalImpact;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationType: TransformationOntologyType;
  readonly energyType: EnergyOntologyType;
}

// ============================================================================
// COUNCIL RELATIONSHIP ONTOLOGICAL MAPPING
// ============================================================================

export interface CouncilRelationshipMapping {
  readonly relationshipType: CouncilRelationshipType;
  readonly ontologicalContext: {
    readonly relationship: RelationshipOntologyType;
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
  };
  readonly taxonomicClassification: {
    readonly relationship: RelationshipTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly data: DataTaxonomyType;
  };
  readonly expectedBehaviors: ExpectedBehaviorCollection;
}

// ============================================================================
// RELATIONSHIP NETWORK ANALYSIS
// ============================================================================

export interface CouncilRelationshipNetwork {
  readonly entities: readonly CouncilEntityID[];
  readonly relationships: readonly CouncilRelationship[];
  readonly networkCoherence: NetworkCoherence;
  readonly emergentPatterns: EmergentPatternCollection;
  readonly ontologicalBalance: {
    readonly being: number;
    readonly process: number;
    readonly relationship: number;
    readonly transformation: number;
  };
}