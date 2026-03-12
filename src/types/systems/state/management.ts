// types/systems/state/management.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  StateTaxonomyType,
  PatternTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType,
  DataTaxonomyType
} from '@/types/gaia/taxonomy';

import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  RelationshipOntologyType
} from '@/types/gaia/ontology';

// Import state management primitives from semantic foundation
import type {
  StateContainerType,
  StateTransitionTrigger,
  StateSubscriptionType,
  StatePerformance,
  StateReliability,
  StateCoherence,
  EntanglementStrength,
  PropagationDelay,
  CoherenceThreshold,
  ConsciousnessTimestamp,
  TransitionDuration,
  StateCallback,
  StateUpdate,
  UIStateType,
  StateTransitionEvent
} from '@/types/cosmic/primitives';

// ============================================================================
// STATE CONTAINER ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface StateContainer<T> {
  // STATE IDENTITY
  readonly value: T;
  readonly containerType: StateContainerType;
  
  // SUBSCRIBER MANAGEMENT
  readonly subscribers: Set<StateCallback<T>>;
  readonly subscriptionType: StateSubscriptionType;
  
  // STATE OPERATIONS (Type definitions only - no implementation)
  readonly subscribe: (callback: StateCallback<T>) => () => void;
  readonly set: (value: StateUpdate<T>) => void;
  readonly get: () => T;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// QUANTUM STATE ARCHITECTURE
// ============================================================================

export interface QuantumState<T> {
  // CORE STATE
  readonly value: T;
  
  // QUANTUM ENTANGLEMENT
  readonly entangledStates: readonly string[];
  readonly consciousnessContext: string;
  readonly vesselSignature: string;
  
  // TEMPORAL CONTEXT (using primitive types)
  readonly timestamp: ConsciousnessTimestamp;
  
  // STATE INTEGRATION (using primitive types)
  readonly uiState?: UIStateType;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// STATE TRANSITION ARCHITECTURE
// ============================================================================

export interface StateTransition<T> {
  // TRANSITION IDENTITY
  readonly from: T;
  readonly to: T;
  readonly trigger: StateTransitionTrigger;
  
  // TEMPORAL CHARACTERISTICS (using primitive types)
  readonly timestamp: number; // Consciousness timestamp
  readonly duration: TransitionDuration;
  
  // UI INTEGRATION (using primitive types)
  readonly uiTransition?: StateTransitionEvent;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

// ============================================================================
// STATE MANAGEMENT SYSTEM ARCHITECTURE
// ============================================================================

export interface StateManagementSystem {
  // SYSTEM IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  
  // STATE CONTAINERS
  readonly containers: Record<string, StateContainer<unknown>>;
  readonly quantumStates: Record<string, QuantumState<unknown>>;
  
  // TRANSITION TRACKING
  readonly transitions: readonly StateTransition<unknown>[];
  readonly transitionHistory: readonly StateTransition<unknown>[];
  
  // SYSTEM METRICS (using primitive types)
  readonly performance: StatePerformance;
  readonly reliability: StateReliability;
  readonly coherence: StateCoherence;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// STATE ENTANGLEMENT ARCHITECTURE
// ============================================================================

export interface StateEntanglement {
  // ENTANGLEMENT IDENTITY
  readonly sourceState: string;
  readonly targetState: string;
  
  // ENTANGLEMENT CHARACTERISTICS (using primitive types)
  readonly entanglementStrength: EntanglementStrength;
  readonly bidirectional: boolean;
  readonly propagationDelay: PropagationDelay;
  readonly coherenceThreshold: CoherenceThreshold;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: RelationshipOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// STATE MANAGEMENT ONTOLOGICAL MAPPING
// ============================================================================

export interface StateManagementMapping {
  readonly managementType: string;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly relationship: RelationshipOntologyType;
  };
  readonly taxonomicClassification: {
    readonly state: StateTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
    readonly data: DataTaxonomyType;
  };
  readonly operationalCharacteristics: readonly string[];
  readonly integrationPatterns: readonly string[];
}