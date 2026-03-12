// types/cosmic/motion.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  AnimationTaxonomyType,
  PatternTaxonomyType,
  EnergyOntologyType,
  ProcessOntologyType,
  TransformationOntologyType,
  StateTaxonomyType
} from '../gaia';

// Import motion primitives from semantic foundation
import type {
  MotionDuration,
  MotionEasing,
  MotionComplexity,
  MotionIntention,
  MotionPhase,
  HolographicAnimationType,
  SweepingAnimationType,
  ComponentAnimationType,
  SpringStiffness,
  SpringDamping,
  SpringPrecision,
  MotionFriction,
  MotionMass,
  AnimationProgress,
  AnimationLayers,
  AnimationIntensity,
  AnimationCoverage,
  QuantumCoherence,
  StaggerDirection,
  SequenceDirection,
  PerformanceMode,
  RepeatBehavior,
  SweepingDirection
} from './primitives';

// ============================================================================
// ANIMATION CONFIGURATION ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface AnimationConfiguration {
  // TEMPORAL PROPERTIES
  readonly duration: MotionDuration;
  readonly easing: MotionEasing;
  readonly delay?: MotionDuration;
  readonly repeat?: RepeatBehavior;
  
  // PHYSICAL PROPERTIES (using primitive types)
  readonly spring?: SpringPhysics;
  readonly friction?: MotionFriction;
  readonly mass?: MotionMass;
  
  // INTENTIONAL PROPERTIES
  readonly complexity: MotionComplexity;
  readonly intention: MotionIntention;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface SpringPhysics {
  // SPRING PROPERTIES (using primitive types)
  readonly stiffness: SpringStiffness;
  readonly damping: SpringDamping;
  readonly precision: SpringPrecision;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface StaggerConfiguration {
  readonly delay: MotionDuration;
  readonly direction: StaggerDirection;
  readonly easing: MotionEasing;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// ANIMATION PRESET ARCHITECTURE
// ============================================================================

export interface AnimationPreset {
  // PHASE-BASED CONFIGURATIONS
  readonly entrance: AnimationConfiguration;
  readonly exit: AnimationConfiguration;
  readonly hover?: AnimationConfiguration;
  readonly focus?: AnimationConfiguration;
  readonly active?: AnimationConfiguration;
  
  // PRESET IDENTITY
  readonly name: string;
  readonly description: string;
  readonly complexity: MotionComplexity;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface QuantumAnimationPreset extends AnimationPreset {
  // QUANTUM-SPECIFIC PROPERTIES (using primitive types)
  readonly entanglement: boolean; // Multi-element synchronization
  readonly superposition: boolean; // Multiple state potential
  readonly coherence: QuantumCoherence;
  readonly quantumPresets?: string;
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// SPECIALIZED ANIMATION TYPES
// ============================================================================

export interface HolographicEffect {
  readonly type: HolographicAnimationType;
  readonly animation: AnimationConfiguration;
  readonly layers: AnimationLayers;
  readonly intensity: AnimationIntensity;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

export interface SweepingAnimation {
  readonly type: SweepingAnimationType;
  readonly direction: SweepingDirection;
  readonly speed: MotionDuration;
  readonly coverage: AnimationCoverage;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ComponentAnimation {
  readonly type: ComponentAnimationType;
  readonly target: string; // Component semantic reference
  readonly animation: AnimationConfiguration;
  readonly contextual: boolean; // Context-aware adaptation
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

// ============================================================================
// MOTION SYSTEM ARCHITECTURE
// ============================================================================

export interface MotionSystem {
  // CORE PRESETS
  readonly presets: readonly AnimationPreset[];
  readonly quantumPresets: readonly QuantumAnimationPreset[];
  readonly holographicEffects: readonly HolographicEffect[];
  readonly sweepingAnimations: readonly SweepingAnimation[];
  readonly componentAnimations: readonly ComponentAnimation[];
  
  // SYSTEM PROPERTIES
  readonly defaultDuration: MotionDuration;
  readonly defaultEasing: MotionEasing;
  readonly performanceMode: PerformanceMode;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
  readonly systemTaxonomy: string; // Specific system classification
}

// ============================================================================
// ANIMATION STATE ARCHITECTURE
// ============================================================================

export interface AnimationState {
  // CURRENT STATE (using primitive types)
  readonly phase: MotionPhase;
  readonly progress: AnimationProgress;
  readonly isActive: boolean;
  readonly isComplete: boolean;
  
  // CONTEXTUAL PROPERTIES
  readonly targetElement?: string; // Semantic reference
  readonly triggerEvent?: string; // Semantic event reference
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface AnimationSequence {
  // SEQUENCE STRUCTURE
  readonly steps: readonly AnimationConfiguration[];
  readonly loop: boolean;
  readonly direction: SequenceDirection;
  readonly currentStep: number;
  
  // TEMPORAL PROPERTIES
  readonly totalDuration: MotionDuration;
  readonly stepDelays: readonly MotionDuration[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// MOTION ONTOLOGICAL MAPPING
// ============================================================================

export interface MotionSystemMapping {
  readonly motionFocus: string;
  
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly energy: EnergyOntologyType;
    readonly transformation: TransformationOntologyType;
  };
  
  readonly taxonomicClassification: {
    readonly animation: AnimationTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
  };
  
  readonly motionPrinciples: readonly string[];
}