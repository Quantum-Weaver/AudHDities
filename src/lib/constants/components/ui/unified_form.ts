// src/lib/constants/components/ui/unified_form.ts
// Pure values only - no logic, no types
// ALL VALUES DERIVED FROM COSMIC SYSTEM

import { 
  SPACING_SCALE,
  BORDER_RADII,
  FONT_SIZES,
} from '@/lib/constants/cosmic/dimensions';
import { durations, easing } from '@/lib/constants/cosmic/motion';
import { STATUS_COLORS, QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

// ============================================================================
// FORM VARIANTS
// ============================================================================

export const FORM_VARIANTS = {
  PRODUCT: 'product',
  PROFILE: 'profile',
  SIGNUP: 'signup',
  LOGIN: 'login',
  CHECKOUT: 'checkout',
  CONTACT: 'contact',
  SUPPORT: 'support',
  APPLICATION: 'application',
  ACID_TEST: 'acid-test',
  SETTINGS: 'settings',
  QUEST: 'quest',
  EVENT: 'event',
  CHANNEL: 'channel',
  PROPOSAL: 'proposal',
  SEARCH: 'search',
} as const;

// ============================================================================
// FORM SIZES
// ============================================================================

export const FORM_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  FULL: 'full',
} as const;

// ============================================================================
// FORM LAYOUTS
// ============================================================================

export const FORM_LAYOUTS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  GRID: 'grid',
  STACKED: 'stacked',
  WIZARD: 'wizard',
} as const;

// ============================================================================
// INPUT VARIANTS (Derived from cosmic system)
// ============================================================================

export const INPUT_VARIANTS = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  SEARCH: 'search',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  MULTI_SELECT: 'multi-select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SWITCH: 'switch',
  SLIDER: 'slider',
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
  FILE: 'file',
  IMAGE: 'image',
  COLOR: 'color',
} as const;

// ============================================================================
// FIELD SIZES (Derived from dimensions)
// ============================================================================

export const FIELD_SIZES = {
  SM: {
    height: SPACING_SCALE['8'],    // 32px
    paddingX: SPACING_SCALE['3'],  // 12px
    paddingY: SPACING_SCALE['2'],  // 8px
    fontSize: FONT_SIZES.sm,
    borderRadius: BORDER_RADII.sm,
  },
  MD: {
    height: SPACING_SCALE['10'],   // 40px
    paddingX: SPACING_SCALE['4'],  // 16px
    paddingY: SPACING_SCALE['2.5'],// 10px
    fontSize: FONT_SIZES.base,
    borderRadius: BORDER_RADII.md,
  },
  LG: {
    height: SPACING_SCALE['12'],   // 48px
    paddingX: SPACING_SCALE['6'],  // 24px
    paddingY: SPACING_SCALE['3'],  // 12px
    fontSize: FONT_SIZES.lg,
    borderRadius: BORDER_RADII.lg,
  },
} as const;

// ============================================================================
// VALIDATION STATES (Derived from cosmic colors)
// ============================================================================

export const VALIDATION_STATES = {
  IDLE: 'idle',
  VALID: 'valid',
  INVALID: 'invalid',
  VALIDATING: 'validating',
  WARNING: 'warning',
} as const;

export const VALIDATION_COLORS = {
  [VALIDATION_STATES.IDLE]: {
    border: 'border-white/10',
    ring: 'ring-white/10',
    text: 'text-white/60',
  },
  [VALIDATION_STATES.VALID]: {
    border: `border-[${STATUS_COLORS.complete}]/50`,
    ring: `ring-[${STATUS_COLORS.complete}]/20`,
    text: `text-[${STATUS_COLORS.complete}]`,
  },
  [VALIDATION_STATES.INVALID]: {
    border: `border-[${STATUS_COLORS.critical}]/50`,
    ring: `ring-[${STATUS_COLORS.critical}]/20`,
    text: `text-[${STATUS_COLORS.critical}]`,
  },
  [VALIDATION_STATES.VALIDATING]: {
    border: 'border-neurospark/50',
    ring: 'ring-neurospark/20',
    text: 'text-neurospark',
  },
  [VALIDATION_STATES.WARNING]: {
    border: `border-[${STATUS_COLORS.critical}]/50`,
    ring: `ring-[${STATUS_COLORS.critical}]/20`,
    text: `text-[${STATUS_COLORS.critical}]`,
  },
} as const;

