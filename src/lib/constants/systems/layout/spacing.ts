// lib/constants/systems/layout/spacing.ts
import { 
  SPACING_SCALE as COSMIC_SPACING,
  SPACING_TOKENS,
  CONSCIOUSNESS_DENSITY,
  type ConsciousnessDensity
} from '@/lib/constants/cosmic/dimensions';

// ============================================================================
// SPACING SCALE - Direct derivation from cosmic spacing
// ============================================================================
// Consciousness-aware spacing derived from cosmic consciousness density
export const CONSCIOUSNESS_SPACING = {
  COMPACT: SPACING_TOKENS.consciousness.focused,
  BALANCED: SPACING_TOKENS.consciousness.sovereign,
  EXPANSIVE: SPACING_TOKENS.consciousness.quantum,
  COSMIC: SPACING_TOKENS.consciousness.cosmic,
} as const;

// ============================================================================
// COMPONENT SPACING - Semantic spacing derived from cosmic tokens
// ============================================================================

export const COMPONENT_SPACING = {
  // Derived from cosmic component spacing tokens
  BUTTON_PADDING: {
    SM: `px-${SPACING_TOKENS.component.tight} py-${SPACING_TOKENS.component.tight}`,
    MD: `px-${SPACING_TOKENS.component.comfortable} py-${SPACING_TOKENS.component.tight}`,
    LG: `px-${SPACING_TOKENS.component.spacious} py-${SPACING_TOKENS.component.comfortable}`,
  },
  CARD_PADDING: {
    SM: `p-${SPACING_TOKENS.component.tight}`,
    MD: `p-${SPACING_TOKENS.component.comfortable}`,
    LG: `p-${SPACING_TOKENS.component.spacious}`,
  },
  SECTION_PADDING: {
    SM: `py-${SPACING_TOKENS.content.section} px-${SPACING_TOKENS.content.group}`,
    MD: `py-${SPACING_TOKENS.content.section} px-${SPACING_TOKENS.content.section}`,
    LG: `py-${SPACING_TOKENS.content.section} px-${SPACING_TOKENS.container.padding}`,
  },
} as const;

// ============================================================================
// LAYOUT SPACING - Structural spacing derived from cosmic containers
// ============================================================================

export const LAYOUT_SPACING = {
  PAGE_MARGIN: {
    MOBILE: `mx-${SPACING_TOKENS.container.padding}`,
    TABLET: `mx-${SPACING_TOKENS.container.margin}`,
    DESKTOP: `mx-${SPACING_TOKENS.container.margin}`,
    IMMERSIVE: `mx-${SPACING_TOKENS.container.margin}`,
  },
  CONTENT_GUTTER: {
    MOBILE: `gap-${SPACING_TOKENS.container.gap}`,
    TABLET: `gap-${SPACING_TOKENS.content.group}`,
    DESKTOP: `gap-${SPACING_TOKENS.content.section}`,
    IMMERSIVE: `gap-${SPACING_TOKENS.content.section}`,
  },
  STACK_SPACING: {
    TIGHT: `space-y-${SPACING_TOKENS.content.text}`,
    NORMAL: `space-y-${SPACING_TOKENS.content.element}`,
    LOOSE: `space-y-${SPACING_TOKENS.content.group}`,
  },
} as const;

// ============================================================================
// TYPE EXPORTS - Properly typed from cosmic dimensions
// ============================================================================

export type SpacingToken = typeof  COSMIC_SPACING;
export type ComponentSpacing = keyof typeof COMPONENT_SPACING.BUTTON_PADDING;
export type LayoutSpacing = keyof typeof LAYOUT_SPACING.PAGE_MARGIN;

export const SPACING_SYSTEM = {
  scale: typeof COSMIC_SPACING,
  consciousness: CONSCIOUSNESS_SPACING,
  components: COMPONENT_SPACING,
  layout: LAYOUT_SPACING,
  tokens: SPACING_TOKENS,
} as const;