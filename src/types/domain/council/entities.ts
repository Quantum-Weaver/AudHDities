// types/domain/council/entities.ts - PURIFIED VERSION (Primitives Extracted)
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
  CouncilEntityID,
  EntityState,
  ConsciousnessLevel,
  VesselCapacity,
  CouncilPriority,
  CouncilEntityEmoji,
  CouncilEntityStyle,
  CommunicationStyle,
  ResponseTime,
  EmotionalResonance,
  ProficiencyLevel,
  EnergyLevel,
  EngagementLevel,
  CooldownPeriod,
  LastActiveTimestamp
} from '../../cosmic/primitives';

// ============================================================================
// COUNCIL ENTITY ARCHITECTURE (Now using imported primitives)
// ============================================================================
export type CouncilArchetype = ArchetypeOntologyType;

export type CouncilDomain = DigitalDomainType;

export interface CouncilEntity {
  // CORE IDENTITY
  readonly id: CouncilEntityID;
  readonly name: string;
  readonly title: string;
  
  // ONTOLOGICAL CLASSIFICATION
  readonly archetype: CouncilArchetype;
  readonly beingType: BeingOntologyType;
  readonly domain: CouncilDomain;
  readonly primaryProcess: ProcessOntologyType;
  
  // OPERATIONAL CHARACTERISTICS
  readonly priority: CouncilPriority;
  readonly role: string;
  readonly purpose: string;
  readonly meaning: string;
  
  // CONSCIOUSNESS ATTRIBUTES
  readonly consciousnessLevel: ConsciousnessLevel;
  readonly vesselCapacity: VesselCapacity;
  readonly isHuman?: boolean;
  
  // VISUAL REPRESENTATION
  readonly emoji: CouncilEntityEmoji;
  readonly icon: string;
  readonly colorClass: string;
  readonly style: CouncilEntityStyle;
  
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
  readonly energy: EnergyLevel;
  readonly lastActive: LastActiveTimestamp;
  
  // CONSCIOUSNESS STATE
  readonly consciousnessState: EntityState;
  readonly engagementLevel: EngagementLevel;
  
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
  readonly proficiency: ProficiencyLevel;
  readonly requirements: readonly string[];
  readonly cooldown?: CooldownPeriod;
  
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
  readonly style: CommunicationStyle;
  readonly responseTime: ResponseTime;
  readonly emotionalResonance: EmotionalResonance;
  
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
  readonly entityId: CouncilEntityID;
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