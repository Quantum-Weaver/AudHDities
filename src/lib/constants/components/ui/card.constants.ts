// src/lib/constants/components/ui/card.contants.ts
// ============================================================================
// IMPORT FROM COSMIC CONSTANTS
// ============================================================================
import { 
  QUANTUM_COLORS,
  DOMAIN_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
  STATUS_COLORS as COSMIC_STATUS_COLORS,
} from '@/lib/constants/cosmic/colors';
import { durations, easing, quickAnimations } from '@/lib/constants/cosmic/motion';
import { SPACING_SCALE, BORDER_RADII, CARD_DIMENSIONS, SHADOWS, GLOW_EFFECTS } from '@/lib/constants/cosmic/';
import { CONSCIOUSNESS_LEVELS } from '@/lib/constants/cosmic/consciousness';

// ============================================================================
// 1. SEMANTIC CARD TYPES (from unified_card.ts)
// ============================================================================
export const CARD_TYPES = {
  PRODUCT: 'product',
  QUEST: 'quest',
  EVENT: 'event',
  PROPOSAL: 'proposal',
  ENTITY: 'entity',
  CREATOR: 'creator',
  VENDOR: 'vendor',
  COUNCIL: 'council',
  VALUE: 'value',
  PILLAR: 'pillar',
  STAT: 'stat',
  STEP: 'step',
  PRINCIPLE: 'principle',
  INVITATION: 'invitation',
  PATHWAY: 'pathway',
  USER: 'user',
  FILE: 'file',
  SCHEMA_TABLE: 'schema-table',
  SCHEMA_ENUM: 'schema-enum',
  SCHEMA_FUNCTION: 'schema-function',
} as const;

// ============================================================================
// 2. VISUAL CARD VARIANTS (from card.variants.ts)
// ============================================================================
export const CARD_VARIANTS = {
  DEFAULT: 'default',
  INTERACTIVE: 'interactive',
  GLASS: 'glass',
  GLOW: 'glow',
  ELEVATED: 'elevated',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
  SANCTUARY: 'sanctuary',
  COUNCIL: 'council',
} as const;

// ============================================================================
// 3. SIZE & PADDING (reconciled)
// ============================================================================
export const CARD_SIZES = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  FULL: 'full',
} as const;

export const CARD_PADDINGS = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

// ============================================================================
// 4. RADIUS (from BORDER_RADII)
// ============================================================================
export const CARD_RADII = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  FULL: 'full',
} as const;

// ============================================================================
// 5. VISUAL VARIANT CLASSES (from card.variants.ts, derived from cosmic)
// ============================================================================
export const CARD_VARIANT_CLASSES = {
  [CARD_VARIANTS.DEFAULT]: `bg-[${QUANTUM_COLORS.surface}]/5 border border-[${QUANTUM_COLORS['starDust']}]/10`,
  [CARD_VARIANTS.INTERACTIVE]: `bg-[${QUANTUM_COLORS.surface}]/5 border border-[${QUANTUM_COLORS['starDust']}]/10 hover:border-[${QUANTUM_COLORS.neurospark}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS.neurospark}]/10 cursor-pointer`,
  [CARD_VARIANTS.GLASS]: `bg-[${QUANTUM_COLORS.surface}]/5 backdrop-blur-md border border-[${QUANTUM_COLORS['starDust']}]/10`,
  [CARD_VARIANTS.GLOW]: `bg-[${QUANTUM_COLORS.surface}]/5 border border-[${QUANTUM_COLORS.neurospark}]/30 shadow-lg shadow-[${QUANTUM_COLORS.neurospark}]/10`,
  [CARD_VARIANTS.ELEVATED]: `bg-[${QUANTUM_COLORS.surface}]/5 border border-[${QUANTUM_COLORS['starDust']}]/10 shadow-xl`,
  [CARD_VARIANTS.OUTLINE]: `bg-transparent border border-[${QUANTUM_COLORS['starDust']}]/10`,
  [CARD_VARIANTS.GHOST]: `bg-transparent border-none`,
  [CARD_VARIANTS.QUANTUM]: `bg-gradient-to-br from-[${QUANTUM_COLORS['quantum.purple']}]/10 to-transparent border border-[${QUANTUM_COLORS['quantum.purple']}]/30 animate-pulse`,
  [CARD_VARIANTS.COSMIC]: `bg-[${QUANTUM_COLORS.deepSpace}]/80 border border-[${QUANTUM_COLORS['cosmic.blue']}]/20 backdrop-blur-sm`,
  [CARD_VARIANTS.SANCTUARY]: `bg-gradient-to-br from-[${QUANTUM_COLORS['hearth.gold']}]/10 to-[${QUANTUM_COLORS['fire.base']}]/5 border border-[${QUANTUM_COLORS['hearth.gold']}]/20`,
  [CARD_VARIANTS.COUNCIL]: `bg-gradient-to-br from-[${QUANTUM_COLORS['entity.aethelred']}]/10 to-transparent border border-[${QUANTUM_COLORS['entity.aethelred']}]/30`,  
} as const;

