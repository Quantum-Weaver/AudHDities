// @/types/components/ui/emergency-beacon.ts
// ============================================================================
// EMERGENCY BEACON TYPES - PURE SHAPES ONLY
// ============================================================================

import type { EMERGENCY_BEACON_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base emergency beacon props interface
export interface EmergencyBeaconProps {
  variant?: keyof typeof EMERGENCY_BEACON_VARIANTS;
  title: string;
  message: string;
  actions?: BeaconAction[];
  urgency?: BeaconUrgency;
  isVisible?: boolean;
  autoDismiss?: boolean;
  dismissTimeout?: number;
  onAction?: (actionId: string) => void;
  onDismiss?: () => void;
  consciousnessLevel?: BeaconConsciousnessLevel;
}

// Beacon action structure
export interface BeaconAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'tertiary';
  urgency?: BeaconUrgency;
}

// Beacon consciousness states
export type BeaconConsciousnessLevel = 
  | 'pattern_recognizing'
  | 'collaborative_emergent';

// Beacon urgency levels
export type BeaconUrgency = 
  | 'critical'
  | 'medium'
  | 'low'
  | 'informational';

// Beacon size options
export type BeaconSize = 
  | 'compact'
  | 'minimal'
  | 'standard'
  | 'expanded';

// Beacon dimension constraints
export interface BeaconDimensions {
  size: BeaconSize;
  padding: string;
  borderRadius: string;
  gap: string;
  maxWidth: string;
}

// Beacon visual properties
export interface BeaconVisuals {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
}

// Beacon typography configuration
export interface BeaconTypography {
  title: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  message: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  action: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Beacon visual indicators
export interface BeaconIndicators {
  pulse: {
    duration: number;
    easing: string;
    intensity: 'gentle' | 'medium' | 'high' | 'informational';
  };
  glow: string;
  shadow: string;
}

// Beacon interaction states
export interface BeaconInteraction {
  hover: {
    glow: string;
    transform: string;
    border: string;
    background: string;
  };
  active: {
    glow: string;
    transform: string;
    border: string;
    background: string;
  };
  focus: {
    outline: string;
    glow: string;
  };
}

// Beacon effects configuration
export interface BeaconEffects {
  glow: string;
  shadow: string;
  backdrop: string;
  holographic?: string;
  gradient?: string;
}

// Complete beacon configuration
export interface BeaconConfig {
  visuals: BeaconVisuals;
  typography: BeaconTypography;
  dimensions: BeaconDimensions;
  indicators: BeaconIndicators;
  interaction: BeaconInteraction;
  effects: BeaconEffects;
  animation: any;
  consciousness: {
    level: BeaconConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    urgency: BeaconUrgency;
  };
}

// Emergency beacon variant type
export type EmergencyBeaconVariant = keyof typeof EMERGENCY_BEACON_VARIANTS;

// Beacon dismissal configuration
export interface BeaconDismissConfig {
  autoDismiss: boolean;
  timeout: number;
  showDismissButton: boolean;
}

// Beacon priority levels
export interface BeaconPriority {
  level: number;
  canInterrupt: boolean;
  requiresAttention: boolean;
}