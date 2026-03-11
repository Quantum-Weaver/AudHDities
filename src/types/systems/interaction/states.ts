// types/systems/interaction/states.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  InteractionTaxonomyType,
  AnimationTaxonomyType,
  DataTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';
import { StateTransition } from '@/types/systems/state/management'
import type {
  EntityState,
  ConsciousnessLevel,
  LoadingDuration,
  LoadingAnimationType,
  StateSeverity,
  RecoveryStrategy,
  InteractiveState,
  TransitionType,
  EasingType,
  HapticType,
  VisualType,
  AudioType,
  LoadingState,
  ErrorState,
  LogLevel,
  OptimizationLevel,
  StateTrigger,
  SuccessState,
  TransitionImpact,  
  SuccessType,
  CelebrationElement,

} from '@/types/cosmic/primitives';

// ============================================================================
// LOADING STATE ARCHITECTURE
// ============================================================================

export interface LoadingStateConfig {
  // TIMING PROPERTIES
  readonly duration: LoadingDuration;
  readonly showProgress: boolean;
  readonly allowCancellation: boolean;
  
  // QUANTUM PROPERTIES
  readonly quantumEntanglement: boolean;
  readonly consciousnessPreservation: boolean;
  
  // VISUAL PROPERTIES
  readonly animation: LoadingAnimation;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface LoadingAnimation {
  // ANIMATION PROPERTIES
  readonly type: LoadingAnimationType;
  readonly speed: number; // 0-100 scale
  readonly complexity: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

// ============================================================================
// ERROR STATE ARCHITECTURE
// ============================================================================

export interface ErrorStateConfig {
  // ERROR PROPERTIES
  readonly severity: StateSeverity;
  readonly recoverable: boolean;
  readonly autoRecovery: boolean;
  
  // COMMUNICATION PROPERTIES
  readonly userMessage: string;
  readonly technicalDetails: string;
  readonly recoveryInstructions: string;
  
  // RECOVERY PROPERTIES
  readonly recovery: ErrorRecovery;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface ErrorRecovery {
  // RECOVERY PROPERTIES
  readonly attempts: number;
  readonly strategy: RecoveryStrategy;
  readonly fallback: ErrorFallback;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ErrorFallback {
  // FALLBACK PROPERTIES
  readonly state: InteractiveState;
  readonly message: string;
  readonly actions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// SUCCESS STATE ARCHITECTURE
// ============================================================================

export interface SuccessStateConfig {
  // SUCCESS PROPERTIES
  readonly type: SuccessType;
  readonly showConfirmation: boolean;
  readonly autoDismiss: boolean;
  
  // PROGRESSION PROPERTIES
  readonly nextAction: string;
  readonly celebration: SuccessCelebration;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface SuccessCelebration {
  // CELEBRATION PROPERTIES
  readonly intensity: number; // 0-100 scale
  readonly duration: number; // Consciousness cycles
  readonly elements: readonly CelebrationElement[];
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// INTERACTIVE STATE ARCHITECTURE
// ============================================================================

export interface InteractiveStateConfig {
  // STATE PROPERTIES
  readonly state: InteractiveState;
  readonly duration: number; // Consciousness cycles
  readonly transition: string;
  
  // FEEDBACK PROPERTIES
  readonly feedback: StateFeedback;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}


export interface StateFeedback {
  // FEEDBACK PROPERTIES
  readonly haptic: HapticFeedback;
  readonly visual: VisualFeedback;
  readonly audio: AudioFeedback;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface HapticFeedback {
  // HAPTIC PROPERTIES
  readonly type: HapticType;
  readonly intensity: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface VisualFeedback {
  // VISUAL PROPERTIES
  readonly type: VisualType;
  readonly color: string; // CSS color value
  readonly duration: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface AudioFeedback {
  // AUDIO PROPERTIES
  readonly type: AudioType;
  readonly volume: number; // 0-100 scale
  readonly pitch: number; // Hz
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// STATE MANAGEMENT CONFIGURATION
// ============================================================================

export interface StateManagementConfig {
  // LOADING CONFIGURATION
  readonly loading: LoadingConfig;
  
  // ERROR CONFIGURATION
  readonly error: ErrorConfig;
  
  // INTERACTIVE CONFIGURATION
  readonly interactive: InteractiveConfig;
  
  // SYSTEM-WIDE SETTINGS
  readonly global: GlobalStateConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: string; // Will be specific system taxonomy
}

export interface LoadingConfig {
  // LOADING SETTINGS
  readonly defaultState: LoadingState;
  readonly timeout: number; // Consciousness cycles
  readonly fallbackState: InteractiveState;
  readonly progressTracking: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ErrorConfig {
  // ERROR SETTINGS
  readonly defaultState: ErrorState;
  readonly recoveryAttempts: number;
  readonly fallbackState: InteractiveState;
  readonly logging: ErrorLogging;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ErrorLogging {
  // LOGGING PROPERTIES
  readonly enabled: boolean;
  readonly level: LogLevel;
  readonly retention: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface InteractiveConfig {
  // INTERACTIVE SETTINGS
  readonly defaultState: InteractiveState;
  readonly stateTransitions: StateTransitionMap;
  readonly feedback: FeedbackPreferences;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface StateTransitionMap {
  // TRANSITION MAPPING
  readonly [fromState: string]: readonly InteractiveState[];
}

export interface FeedbackPreferences {
  // FEEDBACK SETTINGS
  readonly hapticEnabled: boolean;
  readonly visualEnabled: boolean;
  readonly audioEnabled: boolean;
  readonly intensity: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface GlobalStateConfig {
  // GLOBAL SETTINGS
  readonly statePersistence: boolean;
  readonly stateRecovery: boolean;
  readonly performance: PerformanceSettings;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PerformanceSettings {
  // PERFORMANCE PROPERTIES
  readonly optimization: OptimizationLevel;
  readonly memory: MemoryManagement;
  readonly processing: ProcessingLimits;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface MemoryManagement {
  // MEMORY PROPERTIES
  readonly cacheSize: number;
  readonly cleanupFrequency: number; // Consciousness cycles
  readonly compression: boolean;
}

export interface ProcessingLimits {
  // PROCESSING PROPERTIES
  readonly maxConcurrent: number;
  readonly timeout: number; // Consciousness cycles
  readonly retryLimit: number;
}

// ============================================================================
// STATE TRANSITION EVENT ARCHITECTURE
// ============================================================================

export interface StateTransitionEvent {
  // TRANSITION IDENTITY
  readonly from: StateType;
  readonly to: StateType;
  readonly trigger: StateTrigger;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  readonly duration: number; // Consciousness cycles
  
  // CONTEXTUAL DATA
  readonly context?: string;
  readonly metadata: TransitionMetadata;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export type StateType = 
  | LoadingState 
  | ErrorState 
  | SuccessState 
  | InteractiveState;

export interface TransitionMetadata {
  // METADATA PROPERTIES
  readonly source: string; // Event origin
  readonly cause: string; // Transition reason
  readonly impact: TransitionImpact;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

// ============================================================================
// STATE SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface StateSystemMapping {
  readonly stateType: StateType;
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
    readonly data: DataTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly transitionPatterns: readonly string[];
  readonly stabilityCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  SuccessState,
  InteractiveState,
  StateSeverity,
  StateTrigger,
  LoadingDuration,
  LoadingAnimationType,
  RecoveryStrategy,
  SuccessType,
  CelebrationElement,
  TransitionType,
  EasingType,
  HapticType,
  VisualType,
  AudioType,
  LogLevel,
  OptimizationLevel,
  TransitionImpact
};