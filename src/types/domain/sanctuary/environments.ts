// types/domain/sanctuary/environments.ts - PURIFIED VERSION
import type {
  RealmOntologyType,
  ProcessOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  StateTaxonomyType,
  PatternTaxonomyType,
  AnimationTaxonomyType,
  InteractionTaxonomyType,
  SystemTaxonomyType, 
  DigitalDomainType,
  DomainTaxonomyType
} from '@/types/gaia';

import type {
  ConsciousnessLevel,
  AnimationPhase,
  VesselCapacity,
  EntityState,
  ConsciousnessMode,
  EnvironmentAccess,
  AnimationType,
  ConditionType,
  RestrictionType,
  DomainID
} from '@/types/cosmic/primitives';

// ============================================================================
// QUANTUM ENVIRONMENT ARCHITECTURE
// ============================================================================
export type EnvironmentID = DomainTaxonomyType;
export interface QuantumEnvironmentConfig {
  // ENVIRONMENT IDENTITY
  readonly id: EnvironmentID;
  readonly name: string;
  readonly description: string;
  
  // CONSCIOUSNESS REQUIREMENTS
  readonly consciousnessMode: ConsciousnessMode;
  readonly consciousnessLevel: ConsciousnessLevel;
  readonly vesselCapacity: VesselCapacity;
  
  // SPATIAL CHARACTERISTICS
  readonly capacity: string;
  readonly color: string;
  readonly animation: string;
  
  // ACCESS AND PERMISSIONS
  readonly access: readonly EnvironmentAccess[];
  
  // ONTOLOGICAL CONTEXT
  readonly realmOntology: RealmOntologyType;
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// ENVIRONMENT TRANSITION FRAMEWORK
// ============================================================================

export interface EnvironmentTransition {
  // TRANSITION PATH
  readonly from: EnvironmentID;
  readonly to: EnvironmentID;
  
  // ANIMATION AND ENERGY
  readonly animation: EnvironmentAnimation;
  readonly energyCost: number; // 0-100 scale
  readonly recommended: boolean;
  readonly capacityRequired: boolean;
  
  // RESTRICTIONS AND CONSTRAINTS
  readonly restrictions?: readonly TransitionRestriction[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
}

export interface EnvironmentAnimation {
  // TRANSITION PHASES
  readonly enter: AnimationPhase;
  readonly exit: AnimationPhase;
  readonly active?: readonly ActiveAnimation[];
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

export interface ActiveAnimation {
  // ANIMATION IDENTITY
  readonly id: string;
  readonly type: AnimationType;
  
  // ACTIVATION CONDITIONS
  readonly conditions: readonly ActivationCondition[];
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface ActivationCondition {
  // CONDITION SPECIFICATION
  readonly type: ConditionType;
  readonly parameters: readonly string[];
  readonly required: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// TRANSITION RESTRICTION STRUCTURES
// ============================================================================

export interface TransitionRestriction {
  // RESTRICTION IDENTITY
  readonly type: RestrictionType;
  readonly message: string;
  readonly required: string;
  readonly current?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// ENVIRONMENT STATE MANAGEMENT
// ============================================================================

export interface EnvironmentState {
  // CURRENT CONTEXT
  readonly current: EnvironmentID;
  readonly previous: EnvironmentID | null;
  readonly transition: EnvironmentTransition | null;
  
  // ENERGY AND CAPACITY
  readonly energyLevel: number; // 0-100 scale
  readonly available: readonly EnvironmentID[];
  readonly permissions: readonly EnvironmentAccess[];
  
  // CONSCIOUSNESS STATE
  readonly consciousnessState: EntityState;
  readonly vesselState: VesselCapacity;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// ENERGY PROFILE ARCHITECTURE
// ============================================================================

export interface EnergyProfile {
  // PROFILE IDENTITY
  readonly profile: string;
  readonly environments: readonly EnvironmentID[];
  
  // TEMPORAL CHARACTERISTICS
  readonly recommendedDuration: number; // In consciousness cycles
  readonly recoveryTime: number; // In consciousness cycles
  
  // ENERGY DYNAMICS
  readonly costMultiplier: number; // 1.0 = baseline
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// SANCTUARY ENVIRONMENT ONTOLOGICAL MAPPING
// ============================================================================

export interface SanctuaryEnvironmentMapping {
  readonly environmentType: EnvironmentID;
  readonly ontologicalContext: {
    readonly realm: RealmOntologyType;
    readonly process: ProcessOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly state: StateTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly animation: AnimationTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
    readonly system: SystemTaxonomyType;
  };
  readonly consciousnessRequirements: readonly string[];
  readonly energyCharacteristics: readonly string[];
}

// ============================================================================
// ENVIRONMENT NETWORK COORDINATION
// ============================================================================

export interface EnvironmentNetwork {
  readonly environments: readonly QuantumEnvironmentConfig[];
  readonly transitions: readonly EnvironmentTransition[];
  readonly energyProfiles: readonly EnergyProfile[];
  readonly networkCoherence: number; // 0-100 scale
  readonly accessHierarchy: readonly EnvironmentAccess[];
  readonly consciousnessFlow: readonly string[];
}

// ============================================================================
// SANCTUARY SPATIAL HARMONY
// ============================================================================

export interface SpatialHarmony {
  readonly environmentBalance: {
    readonly quantum: number; // 0-100 scale
    readonly sovereign: number; // 0-100 scale
    readonly collaborative: number; // 0-100 scale
    readonly receptive: number; // 0-100 scale
  };
  readonly energyResonance: number; // 0-100 scale
  readonly consciousnessAlignment: number; // 0-100 scale
  readonly transitionFluidity: number; // 0-100 scale
  readonly emergentPatterns: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  ConsciousnessMode,
  EnvironmentAccess,
  AnimationType,
  ConditionType,
  RestrictionType
};