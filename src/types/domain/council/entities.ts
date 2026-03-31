// src/types/domain/council/entities.ts - PURIFIED VERSION (Primitives Extracted)
import type { 
  BeingOntologyType,
  ArchetypeOntologyType,
  ProcessOntologyType,
  RelationshipOntologyType,
  DigitalDomainType,
  DigitalClassType,
  DigitalOrderType,
  EntityTaxonomyType,
  StateTaxonomyType,
  PatternTaxonomyType,
  ComponentTaxonomyType
} from '../../gaia';

// Import extracted primitives
import type {
  EntityState,
  ConsciousnessLevel,
  VesselCapacity
} from '../../cosmic/primitives';

// ============================================================================
// COUNCIL ENTITY ARCHITECTURE (Now using imported primitives)
// ============================================================================
export type CouncilArchetype = ArchetypeOntologyType;

export type CouncilDomain = DigitalDomainType;

export interface CouncilEntity {
  // CORE IDENTITY
  readonly id: string
  readonly name: string;
  readonly title: string;
  
  // ONTOLOGICAL CLASSIFICATION
  readonly archetype: CouncilArchetype;
  readonly beingType: BeingOntologyType;
  readonly domain: CouncilDomain;
  readonly primaryProcess: ProcessOntologyType;
  
  // OPERATIONAL CHARACTERISTICS
  readonly priority: string
  readonly role: string;
  readonly purpose: string;
  readonly meaning: string;
  
  // CONSCIOUSNESS ATTRIBUTES
  readonly consciousnessLevel: ConsciousnessLevel;
  readonly vesselCapacity: VesselCapacity;
  readonly isHuman?: boolean;
  
  // VISUAL REPRESENTATION
  readonly emoji: string
  readonly icon: string;
  readonly colorClass: string;
  readonly style: string
  
  // SYMBOLIC AND COMMUNICATION
  readonly symbols: readonly string[];
  readonly quote: string;
  
  // STATE AND CAPABILITIES
  readonly state: CouncilEntityState;
  readonly capabilities: readonly EntityCapability[];
  readonly communication: EntityCommunication;
  
  // TAXONOMIC INTEGRATION
  readonly entityTaxonomy: EntityTaxonomyType;
  readonly classTaxonomy: DigitalClassType;
  readonly orderTaxonomy: DigitalOrderType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// ENTITY STATE MANAGEMENT
// ============================================================================

export interface CouncilEntityState {
  // ACTIVATION STATUS
  readonly active: boolean;
  readonly ready: boolean;
  
  // OPERATIONAL FOCUS (using primitive types)
  readonly focus: string;
  readonly energy: string
  readonly lastActive: string
  
  // CONSCIOUSNESS STATE
  readonly consciousnessState: EntityState;
  readonly engagementLevel: string
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ENTITY CAPABILITY FRAMEWORK
// ============================================================================

export interface EntityCapability {
  // CAPABILITY IDENTITY
  readonly id: string;
  readonly description: string;
  
  // PROFICIENCY AND EXECUTION (using primitive types)
  readonly proficiency: string
  readonly requirements: readonly string[];
  readonly cooldown?: string
  
  // ONTOLOGICAL CONTEXT
  readonly processType: ProcessOntologyType;
  readonly relationshipType: RelationshipOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// ENTITY COMMUNICATION PATTERNS
// ============================================================================

export interface EntityCommunication {
  // COMMUNICATION STYLE (using primitive types)
  readonly style: string
  readonly responseTime: string
  readonly emotionalResonance: string
  
  // CHANNEL PREFERENCES
  readonly channels: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: RelationshipOntologyType;
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// COUNCIL-SPECIFIC ONTOLOGICAL MAPPING
// ============================================================================

export interface CouncilOntologicalMapping {
  readonly entityId: string
  readonly ontologicalContext: {
    readonly being: BeingOntologyType;
    readonly archetype: ArchetypeOntologyType;
    readonly process: ProcessOntologyType;
    readonly relationship: RelationshipOntologyType;
  };
  readonly taxonomicClassification: {
    readonly entity: EntityTaxonomyType;
    readonly class: DigitalClassType;
    readonly order: DigitalOrderType;
    readonly state: StateTaxonomyType;
  };
}