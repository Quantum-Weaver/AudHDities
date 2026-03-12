// @/types/components/icon.ts
// ============================================================================
// ICON TYPES - PURE SHAPES ONLY
// ============================================================================

import type { ICON_VARIANTS } from '@/lib/constants/components/ui/variants';

export type IconVariant = keyof typeof ICON_VARIANTS;

export interface IconProps {
  /** The icon variant defining appearance and behavior */
  variant?: IconVariant;
  /** Optional custom size override */
  size?: string | number;
  /** Optional custom color override */
  color?: string;
  /** Icon name or SVG content */
  name?: string;
  /** Whether the icon is interactive */
  interactive?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for interactive icons */
  onClick?: () => void;
  /** Accessibility label */
  'aria-label'?: string;
}

export interface IconStyleProps {
  size: string;
  color: string;
  hoverColor: string;
  activeColor: string;
  glow: string;
  animation: any; // Using any for animation config flexibility
}

export interface IconInteractionState {
  isHovered: boolean;
  isActive: boolean;
  isFocused: boolean;
}

export type IconSize = 
  | 'quantum_consciousness'
  | 'sovereign_presence' 
  | 'collaborative_engagement'
  | 'emergency_attention';

export type IconColor = 
  | 'neurospark'
  | 'hearth_gold'
  | 'cosmic_blue'
  | 'error_red';

export type SemanticIconName = keyof typeof import('@/lib/constants/components/ui/icon').ICON_SEMANTIC_NAMES;