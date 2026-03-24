import { ThemeName } from '@/types/cosmic/primitives';
import {
  BUTTON_DIMENSIONS,
  CARD_DIMENSIONS,
  type ButtonSize as CosmicButtonSize,
  type ContainerSize
} from '@/lib/constants/cosmic/dimensions';

// ============================================================================
// CORE VARIANT SYSTEM - Derived from cosmic themes
// ============================================================================

export const CORE_VARIANTS = {
  // Direct mapping from cosmic theme names
  QUANTUM: 'quantum' as ThemeName,
  COSMIC: 'cosmic' as ThemeName, 
  EMERGENCY: 'emergency' as ThemeName,
  SOVEREIGN: 'sovereign' as ThemeName,
  NEUTRAL: 'quantum' as ThemeName,
  HOLOGRAPHIC: 'quantum' as ThemeName,
} as const;

export const CORE_SIZES = {
  // Derived from cosmic component dimensions
  SM: 'sm' as CosmicButtonSize,
  MD: 'md' as CosmicButtonSize, 
  LG: 'lg' as CosmicButtonSize,
  XL: 'xl' as CosmicButtonSize,
} as const;

// ============================================================================
// COMPONENT VARIANTS - Theme-aware variants with proper derivation
// ============================================================================

export const BUTTON_VARIANTS = {
  ...CORE_VARIANTS,
  PRIMARY: 'quantum' as ThemeName,
  SECONDARY: 'cosmic' as ThemeName,
} as const;

export const CARD_VARIANTS = {
  ...CORE_VARIANTS,
  PORTAL: 'quantum' as ThemeName,
  FEATURE: 'cosmic' as ThemeName,
  ORACLE: 'mystical' as ThemeName,
  ENERGY: 'energized' as ThemeName,
  GAMING: 'creative' as ThemeName,
  SOCIAL: 'pride' as ThemeName,
  ENTITY: 'sovereign' as ThemeName,
  COUNCIL: 'quantum' as ThemeName,
} as const;

export const SECTION_VARIANTS = {
  ...CORE_VARIANTS,
  RAISED: 'quantum' as ThemeName,
  GRADIENT: 'cosmic' as ThemeName,
  DARK: 'quantum' as ThemeName,
  DISPLAY_PANEL: 'quantum' as ThemeName,
  CONTENT: 'quantum' as ThemeName,
  HERO: 'sovereign' as ThemeName,
} as const;

// ============================================================================
// SIZE CLASSES - Properly derived from cosmic dimensions
// ============================================================================

export const BUTTON_SIZE_CLASSES = {
  [CORE_SIZES.SM]: `px-${BUTTON_DIMENSIONS.padding.x.sm} py-${BUTTON_DIMENSIONS.padding.y.sm} text-sm rounded-${BUTTON_DIMENSIONS.borderRadius.sm}`,
  [CORE_SIZES.MD]: `px-${BUTTON_DIMENSIONS.padding.x.md} py-${BUTTON_DIMENSIONS.padding.y.md} rounded-${BUTTON_DIMENSIONS.borderRadius.md}`,
  [CORE_SIZES.LG]: `px-${BUTTON_DIMENSIONS.padding.x.lg} py-${BUTTON_DIMENSIONS.padding.y.lg} text-lg rounded-${BUTTON_DIMENSIONS.borderRadius.lg}`,
  [CORE_SIZES.XL]: `px-${BUTTON_DIMENSIONS.padding.x.xl} py-${BUTTON_DIMENSIONS.padding.y.xl} text-xl rounded-${BUTTON_DIMENSIONS.borderRadius.xl}`,
} as const;

export const CARD_SIZE_CLASSES = {
  [CORE_SIZES.SM]: `min-h-${CARD_DIMENSIONS.size.sm.height} p-${CARD_DIMENSIONS.size.sm.padding} rounded-xl`,
  [CORE_SIZES.MD]: `min-h-${CARD_DIMENSIONS.size.md.height} p-${CARD_DIMENSIONS.size.md.padding} rounded-2xl`,
  [CORE_SIZES.LG]: `min-h-${CARD_DIMENSIONS.size.lg.height} p-${CARD_DIMENSIONS.size.lg.padding} rounded-3xl`,
} as const;

// ============================================================================
// TYPE EXPORTS - Properly typed from cosmic dimensions
// ============================================================================

export const VARIANT_SYSTEM = {
  core: CORE_VARIANTS,
  sizes: CORE_SIZES,
  components: {
    button: BUTTON_VARIANTS,
    card: CARD_VARIANTS,
    section: SECTION_VARIANTS,
  },
  classes: {
    button: BUTTON_SIZE_CLASSES,
    card: CARD_SIZE_CLASSES,
  },
  dimensions: {
    button: BUTTON_DIMENSIONS,
    card: CARD_DIMENSIONS,
  },
} as const;