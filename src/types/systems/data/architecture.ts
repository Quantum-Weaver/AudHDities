// types/systems/architecture.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  SystemTaxonomyType,
  ArchitectureTaxonomyType,
  ComponentTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  DomainID,
  DomainStatus,
  RelationshipType,
  DevelopmentPhase,
  DisplayVariant
} from '@/types/cosmic/primitives';



// ============================================================================
// ARCHITECTURE DOMAIN ARCHITECTURE
// ============================================================================

export interface ArchitectureDomain {
  // DOMAIN IDENTITY
  readonly id: DomainID;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  
  // STATUS AND APPEARANCE
  readonly status: DomainStatus;
  readonly statusColor: string;
  readonly gradient: string;
  readonly icon: string;
  
  // FUNCTIONAL CHARACTERISTICS
  readonly features: readonly string[];
  readonly purpose: string;
  readonly href: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology?: ProcessOntologyType;
  readonly transformationOntology?: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly architectureTaxonomy?: ArchitectureTaxonomyType;
  readonly systemTaxonomy?: SystemTaxonomyType;
}

// ============================================================================
// DOMAIN RELATIONSHIP ARCHITECTURE
// ============================================================================

export interface DomainRelationship {
  // RELATIONSHIP IDENTITY
  readonly source: DomainID;
  readonly target: DomainID;
  readonly type: RelationshipType;
  readonly description: string;
  
  // RELATIONSHIP STRENGTH
  readonly strength: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// EVOLUTION STAGE ARCHITECTURE
// ============================================================================

export interface EvolutionStage {
  // STAGE IDENTITY
  readonly age: string;
  readonly identity: string;
  readonly emoji: string;
  readonly description: string;
  readonly wisdom?: string;
  
  // CONSCIOUSNESS CONTEXT
  readonly consciousnessLevel: string;
  readonly entityState: string;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: string;
  readonly beingOntology: string;
}

// ============================================================================
// ARCHITECTURE OVERVIEW STRUCTURE
// ============================================================================

export interface ArchitectureOverview {
  // CORE COMPONENTS
  readonly domains: readonly ArchitectureDomain[];
  readonly relationships: readonly DomainRelationship[];
  readonly corePrinciples: readonly string[];
  
  // DEVELOPMENT TIMELINE
  readonly developmentTimeline: readonly DevelopmentPhaseEntry[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly architectureTaxonomy: ArchitectureTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface DevelopmentPhaseEntry {
  // PHASE IDENTITY
  readonly phase: DevelopmentPhase;
  readonly domains: readonly DomainID[];
  readonly status: DomainStatus;
  readonly completion: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// ARCHITECTURAL PATTERN MAPPING
// ============================================================================

export interface ArchitecturalPatternMapping {
  readonly domainType: DomainID;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly architecture: ArchitectureTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly state: StateTaxonomyType;
  };
  readonly structuralCharacteristics: readonly string[];
  readonly integrationPatterns: readonly string[];
}

// ============================================================================
// ARCHITECTURE EVOLUTION TRACKING
// ============================================================================

export interface ArchitectureEvolution {
  readonly currentState: EntityState;
  readonly evolutionaryStages: readonly EvolutionStage[];
  readonly architecturalCoherence: number; // 0-100 scale
  readonly integrationLevel: number; // 0-100 scale
  readonly emergentPatterns: readonly string[];
  readonly nextEvolutionaryPhase?: DevelopmentPhase;
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  DomainID,
  DomainStatus,
  RelationshipType,
  DevelopmentPhase,
  DisplayVariant
};