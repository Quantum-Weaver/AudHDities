// src/lib/constants/components/runes/avatar.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AVATAR CONSTANTS                                       ║
// ║                    Single source of truth — sizing, status, positioning   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Size Mapping (Tailwind classes) ────────────────────────────────────────
/** Avatar container size classes mapped to size keys */
export const AVATAR_SIZE_CLASSES = {
  xs: 'size-6',      // 24px
  sm: 'size-8',      // 32px
  default: 'size-10', // 40px
  lg: 'size-12',     // 48px
  xl: 'size-14',     // 56px
  '2xl': 'size-16',  // 64px
  '3xl': 'size-20',  // 80px
  '4xl': 'size-24',  // 96px
} as const;

// ─── Status Indicator Sizes ─────────────────────────────────────────────────
/** Status dot size classes per avatar size */
export const AVATAR_STATUS_SIZE_CLASSES = {
  xs: 'size-1.5',
  sm: 'size-2',
  default: 'size-2.5',
  lg: 'size-3',
  xl: 'size-3.5',
  '2xl': 'size-4',
  '3xl': 'size-5',
  '4xl': 'size-6',
} as const;

// ─── Ring ───────────────────────────────────────────────────────────────────
export const AVATAR_RING_WIDTH = 'ring-2';
export const AVATAR_RING_OFFSET = 'ring-offset-2';

// ─── Base Classes ───────────────────────────────────────────────────────────
export const AVATAR_BASE_CLASSES = [
  'group/avatar',
  'relative',
  'flex',
  'shrink-0',
  'select-none',
  'rounded-full',
] as const;

export const AVATAR_IMAGE_BASE_CLASSES = [
  'aspect-square',
  'size-full',
  'rounded-full',
  'object-cover',
] as const;

// ─── Fallback ───────────────────────────────────────────────────────────────
export const AVATAR_FALLBACK_BASE_CLASSES = [
  'flex',
  'size-full',
  'items-center',
  'justify-center',
  'rounded-full',
] as const;

export const AVATAR_FALLBACK_GRADIENT = 'bg-gradient-to-br from-white/10 to-white/5';
export const AVATAR_FALLBACK_TEXT_COLOR = 'text-star-dust/60';
export const AVATAR_FALLBACK_TEXT_SIZE = 'text-sm';
export const AVATAR_FALLBACK_TEXT_WEIGHT = 'font-medium';
export const AVATAR_FALLBACK_DEFAULT_DELAY_MS = 600;

/** Fallback font sizes keyed to parent avatar group-data size attribute */
export const AVATAR_FALLBACK_FONT_SIZE_MAP: Record<string, string> = {
  xs: 'text-[8px]',
  sm: 'text-[10px]',
  default: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
  '3xl': 'text-2xl',
  '4xl': 'text-3xl',
};

// ─── Badge ──────────────────────────────────────────────────────────────────
export const AVATAR_BADGE_BASE_CLASSES = [
  'absolute',
  'z-10',
  'flex',
  'items-center',
  'justify-center',
  'rounded-full',
] as const;

export const AVATAR_BADGE_GRADIENT = 'bg-gradient-to-br from-cyan-500 to-purple-500';
export const AVATAR_BADGE_TEXT_COLOR = 'text-star-dust';

/** Badge position classes */
export const AVATAR_BADGE_POSITION_CLASSES = {
  'bottom-right': 'right-0 bottom-0',
  'top-right': 'right-0 top-0',
  'bottom-left': 'left-0 bottom-0',
  'top-left': 'left-0 top-0',
} as const;

/** Badge size classes keyed to parent avatar size */
export const AVATAR_BADGE_SIZE_MAP: Record<string, string> = {
  xs: 'size-2.5',
  sm: 'size-3',
  default: 'size-3.5',
  lg: 'size-4',
  xl: 'size-5',
  '2xl': 'size-6',
  '3xl': 'size-7',
  '4xl': 'size-8',
};

/** Badge font sizes keyed to parent avatar size */
export const AVATAR_BADGE_FONT_SIZE_MAP: Record<string, string> = {
  xs: 'text-[6px]',
  sm: 'text-[8px]',
  default: 'text-[8px]',
  lg: 'text-[10px]',
  xl: 'text-xs',
  '2xl': 'text-sm',
  '3xl': 'text-base',
  '4xl': 'text-lg',
};

// ─── Group ──────────────────────────────────────────────────────────────────
export const AVATAR_GROUP_SPACING = '-space-x-2';
export const AVATAR_GROUP_HOVER_TRANSLATE = 'translate-y-[-2px]';
export const AVATAR_GROUP_REMAINING_BG = 'bg-gradient-to-br from-white/20 to-white/10';
export const AVATAR_GROUP_REMAINING_TEXT = 'text-star-dust/80';

// ─── Interactive ────────────────────────────────────────────────────────────
export const AVATAR_INTERACTIVE_TRANSITION = 'transition-all duration-200';
export const AVATAR_INTERACTIVE_HOVER_SCALE = 'hover:scale-105';
export const AVATAR_INTERACTIVE_CURSOR = 'cursor-pointer';

// ─── Glow ───────────────────────────────────────────────────────────────────
export const AVATAR_GLOW_SHADOW = 'shadow-[0_0_15px_currentColor]';