// ============================================================================
// FIELD STATUS COLORS
// ============================================================================

export const FIELD_STATUS_COLORS = {
  default: {
    background: 'bg-white/5',
    border: 'border-white/10',
    hover: 'hover:border-white/20',
    focus: 'focus:border-neurospark focus:ring-neurospark/20',
    disabled: 'disabled:bg-white/10 disabled:border-white/5',
    readonly: 'read-only:bg-white/5 read-only:border-white/10',
  },
  error: {
    background: 'bg-red-500/5',
    border: 'border-red-500/50',
    hover: 'hover:border-red-500/70',
    focus: 'focus:border-red-500 focus:ring-red-500/20',
  },
  success: {
    background: 'bg-green-500/5',
    border: 'border-green-500/50',
    hover: 'hover:border-green-500/70',
    focus: 'focus:border-green-500 focus:ring-green-500/20',
  },
  warning: {
    background: 'bg-yellow-500/5',
    border: 'border-yellow-500/50',
    hover: 'hover:border-yellow-500/70',
    focus: 'focus:border-yellow-500 focus:ring-yellow-500/20',
  },
} as const;

// ============================================================================
// FORM TRANSITIONS (Derived from motion)
// ============================================================================

export const FORM_TRANSITIONS = {
  field: {
    enter: `transition-all duration-${durations.fast}ms ${easing.quantum}`,
    exit: `transition-all duration-${durations.fast}ms ${easing.quantum}`,
  },
  section: {
    enter: `transition-all duration-${durations.normal}ms ${easing.sovereign}`,
    exit: `transition-all duration-${durations.normal}ms ${easing.sovereign}`,
  },
  error: {
    enter: `transition-all duration-${durations.fast}ms ${easing.quantum}`,
    exit: `transition-all duration-${durations.fast}ms ${easing.quantum}`,
  },
} as const;

// ============================================================================
// FORM SPACING (Derived from dimensions)
// ============================================================================

export const FORM_SPACING = {
  container: {
    gap: SPACING_SCALE['6'],      // 24px
    padding: SPACING_SCALE['6'],   // 24px
  },
  section: {
    gap: SPACING_SCALE['4'],       // 16px
    marginBottom: SPACING_SCALE['8'], // 32px
  },
  field: {
    gap: SPACING_SCALE['2'],       // 8px
    marginBottom: SPACING_SCALE['4'], // 16px
  },
  fieldGroup: {
    gap: SPACING_SCALE['4'],       // 16px
  },
  actions: {
    gap: SPACING_SCALE['4'],       // 16px
    marginTop: SPACING_SCALE['6'], // 24px
  },
} as const;

// ============================================================================
// FORM WIZARD STEPS (For multi-step forms)
// ============================================================================

export const WIZARD_STEP_STATUS = {
  PENDING: 'pending',
  CURRENT: 'current',
  COMPLETED: 'completed',
  ERROR: 'error',
  SKIPPED: 'skipped',
} as const;

export const WIZARD_STEP_COLORS = {
  [WIZARD_STEP_STATUS.PENDING]: {
    circle: 'bg-white/10 text-white/40',
    line: 'bg-white/10',
    text: 'text-white/40',
  },
  [WIZARD_STEP_STATUS.CURRENT]: {
    circle: 'bg-neurospark text-white',
    line: 'bg-neurospark/30',
    text: 'text-white',
  },
  [WIZARD_STEP_STATUS.COMPLETED]: {
    circle: `bg-[${STATUS_COLORS.complete}] text-white`,
    line: `bg-[${STATUS_COLORS.complete}]`,
    text: `text-[${STATUS_COLORS.complete}]`,
  },
  [WIZARD_STEP_STATUS.ERROR]: {
    circle: `bg-[${STATUS_COLORS.critical}] text-white`,
    line: `bg-[${STATUS_COLORS.critical}]/30`,
    text: `text-[${STATUS_COLORS.critical}]`,
  },
  [WIZARD_STEP_STATUS.SKIPPED]: {
    circle: 'bg-white/5 text-white/20',
    line: 'bg-white/5',
    text: 'text-white/20',
  },
} as const;

