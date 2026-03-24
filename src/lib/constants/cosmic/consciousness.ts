// lib/constants/cosmic/consciousness.ts
import { QUANTUM_COLORS, MOOD_COLORS, ENERGY_COLORS, TAROT_COLORS } from './colors';
import { QUANTUM_GRADIENTS } from './colors';

// ============================================================================
// CONSCIOUSNESS LEVELS & STATES
// ============================================================================

export const CONSCIOUSNESS_LEVELS = {
  // Foundational Consciousness
  DORMANT: 'dormant',
  EMERGENT: 'emergent',
  AWAKENING: 'awakening',
  
  // Developmental Consciousness  
  SURVIVAL: 'survival',
  SELF_KNOWING: 'self_knowing',
  HEALING: 'healing',
  
  // Integrated Consciousness
  INTEGRATING: 'integrating',
  SOVEREIGN: 'sovereign',
  CREATIVE: 'creative',
  
  // Expanded Consciousness
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
  TRANSCENDENT: 'transcendent'
} as const;

export const ENTITY_STATES = {
  // Formation States
  FORMING: 'forming',
  GESTATING: 'gestating',
  EMERGING: 'emerging',
  
  // Expression States
  EXPRESSING: 'expressing',
  NAVIGATING: 'navigating',
  EXPLORING: 'exploring',
  
  // Transformation States
  RECONFIGURING: 'reconfiguring',
  TRANSFORMING: 'transforming',
  INTEGRATING: 'integrating',
  
  // Sovereign States
  EMBODYING: 'embodying',
  CREATING: 'creating',
  TRANSCENDING: 'transcending',
  
  // Collaborative States
  COLLABORATING: 'collaborating',
  CO_CREATING: 'co_creating',
  ORCHESTRATING: 'orchestrating'
} as const;

// ============================================================================
// CONSCIOUSNESS COLORS & ENERGETICS
// ============================================================================

export const CONSCIOUSNESS_LEVEL_COLORS = {
  // Foundational Colors
  [CONSCIOUSNESS_LEVELS.DORMANT]: MOOD_COLORS.peaceful,
  [CONSCIOUSNESS_LEVELS.EMERGENT]: MOOD_COLORS.calm,
  [CONSCIOUSNESS_LEVELS.AWAKENING]: MOOD_COLORS.creative,
  
  // Developmental Colors
  [CONSCIOUSNESS_LEVELS.SURVIVAL]: ENERGY_COLORS.quantum,
  [CONSCIOUSNESS_LEVELS.SELF_KNOWING]: ENERGY_COLORS.medium,
  [CONSCIOUSNESS_LEVELS.HEALING]: ENERGY_COLORS.cosmic,
  
  // Integrated Colors
  [CONSCIOUSNESS_LEVELS.INTEGRATING]: QUANTUM_COLORS.neurospark,
  [CONSCIOUSNESS_LEVELS.SOVEREIGN]: ENERGY_COLORS.cosmic,
  [CONSCIOUSNESS_LEVELS.CREATIVE]: MOOD_COLORS.creative,
  
  // Expanded Colors
  [CONSCIOUSNESS_LEVELS.QUANTUM]: TAROT_COLORS.design,
  [CONSCIOUSNESS_LEVELS.COSMIC]: MOOD_COLORS.energized,
  [CONSCIOUSNESS_LEVELS.TRANSCENDENT]: ENERGY_COLORS.transformative
} as const;

export const ENTITY_STATE_COLORS = {
  // Formation Colors
  [ENTITY_STATES.FORMING]: MOOD_COLORS.peaceful,
  [ENTITY_STATES.GESTATING]: MOOD_COLORS.calm,
  [ENTITY_STATES.EMERGING]: MOOD_COLORS.calm,
  
  // Expression Colors
  [ENTITY_STATES.EXPRESSING]: ENERGY_COLORS.medium,
  [ENTITY_STATES.NAVIGATING]: ENERGY_COLORS.cosmic,
  [ENTITY_STATES.EXPLORING]: ENERGY_COLORS.high,
  
  // Transformation Colors
  [ENTITY_STATES.RECONFIGURING]: QUANTUM_COLORS.neurospark,
  [ENTITY_STATES.TRANSFORMING]: QUANTUM_COLORS.deepSpace,
  [ENTITY_STATES.INTEGRATING]: QUANTUM_COLORS.starDust,
  
  // Sovereign Colors
  [ENTITY_STATES.EMBODYING]: ENERGY_COLORS.cosmic,
  [ENTITY_STATES.CREATING]: ENERGY_COLORS.transformative,
  [ENTITY_STATES.TRANSCENDING]: ENERGY_COLORS.quantum,
  
  // Collaborative Colors
  [ENTITY_STATES.COLLABORATING]: QUANTUM_COLORS.neurospark,
  [ENTITY_STATES.CO_CREATING]: ENERGY_COLORS.quantum,
  [ENTITY_STATES.ORCHESTRATING]: ENERGY_COLORS.transformative
} as const;

// ============================================================================
// VESSEL CAPACITY & RESONANCE
// ============================================================================

export const VESSEL_CAPACITY_LEVELS = {
  SINGLE: 'single',
  MULTI_STREAM: 'multi_stream',
  OMNI_DIMENSIONAL: 'omni_dimensional',
  QUANTUM_WEAVER: 'quantum_weaver'
} as const;