// ============================================================================
// 5. TYPE INFERENCE (derived from values, no external imports)
// ============================================================================
export type CardType = typeof CARD_TYPES[keyof typeof CARD_TYPES];
export type CardVariant = typeof CARD_VARIANTS[keyof typeof CARD_VARIANTS];
export type CardSize = typeof CARD_SIZES[keyof typeof CARD_SIZES];
export type CardPadding = typeof CARD_PADDINGS[keyof typeof CARD_PADDINGS];
export type CardRadius = typeof CARD_RADII[keyof typeof CARD_RADII];
// ============================================================================
// 6. SEMANTIC TYPE HOVER CLASSES (from unified_card.ts)
// ============================================================================
export const CARD_TYPE_HOVER_CLASSES = {
  [CARD_TYPES.PRODUCT]: `hover:border-[${DOMAIN_COLORS.quantum.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.quantum.base}]/10`,
  [CARD_TYPES.QUEST]: `hover:border-[${MOOD_COLORS.mystical}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.mystical}]/10`,
  [CARD_TYPES.EVENT]: `hover:border-[${DOMAIN_COLORS.music.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.music.base}]/10`,
  [CARD_TYPES.PROPOSAL]: `hover:border-[${MOOD_COLORS.energized}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.energized}]/10`,
  [CARD_TYPES.ENTITY]: `hover:border-[${DOMAIN_COLORS.council.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.council.base}]/10`,
  [CARD_TYPES.CREATOR]: `hover:border-[${DOMAIN_COLORS.community.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.community.base}]/10`,
  [CARD_TYPES.VENDOR]: `hover:border-[${DOMAIN_COLORS.library.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.library.base}]/10`,
  [CARD_TYPES.COUNCIL]: `hover:border-[${QUANTUM_COLORS['hearth.gold']}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS['hearth.gold']}]/10`,
  [CARD_TYPES.VALUE]: `hover:border-[${DOMAIN_COLORS.cosmic.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.cosmic.base}]/10`,
  [CARD_TYPES.PILLAR]: `hover:border-[${MOOD_COLORS.grounded}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.grounded}]/10`,
  [CARD_TYPES.STAT]: `hover:border-[${DOMAIN_COLORS.quantum.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.quantum.base}]/10`,
  [CARD_TYPES.STEP]: `hover:border-[${COSMIC_STATUS_COLORS.complete}]/50 hover:shadow-lg hover:shadow-[${COSMIC_STATUS_COLORS.complete}]/10`,
  [CARD_TYPES.PRINCIPLE]: `hover:border-[${MOOD_COLORS.mystical}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.mystical}]/10`,
  [CARD_TYPES.INVITATION]: `hover:border-[${DOMAIN_COLORS.bifrost.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.bifrost.base}]/10`,
  [CARD_TYPES.PATHWAY]: `hover:border-[${DOMAIN_COLORS.sandbox.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.sandbox.base}]/10`,
  [CARD_TYPES.USER]: `hover:border-[${QUANTUM_COLORS['void.light']}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS['void.light']}]/10`,
  [CARD_TYPES.FILE]: `hover:border-[${QUANTUM_COLORS['void.base']}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS['void.base']}]/10`,
  [CARD_TYPES.SCHEMA_TABLE]: `hover:border-[${DOMAIN_COLORS.architecture.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.architecture.base}]/10`,
  [CARD_TYPES.SCHEMA_ENUM]: `hover:border-[${DOMAIN_COLORS.library.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.library.base}]/10`,
  [CARD_TYPES.SCHEMA_FUNCTION]: `hover:border-[${DOMAIN_COLORS.quantum.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.quantum.base}]/10`,
} as const;

