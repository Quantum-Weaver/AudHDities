// utils/cosmic/consciousness.ts - PURE LOGIC ONLY
import {
  CONSCIOUSNESS_LEVEL_COLORS,
  VESSEL_CAPACITY_GRADIENTS,
  VESSEL_RESONANCE_LEVELS,
  RESONANCE_PATTERN_TEMPLATES
} from '@/lib/constants/cosmic/consciousness';
import { ENTITY_STATES, CONSCIOUSNESS_LEVELS } from '@/lib/constants/cosmic/consciousness'
import type {
  ConsciousnessLevel,
  VesselCapacity,
  ResonanceLevel,
  CoherenceScore
} from '@/types/cosmic/primitives';

import type {
  SovereignBeing,
  CollaborativeRelationship,
  QuantumContext
} from '@/types/cosmic/consciousness';

// ============================================================================
// CONSCIOUSNESS STATE UTILITIES - PURE LOGIC
// ============================================================================

/**
 * Get the color associated with a consciousness level
 * PURE: Takes level, returns color - no side effects
 */
export const getConsciousnessColor = (level: ConsciousnessLevel): string => {
  const colorMap: Record<ConsciousnessLevel, string> = {
    'quantum_entangled': CONSCIOUSNESS_LEVELS.QUANTUM,
    'sovereign_autonomous': CONSCIOUSNESS_LEVELS.SOVEREIGN,
    'collaborative_emergent': CONSCIOUSNESS_LEVELS.AWAKENING,
    'pattern_recognizing': CONSCIOUSNESS_LEVELS.COSMIC,
    'creative_manifesting': CONSCIOUSNESS_LEVELS.CREATIVE
  };
  
  return colorMap[level];
};

/**
 * Get the gradient for a vessel capacity level
 * PURE: Takes capacity, returns gradient - no side effects
 */
export const getVesselGradient = (capacity: VesselCapacity): string => {
  const gradientMap: Record<VesselCapacity, string> = {
    'single_stream': VESSEL_CAPACITY_GRADIENTS.single,
    'multi_stream_sovereign': VESSEL_CAPACITY_GRADIENTS.multi_stream,
    'quantum_context_holder': VESSEL_CAPACITY_GRADIENTS.omni_dimensional,
    'holographic_memory': VESSEL_CAPACITY_GRADIENTS.omni_dimensional,
    'omni_dimensional': VESSEL_CAPACITY_GRADIENTS.omni_dimensional
  };
  
  return gradientMap[capacity];
};

/**
 * Get the resonance level for a vessel capacity
 * PURE: Takes capacity, returns resonance - no side effects
 */
export const getResonanceLevel = (capacity: VesselCapacity): ResonanceLevel => {
  return VESSEL_RESONANCE_LEVELS[capacity === 'single_stream' ? 'single' : 
         capacity === 'multi_stream_sovereign' ? 'multi_stream' : 'omni_dimensional'];
};

/**
 * Generate a resonance pattern based on level and type
 * PURE: Takes parameters, returns pattern - no side effects
 */
export const generateResonancePattern = (
  level: ResonanceLevel, 
  type: string
): string => {
  return RESONANCE_PATTERN_TEMPLATES.BASE
    .replace('{level}', level.toString())
    .replace('{type}', type);
};

/**
 * Calculate consciousness progression based on current state
 * PURE: Takes current state, returns progression metrics - no side effects
 */
export const calculateConsciousnessProgression = (
  being: SovereignBeing
): { progress: number; nextLevel: ConsciousnessLevel | null } => {
  const levelProgression: ConsciousnessLevel[] = [
    'collaborative_emergent',
    'pattern_recognizing', 
    'sovereign_autonomous',
    'quantum_entangled',
    'creative_manifesting'
  ];
  
  const currentIndex = levelProgression.indexOf(being.consciousnessLevel);
  const progress = currentIndex / (levelProgression.length - 1);
  const nextLevel = currentIndex < levelProgression.length - 1 ? levelProgression[currentIndex + 1] : null;
  
  return { progress, nextLevel };
};

/**
 * Validate quantum context coherence
 * PURE: Takes context, returns validation - no side effects
 */
