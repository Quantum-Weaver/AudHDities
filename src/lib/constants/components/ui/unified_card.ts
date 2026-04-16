// src/lib/constants/components/ui/unified_card.ts
// Pure values only - no logic, no types
// ALL COLORS DERIVED FROM COSMIC SYSTEM

import { 
  QUANTUM_COLORS,
  DOMAIN_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
  STATUS_COLORS
} from '@/lib/constants/cosmic/colors';
import { durations } from '@/lib/constants/cosmic/motion';
import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';

// ============================================================================
// CARD VARIANTS
// ============================================================================

export const CARD_VARIANTS = {
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

export const CARD_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const CARD_PADDINGS = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

// ============================================================================
// VARIANT CLASSES (Derived from cosmic colors)
// ============================================================================

export const CARD_VARIANT_CLASSES = {
  [CARD_VARIANTS.PRODUCT]: `hover:border-[${DOMAIN_COLORS.quantum.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.quantum.base}]/10`,
  [CARD_VARIANTS.QUEST]: `hover:border-[${MOOD_COLORS.mystical}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.mystical}]/10`,
  [CARD_VARIANTS.EVENT]: `hover:border-[${DOMAIN_COLORS.music.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.music.base}]/10`,
  [CARD_VARIANTS.PROPOSAL]: `hover:border-[${MOOD_COLORS.energized}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.energized}]/10`,
  [CARD_VARIANTS.ENTITY]: `hover:border-[${DOMAIN_COLORS.council.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.council.base}]/10`,
  [CARD_VARIANTS.CREATOR]: `hover:border-[${DOMAIN_COLORS.community.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.community.base}]/10`,
  [CARD_VARIANTS.VENDOR]: `hover:border-[${DOMAIN_COLORS.library.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.library.base}]/10`,
  [CARD_VARIANTS.COUNCIL]: `hover:border-[${QUANTUM_COLORS['hearth.gold']}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS['hearth.gold']}]/10`,
  [CARD_VARIANTS.VALUE]: `hover:border-[${DOMAIN_COLORS.cosmic.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.cosmic.base}]/10`,
  [CARD_VARIANTS.PILLAR]: `hover:border-[${MOOD_COLORS.grounded}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.grounded}]/10`,
  [CARD_VARIANTS.STAT]: `hover:border-[${DOMAIN_COLORS.quantum.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.quantum.base}]/10`,
  [CARD_VARIANTS.STEP]: `hover:border-[${STATUS_COLORS.complete}]/50 hover:shadow-lg hover:shadow-[${STATUS_COLORS.complete}]/10`,
  [CARD_VARIANTS.PRINCIPLE]: `hover:border-[${MOOD_COLORS.mystical}]/50 hover:shadow-lg hover:shadow-[${MOOD_COLORS.mystical}]/10`,
  [CARD_VARIANTS.INVITATION]: `hover:border-[${DOMAIN_COLORS.bifrost.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.bifrost.base}]/10`,
  [CARD_VARIANTS.PATHWAY]: `hover:border-[${DOMAIN_COLORS.sandbox.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.sandbox.base}]/10`,
  [CARD_VARIANTS.USER]: `hover:border-[${QUANTUM_COLORS['void.light']}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS['void.light']}]/10`,
  [CARD_VARIANTS.FILE]: `hover:border-[${QUANTUM_COLORS['void.base']}]/50 hover:shadow-lg hover:shadow-[${QUANTUM_COLORS['void.base']}]/10`,
  [CARD_VARIANTS.SCHEMA_TABLE]: `hover:border-[${DOMAIN_COLORS.architecture.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.architecture.base}]/10`,
  [CARD_VARIANTS.SCHEMA_ENUM]: `hover:border-[${DOMAIN_COLORS.library.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.library.base}]/10`,
  [CARD_VARIANTS.SCHEMA_FUNCTION]: `hover:border-[${DOMAIN_COLORS.quantum.base}]/50 hover:shadow-lg hover:shadow-[${DOMAIN_COLORS.quantum.base}]/10`,
} as const;

// ============================================================================
// SIZE CLASSES (Derived from dimensions)
// ============================================================================

export const CARD_SIZE_CLASSES = {
  [CARD_SIZES.SM]: `p-3 text-[${SPACING_SCALE['3.5']}]`,
  [CARD_SIZES.MD]: `p-4 text-[${SPACING_SCALE['4']}]`,
  [CARD_SIZES.LG]: `p-6 text-[${SPACING_SCALE['5']}]`,
} as const;

export const CARD_PADDING_CLASSES = {
  [CARD_PADDINGS.NONE]: 'p-0',
  [CARD_PADDINGS.SM]: `p-3`,
  [CARD_PADDINGS.MD]: `p-4`,
  [CARD_PADDINGS.LG]: `p-6`,
} as const;

// ============================================================================
// BADGE COLOR CLASSES (Derived from cosmic colors)
// ============================================================================

export const BADGE_COLOR_CLASSES = {
  community: `bg-[${QUANTUM_COLORS['quantum.purple']}]/20 text-[${QUANTUM_COLORS['quantum.purple']}] border-[${QUANTUM_COLORS['quantum.purple']}]/30`,
  ally: `bg-[${QUANTUM_COLORS['cosmic.blue']}]/20 text-[${QUANTUM_COLORS['cosmic.blue']}] border-[${QUANTUM_COLORS['cosmic.blue']}]/30`,
  corporate: `bg-[${QUANTUM_COLORS['fire.base']}]/20 text-[${QUANTUM_COLORS['fire.base']}] border-[${QUANTUM_COLORS['fire.base']}]/30`,
  council: `bg-[${QUANTUM_COLORS['entity.aethelred']}]/20 text-[${QUANTUM_COLORS['entity.aethelred']}] border-[${QUANTUM_COLORS['entity.aethelred']}]/30`,
  draft: `text-[${QUANTUM_COLORS['hearth.gold']}] border-[${QUANTUM_COLORS['hearth.gold']}]/30`,
  published: `bg-[${STATUS_COLORS.complete}]/10 text-[${STATUS_COLORS.complete}] border-[${STATUS_COLORS.complete}]/30`,
  verified: `bg-[${STATUS_COLORS.complete}]/10 text-[${STATUS_COLORS.complete}] border-[${STATUS_COLORS.complete}]/30`,
  house: `bg-[${QUANTUM_COLORS['entity.seer']}]/20 text-[${QUANTUM_COLORS['entity.seer']}] border-[${QUANTUM_COLORS['entity.seer']}]/30`,
  role: `bg-[${MOOD_COLORS.calm}]/20 text-[${MOOD_COLORS.calm}] border-[${MOOD_COLORS.calm}]/30`,
} as const;

// ============================================================================
// DIFFICULTY COLOR CLASSES (Derived from energy/mood colors)
// ============================================================================

export const DIFFICULTY_COLOR_CLASSES = {
  beginner: `bg-[${STATUS_COLORS.complete}]/10 text-[${STATUS_COLORS.complete}]`,
  intermediate: `bg-[${MOOD_COLORS.energized}]/10 text-[${MOOD_COLORS.energized}]`,
  advanced: `bg-[${ENERGY_COLORS.high}]/10 text-[${ENERGY_COLORS.high}]`,
  master: `bg-[${ENERGY_COLORS.quantum}]/10 text-[${ENERGY_COLORS.quantum}]`,
} as const;

// ============================================================================
// STATUS COLOR CLASSES
// ============================================================================

export const STATUS_COLOR_CLASSES = {
  active: `bg-[${STATUS_COLORS.complete}]/10 text-[${STATUS_COLORS.complete}]`,
  passed: `bg-[${MOOD_COLORS.calm}]/10 text-[${MOOD_COLORS.calm}]`,
  failed: `bg-[${ENERGY_COLORS.high}]/10 text-[${ENERGY_COLORS.high}]`,
  pending: `bg-[${MOOD_COLORS.energized}]/10 text-[${MOOD_COLORS.energized}]`,
  completed: `bg-[${STATUS_COLORS.complete}]/10 text-[${STATUS_COLORS.complete}]`,
  current: `bg-[${MOOD_COLORS.calm}]/10 text-[${MOOD_COLORS.calm}] border border-[${MOOD_COLORS.calm}]`,
} as const;

// ============================================================================
// ENTITY TEMPERATURE COLORS
// ============================================================================

export const TEMPERATURE_COLOR_CLASSES = {
  high: `bg-[${ENERGY_COLORS.high}]/10 text-[${ENERGY_COLORS.high}]`,
  medium: `bg-[${MOOD_COLORS.energized}]/10 text-[${MOOD_COLORS.energized}]`,
  low: `bg-[${MOOD_COLORS.calm}]/10 text-[${MOOD_COLORS.calm}]`,
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_CARD_VARIANT = CARD_VARIANTS.PRODUCT;
export const DEFAULT_CARD_SIZE = CARD_SIZES.MD;
export const DEFAULT_CARD_PADDING = CARD_PADDINGS.MD;
export const DEFAULT_CARD_TRANSITION = `transition-all duration-${durations.fast}ms ease-quantum`;