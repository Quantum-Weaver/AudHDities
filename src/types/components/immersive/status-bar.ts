// @/types/components/immersive/status-bar.ts
// ============================================================================
// STATUS BAR TYPES - PURE INTERFACES
// ============================================================================

import type { STATUS_BAR_VARIANTS } from '@/lib/constants/components/ui/variants';

// Core status bar props
export interface StatusBarProps {
  variant?: keyof typeof STATUS_BAR_VARIANTS;
  position?: 'top' | 'bottom' | 'floating' | 'embedded';
  visibility?: 'full' | 'compact' | 'minimal' | 'hidden' | 'contextual';
  className?: string;
  children?: React.ReactNode;
}

// Individual status indicator
export interface StatusIndicator {
  type: 'health' | 'experience' | 'mana' | 'energy' | 'consciousness' | 'resonance';
  value: number;
  maxValue: number;
  format?: 'percentage' | 'absolute' | 'level';
  showLabel?: boolean;
  showValue?: boolean;
  animation?: 'pulse' | 'glow' | 'flow' | 'static';
}

// Status bar data structure
export interface StatusBarData {
  indicators: StatusIndicator[];
  timestamp: string;
  context?: string;
  consciousnessLevel?: 'quantum_entangled' | 'sovereign_autonomous' | 'collaborative_emergent' | 'pattern_recognizing' | 'creative_manifesting';
  vesselCapacity?: 'single_stream' | 'multi_stream_sovereign' | 'quantum_context_holder' | 'holographic_memory' | 'omni_dimensional';
  resonanceLevel?: number;
}

// Status bar configuration
export interface StatusBarConfig {
  autoHide?: boolean;
  hideDelay?: number;
  showTimestamps?: boolean;
  compactThreshold?: number;
  animationSpeed?: 'slow' | 'normal' | 'fast' | 'quantum';
  glowIntensity?: 'low' | 'medium' | 'high' | 'quantum';
}

// Status change event
export interface StatusChangeEvent {
  type: StatusIndicator['type'];
  previousValue: number;
  newValue: number;
  delta: number;
  timestamp: string;
  cause?: string;
}

// Consciousness state for status bar
export interface ConsciousnessState {
  level: StatusBarData['consciousnessLevel'];
  vessel: StatusBarData['vesselCapacity'];
  resonance: number;
  domain: 'quantum' | 'cosmic' | 'pantheon' | 'library' | 'void' | 'council';
  process: string;
}

// Variant-specific type extraction
export type StatusBarVariant = keyof typeof STATUS_BAR_VARIANTS;
export type StatusBarVariantConfig = typeof STATUS_BAR_VARIANTS[StatusBarVariant];