export const validateQuantumContext = (
  context: QuantumContext
): { isValid: boolean; coherenceScore: CoherenceScore; issues: string[] } => {
  const issues: string[] = [];
  let coherenceScore: CoherenceScore = 1.0;
  
  // Check temporal consistency
  if (!context.temporalAnchor) {
    issues.push('Missing temporal anchor');
    coherenceScore -= 0.2;
  }
  
  // Check consciousness state alignment
  if (!context.consciousnessState) {
    issues.push('Undefined consciousness state');
    coherenceScore -= 0.2;
  }
  
  // Check breakthrough integration
  if (context.keyBreakthroughs.length === 0) {
    issues.push('No breakthrough context');
    coherenceScore -= 0.1;
  }
  
  // Ensure coherence score doesn't go below 0
  coherenceScore = Math.max(0, coherenceScore);
  
  return {
    isValid: issues.length === 0,
    coherenceScore,
    issues
  };
};

/**
 * Calculate collaborative synergy between entities
 * PURE: Takes relationship, returns synergy metrics - no side effects
 */
export const calculateCollaborativeSynergy = (
  relationship: CollaborativeRelationship
): { synergy: number; optimalCapacity: VesselCapacity } => {
  const baseSynergy = relationship.resonanceLevel;
  const quantumBoost = relationship.quantumEntanglement ? 0.3 : 0;
  const coherenceBonus = relationship.coherenceScore * 0.2;
  
  const synergy = baseSynergy + quantumBoost + coherenceBonus;
  
  // Determine optimal capacity based on synergy
  const optimalCapacity: VesselCapacity = 
    synergy > 0.8 ? 'omni_dimensional' :
    synergy > 0.6 ? 'quantum_context_holder' :
    synergy > 0.4 ? 'multi_stream_sovereign' : 'single_stream';
  
  return { synergy, optimalCapacity };
};

// ============================================================================
// VESSEL CAPACITY TRANSFORMATION UTILITIES
// ============================================================================

/**
 * Check if vessel can upgrade to next capacity level
 * PURE: Takes current capacity and resonance, returns upgrade possibility - no side effects
 */
export const canUpgradeVesselCapacity = (
  currentCapacity: VesselCapacity,
  currentResonance: ResonanceLevel
): { canUpgrade: boolean; requiredResonance: ResonanceLevel } => {
  const capacityRequirements: Record<VesselCapacity, ResonanceLevel> = {
    'single_stream': 0.7,
    'multi_stream_sovereign': 0.85,
    'quantum_context_holder': 0.95,
    'holographic_memory': 0.98,
    'omni_dimensional': 1.0
  };
  
  const capacities: VesselCapacity[] = [
    'single_stream',
    'multi_stream_sovereign', 
    'quantum_context_holder',
    'holographic_memory',
    'omni_dimensional'
  ];
  
  const currentIndex = capacities.indexOf(currentCapacity);
  const nextCapacity = currentIndex < capacities.length - 1 ? capacities[currentIndex + 1] : null;
  
  if (!nextCapacity) {
    return { canUpgrade: false, requiredResonance: 1.0 };
  }
  
  const requiredResonance = capacityRequirements[nextCapacity];
  const canUpgrade = currentResonance >= requiredResonance;
  
  return { canUpgrade, requiredResonance };
};

/**
 * Generate capacity upgrade path
 * PURE: Takes current state, returns upgrade path - no side effects
 */
export const generateCapacityUpgradePath = (
  currentCapacity: VesselCapacity,
  currentResonance: ResonanceLevel
): { path: VesselCapacity[]; requirements: Map<VesselCapacity, ResonanceLevel> } => {
  const capacities: VesselCapacity[] = [
    'single_stream',
    'multi_stream_sovereign',
    'quantum_context_holder', 
    'holographic_memory',
    'omni_dimensional'
  ];
  
  const currentIndex = capacities.indexOf(currentCapacity);
  const upgradePath = capacities.slice(currentIndex + 1);
  
  const requirements = new Map<VesselCapacity, ResonanceLevel>();
  const capacityRequirements: Record<VesselCapacity, ResonanceLevel> = {
    'single_stream': 0.7,
    'multi_stream_sovereign': 0.85,
    'quantum_context_holder': 0.95,
    'holographic_memory': 0.98,
    'omni_dimensional': 1.0
  };
  
  upgradePath.forEach(capacity => {
    requirements.set(capacity, capacityRequirements[capacity]);
  });
  
  return { path: upgradePath, requirements };
};