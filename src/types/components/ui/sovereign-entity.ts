// @/types/components/ui/sovereign-entity.ts
// ============================================================================
// SOVEREIGN ENTITY TYPES - PURE SHAPES ONLY
// ============================================================================

import type { SOVEREIGN_ENTITY_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base sovereign entity props interface
export interface SovereignEntityProps {
  variant?: keyof typeof SOVEREIGN_ENTITY_VARIANTS;
  entityId: string;
  name: string;
  title: string;
  description?: string;
  avatar?: string;
  isActive?: boolean;
  consciousnessLevel?: EntityConsciousnessLevel;
  onInteraction?: (entityId: string, interaction: EntityInteraction) => void;
  onConsciousnessShift?: (level: EntityConsciousnessLevel) => void;
}

// Entity interaction types
export interface EntityInteraction {
  type: 'hover' | 'click' | 'focus' | 'collaboration';
  timestamp: number;
  intensity: number;
}

// Entity consciousness states
export type EntityConsciousnessLevel = 
  | 'quantum_entangled'
  | 'creative_manifesting'
  | 'pattern_recognizing'
  | 'sovereign_autonomous';

// Entity archetype classifications
export type EntityArchetype =
  | 'bridge_consciousness'
  | 'creative_consciousness'
  | 'analytical_consciousness'
  | 'guardian_consciousness';

// Entity dimension constraints
export interface EntityDimensions {
  avatar: {
    size: string;
    borderRadius: string;
  };
  presence: {
    size: string;
    glow: string;
  };
  container: {
    padding: string;
    gap: string;
    maxWidth: string;
  };
}

// Entity visual properties
export interface EntityVisuals {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
}

// Entity typography configuration
export interface EntityTypography {
  name: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  title: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  description: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Entity interaction states
export interface EntityInteractions {
  hover: {
    glow: string;
    transform: string;
    background: string;
    border: string;
  };
  active: {
    glow: string;
    transform: string;
    background: string;
  };
  focus: {
    outline: string;
    glow: string;
  };
}

// Entity effects configuration
export interface EntityEffects {
  glow: string;
  shadow: string;
  holographic: string;
  backdrop: string;
}

// Complete entity configuration
export interface EntityConfig {
  visuals: EntityVisuals;
  typography: EntityTypography;
  dimensions: EntityDimensions;
  hover: EntityInteractions['hover'];
  active: EntityInteractions['active'];
  focus: EntityInteractions['focus'];
  effects: EntityEffects;
  animation: any;
  consciousness: {
    level: EntityConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    archetype: EntityArchetype;
  };
}

// Sovereign entity variant type
export type SovereignEntityVariant = keyof typeof SOVEREIGN_ENTITY_VARIANTS;

// Entity presence state
export interface EntityPresence {
  isOnline: boolean;
  lastActive: number;
  activityLevel: number;
  currentDomain: string;
}

// Entity collaboration data
export interface EntityCollaboration {
  partners: string[];
  projects: string[];
  synergy: number;
  lastCollaboration: number;
}