// @/types/components/ui/pattern-recognition-orb.ts
// ============================================================================
// PATTERN RECOGNITION ORB TYPES - PURE SHAPES ONLY
// ============================================================================

import type { PATTERN_RECOGNITION_ORB_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base pattern recognition orb props interface
export interface PatternRecognitionOrbProps {
  variant?: keyof typeof PATTERN_RECOGNITION_ORB_VARIANTS;
  size?: 'compact' | 'standard' | 'expansive';
  patternData?: PatternData[];
  currentInsight?: string;
  isActive?: boolean;
  consciousnessLevel?: OrbConsciousnessLevel;
  onInsightReveal?: (insight: string) => void;
  onPatternComplete?: (pattern: PatternData) => void;
}

// Orb consciousness states
export type OrbConsciousnessLevel = 
  | 'wisdom_integration'
  | 'insight_revelation'
  | 'pattern_analysis'
  | 'transformation_catalysis';

// Pattern complexity levels
export type PatternComplexity = 
  | 'integrated'
  | 'emergent'
  | 'analytical'
  | 'transformative'
  | 'quantum';

// Pattern data structure
export interface PatternData {
  id: string;
  type: string;
  complexity: PatternComplexity;
  elements: PatternElement[];
  connections: PatternConnection[];
  insight?: string;
  confidence: number;
  timestamp: number;
}

// Pattern element structure
export interface PatternElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  properties: Record<string, any>;
}

// Pattern connection structure
export interface PatternConnection {
  source: string;
  target: string;
  strength: number;
  type: string;
}

// Orb dimension constraints
export interface OrbDimensions {
  size: {
    compact: string;
    standard: string;
    expansive: string;
  };
  padding: string;
  borderRadius: string;
  aspect: '1/1';
}

// Orb visual properties
export interface OrbVisuals {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
}

// Orb typography configuration
export interface OrbTypography {
  title: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  insight: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  pattern: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Orb animation configuration
export interface OrbAnimation {
  glow: string;
  shadow: string;
  rotation: {
    duration: number;
    easing: string;
  };
  pulse: {
    duration: number;
    easing: string;
  };
}

// Pattern visualization configuration
export interface PatternVisualization {
  primary: string;
  secondary: string;
  tertiary: string;
  complexity: PatternComplexity;
  animation: any;
}

// Orb interaction states
export interface OrbInteractions {
  hover: {
    glow: string;
    transform: string;
    shadow: string;
    pulse: {
      duration: number;
      intensity: 'low' | 'medium' | 'high' | 'quantum' | 'cosmic';
    };
  };
  active: {
    glow: string;
    transform: string;
    border: string;
    patterns: {
      complexity: PatternComplexity;
      speed: number;
    };
  };
}

// Complete orb configuration
export interface OrbConfig {
  visuals: OrbVisuals;
  typography: OrbTypography;
  dimensions: OrbDimensions;
  orb: OrbAnimation;
  patterns: PatternVisualization;
  hover: OrbInteractions['hover'];
  active: OrbInteractions['active'];
  consciousness: {
    level: OrbConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    process: string;
  };
}

// Pattern recognition orb variant type
export type PatternRecognitionOrbVariant = keyof typeof PATTERN_RECOGNITION_ORB_VARIANTS;

// Insight data structure
export interface InsightData {
  id: string;
  content: string;
  confidence: number;
  patterns: string[];
  timestamp: number;
  consciousnessAlignment: OrbConsciousnessLevel;
}

// Pattern analysis result
export interface PatternAnalysis {
  complexity: PatternComplexity;
  coherence: number;
  novelty: number;
  insights: InsightData[];
  recommendedActions: string[];
}