// ============================================================================
// FIELD CONFIGURATIONS BY VARIANT
// ============================================================================

export const VARIANT_FIELD_CONFIGS = {
  [FORM_VARIANTS.PRODUCT]: {
    fields: ['title', 'slug', 'description', 'product_type', 'price_community', 'price_ally', 'price_corporate', 'residual_percent', 'media', 'is_published'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.PROFILE]: {
    fields: ['display_name', 'username', 'email', 'bio', 'avatar', 'primary_house', 'user_tier'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.SIGNUP]: {
    fields: ['email', 'username', 'password', 'confirm_password', 'accept_terms'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.LG,
  },
  [FORM_VARIANTS.LOGIN]: {
    fields: ['email', 'password', 'remember_me'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.CHECKOUT]: {
    fields: ['email', 'shipping_address', 'billing_address', 'payment_method', 'order_review'],
    layout: FORM_LAYOUTS.WIZARD,
    size: FORM_SIZES.LG,
  },
  [FORM_VARIANTS.CONTACT]: {
    fields: ['name', 'email', 'subject', 'message'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.SUPPORT]: {
    fields: ['category', 'urgency', 'subject', 'message', 'attachments'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.APPLICATION]: {
    fields: ['business_name', 'business_type', 'description', 'website', 'categories', 'experience', 'motivation'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.LG,
  },
  [FORM_VARIANTS.ACID_TEST]: {
    fields: ['responses'],
    layout: FORM_LAYOUTS.WIZARD,
    size: FORM_SIZES.FULL,
  },
  [FORM_VARIANTS.SETTINGS]: {
    fields: ['notifications', 'privacy', 'theme', 'language', 'accessibility'],
    layout: FORM_LAYOUTS.STACKED,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.QUEST]: {
    fields: ['submission_type', 'content', 'attachments'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.EVENT]: {
    fields: ['title', 'description', 'date', 'time', 'location', 'genre', 'price', 'max_attendees'],
    layout: FORM_LAYOUTS.GRID,
    size: FORM_SIZES.LG,
  },
  [FORM_VARIANTS.CHANNEL]: {
    fields: ['name', 'description', 'visibility', 'category'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.MD,
  },
  [FORM_VARIANTS.PROPOSAL]: {
    fields: ['title', 'description', 'category', 'impact', 'implementation', 'duration'],
    layout: FORM_LAYOUTS.VERTICAL,
    size: FORM_SIZES.LG,
  },
  [FORM_VARIANTS.SEARCH]: {
    fields: ['query', 'filters', 'sort'],
    layout: FORM_LAYOUTS.HORIZONTAL,
    size: FORM_SIZES.SM,
  },
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_FORM_VARIANT = FORM_VARIANTS.CONTACT;
export const DEFAULT_FORM_SIZE = FORM_SIZES.MD;
export const DEFAULT_FORM_LAYOUT = FORM_LAYOUTS.VERTICAL;
export const DEFAULT_FIELD_SIZE = 'MD';
export const DEFAULT_VALIDATION_STATE = VALIDATION_STATES.IDLE;

// ============================================================================
// LABEL POSITIONS
// ============================================================================

export const LABEL_POSITIONS = {
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  INSIDE: 'inside',
  FLOATING: 'floating',
  HIDDEN: 'hidden',
  VERTICAL: 'vertical', 
  HORIZONTAL: 'horizontal',
} as const;

// ============================================================================
// HELPER TEXT POSITIONS
// ============================================================================

export const HELPER_POSITIONS = {
  BOTTOM: 'bottom',
  RIGHT: 'right',
  TOOLTIP: 'tooltip',
} as const;