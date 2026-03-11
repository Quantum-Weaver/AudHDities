// @/types/components/ui/section.ts
// ============================================================================
// SECTION TYPES - PURE SHAPES ONLY
// ============================================================================

import type { SECTION_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base section props interface
export interface SectionProps {
  variant?: keyof typeof SECTION_VARIANTS;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  consciousnessLevel?: SectionConsciousnessLevel;
  fullWidth?: boolean;
  backgroundEffects?: boolean;
  onConsciousnessShift?: (level: SectionConsciousnessLevel) => void;
}

// Section consciousness states
export type SectionConsciousnessLevel = 
  | 'pattern_recognizing'
  | 'creative_manifesting' 
  | 'quantum_entangled';

// Section spacing types
export type SectionSpacing = 
  | 'compact'
  | 'standard'
  | 'comfortable'
  | 'tight';

// Section dimension constraints
export interface SectionDimensions {
  padding: {
    top: string;
    bottom: string;
    x: string;
  };
  maxWidth: string;
  gap: string;
  spacing: SectionSpacing;
}

// Section grid configuration
export interface SectionGrid {
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: string;
  template: 'auto-fit' | 'fixed' | 'minmax';
}

// Section visual properties
export interface SectionVisuals {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Section typography configuration
export interface SectionTypography {
  heading: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  body: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  caption: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Section child interaction states
export interface SectionChildren {
  stagger: number;
  animation: any;
  hover?: {
    glow?: string;
    transform?: string;
    background?: string;
    border?: string;
  };
}

// Section effects configuration
export interface SectionEffects {
  shadow: string;
  backdrop: string;
  glow: string;
  borderGradient?: string;
  holographic?: string;
  gradient?: string;
}

// Section background effects
export interface SectionBackgroundEffects {
  pattern: string;
  intensity: 'low' | 'medium' | 'high';
  movement?: 'slow' | 'medium' | 'fast';
}

// Complete section configuration
export interface SectionConfig {
  visuals: SectionVisuals;
  typography: SectionTypography;
  dimensions: SectionDimensions;
  grid: SectionGrid;
  children: SectionChildren;
  effects: SectionEffects;
  backgroundEffects?: SectionBackgroundEffects;
  animation: any;
  consciousness: {
    level: SectionConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
  };
}

// Section variant type
export type SectionVariant = keyof typeof SECTION_VARIANTS;

// Section layout options
export interface SectionLayout {
  variant: SectionVariant;
  gridColumns: number;
  responsive: boolean;
  centered: boolean;
}