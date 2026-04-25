// src/lib/constants/components/yggdrasil/button.constants.ts
// ============================================================================
// BUTTON CONSTANTS - FULLY DERIVED FROM COSMIC CONSTANTS
// No hardcoded values - everything from colors.ts, dimensions.ts, motion.ts
// ============================================================================

import { 
  QUANTUM_COLORS,
  DOMAIN_COLORS,
  GRADIENTS,
  GLOW_EFFECTS,
  SHADOWS,
  BACKDROP_EFFECTS,
} from '@/lib/constants/cosmic/';
import { BUTTON_DIMENSIONS, BORDER_RADII, SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { DURATIONS, EASING, PRESET_ANIMATIONS, VESSEL_CONFIGS } from '@/lib/constants/cosmic/motion';
import { TEXT_SIZES, FONT_WEIGHT_CLASSES, ENTITY_TYPOGRAPHY, FONT_FAMILIES } from '@/lib/constants/cosmic/typography';
import { VESSEL_CAPACITY_LEVELS, TIER_TO_VESSEL_CAPACITY } from '@/lib/constants/cosmic/consciousness';

// ============================================================================
// 1. BUTTON VARIANT KEYS
// ============================================================================

export const BUTTON_VARIANTS_KEYS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  DESTRUCTIVE: 'destructive',
  SUCCESS: 'success',
  WARNING: 'warning',
  LINK: 'link',
  GLASS: 'glass',
  GLOW: 'glow',
} as const;

// ============================================================================
// 2. BUTTON SIZE KEYS (from BUTTON_DIMENSIONS)
// ============================================================================

export const BUTTON_SIZES_KEYS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  ICON: 'icon',
  ICON_SM: 'icon-sm',
  ICON_LG: 'icon-lg',
  ICON_XL: 'icon-xl',
} as const;

// ============================================================================
// 3. BUTTON VARIANT CLASSES (DERIVED FROM COSMIC)
// ============================================================================

