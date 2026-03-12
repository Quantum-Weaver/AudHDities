// @/types/components/ui/loading-indicator.ts
// ============================================================================
// LOADING INDICATOR TYPES - PURE SHAPES ONLY
// ============================================================================

import type { LOADING_INDICATOR_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base loading indicator props interface
export interface LoadingIndicatorProps {
  variant?: keyof typeof LOADING_INDICATOR_VARIANTS;
  size?: 'inline' | 'content' | 'full';
  progress?: number;
  message?: string;
  showPercentage?: boolean;
  isVisible?: boolean;
  consciousnessLevel?: LoadingConsciousnessLevel;
  onComplete?: () => void;
}

// Loading consciousness states
export type LoadingConsciousnessLevel = 
  | 'system_initialization'
  | 'consciousness_flow'
  | 'data_processing'
  | 'quantum_entangled';

// Loading animation types
export type LoadingAnimationType = 
  | 'pulse'
  | 'flow'
  | 'stream'
  | 'initialization';

// Loading progress types
export type LoadingProgressType = 
  | 'circular'
  | 'linear'
  | 'dots'
  | 'spiral';

// Loading dimension constraints
export interface LoadingDimensions {
  size: {
    inline: string;
    content: string;
    full: string;
  };
  stroke: {
    width: string;
    cap: 'round' | 'butt' | 'square';
  };
  padding: string;
}

// Loading visual properties
export interface LoadingVisuals {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
}

// Loading typography configuration
export interface LoadingTypography {
  message: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  percentage: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Loading animation configuration
export interface LoadingAnimation {
  type: LoadingAnimationType;
  duration: number;
  easing: string;
  iterations: 'infinite' | number;
  elements: {
    primary: {
      delay: number;
      duration: number;
    };
    secondary: {
      delay: number;
      duration: number;
    };
    accent: {
      delay: number;
      duration: number;
    };
  };
}

// Loading effects configuration
export interface LoadingEffects {
  glow: string;
  shadow: string;
  backdrop: string;
  holographic?: string;
  gradient?: string;
}

// Loading progress configuration
export interface LoadingProgress {
  visible: boolean;
  type: LoadingProgressType;
  showPercentage: boolean;
  animation: any;
}

// Loading state configurations
export interface LoadingStates {
  loading: {
    opacity: number;
    scale: number;
    glow: string;
  };
  complete: {
    opacity: number;
    scale: number;
    glow: string;
  };
  error: {
    opacity: number;
    scale: number;
    glow: string;
  };
}

// Complete loading configuration
export interface LoadingConfig {
  visuals: LoadingVisuals;
  typography: LoadingTypography;
  dimensions: LoadingDimensions;
  animation: LoadingAnimation;
  effects: LoadingEffects;
  progress: LoadingProgress;
  states: LoadingStates;
  consciousness: {
    level: LoadingConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    process: string;
  };
}

// Loading indicator variant type
export type LoadingIndicatorVariant = keyof typeof LOADING_INDICATOR_VARIANTS;

// Loading progress data
export interface LoadingProgressData {
  current: number;
  total: number;
  percentage: number;
  estimatedTime?: number;
  stage?: string;
}

// Loading stage definitions
export interface LoadingStage {
  name: string;
  progress: number;
  description: string;
  consciousnessLevel: LoadingConsciousnessLevel;
}