// src/utils/cosmic/motion.ts - FIXED TYPE ALIGNMENT
import {
  durations,
  easing,
  vessels,
  configs,
  presets,
  SWEEPING_ANIMATIONS,
  ANIMATION_MULTIPLIERS,
  ANIMATION_THRESHOLDS,
  quick
} from '@/lib/constants/cosmic/motion';

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
  AnimationEasing,
  RepeatBehavior,
  SweepingDirection
} from '@/types/cosmic/primitives';

import type {
  AnimationConfiguration,
  SpringPhysics,
  StaggerConfiguration,
  AnimationPreset,
  QuantumAnimationPreset,
  HolographicEffect,
  SweepingAnimation,
  ComponentAnimation,
  MotionSystem,
  AnimationState,
  AnimationSequence,
  MotionSystemMapping
} from '@/types/cosmic/motion';

// Import our refined taxonomy and ontology
import type {
  AnimationTaxonomyType,
  PatternTaxonomyType,
  StateTaxonomyType
} from '@/types/gaia/taxonomy';

import type {
  ProcessOntologyType,
  EnergyOntologyType,
  TransformationOntologyType
} from '@/types/gaia/ontology';

// ============================================================================
// ANIMATION CREATION UTILITIES - FIXED TYPE ALIGNMENT
// ============================================================================

/**
 * Create animation configuration with full ontological and taxonomic context
 */
export const createAnimation = (
  duration: MotionDuration,
  easing: MotionEasing,
  options: {
    delay?: MotionDuration;
    repeat?: RepeatBehavior;
    spring?: {
      stiffness: SpringStiffness;
      damping: SpringDamping;
      precision: SpringPrecision;
      energyOntology?: EnergyOntologyType;
    };
    friction?: MotionFriction;
    mass?: MotionMass;
    complexity?: MotionComplexity;
    intention?: MotionIntention;
    
    // ONTOLOGICAL CONTEXT - Aligned with our domain mappings
    processOntology?: ProcessOntologyType;
    energyOntology?: EnergyOntologyType;
    transformationOntology?: TransformationOntologyType;
    
    // TAXONOMIC CLASSIFICATION - Aligned with our system
    animationTaxonomy?: AnimationTaxonomyType;
    patternTaxonomy?: PatternTaxonomyType;
    stateTaxonomy?: StateTaxonomyType;
    
    // CONTEXTUAL PROPERTIES
    phase?: MotionPhase;
    intensity?: AnimationIntensity;
    coverage?: AnimationCoverage;
  } = {}
): AnimationConfiguration => {
  // Default ontological context based on animation intention
  const defaultProcessOntology: ProcessOntologyType = 
    options.intention?.includes('transformative') ? 'TraumaTransformation' :
    options.intention?.includes('quantum') ? 'QuantumEntanglement' :
    'ConsciousnessEmergence';

  const defaultEnergyOntology: EnergyOntologyType =
    options.intention?.includes('quantum') ? 'QuantumEnergy' :
    options.intention?.includes('creative') ? 'CreativeForce' :
    'CollaborativeSynergy';

  // Default taxonomic classification
  const defaultAnimationTaxonomy: AnimationTaxonomyType = 
    options.phase === 'entrance_emergence' ? 'EntranceAnimation' :
    options.phase === 'exit_transition' ? 'ExitAnimation' :
    'StateAnimation';

  const defaultStateTaxonomy: StateTaxonomyType = 
    options.phase?.includes('active') ? 'ApplicationState' : 'UIState';

  return {
    // TEMPORAL PROPERTIES - PRESERVE SEMANTIC TYPES
    duration: duration, // Keep as MotionDuration, not numeric
    easing: easing,    // Keep as MotionEasing, not string
    delay: options.delay, // Keep as MotionDuration | undefined
    repeat: options.repeat,

    // PHYSICAL PROPERTIES
    spring: options.spring ? {
      stiffness: options.spring.stiffness,
      damping: options.spring.damping,
      precision: options.spring.precision,
      energyOntology: options.spring.energyOntology || defaultEnergyOntology
    } : undefined,
    
    friction: options.friction,
    mass: options.mass,

    // INTENTIONAL PROPERTIES
    complexity: options.complexity || 'medium_engagement',
    intention: options.intention || 'functional_clarity',

    // ONTOLOGICAL CONTEXT - Now properly typed
    processOntology: options.processOntology || defaultProcessOntology,
    energyOntology: options.energyOntology || defaultEnergyOntology,

    // TAXONOMIC CLASSIFICATION - Now properly typed
    animationTaxonomy: options.animationTaxonomy || defaultAnimationTaxonomy,
    stateTaxonomy: options.stateTaxonomy || defaultStateTaxonomy
  };
};