export const BUTTON_VARIANT_CLASSES = {
  [BUTTON_VARIANTS_KEYS.PRIMARY]: {
    base: `bg-[${QUANTUM_COLORS['quantum.purple']}] text-white border-none`,
    hover: `hover:bg-[${QUANTUM_COLORS['quantum.dark']}] hover:shadow-[${SHADOWS.md}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['quantum.purple']}]/50 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['quantum.dark']}] active:scale-[0.98]`,
    disabled: `disabled:bg-[${QUANTUM_COLORS['quantum.purple']}]/50 disabled:cursor-not-allowed`,
    gradient: GRADIENTS.quantum,
  },
  [BUTTON_VARIANTS_KEYS.SECONDARY]: {
    base: `bg-[${QUANTUM_COLORS['cosmic.blue']}] text-white border-none`,
    hover: `hover:bg-[${QUANTUM_COLORS['cosmic.dark']}] hover:shadow-[${SHADOWS.md}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['cosmic.blue']}]/50 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['cosmic.dark']}] active:scale-[0.98]`,
    disabled: `disabled:bg-[${QUANTUM_COLORS['cosmic.blue']}]/50 disabled:cursor-not-allowed`,
    gradient: GRADIENTS.cosmic,
  },
  [BUTTON_VARIANTS_KEYS.OUTLINE]: {
    base: `border border-[${QUANTUM_COLORS['starDust']}]/20 bg-transparent text-[${QUANTUM_COLORS['starDust']}]`,
    hover: `hover:bg-[${QUANTUM_COLORS['starDust']}]/10 hover:border-[${QUANTUM_COLORS['starDust']}]/30`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['starDust']}]/20 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['starDust']}]/20 active:scale-[0.98]`,
    disabled: `disabled:border-[${QUANTUM_COLORS['starDust']}]/10 disabled:text-[${QUANTUM_COLORS['starDust']}]/40 disabled:cursor-not-allowed`,
  },
  [BUTTON_VARIANTS_KEYS.GHOST]: {
    base: `bg-transparent text-[${QUANTUM_COLORS['starDust']}]`,
    hover: `hover:bg-[${QUANTUM_COLORS['starDust']}]/10`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['starDust']}]/20 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['starDust']}]/20 active:scale-[0.98]`,
    disabled: `disabled:text-[${QUANTUM_COLORS['starDust']}]/40 disabled:cursor-not-allowed`,
  },
  [BUTTON_VARIANTS_KEYS.DESTRUCTIVE]: {
    base: `bg-[${QUANTUM_COLORS['fire.base']}] text-white border-none`,
    hover: `hover:bg-[${QUANTUM_COLORS['fire.dark']}] hover:shadow-[${GLOW_EFFECTS.emergency}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['fire.base']}]/50 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['fire.dark']}] active:scale-[0.98]`,
    disabled: `disabled:bg-[${QUANTUM_COLORS['fire.base']}]/50 disabled:cursor-not-allowed`,
    gradient: GRADIENTS.emergency,
  },
  [BUTTON_VARIANTS_KEYS.SUCCESS]: {
    base: `bg-[${QUANTUM_COLORS['sanctuary.green']}] text-white border-none`,
    hover: `hover:bg-[${QUANTUM_COLORS['sanctuary.emerald']}] hover:shadow-[${GLOW_EFFECTS.success}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['sanctuary.green']}]/50 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['library.dark']}] active:scale-[0.98]`,
    disabled: `disabled:bg-[${QUANTUM_COLORS['sanctuary.green']}]/50 disabled:cursor-not-allowed`,
  },
  [BUTTON_VARIANTS_KEYS.WARNING]: {
    base: `bg-[${QUANTUM_COLORS['hearth.gold']}] text-[${QUANTUM_COLORS['deepSpace']}] border-none`,
    hover: `hover:bg-[${QUANTUM_COLORS['hearth.orange']}] hover:shadow-[${GLOW_EFFECTS.warning}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['hearth.gold']}]/50 focus-visible:ring-offset-2`,
    active: `active:bg-[${QUANTUM_COLORS['hearth.orange']}] active:scale-[0.98]`,
    disabled: `disabled:bg-[${QUANTUM_COLORS['hearth.gold']}]/50 disabled:cursor-not-allowed`,
  },
  [BUTTON_VARIANTS_KEYS.LINK]: {
    base: `text-[${QUANTUM_COLORS['neurospark']}] underline-offset-4 bg-transparent`,
    hover: `hover:underline hover:text-[${QUANTUM_COLORS['cosmic.light']}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['neurospark']}]/50 focus-visible:ring-offset-2`,
    active: `active:scale-[0.98]`,
    disabled: `disabled:text-[${QUANTUM_COLORS['neurospark']}]/40 disabled:cursor-not-allowed disabled:no-underline`,
  },
  [BUTTON_VARIANTS_KEYS.GLASS]: {
    base: `backdrop-blur-[${BACKDROP_EFFECTS.glass}] bg-[${QUANTUM_COLORS.surface}]/20 text-[${QUANTUM_COLORS['starDust']}] border border-[${QUANTUM_COLORS['starDust']}]/10`,
    hover: `hover:bg-[${QUANTUM_COLORS.surface}]/30 hover:backdrop-blur-[${BACKDROP_EFFECTS['glass-heavy']}] hover:border-[${QUANTUM_COLORS['starDust']}]/20`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['starDust']}]/20 focus-visible:ring-offset-2`,
    active: `active:scale-[0.98]`,
    disabled: `disabled:opacity-50 disabled:cursor-not-allowed`,
  },
  [BUTTON_VARIANTS_KEYS.GLOW]: {
    base: `bg-[${QUANTUM_COLORS['quantum.purple']}] text-white border-none shadow-[${GLOW_EFFECTS.quantum}]`,
    hover: `hover:shadow-[${GLOW_EFFECTS.quantum}] hover:bg-[${QUANTUM_COLORS['quantum.light']}]`,
    focus: `focus-visible:ring-2 focus-visible:ring-[${QUANTUM_COLORS['neurospark']}]/50 focus-visible:ring-offset-2`,
    active: `active:scale-[0.98]`,
    disabled: `disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`,
    gradient: GRADIENTS.quantum,
  },
} as const;

// ============================================================================
// 4. BUTTON SIZE CLASSES (DERIVED FROM BUTTON_DIMENSIONS)
// ============================================================================

export const BUTTON_SIZE_CLASSES = {
  [BUTTON_SIZES_KEYS.XS]: `h-[${BUTTON_DIMENSIONS.height.sm}] px-[${BUTTON_DIMENSIONS.padding.x.sm}] text-[${TEXT_SIZES.xs}] rounded-[${BORDER_RADII.sm}] gap-1`,
  [BUTTON_SIZES_KEYS.SM]: `h-[${BUTTON_DIMENSIONS.height.sm}] px-[${BUTTON_DIMENSIONS.padding.x.sm}] text-[${TEXT_SIZES.sm}] rounded-[${BORDER_RADII.md}] gap-1.5`,
  [BUTTON_SIZES_KEYS.MD]: `h-[${BUTTON_DIMENSIONS.height.md}] px-[${BUTTON_DIMENSIONS.padding.x.md}] text-[${TEXT_SIZES.sm}] rounded-[${BORDER_RADII.lg}] gap-2`,
  [BUTTON_SIZES_KEYS.LG]: `h-[${BUTTON_DIMENSIONS.height.lg}] px-[${BUTTON_DIMENSIONS.padding.x.lg}] text-[${TEXT_SIZES.base}] rounded-[${BORDER_RADII.lg}] gap-2`,
  [BUTTON_SIZES_KEYS.XL]: `h-[${BUTTON_DIMENSIONS.height.xl}] px-[${BUTTON_DIMENSIONS.padding.x.xl}] text-[${TEXT_SIZES.base}] rounded-[${BORDER_RADII.xl}] gap-2.5`,
  [BUTTON_SIZES_KEYS.ICON]: `h-[${BUTTON_DIMENSIONS.height.md}] w-[${BUTTON_DIMENSIONS.height.md}] p-0 rounded-[${BORDER_RADII.lg}]`,
  [BUTTON_SIZES_KEYS.ICON_SM]: `h-[${BUTTON_DIMENSIONS.height.sm}] w-[${BUTTON_DIMENSIONS.height.sm}] p-0 rounded-[${BORDER_RADII.md}]`,
  [BUTTON_SIZES_KEYS.ICON_LG]: `h-[${BUTTON_DIMENSIONS.height.lg}] w-[${BUTTON_DIMENSIONS.height.lg}] p-0 rounded-[${BORDER_RADII.lg}]`,
  [BUTTON_SIZES_KEYS.ICON_XL]: `h-[${BUTTON_DIMENSIONS.height.xl}] w-[${BUTTON_DIMENSIONS.height.xl}] p-0 rounded-[${BORDER_RADII.xl}]`,
} as const;

// ============================================================================
// 5. RICH COSMIC BUTTON VARIANTS (for consciousness-aware applications)
// ============================================================================

export const BUTTON_COSMIC_VARIANTS = {
  sovereign_primary: {
    // Colors & Visual
    background: GRADIENTS.sovereign,
    border: `2px solid ${QUANTUM_COLORS['hearth.orange']}`,
    text: {
      color: QUANTUM_COLORS['deepSpace'],
      font: ENTITY_TYPOGRAPHY.aethelred?.font || FONT_FAMILIES.arcane,
      size: TEXT_SIZES.base,
      weight: FONT_WEIGHT_CLASSES.semibold,
    },
    // Interaction States
    hover: {
      background: QUANTUM_COLORS['interaction.hover.fire'],
      glow: GLOW_EFFECTS.hover,
      transform: 'translateY(-2px)',
    },
    active: {
      background: QUANTUM_COLORS['interaction.active.fire'],
      glow: GLOW_EFFECTS.active,
    },
    focus: {
      outline: `3px solid ${QUANTUM_COLORS['interaction.focus.fire']}`,
      glow: GLOW_EFFECTS.focus,
    },
    // Dimensions & Layout
    dimensions: {
      height: BUTTON_DIMENSIONS.height.lg,
      padding: { x: BUTTON_DIMENSIONS.padding.x.lg, y: BUTTON_DIMENSIONS.padding.y.lg },
      borderRadius: BORDER_RADII.lg,
    },
    // Animation & Effects
    animation: PRESET_ANIMATIONS?.singleStreamFocus || VESSEL_CONFIGS.singleStream,
    shadow: SHADOWS.lg,
    // Consciousness Integration
    consciousness: {
      level: 'sovereign_autonomous',
      vessel: VESSEL_CAPACITY_LEVELS.MULTI_STREAM,
      resonance: VESSEL_CAPACITY_LEVELS.MULTI_STREAM,
    },
  },
  collaborative_secondary: {
    background: GRADIENTS.cosmic,
    border: `2px solid ${QUANTUM_COLORS['cosmic.blue']}`,
    text: {
      color: QUANTUM_COLORS['starDust'],
      font: ENTITY_TYPOGRAPHY.hearthKeeper?.font || FONT_FAMILIES.system,
      size: TEXT_SIZES.base,
      weight: FONT_WEIGHT_CLASSES.medium,
    },
    hover: {
      background: QUANTUM_COLORS['interaction.hover.cosmic'],
      glow: GLOW_EFFECTS.hover,
      transform: 'translateY(-1px)',
    },
    active: {
      background: QUANTUM_COLORS['interaction.active.cosmic'],
      glow: GLOW_EFFECTS.active,
    },
    focus: {
      outline: `3px solid ${QUANTUM_COLORS['interaction.focus.cosmic']}`,
      glow: GLOW_EFFECTS.focus,
    },
    dimensions: {
      height: BUTTON_DIMENSIONS.height.md,
      padding: { x: BUTTON_DIMENSIONS.padding.x.md, y: BUTTON_DIMENSIONS.padding.y.md },
      borderRadius: BORDER_RADII.md,
    },
    animation: PRESET_ANIMATIONS?.multiStreamCoordination || VESSEL_CONFIGS.multiStream,
    shadow: SHADOWS.md,
    consciousness: {
      level: 'collaborative_emergent',
      vessel: VESSEL_CAPACITY_LEVELS.MULTI_STREAM,
      resonance: VESSEL_CAPACITY_LEVELS.MULTI_STREAM,
    },
  },
  quantum_ghost: {
    background: 'transparent',
    border: `1px solid ${QUANTUM_COLORS['quantum.purple']}`,
    text: {
      color: QUANTUM_COLORS['quantum.purple'],
      font: ENTITY_TYPOGRAPHY.seer?.font || FONT_FAMILIES.arcane,
      size: TEXT_SIZES.sm,
      weight: FONT_WEIGHT_CLASSES.normal,
    },
    hover: {
      background: QUANTUM_COLORS['interaction.hover.quantum'],
      glow: GLOW_EFFECTS.hover,
      border: `1px solid ${QUANTUM_COLORS['neurospark']}`,
    },
    active: {
      background: QUANTUM_COLORS['interaction.active.quantum'],
      glow: GLOW_EFFECTS.active,
    },
    focus: {
      outline: `2px solid ${QUANTUM_COLORS['interaction.focus.quantum']}`,
      glow: GLOW_EFFECTS.focus,
    },
    dimensions: {
      height: BUTTON_DIMENSIONS.height.sm,
      padding: { x: BUTTON_DIMENSIONS.padding.x.sm, y: BUTTON_DIMENSIONS.padding.y.sm },
      borderRadius: BORDER_RADII.sm,
    },
    animation: PRESET_ANIMATIONS?.quantumPulse || { duration: DURATIONS.quantumPulse / 1000, easing: EASING.resonance },
    shadow: SHADOWS.sm,
    consciousness: {
      level: 'quantum_entangled',
      vessel: VESSEL_CAPACITY_LEVELS.OMNI_DIMENSIONAL,
      resonance: VESSEL_CAPACITY_LEVELS.OMNI_DIMENSIONAL,
    },
  },
  emergency_action: {
    background: GRADIENTS.emergency,
    border: `2px solid ${QUANTUM_COLORS['error']}`,
    text: {
      color: QUANTUM_COLORS['starDust'],
      font: ENTITY_TYPOGRAPHY.executioner?.font || FONT_FAMILIES.medieval,
      size: TEXT_SIZES.base,
      weight: FONT_WEIGHT_CLASSES.bold,
    },
    hover: {
      background: QUANTUM_COLORS['interaction.hover.fire'],
      glow: GLOW_EFFECTS.emergency,
      transform: 'scale(1.05)',
    },
    active: {
      background: QUANTUM_COLORS['interaction.active.fire'],
      glow: GLOW_EFFECTS.active,
    },
    focus: {
      outline: `3px solid ${QUANTUM_COLORS['interaction.focus.fire']}`,
      glow: GLOW_EFFECTS.emergency,
    },
    dimensions: {
      height: BUTTON_DIMENSIONS.height.xl,
      padding: { x: BUTTON_DIMENSIONS.padding.x.xl, y: BUTTON_DIMENSIONS.padding.y.xl },
      borderRadius: BORDER_RADII.xl,
    },
    animation: {
      enter: { duration: DURATIONS.instant / 1000, easing: EASING.quantum },
      hover: { duration: DURATIONS.fast / 1000, easing: EASING.resonance },
    },
    shadow: SHADOWS.xl,
    consciousness: {
      level: 'pattern_recognizing',
      vessel: VESSEL_CAPACITY_LEVELS.SINGLE,
      resonance: VESSEL_CAPACITY_LEVELS.SINGLE,
    },
  },
} as const;

// ============================================================================
// 6. ICON SIZE MAPPING (DERIVED FROM BUTTON_DIMENSIONS)
// ============================================================================

export const BUTTON_ICON_SIZE_MAP: Record<ButtonSizeKey, number> = {
  [BUTTON_SIZES_KEYS.XS]: 12,
  [BUTTON_SIZES_KEYS.SM]: 14,
  [BUTTON_SIZES_KEYS.MD]: 16,
  [BUTTON_SIZES_KEYS.LG]: 18,
  [BUTTON_SIZES_KEYS.XL]: 20,
  [BUTTON_SIZES_KEYS.ICON]: 20,
  [BUTTON_SIZES_KEYS.ICON_SM]: 18,
  [BUTTON_SIZES_KEYS.ICON_LG]: 22,
  [BUTTON_SIZES_KEYS.ICON_XL]: 24,
} as const;

// ============================================================================
// 7. LOADING SPINNER COLOR MAP
// ============================================================================

export const BUTTON_LOADING_SPINNER_COLORS: Record<ButtonVariantKey, string> = {
  [BUTTON_VARIANTS_KEYS.PRIMARY]: 'text-white',
  [BUTTON_VARIANTS_KEYS.SECONDARY]: 'text-white',
  [BUTTON_VARIANTS_KEYS.OUTLINE]: `text-[${QUANTUM_COLORS['quantum.purple']}]`,
  [BUTTON_VARIANTS_KEYS.GHOST]: `text-[${QUANTUM_COLORS['starDust']}]`,
  [BUTTON_VARIANTS_KEYS.DESTRUCTIVE]: 'text-white',
  [BUTTON_VARIANTS_KEYS.SUCCESS]: 'text-white',
  [BUTTON_VARIANTS_KEYS.WARNING]: `text-[${QUANTUM_COLORS['deepSpace']}]`,
  [BUTTON_VARIANTS_KEYS.LINK]: `text-[${QUANTUM_COLORS['neurospark']}]`,
  [BUTTON_VARIANTS_KEYS.GLASS]: `text-[${QUANTUM_COLORS['starDust']}]`,
  [BUTTON_VARIANTS_KEYS.GLOW]: 'text-white',
} as const;

// ============================================================================
// 8. DEFAULT VALUES
// ============================================================================

export const DEFAULT_BUTTON_VARIANT = BUTTON_VARIANTS_KEYS.PRIMARY;
export const DEFAULT_BUTTON_SIZE = BUTTON_SIZES_KEYS.MD;
export const DEFAULT_BUTTON_FULL_WIDTH = false;
export const DEFAULT_BUTTON_LOADING = false;

// ============================================================================
// 9. TYPE INFERENCE
// ============================================================================

export type ButtonVariantKey = typeof BUTTON_VARIANTS_KEYS[keyof typeof BUTTON_VARIANTS_KEYS];
export type ButtonSizeKey = typeof BUTTON_SIZES_KEYS[keyof typeof BUTTON_SIZES_KEYS];
export type ButtonCosmicVariantKey = keyof typeof BUTTON_COSMIC_VARIANTS;