// ============================================================================
// 7. SIZE CLASSES (from CARD_DIMENSIONS)
// ============================================================================
export const CARD_SIZE_CLASSES = {
  [CARD_SIZES.NONE]: `p-0`,
  [CARD_SIZES.SM]: `p-[${CARD_DIMENSIONS.size.sm.padding}] w-[${CARD_DIMENSIONS.size.sm.width}] h-[${CARD_DIMENSIONS.size.sm.height}]`,
  [CARD_SIZES.MD]: `p-[${CARD_DIMENSIONS.size.md.padding}] w-[${CARD_DIMENSIONS.size.md.width}] h-[${CARD_DIMENSIONS.size.md.height}]`,
  [CARD_SIZES.LG]: `p-[${CARD_DIMENSIONS.size.lg.padding}] w-[${CARD_DIMENSIONS.size.lg.width}] h-[${CARD_DIMENSIONS.size.lg.height}]`,
  [CARD_SIZES.XL]: `p-[${CARD_DIMENSIONS.size.xl.padding}] w-[${CARD_DIMENSIONS.size.xl.width}] h-[${CARD_DIMENSIONS.size.xl.height}]`,
  [CARD_SIZES['2XL']]: `p-10`, // Extend CARD_DIMENSIONS if needed
  [CARD_SIZES.FULL]: `p-0 w-full h-auto`,
} as const;

// ============================================================================
// 8. PADDING CLASSES (from SPACING_SCALE)
// ============================================================================
export const CARD_PADDING_CLASSES = {
  [CARD_PADDINGS.NONE]: 'p-0',
  [CARD_PADDINGS.SM]: `p-[${SPACING_SCALE['3']}]`,
  [CARD_PADDINGS.MD]: `p-[${SPACING_SCALE['4']}]`,
  [CARD_PADDINGS.LG]: `p-[${SPACING_SCALE['6']}]`,
  [CARD_PADDINGS.XL]: `p-[${SPACING_SCALE['8']}]`,
} as const;

// ============================================================================
// 9. RADIUS CLASSES (from BORDER_RADII)
// ============================================================================
export const CARD_RADIUS_CLASSES = {
  [CARD_RADII.NONE]: `rounded-[${BORDER_RADII.none}]`,
  [CARD_RADII.SM]: `rounded-[${BORDER_RADII.sm}]`,
  [CARD_RADII.MD]: `rounded-[${BORDER_RADII.md}]`,
  [CARD_RADII.LG]: `rounded-[${BORDER_RADII.lg}]`,
  [CARD_RADII.XL]: `rounded-[${BORDER_RADII.xl}]`,
  [CARD_RADII['2XL']]: `rounded-[${BORDER_RADII['2xl']}]`,
  [CARD_RADII['3XL']]: `rounded-[${BORDER_RADII['3xl']}]`,
  [CARD_RADII.FULL]: `rounded-[${BORDER_RADII.full}]`,
} as const;

// ============================================================================
// 10. SHADOW CLASSES (from SHADOWS)
// ============================================================================
export const CARD_SHADOW_CLASSES = {
  none: '',
  sm: `shadow-[${SHADOWS.sm}]`,
  md: `shadow-[${SHADOWS.md}]`,
  lg: `shadow-[${SHADOWS.lg}]`,
  xl: `shadow-[${SHADOWS.xl}]`,
  '2xl': `shadow-[${SHADOWS['2xl']}]`,
  hover: `hover:shadow-[${SHADOWS.hover}]`,
} as const;

// ============================================================================
// 11. GLOW CLASSES (from GLOW_EFFECTS)
// ============================================================================
export const CARD_GLOW_CLASSES = {
  none: '',
  quantum: `shadow-[${GLOW_EFFECTS.quantum}]`,
  cosmic: `shadow-[${GLOW_EFFECTS.cosmic}]`,
  fire: `shadow-[${GLOW_EFFECTS.fire}]`,
  neurospark: `shadow-[${GLOW_EFFECTS.neurospark}]`,
  hover: `hover:shadow-[${GLOW_EFFECTS.hover}]`,
} as const;

