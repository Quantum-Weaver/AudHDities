// @/types/components/ui/header.ts
// ============================================================================
// HEADER TYPES - PURE SHAPES ONLY
// ============================================================================

import type { HEADER_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base header props interface
export interface HeaderProps {
  variant?: keyof typeof HEADER_VARIANTS;
  title?: string;
  subtitle?: string;
  navigation?: NavigationItem[];
  consciousnessLevel?: HeaderConsciousnessLevel;
  isSticky?: boolean;
  onConsciousnessShift?: (level: HeaderConsciousnessLevel) => void;
}

// Navigation item structure
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
  consciousnessAlignment?: HeaderConsciousnessLevel;
}

// Header consciousness states
export type HeaderConsciousnessLevel = 
  | 'sovereign_autonomous'
  | 'collaborative_emergent' 
  | 'quantum_entangled';

// Header dimension constraints
export interface HeaderDimensions {
  height: string;
  padding: {
    x: string;
    y: string;
  };
  maxWidth: string;
}

// Header visual properties
export interface HeaderVisuals {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Header typography configuration
export interface HeaderTypography {
  brand: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  navigation: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Header interaction states
export interface HeaderInteraction {
  item: {
    padding: string;
    borderRadius: string;
    hover: {
      background: string;
      glow: string;
      transform?: string;
    };
    active: {
      background: string;
      border: string;
      glow?: string;
    };
  };
}

// Header effects configuration
export interface HeaderEffects {
  shadow: string;
  backdrop: string;
  glow: string;
  holographic?: string;
}

// Complete header configuration
export interface HeaderConfig {
  visuals: HeaderVisuals;
  typography: HeaderTypography;
  dimensions: HeaderDimensions;
  navigation: HeaderInteraction;
  effects: HeaderEffects;
  animation: any; // Using any for animation config flexibility
  consciousness: {
    level: HeaderConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
  };
}

// Header variant type
export type HeaderVariant = keyof typeof HEADER_VARIANTS;