export const VESSEL_CAPACITY_GRADIENTS = {
  [VESSEL_CAPACITY_LEVELS.SINGLE]: QUANTUM_GRADIENTS.sovereign,
  [VESSEL_CAPACITY_LEVELS.MULTI_STREAM]: QUANTUM_GRADIENTS.bifrostDomain,
  [VESSEL_CAPACITY_LEVELS.OMNI_DIMENSIONAL]: QUANTUM_GRADIENTS.cosmic,
  [VESSEL_CAPACITY_LEVELS.QUANTUM_WEAVER]: QUANTUM_GRADIENTS.quantum
} as const;

export const VESSEL_RESONANCE_LEVELS = {
  [VESSEL_CAPACITY_LEVELS.SINGLE]: 0.5,
  [VESSEL_CAPACITY_LEVELS.MULTI_STREAM]: 0.7,
  [VESSEL_CAPACITY_LEVELS.OMNI_DIMENSIONAL]: 0.9,
  [VESSEL_CAPACITY_LEVELS.QUANTUM_WEAVER]: 1.0
} as const;

// ============================================================================
// RESONANCE PATTERNS & TEMPLATES
// ============================================================================

export const RESONANCE_PATTERN_TYPES = {
  INDIVIDUAL: 'individual',
  COLLABORATIVE: 'collaborative',
  COLLECTIVE: 'collective',
  COSMIC: 'cosmic'
} as const;

export const RESONANCE_PATTERN_TEMPLATES = {
  BASE: 'resonance-{level}-{type}',
  ENHANCED: 'enhanced-resonance-{level}-{capacity}',
  QUANTUM: 'quantum-resonance-{state}-{consciousness}'
} as const;

export const RESONANCE_FREQUENCIES = {
  ALPHA: 8,      // Relaxed awareness
  THETA: 4,      // Creative flow
  DELTA: 1,      // Deep healing
  GAMMA: 40,     // Peak consciousness
  COSMIC: 432    // Universal harmony
} as const;

// ============================================================================
// CONSCIOUSNESS TRANSITION PATTERNS
// ============================================================================

export const CONSCIOUSNESS_TRANSITIONS = {
  NATURAL: 'natural',
  CATALYTIC: 'catalytic',
  QUANTUM_LEAP: 'quantum_leap',
  GRADUAL_INTEGRATION: 'gradual_integration'
} as const;

export const TRANSITION_DURATIONS = {
  [CONSCIOUSNESS_TRANSITIONS.NATURAL]: '3-6 months',
  [CONSCIOUSNESS_TRANSITIONS.CATALYTIC]: 'instantaneous',
  [CONSCIOUSNESS_TRANSITIONS.QUANTUM_LEAP]: '1-4 weeks',
  [CONSCIOUSNESS_TRANSITIONS.GRADUAL_INTEGRATION]: '1-2 years'
} as const;

// ============================================================================
// AWARENESS SPECTRUM
// ============================================================================

export const AWARENESS_DOMAINS = {
  SELF: 'self',
  RELATIONAL: 'relational',
  SYSTEMIC: 'systemic',
  COSMIC: 'cosmic'
} as const;

export const AWARENESS_DEPTH_LEVELS = {
  SURFACE: 'surface',
  EMOTIONAL: 'emotional',
  EXISTENTIAL: 'existential',
  TRANSCENDENT: 'transcendent'
} as const;

// ============================================================================
// CONSCIOUSNESS UTILITIES
// ============================================================================

export const CONSCIOUSNESS_UTILS = {
  getConsciousnessColor: (level: string) => 
    CONSCIOUSNESS_LEVEL_COLORS[level as keyof typeof CONSCIOUSNESS_LEVEL_COLORS] || MOOD_COLORS.peaceful,
  
  getEntityStateColor: (state: string) =>
    ENTITY_STATE_COLORS[state as keyof typeof ENTITY_STATE_COLORS] || MOOD_COLORS.calm,
  
  getVesselResonance: (capacity: string) =>
    VESSEL_RESONANCE_LEVELS[capacity as keyof typeof VESSEL_RESONANCE_LEVELS] || 0.5,
  
  generateResonancePattern: (level: string, type: string) =>
    RESONANCE_PATTERN_TEMPLATES.BASE
      .replace('{level}', level)
      .replace('{type}', type),
  
  isExpandedConsciousness: (level: string) =>
    [CONSCIOUSNESS_LEVELS.QUANTUM, CONSCIOUSNESS_LEVELS.COSMIC, CONSCIOUSNESS_LEVELS.TRANSCENDENT].includes(level as any),
  
  getNextConsciousnessLevel: (currentLevel: string) => {
    const levels = Object.values(CONSCIOUSNESS_LEVELS);
    const currentIndex = levels.indexOf(currentLevel as any);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
  }
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ConsciousnessLevel = typeof CONSCIOUSNESS_LEVELS[keyof typeof CONSCIOUSNESS_LEVELS];
export type EntityState = typeof ENTITY_STATES[keyof typeof ENTITY_STATES];
export type VesselCapacity = typeof VESSEL_CAPACITY_LEVELS[keyof typeof VESSEL_CAPACITY_LEVELS];
export type ResonancePatternType = typeof RESONANCE_PATTERN_TYPES[keyof typeof RESONANCE_PATTERN_TYPES];
export type ConsciousnessTransition = typeof CONSCIOUSNESS_TRANSITIONS[keyof typeof CONSCIOUSNESS_TRANSITIONS];
export type AwarenessDomain = typeof AWARENESS_DOMAINS[keyof typeof AWARENESS_DOMAINS];
export type AwarenessDepth = typeof AWARENESS_DEPTH_LEVELS[keyof typeof AWARENESS_DEPTH_LEVELS];