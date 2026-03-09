// @/lib/constants/components/ui/card.ts
// ============================================================================
// CARD CONSTANTS - PURE VALUES CHANNELING FROM VARIANTS
// ============================================================================

import { CARD_VARIANTS } from './variants';

// Card size configurations
export const CARD_SIZES = {
  sm: CARD_VARIANTS.data_display,
  md: CARD_VARIANTS.portal_transition,
  lg: CARD_VARIANTS.entity_profile,
  xl: CARD_VARIANTS.interactive_control
} as const;

// Card aspect ratios
export const CARD_ASPECTS = {
  portal: '16/9',
  entity: '1/1',
  sanctuary: '4/3',
  cosmic: '21/9',
  oracle: '3/4'
} as const;

// Card padding scales
export const CARD_PADDING = {
  compact: CARD_VARIANTS.data_display,
  comfortable: CARD_VARIANTS.portal_transition,
  spacious: CARD_VARIANTS.entity_profile
} as const;

// Card border radius options
export const CARD_BORDER_RADIUS = {
  sm: CARD_VARIANTS.data_display,
  md: CARD_VARIANTS.portal_transition,
  lg: CARD_VARIANTS.interactive_control,
  xl: CARD_VARIANTS.entity_profile
} as const;

// Card gap spacing
export const CARD_GAP = {
  tight: CARD_VARIANTS.data_display,
  normal: CARD_VARIANTS.portal_transition,
  spacious: CARD_VARIANTS.entity_profile
} as const;

// Card shadow presets
export const CARD_SHADOWS = {
  subtle: CARD_VARIANTS.data_display,
  elevated: CARD_VARIANTS.portal_transition,
  prominent: CARD_VARIANTS.interactive_control,
  cosmic: CARD_VARIANTS.entity_profile
} as const;

// Card glow effects
export const CARD_GLOWS = {
  quantum: CARD_VARIANTS.portal_transition,
  aethelred: CARD_VARIANTS.entity_profile,
  cosmic: CARD_VARIANTS.interactive_control,
  data: CARD_VARIANTS.data_display
} as const;

// Card backdrop effects
export const CARD_BACKDROPS = {
  glass: CARD_VARIANTS.portal_transition,
  quantum: CARD_VARIANTS.entity_profile,
  'glass-heavy': CARD_VARIANTS.data_display
} as const;

// Card hover transformations
export const CARD_HOVER_TRANSFORMS = {
  lift: CARD_VARIANTS.portal_transition,
  rotate: CARD_VARIANTS.entity_profile,
  scale: CARD_VARIANTS.interactive_control,
  subtle: CARD_VARIANTS.data_display
} as const;

// Card consciousness mappings
export const CARD_CONSCIOUSNESS = {
  portal_transition: CARD_VARIANTS.portal_transition,
  entity_profile: CARD_VARIANTS.entity_profile,
  data_display: CARD_VARIANTS.data_display,
  interactive_control: CARD_VARIANTS.interactive_control
} as const;

// Master card configuration
export const CARD_CONFIGS = {
  sizes: CARD_SIZES,
  aspects: CARD_ASPECTS,
  padding: CARD_PADDING,
  borderRadius: CARD_BORDER_RADIUS,
  gap: CARD_GAP,
  shadows: CARD_SHADOWS,
  glows: CARD_GLOWS,
  backdrops: CARD_BACKDROPS,
  hoverTransforms: CARD_HOVER_TRANSFORMS,
  consciousness: CARD_CONSCIOUSNESS
} as const;