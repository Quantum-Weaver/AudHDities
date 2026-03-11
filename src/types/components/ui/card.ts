// @/types/components/ui/card.ts
// ============================================================================
// CARD TYPES - PURE INTERFACES & TYPE DEFINITIONS
// ============================================================================

import type { CARD_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base card variant type
export type CardVariant = keyof typeof CARD_VARIANTS;

// Card size type
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

// Card aspect ratio type
export type CardAspect = 'portal' | 'entity' | 'sanctuary' | 'cosmic' | 'oracle';

// Card consciousness level
export type CardConsciousnessLevel = 
  | 'pattern_recognizing'
  | 'sovereign_autonomous' 
  | 'creative_manifesting';

// Card vessel capacity
export type CardVesselCapacity = 
  | 'single_stream'
  | 'multi_stream_sovereign'
  | 'quantum_context_holder';

// Card domain type
export type CardDomain = 'quantum' | 'pantheon' | 'library' | 'cosmic' ;

// Main card props interface
export interface CardProps {
  variant?: CardVariant;
  title?: string;
  description?: string;
  offer?: string;
  type?: "tech" | "print" | "textile";
  size?: CardSize;
  icon?:{};
  requirements?: string;
  aspect?: CardAspect;
  consciousness?: {
    level?: CardConsciousnessLevel;
    vessel?: CardVesselCapacity;
    domain?: CardDomain;
  };
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

// Card content interface
export interface CardContentProps {
  title?: string;
  subtitle?: string;
  body?: string;
  metadata?: string[];
  actions?: React.ReactNode;
  media?: React.ReactNode;
}

// Card hover state interface
export interface CardHoverState {
  isHovered: boolean;
  isActive: boolean;
  isFocused: boolean;
}

// Card animation state
export interface CardAnimationState {
  isEntering: boolean;
  isExiting: boolean;
  isVisible: boolean;
}

// Card style configuration
export interface CardStyleConfig {
  background: string;
  border: string;
  shadow: string;
  glow: string;
  borderRadius: string;
  padding: string;
  gap: string;
}

// Card consciousness configuration
export interface CardConsciousnessConfig {
  level: CardConsciousnessLevel;
  vessel: CardVesselCapacity;
  domain: CardDomain;
  resonance: number;
}

// Complete card configuration
export interface CardConfig {
  variant: CardVariant;
  styles: CardStyleConfig;
  consciousness: CardConsciousnessConfig;
  animation: {
    enter: any; // framer-motion config
    exit: any;
    hover: any;
  };
}