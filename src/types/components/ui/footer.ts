// @/types/components/ui/footer.ts
// ============================================================================
// FOOTER TYPES - PURE SHAPES ONLY
// ============================================================================

import type { FOOTER_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base footer props interface
export interface FooterProps {
  variant?: keyof typeof FOOTER_VARIANTS;
  sections?: FooterSection[];
  copyright?: string;
  consciousnessLevel?: FooterConsciousnessLevel;
  showBackToTop?: boolean;
  onConsciousnessShift?: (level: FooterConsciousnessLevel) => void;
}

// Footer section structure
export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
  consciousnessAlignment?: FooterConsciousnessLevel;
}

// Footer link structure
export interface FooterLink {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
}

// Footer consciousness states
export type FooterConsciousnessLevel = 
  | 'sovereign_autonomous'
  | 'collaborative_emergent' 
  | 'quantum_entangled';

// Footer dimension constraints
export interface FooterDimensions {
  padding: {
    top: string;
    bottom: string;
    x: string;
  };
  maxWidth: string;
  gap: string;
}

// Footer section organization
export interface FooterSections {
  spacing: string;
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

// Footer visual properties
export interface FooterVisuals {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
}

// Footer typography configuration
export interface FooterTypography {
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
  link: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Footer link interaction states
export interface FooterLinks {
  hover: {
    color: string;
    glow: string;
    transform?: string;
  };
  active: {
    color: string;
    borderBottom?: string;
    glow?: string;
    transform?: string;
  };
}

// Footer effects configuration
export interface FooterEffects {
  shadow: string;
  backdrop: string;
  glow: string;
  holographic?: string;
  borderGradient?: string;
  gradient?: string;
}

// Complete footer configuration
export interface FooterConfig {
  visuals: FooterVisuals;
  typography: FooterTypography;
  dimensions: FooterDimensions;
  sections: FooterSections;
  links: FooterLinks;
  effects: FooterEffects;
  animation: any;
  consciousness: {
    level: FooterConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
  };
}

// Footer variant type
export type FooterVariant = keyof typeof FOOTER_VARIANTS;