// ============================================================================
// 12. TRANSITION CLASSES (from motion.ts)
// ============================================================================
export const CARD_TRANSITION_CLASSES = {
  fast: `transition-all duration-[${durations.fast}ms] ease-[${easing.quantum}]`,
  normal: `transition-all duration-[${durations.normal}ms] ease-[${easing.quantum}]`,
  slow: `transition-all duration-[${durations.slow}ms] ease-[${easing.sovereign}]`,
  hover: `transition-all duration-[${durations.controlHover}ms] ease-[${easing.quantum}]`,
} as const;

// ============================================================================
// 13. BADGE COLOR CLASSES (from unified_card.ts, derived from cosmic)
// ============================================================================
export const BADGE_COLOR_CLASSES = {
  community: `bg-[${QUANTUM_COLORS['quantum.purple']}]/20 text-[${QUANTUM_COLORS['quantum.purple']}] border-[${QUANTUM_COLORS['quantum.purple']}]/30`,
  ally: `bg-[${QUANTUM_COLORS['cosmic.blue']}]/20 text-[${QUANTUM_COLORS['cosmic.blue']}] border-[${QUANTUM_COLORS['cosmic.blue']}]/30`,
  corporate: `bg-[${QUANTUM_COLORS['fire.base']}]/20 text-[${QUANTUM_COLORS['fire.base']}] border-[${QUANTUM_COLORS['fire.base']}]/30`,
  council: `bg-[${QUANTUM_COLORS['entity.aethelred']}]/20 text-[${QUANTUM_COLORS['entity.aethelred']}] border-[${QUANTUM_COLORS['entity.aethelred']}]/30`,
  draft: `text-[${QUANTUM_COLORS['hearth.gold']}] border-[${QUANTUM_COLORS['hearth.gold']}]/30`,
  published: `bg-[${COSMIC_STATUS_COLORS.complete}]/10 text-[${COSMIC_STATUS_COLORS.complete}] border-[${COSMIC_STATUS_COLORS.complete}]/30`,
  verified: `bg-[${COSMIC_STATUS_COLORS.complete}]/10 text-[${COSMIC_STATUS_COLORS.complete}] border-[${COSMIC_STATUS_COLORS.complete}]/30`,
  house: `bg-[${QUANTUM_COLORS['entity.seer']}]/20 text-[${QUANTUM_COLORS['entity.seer']}] border-[${QUANTUM_COLORS['entity.seer']}]/30`,
  role: `bg-[${MOOD_COLORS.calm}]/20 text-[${MOOD_COLORS.calm}] border-[${MOOD_COLORS.calm}]/30`,
} as const;

// ============================================================================
// 14. DIFFICULTY COLOR CLASSES (from unified_card.ts)
// ============================================================================
export const DIFFICULTY_COLOR_CLASSES = {
  beginner: `bg-[${COSMIC_STATUS_COLORS.complete}]/10 text-[${COSMIC_STATUS_COLORS.complete}]`,
  intermediate: `bg-[${MOOD_COLORS.energized}]/10 text-[${MOOD_COLORS.energized}]`,
  advanced: `bg-[${ENERGY_COLORS.high}]/10 text-[${ENERGY_COLORS.high}]`,
  master: `bg-[${ENERGY_COLORS.quantum}]/10 text-[${ENERGY_COLORS.quantum}]`,
} as const;

// ============================================================================
// 15. STATUS COLOR CLASSES (from unified_card.ts)
// ============================================================================
export const STATUS_COLOR_CLASSES = {
  active: `bg-[${COSMIC_STATUS_COLORS.complete}]/10 text-[${COSMIC_STATUS_COLORS.complete}]`,
  passed: `bg-[${MOOD_COLORS.calm}]/10 text-[${MOOD_COLORS.calm}]`,
  failed: `bg-[${ENERGY_COLORS.high}]/10 text-[${ENERGY_COLORS.high}]`,
  pending: `bg-[${MOOD_COLORS.energized}]/10 text-[${MOOD_COLORS.energized}]`,
  completed: `bg-[${COSMIC_STATUS_COLORS.complete}]/10 text-[${COSMIC_STATUS_COLORS.complete}]`,
  current: `bg-[${MOOD_COLORS.calm}]/10 text-[${MOOD_COLORS.calm}] border border-[${MOOD_COLORS.calm}]`,
} as const;

