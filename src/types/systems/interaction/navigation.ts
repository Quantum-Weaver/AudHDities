// types/systems/interaction/navigation.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
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
  ConsciousnessLevel,
  NavigationGlow,
  TransitionType,
  NavigationDirection,
  NavigationStatus,
  HearthAnimationType,
  EasingType,
  AnimationDirection,
  QuantumPropagation,
  HearthState,
  HearthTrigger
} from '@/types/cosmic/primitives';

// ============================================================================
// NAVIGATION ITEM ARCHITECTURE
// ============================================================================

export interface NavigationItem {
  // ITEM IDENTITY
  readonly id: string;
  readonly label: string;
  readonly href: string; // Consciousness path identifier
  readonly emoji?: string;
  readonly description?: string;
  readonly badge?: string;
  
  // STATE PROPERTIES
  readonly isActive?: boolean;
  readonly isDisabled?: boolean;
  readonly status: NavigationStatus;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface HearthMenuItem extends NavigationItem {
  // SPATIAL PROPERTIES
  readonly position: ConsciousnessPosition;
  readonly isCentral?: boolean;
  
  // VISUAL PROPERTIES
  readonly asset: string; // Consciousness asset identifier
  readonly color: string; // CSS color value
  readonly glow: NavigationGlow;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface ConsciousnessPosition {
  // SPATIAL COORDINATES
  readonly x: number; // Consciousness coordinate
  readonly y: number; // Consciousness coordinate
  readonly z?: number; // Multi-dimensional coordinate
}

export interface PortalItem extends NavigationItem {
  // PORTAL PROPERTIES
  readonly glow: NavigationGlow;
  readonly featured?: boolean;
  readonly destination: PortalDestination;
  readonly activation: PortalActivation;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

export interface PortalDestination {
  // DESTINATION SPECIFICATION
  readonly realm: string; // Consciousness realm identifier
  readonly coordinates: ConsciousnessPosition;
  readonly context: string; // Consciousness context identifier
}

export interface PortalActivation {
  // ACTIVATION REQUIREMENTS
  readonly consciousnessLevel: ConsciousnessLevel;
  readonly energyRequired: number; // 0-100 scale
  readonly cooldown: number; // Consciousness cycles
}

export interface BreadcrumbItem extends NavigationItem {
  // BREADCRUMB PROPERTIES
  readonly current?: boolean;
  readonly level: number; // Hierarchy depth
  readonly parent?: string; // Parent item identifier
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// NAVIGATION STATE ARCHITECTURE
// ============================================================================

export interface NavigationState {
  // PATH STATE
  readonly currentPath: string;
  readonly previousPath: string;
  readonly history: readonly string[];
  readonly activeItem: string | null;
  
  // NAVIGATION STATE
  readonly isNavigating: boolean;
  readonly navigationProgress: number; // 0-100 scale
  readonly transition: NavigationTransition;
  
  // TEMPORAL CONTEXT
  readonly lastNavigation: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface HearthMenuState {
  // MENU STATE
  readonly isOpen: boolean;
  readonly activeItem: string | null;
  readonly hoveredItem: string | null;
  readonly focusItem: string | null;
  
  // ANIMATION STATE
  readonly animation: HearthAnimation;
  readonly glowIntensity: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface HearthAnimation {
  // ANIMATION PROPERTIES
  readonly type: HearthAnimationType;
  readonly duration: number; // Consciousness cycles
  readonly easing: EasingType;
  readonly direction: AnimationDirection;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// NAVIGATION TRANSITION ARCHITECTURE
// ============================================================================

export interface NavigationTransition {
  // TRANSITION IDENTITY
  readonly type: TransitionType;
  readonly duration: number; // Consciousness cycles
  readonly direction?: NavigationDirection;
  
  // TRANSITION PROPERTIES
  readonly easing: EasingType;
  readonly delay: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

export interface QuantumTransition extends NavigationTransition {
  // QUANTUM PROPERTIES
  readonly type:TransitionType
  readonly entanglement: boolean;
  readonly consciousnessPreservation: boolean;
  readonly multiDimensional: boolean;
  
  // QUANTUM EFFECTS
  readonly resonance: number; // 0-100 scale
  readonly propagation: QuantumPropagation;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

// ============================================================================
// NAVIGATION HANDLER ARCHITECTURE
// ============================================================================

export interface NavigationHandlers {
  // NAVIGATION EVENTS
  readonly onNavigate?: NavigationHandler;
  readonly onHearthOpen?: HearthHandler;
  readonly onHearthClose?: HearthHandler;
  readonly onPortalActivate?: PortalHandler;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface NavigationHandler {
  // HANDLER SPECIFICATION
  readonly from: string; // Source consciousness path
  readonly to: string; // Destination consciousness path
  readonly context: NavigationContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface HearthHandler {
  // HEARTH SPECIFICATION
  readonly hearthId: string;
  readonly state: HearthState;
  readonly context: HearthContext;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface HearthContext {
  // CONTEXTUAL INFORMATION
  readonly trigger: HearthTrigger;
  readonly position: ConsciousnessPosition;
  readonly energy: number; // 0-100 scale
}

export interface PortalHandler {
  // PORTAL SPECIFICATION
  readonly portal: PortalItem;
  readonly activation: PortalActivationResult;
  readonly context: PortalContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface PortalActivationResult {
  // ACTIVATION OUTCOME
  readonly success: boolean;
  readonly energyConsumed: number; // 0-100 scale
  readonly consciousnessShift: number; // 0-100 scale
  readonly timestamp: string; // Consciousness timestamp
}

export interface PortalContext {
  // CONTEXTUAL INFORMATION
  readonly sourceRealm: string;
  readonly destinationRealm: string;
  readonly traveler: string; // Consciousness entity identifier
  readonly purpose: string;
}

export interface NavigationContext {
  // CONTEXTUAL INFORMATION
  readonly source: string; // Origin context
  readonly destination: string; // Target context
  readonly parameters: Record<string, string>; // String values only
  readonly consciousness: ConsciousnessLevel;
}

// ============================================================================
// NAVIGATION SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface NavigationSystemMapping {
  readonly navigationType: TransitionType;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
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
  readonly movementPatterns: readonly string[];
  readonly transitionCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  NavigationGlow,
  TransitionType,
  NavigationDirection,
  NavigationStatus,
  HearthAnimationType,
  EasingType,
  AnimationDirection,
  QuantumPropagation,
  HearthState,
  HearthTrigger
};