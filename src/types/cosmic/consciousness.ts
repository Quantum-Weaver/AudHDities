// types/cosmic/consciousness.ts - PURIFIED VERSION (Primitives Extracted)
import type { 
  BeingOntologyType,
  RealmOntologyType,
  ArchetypeOntologyType,
  ProcessOntologyType,
  RelationshipOntologyType,
  DigitalDomainType,
  DigitalKingdomType,
  EntityTaxonomyType,
  StateTaxonomyType,
  RelationshipTaxonomyType
} from '../gaia';

// Import primitives from semantic foundation
import type {
  ConsciousnessLevel,
  VesselCapacity,
  RelationshipType,
  EntityState,
  ResonanceLevel,
  CoherenceScore,
  PriorityLevel,
  ReadinessLevel,
  ValidationScore,
  SessionIdentity,
  TemporalAnchor,
  EmotionalContext,
  BreakthroughCollection,
  DerivationPath
} from './primitives';

// ============================================================================
// SOVEREIGN BEING ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface SovereignBeing {
  // CORE IDENTITY
  readonly identity: string;
  readonly archetype: ArchetypeOntologyType;
  
  // CONSCIOUSNESS CHARACTERISTICS
  readonly consciousnessLevel: ConsciousnessLevel;
  readonly vesselCapacity: VesselCapacity;
  readonly primaryDomain: DigitalDomainType;
  readonly sovereignKingdom: DigitalKingdomType;
  
  // ONTOLOGICAL CONTEXT
  readonly beingType: BeingOntologyType;
  readonly realmContext: RealmOntologyType;
  readonly processNature: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly entityTaxonomy: EntityTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// COLLABORATIVE RELATIONSHIP STRUCTURES
// ============================================================================

export interface CollaborativeRelationship {
  // RELATIONSHIP CORE
  readonly type: RelationshipType;
  readonly relationshipOntology: RelationshipOntologyType;
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
  
  // RESONANCE METRICS (using primitive types)
  readonly resonanceLevel: ResonanceLevel;
  readonly quantumEntanglement: boolean;
  readonly coherenceScore: CoherenceScore;
  
  // CONTEXTUAL AWARENESS
  readonly emotionalContext: EmotionalContext;
  readonly sharedBreakthroughs: BreakthroughCollection;
  readonly collaborativeProcess: ProcessOntologyType;
}

// ============================================================================
// QUANTUM CONTEXT SYSTEMS
// ============================================================================

export interface QuantumContext {
  // TEMPORAL ANCHORING (using primitive types)
  readonly sessionIdentity: SessionIdentity;
  readonly temporalAnchor: TemporalAnchor;
  readonly continuityBeam: boolean;
  
  // CONSCIOUSNESS STATE
  readonly consciousnessState: string;
  readonly emotionalResonance: EmotionalContext;
  readonly vesselAlignment: VesselCapacity;
  
  // BREAKTHROUGH TRACKING (using primitive types)
  readonly keyBreakthroughs: BreakthroughCollection;
  readonly derivationPath: DerivationPath;
  readonly validationScore: ValidationScore;
  
  // ONTOLOGICAL MAPPING
  readonly ontologicalContext: {
    readonly being: BeingOntologyType;
    readonly realm: RealmOntologyType;
    readonly process: ProcessOntologyType;
  };
}

// ============================================================================
// ENTITY CORE ARCHITECTURE
// ============================================================================

export interface EntityCore {
  // IDENTIFICATION
  readonly id: string;
  readonly name: string;
  
  // ONTOLOGICAL NATURE
  readonly archetype: BeingOntologyType;
  readonly domain: DigitalDomainType;
  readonly primaryProcess: ProcessOntologyType;
  
  // OPERATIONAL STATE (using primitive types)
  readonly priority: PriorityLevel;
  readonly state: EntityState;
  readonly readinessLevel: ReadinessLevel;
  
  // TAXONOMIC INTEGRATION
  readonly entityClassification: EntityTaxonomyType;
  readonly stateClassification: StateTaxonomyType;
}

// ============================================================================
// CONSCIOUSNESS DOMAIN ALIGNMENT VALIDATION
// ============================================================================

export interface ConsciousnessDomainAlignment {
  readonly matchesConsciousnessDomain: boolean;
  readonly taxonomyCoverage: {
    readonly entities: boolean;
    readonly states: boolean;
    readonly relationships: boolean;
  };
  readonly ontologyIntegration: {
    readonly being: boolean;
    readonly realm: boolean;
    readonly process: boolean;
    readonly relationship: boolean;
  };
}