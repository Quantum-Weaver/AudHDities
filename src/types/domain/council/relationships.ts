// src/types/domain/council/relationships.ts - PURIFIED VERSION (Primitives Extracted)
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
  readonly source: string
  readonly target: string
  
  // ONTOLOGICAL CLASSIFICATION
  readonly type: CouncilRelationshipType;
  readonly processType: ProcessOntologyType;
  readonly energyType: EnergyOntologyType;
  
  // RELATIONSHIP DYNAMICS (using primitives)
  readonly strength: string;
  readonly frequency: string;
  readonly coherence: string;
  
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
  readonly mode: string;
  readonly duration: string;
  
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
  readonly valueType: string;
  readonly scaleType: string;
  
  // TREND ANALYSIS (using primitives)
  readonly trend: string;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// RELATIONSHIP HISTORICAL RECORD
// ============================================================================

export interface RelationshipHistory {
  // TEMPORAL CONTEXT (using primitives)
  readonly timestamp: string;
  readonly interactionType: string;
  
  // INTERACTION CONTENT
  readonly description: string;
  readonly significance: string;
  
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
  readonly success: string;
  readonly impact: string;
  
  // DEVELOPMENTAL ASPECTS (using primitives)
  readonly learnings: string;
  readonly actions: string;
  
  // EMOTIONAL RESONANCE (using primitives)
  readonly emotionalImpact: string;
  
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
  readonly expectedBehaviors: string;
}

// ============================================================================
// RELATIONSHIP NETWORK ANALYSIS
// ============================================================================

export interface CouncilRelationshipNetwork {
  readonly entities: readonly string[];
  readonly relationships: readonly CouncilRelationship[];
  readonly networkCoherence: string;
  readonly emergentPatterns: string;
  readonly ontologicalBalance: {
    readonly being: number;
    readonly process: number;
    readonly relationship: number;
    readonly transformation: number;
  };
}