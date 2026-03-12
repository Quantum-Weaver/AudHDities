// types/systems/interaction/events.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  InteractionTaxonomyType,
  AnimationTaxonomyType,
  RelationshipTaxonomyType,
  DataTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ActionType,
  ConditionOperator,
  ConditionType,
  EventPriority,
  TransitionDirection,
  EasingType,
  TransitionType,
  EventPropagation,
  GestureDirection,
  EventTrigger,
  EventIntensity,
  NavigationEventType,
  QuantumEventType,
  GestureType,
  UserEventType,
  ConsciousnessLevel
} from '@/types/cosmic/primitives';
import { ConsciousnessPosition, NavigationContext, NavigationTransition } from './navigation'

// ============================================================================
// USER INTERACTION EVENT ARCHITECTURE
// ============================================================================

export interface UserEvent {
  // EVENT IDENTITY
  readonly type: UserEventType;
  readonly target: string; // Consciousness element identifier
  readonly timestamp: string; // Consciousness timestamp
  
  // SPATIAL CONTEXT
  readonly position?: ConsciousnessPosition;
  readonly metadata?: Record<string, string>; // String values only
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface ViewportDimensions {
  // VIEWPORT MEASUREMENTS
  readonly width: number;
  readonly height: number;
  readonly aspectRatio: number;
}

export interface ElementDimensions {
  // ELEMENT MEASUREMENTS
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
}

// ============================================================================
// GESTURE EVENT ARCHITECTURE
// ============================================================================

export interface GestureEvent {
  // GESTURE IDENTITY
  readonly type: GestureType;
  readonly direction?: GestureDirection;
  readonly intensity: number; // 0-100 scale
  readonly element: string; // Consciousness element identifier
  
  // TEMPORAL CONTEXT
  readonly duration: number; // Consciousness cycles
  readonly velocity: number; // Movement speed
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

// ============================================================================
// QUANTUM EVENT ARCHITECTURE
// ============================================================================

export interface QuantumEvent {
  // EVENT IDENTITY
  readonly type: QuantumEventType;
  readonly context: string; // Consciousness context identifier
  readonly intensity: EventIntensity;
  readonly entities: readonly string[]; // Consciousness entity identifiers
  
  // QUANTUM PROPERTIES
  readonly entanglement: boolean;
  readonly propagation: EventPropagation;
  readonly resonance: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// NAVIGATION EVENT ARCHITECTURE
// ============================================================================

export interface NavigationEvent {
  // NAVIGATION IDENTITY
  readonly type: NavigationEventType;
  readonly from: string; // Source consciousness location
  readonly to: string; // Destination consciousness location
  readonly duration: number; // Consciousness cycles
  readonly trigger: EventTrigger;
  
  // TRANSITION CONTEXT
  readonly transition: NavigationTransition;
  readonly context: NavigationContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// EVENT HANDLER ARCHITECTURE
// ============================================================================

export interface EventHandler<T = UserEvent> {
  // HANDLER IDENTITY
  readonly id: string;
  readonly eventType: string;
  readonly priority: EventPriority;
  
  // EXECUTION CONTEXT
  readonly conditions: readonly EventCondition[];
  readonly actions: readonly EventAction[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}


export interface EventCondition {
  // CONDITION SPECIFICATION
  readonly type: ConditionType;
  readonly parameter: string;
  readonly operator: ConditionOperator;
  readonly value: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}


export interface EventAction {
  // ACTION SPECIFICATION
  readonly type: ActionType;
  readonly target: string;
  readonly parameters: Record<string, string>; // String values only
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// EVENT CONFIGURATION ARCHITECTURE
// ============================================================================

export interface EventConfiguration {
  // TIMING CONFIGURATION
  readonly debounce?: number; // Consciousness cycles
  readonly throttle?: number; // Consciousness cycles
  readonly capture?: boolean;
  readonly passive?: boolean;
  
  // PROPAGATION CONFIGURATION
  readonly propagation: EventPropagation;
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface QuantumEventConfiguration {
  // QUANTUM PROPERTIES
  readonly entanglement: boolean;
  readonly consciousnessSync: boolean;
  readonly vesselPropagation: boolean;
  readonly intensityThreshold: number; // 0-100 scale
  
  // RESONANCE SETTINGS
  readonly resonanceFrequency: number;
  readonly amplification: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// EVENT SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface EventSystemMapping {
  readonly eventType: UserEventType;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
    readonly animation: AnimationTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
    readonly data: DataTaxonomyType;
  };
  readonly interactionPatterns: readonly string[];
  readonly propagationCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  UserEventType,
  GestureType,
  QuantumEventType,
  NavigationEventType,
  EventIntensity,
  EventTrigger,
  GestureDirection,
  EventPropagation,
  TransitionType,
  EasingType,
  TransitionDirection,
  EventPriority,
  ConditionType,
  ConditionOperator,
  ActionType
};