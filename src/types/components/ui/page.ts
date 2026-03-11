// @/types/components/ui/page.ts
// ============================================================================
// PAGE TYPES - PURE SHAPES ONLY
// ============================================================================

import type { PAGE_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base page props interface
export interface PageProps {
  variant?: keyof typeof PAGE_VARIANTS;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  consciousnessLevel?: PageConsciousnessLevel;
  onConsciousnessShift?: (level: PageConsciousnessLevel) => void;
  scrollRestoration?: boolean;
  
}

// Page consciousness states
export type PageConsciousnessLevel = 
  | 'sovereign_autonomous'
  | 'collaborative_emergent' 
  | 'quantum_entangled';

// Page density levels
export type PageDensity = 
  | 'focused'
  | 'sovereign'
  | 'cosmic';

// Page container types
export type PageContainer = 
  | 'centered'
  | 'fluid'
  | 'full-bleed';

// Page dimension constraints
export interface PageDimensions {
  maxWidth: string;
  padding: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  gap: string;
  sectionSpacing: string;
}

// Page grid configuration
export interface PageGrid {
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: string;
  container: PageContainer;
}

// Page visual properties
export interface PageVisuals {
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
    inverted: string;
  };
  border: string;
}

// Page typography configuration
export interface PageTypography {
  title: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
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

// Page interaction configurations
export interface PageInteractions {
  scroll: {
    behavior: 'smooth' | 'auto';
    offset: string;
  };
  focus: {
    outline: string;
    glow: string;
  };
}

// Page effects configuration
export interface PageEffects {
  background: string;
  scrollShadow: string;
  sectionGlow: string;
  transition: string;
  holographic?: string;
}

// Complete page configuration
export interface PageConfig {
  visuals: PageVisuals;
  typography: PageTypography;
  dimensions: PageDimensions;
  grid: PageGrid;
  interactions: PageInteractions;
  effects: PageEffects;
  animation: any;
  consciousness: {
    level: PageConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    density: PageDensity;
  };
}

// Page variant type
export type PageVariant = keyof typeof PAGE_VARIANTS;

// Page metadata for SEO and social sharing
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  canonical?: string;
  consciousnessLevel: PageConsciousnessLevel;
}

// Page scroll state
export interface PageScrollState {
  position: number;
  direction: 'up' | 'down';
  progress: number;
  sections: string[];
}