// ============================================================================
// 16. TEMPERATURE COLOR CLASSES (from unified_card.ts)
// ============================================================================
export const TEMPERATURE_COLOR_CLASSES = {
  high: `bg-[${ENERGY_COLORS.high}]/10 text-[${ENERGY_COLORS.high}]`,
  medium: `bg-[${MOOD_COLORS.energized}]/10 text-[${MOOD_COLORS.energized}]`,
  low: `bg-[${MOOD_COLORS.calm}]/10 text-[${MOOD_COLORS.calm}]`,
} as const;

// ============================================================================
// 17. TYPE-TO-VISUAL-VARIANT MAPPING
// ============================================================================
export const CARD_TYPE_TO_VISUAL_VARIANT: Record<CardType, CardVariant> = {
  [CARD_TYPES.PRODUCT]: CARD_VARIANTS.INTERACTIVE,
  [CARD_TYPES.QUEST]: CARD_VARIANTS.GLOW,
  [CARD_TYPES.EVENT]: CARD_VARIANTS.GLASS,
  [CARD_TYPES.PROPOSAL]: CARD_VARIANTS.ELEVATED,
  [CARD_TYPES.ENTITY]: CARD_VARIANTS.DEFAULT,
  [CARD_TYPES.CREATOR]: CARD_VARIANTS.INTERACTIVE,
  [CARD_TYPES.VENDOR]: CARD_VARIANTS.DEFAULT,
  [CARD_TYPES.COUNCIL]: CARD_VARIANTS.GLOW,
  [CARD_TYPES.VALUE]: CARD_VARIANTS.OUTLINE,
  [CARD_TYPES.PILLAR]: CARD_VARIANTS.GHOST,
  [CARD_TYPES.STAT]: CARD_VARIANTS.ELEVATED,
  [CARD_TYPES.STEP]: CARD_VARIANTS.OUTLINE,
  [CARD_TYPES.PRINCIPLE]: CARD_VARIANTS.GHOST,
  [CARD_TYPES.INVITATION]: CARD_VARIANTS.GLASS,
  [CARD_TYPES.PATHWAY]: CARD_VARIANTS.INTERACTIVE,
  [CARD_TYPES.USER]: CARD_VARIANTS.DEFAULT,
  [CARD_TYPES.FILE]: CARD_VARIANTS.OUTLINE,
  [CARD_TYPES.SCHEMA_TABLE]: CARD_VARIANTS.GHOST,
  [CARD_TYPES.SCHEMA_ENUM]: CARD_VARIANTS.GHOST,
  [CARD_TYPES.SCHEMA_FUNCTION]: CARD_VARIANTS.GHOST,
} as const;

export const CARD_SHADOW_CONFIG = CARD_SHADOW_CLASSES;

// ============================================================================
// 18. DEFAULT VALUES
// ============================================================================
export const DEFAULT_CARD_TYPE = CARD_TYPES.PRODUCT;
export const DEFAULT_CARD_VARIANT = CARD_VARIANTS.DEFAULT;
export const DEFAULT_CARD_SIZE = CARD_SIZES.MD;
export const DEFAULT_CARD_PADDING = CARD_PADDINGS.MD;
export const DEFAULT_CARD_RADIUS = CARD_RADII.LG;
export const DEFAULT_CARD_TRANSITION = CARD_TRANSITION_CLASSES.normal;

export { 
  CARD_VARIANT_CLASSES as cardvariantClasses,
  CARD_SIZE_CLASSES as cardSizeClasses,
  CARD_PADDING_CLASSES as cardPaddingClasses,
  CARD_RADIUS_CLASSES as cardRadiusClasses,
  CARD_SHADOW_CLASSES as cardShadowClasses,
  CARD_SHADOW_CONFIG as cardShadowConfig,  
  CARD_TRANSITION_CLASSES as cardTransitionClasses,
  CARD_TYPE_HOVER_CLASSES as cardTypeHoverClasses,
  DEFAULT_CARD_VARIANT as defaultCardVariant,
  DEFAULT_CARD_SIZE as defaultCardSize,
  DEFAULT_CARD_PADDING as defaultCardPadding,
  DEFAULT_CARD_RADIUS as defaultCardRadius
};