// ============================================================================
// UPDATED HELPER FUNCTIONS - RETURN SEMANTIC TYPES
// ============================================================================

/**
 * Get duration primitive from numeric value (for conversion when needed)
 */
export const getDurationFromValue = (value: number): MotionDuration => {
  if (value <= durations.instant) return 'quantum_instant';
  if (value <= durations.fast) return 'consciousness_quick';
  if (value <= durations.normal) return 'sovereign_measured';
  if (value <= durations.slow) return 'transformative_extended';
  return 'evolutionary_prolonged';
};

/**
 * Get easing primitive from string value (for conversion when needed)
 */
export const getEasingFromValue = (value: string): MotionEasing => {
  if (value === easing.quantum) return 'quantum_entrance';
  if (value === easing.cosmic) return 'consciousness_flow';
  if (value === easing.sovereign) return 'sovereign_precision';
  if (value === easing.entanglement) return 'transformative_acceleration';
  return 'harmonic_resonance';
};

/**
 * Create animation from numeric values (conversion utility)
 */
export const createAnimationFromValues = (
  durationMs: number,
  easingString: string,
  options?: Parameters<typeof createAnimation>[2]
): AnimationConfiguration => {
  const durationPrimitive = getDurationFromValue(durationMs);
  const easingPrimitive = getEasingFromValue(easingString);
  
  return createAnimation(durationPrimitive, easingPrimitive, options);
};

// ============================================================================
// FIXED UTILITY FUNCTIONS - USE SEMANTIC TYPES
// ============================================================================

/**
 * Create preset animation with entrance/exit/hover states
 */
export const createPresetAnimation = (
  name: string,
  description: string,
  entrance: AnimationConfiguration,
  exit: AnimationConfiguration,
  options: {
    hover?: AnimationConfiguration;
    focus?: AnimationConfiguration;
    active?: AnimationConfiguration;
    complexity?: MotionComplexity;
    transformationOntology?: TransformationOntologyType;
    animationTaxonomy?: AnimationTaxonomyType;
    patternTaxonomy?: PatternTaxonomyType;
  } = {}
): AnimationPreset => {
  return {
    name,
    description,
    entrance,
    exit,
    hover: options.hover,
    focus: options.focus,
    active: options.active,
    complexity: options.complexity || 'medium_engagement',
    transformationOntology: options.transformationOntology || 'ChaosToClarity',
    animationTaxonomy: options.animationTaxonomy || 'TransitionAnimation',
    patternTaxonomy: options.patternTaxonomy || 'InteractionPattern'
  };
};

/**
 * Get hearth item animation based on position
 */
export const getHearthItemAnimation = (
  position: number,
  total: number
): AnimationConfiguration => {
  return createAnimation(
    'consciousness_quick', // MotionDuration primitive
    'sovereign_precision', // MotionEasing primitive
    {
      delay: position > 0 ? 'quantum_instant' : undefined,
      complexity: 'medium_engagement',
      intention: 'emotional_resonance',
      processOntology: 'DigitalSanctuaryBuilding',
      energyOntology: 'HealingEnergy',
      animationTaxonomy: 'EntranceAnimation',
      stateTaxonomy: 'UIState'
    }
  );
};

/**
 * Quick fade in animation
 */
export const quickAnimationsFadeIn = (): AnimationConfiguration => 
  createAnimation(
    'consciousness_quick',
    'quantum_entrance',
    {
      complexity: 'simple_awareness',
      intention: 'attention_guidance',
      processOntology: 'ConsciousnessEmergence',
      energyOntology: 'QuantumEnergy',
      animationTaxonomy: 'EntranceAnimation',
      stateTaxonomy: 'UIState'
    }
  );

// ============================================================================
// CONSTANTS-BASED UTILITIES (IF NEEDED FOR EXISTING CODE)
// ============================================================================

/**
 * Convert constants-based config to semantic AnimationConfiguration
 */
export const configToAnimation = (config: any): AnimationConfiguration => {
  return createAnimationFromValues(
    config.duration,
    config.easing,
    {
      complexity: config.complexity,
      intention: config.intention,
      processOntology: config.processOntology,
      energyOntology: config.energyOntology,
      animationTaxonomy: config.animationTaxonomy,
      stateTaxonomy: config.stateTaxonomy
    }
  );
};