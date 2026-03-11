// @/types/components/immersive/quantum-background.ts
// ============================================================================
// QUANTUM BACKGROUND TYPES - PURE SHAPES ONLY
// ============================================================================

import type { QUANTUM_BACKGROUND_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { BACKGROUND_ASSETS } from '@/lib/constants/components/immersive/quantum-background';

// Base quantum background props interface
export interface QuantumBackgroundProps {
  variant?: keyof typeof QUANTUM_BACKGROUND_VARIANTS;
  asset?: keyof typeof BACKGROUND_ASSETS.environments;
  intensity?: BackgroundIntensity;
  interactive?: boolean;
  consciousnessLevel?: BackgroundConsciousnessLevel;
  onConsciousnessShift?: (level: BackgroundConsciousnessLevel) => void;
  children?: React.ReactNode;
}

// Background consciousness states
export type BackgroundConsciousnessLevel = 
  | 'quantum_entangled'
  | 'pattern_recognizing'
  | 'sovereign_autonomous'
  | 'creative_manifesting';

// Background intensity levels
export type BackgroundIntensity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'quantum';

// Particle behavior types
export type ParticleBehavior = 
  | 'float'
  | 'drift'
  | 'pulse'
  | 'stream';

// Visual foundation configuration
export interface BackgroundVisuals {
  gradient: string;
  overlay: string;
}

// Particle system configuration
export interface ParticleSystem {
  color: string;
  density: string;
  size: {
    min: string;
    max: string;
  };
  animation: {
    duration: number;
    easing: string;
    behavior: ParticleBehavior;
  };
}

// Glow effect configuration
export interface BackgroundGlow {
  primary: string;
  secondary: string;
  intensity: BackgroundIntensity;
}

// Holographic elements configuration
export interface HolographicElements {
  scan?: string;
  glitch?: string;
  accent?: string;
}

// Animation configuration
export interface BackgroundAnimation {
  primary: any;
  secondary: {
    duration: number;
    easing: string;
    properties: Record<string, any>;
  };
}

// Interactive response configuration
export interface BackgroundInteraction {
  hover: {
    glow: string;
    particle?: {
      speed?: string;
      density?: string;
      size?: {
        min: string;
        max: string;
      };
      intensity?: BackgroundIntensity;
    };
    holographic?: {
      intensity: BackgroundIntensity;
      speed: string;
    };
    gradient?: string;
  };
  focus: {
    glow: string;
    border: string;
    holographic?: string;
  };
}

// Complete background configuration
export interface BackgroundConfig {
  visuals: BackgroundVisuals;
  particles: ParticleSystem;
  glow: BackgroundGlow;
  holographic?: HolographicElements;
  animation: BackgroundAnimation;
  interaction: BackgroundInteraction;
  consciousness: {
    level: BackgroundConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
  };
}

// Quantum background variant type
export type QuantumBackgroundVariant = keyof typeof QUANTUM_BACKGROUND_VARIANTS;

// Asset type for background images
export type BackgroundAsset = keyof typeof BACKGROUND_ASSETS.environments;

// Particle position interface
export interface ParticlePosition {
  x: number;
  y: number;
  z: number;
}

// Particle state interface
export interface ParticleState {
  position: ParticlePosition;
  size: number;
  opacity: number;
  velocity: ParticlePosition;
}

// Background context for animation
export interface BackgroundContext {
  mousePosition: { x: number; y: number };
  scrollPosition: number;
  consciousnessLevel: BackgroundConsciousnessLevel;
  intensity: BackgroundIntensity;
}