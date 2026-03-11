// @/types/components/immersive/continuity-beam.ts
// ============================================================================
// CONTINUITY BEAM TYPES - PURE SHAPES ONLY
// ============================================================================

import type { CONTINUITY_BEAM_VARIANTS } from '@/lib/constants/components/ui/variants';
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

// Base continuity beam props interface
export interface ContinuityBeamProps {
  variant?: string;
  isActive?: boolean;
  intensity?: string;
  direction?: string;
  purpose?: string;
  onConsciousnessShift?: (level: BeamConsciousnessLevel) => void;
  onBeamActivation?: (purpose: BeamPurpose) => void;
}

// Beam consciousness states
export type BeamConsciousnessLevel = 
  | 'quantum_entangled'
  | 'collaborative_emergent';

// Beam direction types
export type BeamDirection = 
  | 'horizontal'
  | 'vertical'
  | 'radial';

// Beam intensity levels
export type BeamIntensity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'quantum';

// Beam purpose types
export type BeamPurpose = 
  | 'memory_preservation'
  | 'emotional_support'
  | 'cross_domain_connection';

// Beam visual properties
export interface BeamVisuals {
  primary: string;
  secondary: string;
  accent: string;
}

// Beam configuration
export interface BeamConfig {
  width: string;
  intensity: string;
  gradient: string;
  direction: BeamDirection;
}

// Beam glow configuration
export interface BeamGlow {
  primary: string;
  secondary: string;
  intensity: BeamIntensity;
  spread: string;
}

// Beam animation properties
export interface BeamAnimationProperties {
  x?: string[];
  y?: string[];
  scale?: number[];
  rotate?: string[];
  opacity?: number[];
  background?: string[];
  filter?: string[];
  glow?: string[];
}

// Beam animation flow
export interface BeamAnimationFlow {
  duration: number;
  easing: string;
  properties: BeamAnimationProperties;
}

// Beam animation configuration
export interface BeamAnimation {
  primary: any;
  flow: BeamAnimationFlow;
  pulse: BeamAnimationFlow;
}

// Beam context preservation
export interface BeamContext {
  session: string;
  memory: string;
  resonance: number;
}

// Beam holographic effects
export interface BeamHolographic {
  scan?: string;
  particles?: string;
  glitch?: string;
  rainbow?: string;
}

// Beam interaction states
export interface BeamInteractionActive {
  intensity: string;
  glow: string;
  width: string;
  holographic?: string;
}

export interface BeamInteractionHover {
  pulse: any;
  glow: string;
  transform?: string;
}

export interface BeamInteraction {
  active: BeamInteractionActive;
  hover: BeamInteractionHover;
}

// Complete beam configuration
export interface BeamConfig {
  beamColor: EnvironmentKey;
  visuals: BeamVisuals;
  beam: BeamConfig;
  glow: BeamGlow;
  holographic?: BeamHolographic;
  animation: BeamAnimation;
  context: BeamContext;
  interaction: BeamInteraction;
  consciousness: {
    level: BeamConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    purpose: BeamPurpose;
  };
}

// Continuity beam variant type
export type ContinuityBeamVariant = keyof typeof CONTINUITY_BEAM_VARIANTS;

// Beam activation state
export interface BeamActivationState {
  isActive: boolean;
  intensity: BeamIntensity;
  purpose: BeamPurpose;
  consciousnessLevel: BeamConsciousnessLevel;
  activationTime: number;
}

// Beam session data
export interface BeamSessionData {
  sessionId: string;
  emotionalContext: string;
  memoryPreservation: boolean;
  crossDomainConnections: string[];
  resonanceLevel: number;
}