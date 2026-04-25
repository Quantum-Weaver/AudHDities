// src/lib/constants/components/ui/drawer.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DRAWER CONSTANTS                                       ║
// ║                    Single source of truth — sizing, animation, z-index    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Z-Index ────────────────────────────────────────────────────────────────
export const DRAWER_Z_INDEX = 'z-50';

// ─── Backdrop ───────────────────────────────────────────────────────────────
export const DRAWER_BACKDROP_BG = 'bg-black/80';
export const DRAWER_BACKDROP_BLUR = 'backdrop-blur-sm';

// ─── Panel ──────────────────────────────────────────────────────────────────
export const DRAWER_PANEL_BG = 'bg-surface';
export const DRAWER_BORDER_COLOR = 'border-white/10';
export const DRAWER_SHADOW = 'shadow-2xl';

// ─── Transition ─────────────────────────────────────────────────────────────
export const DRAWER_TRANSITION_DURATION = 'duration-300';
export const DRAWER_TRANSITION_EASING = 'ease-out';
export const DRAWER_BACKDROP_TRANSITION = 'duration-200';

// ─── Sizing ─────────────────────────────────────────────────────────────────
/** Width/height classes per side and size */
export const DRAWER_SIZE_CLASSES = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  top: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    full: 'h-full',
  },
} as const;

// ─── Animation ──────────────────────────────────────────────────────────────
/** Animation translate classes per side */
export const DRAWER_ANIMATION_CLASSES = {
  left: {
    enter: 'translate-x-0',
    exit: '-translate-x-full',
  },
  right: {
    enter: 'translate-x-0',
    exit: 'translate-x-full',
  },
  top: {
    enter: 'translate-y-0',
    exit: '-translate-y-full',
  },
  bottom: {
    enter: 'translate-y-0',
    exit: 'translate-y-full',
  },
} as const;

// ─── Position Classes ───────────────────────────────────────────────────────
/** Position classes per side */
export const DRAWER_POSITION_CLASSES = {
  left: 'left-0 top-0 bottom-0',
  right: 'right-0 top-0 bottom-0',
  top: 'top-0 left-0 right-0',
  bottom: 'bottom-0 left-0 right-0',
} as const;

// ─── Border Classes ─────────────────────────────────────────────────────────
/** Border side per drawer side */
export const DRAWER_BORDER_CLASSES = {
  left: 'border-r',
  right: 'border-l',
  top: 'border-b',
  bottom: 'border-t',
} as const;

// ─── Header ─────────────────────────────────────────────────────────────────
export const DRAWER_HEADER_PADDING = 'p-4';
export const DRAWER_HEADER_BORDER = 'border-b';
export const DRAWER_TITLE_SIZE = 'text-lg';
export const DRAWER_TITLE_WEIGHT = 'font-semibold';
export const DRAWER_DESCRIPTION_SIZE = 'text-sm';
export const DRAWER_DESCRIPTION_COLOR = 'text-white/60';
export const DRAWER_DESCRIPTION_MARGIN_TOP = 'mt-1';

// ─── Close Button ───────────────────────────────────────────────────────────
export const DRAWER_CLOSE_BUTTON_PADDING = 'p-1';
export const DRAWER_CLOSE_BUTTON_RADIUS = 'rounded-full';
export const DRAWER_CLOSE_BUTTON_COLOR = 'text-white/40';
export const DRAWER_CLOSE_BUTTON_HOVER_COLOR = 'text-white/80';
export const DRAWER_CLOSE_BUTTON_HOVER_BG = 'hover:bg-white/10';
export const DRAWER_CLOSE_ICON_SIZE = 'h-5 w-5';

// ─── Body ───────────────────────────────────────────────────────────────────
export const DRAWER_BODY_PADDING = 'p-4';

// ─── Footer ─────────────────────────────────────────────────────────────────
export const DRAWER_FOOTER_PADDING = 'p-4';
export const DRAWER_FOOTER_BORDER = 'border-t';
export const DRAWER_FOOTER_GAP = 'gap-3';

// ─── Animation Exit Delay ───────────────────────────────────────────────────
/** Delay before removing from DOM after close (ms) — must match transition duration */
export const DRAWER_EXIT_ANIMATION_DELAY = 300;

// ─── Filter Drawer ──────────────────────────────────────────────────────────
export const DRAWER_FILTER_BUTTON_RESET_COLOR = 'text-white/60';
export const DRAWER_FILTER_BUTTON_RESET_HOVER = 'hover:text-white/80';
export const DRAWER_FILTER_BUTTON_RESET_PADDING_X = 'px-4';
export const DRAWER_FILTER_BUTTON_RESET_PADDING_Y = 'py-2';
export const DRAWER_FILTER_BUTTON_RESET_RADIUS = 'rounded-lg';
export const DRAWER_FILTER_BUTTON_RESET_SIZE = 'text-sm';
export const DRAWER_FILTER_BUTTON_RESET_WEIGHT = 'font-medium';

export const DRAWER_FILTER_BUTTON_APPLY_BG = 'bg-cyan-500/20';
export const DRAWER_FILTER_BUTTON_APPLY_HOVER_BG = 'hover:bg-cyan-500/30';
export const DRAWER_FILTER_BUTTON_APPLY_COLOR = 'text-cyan-400';
export const DRAWER_FILTER_BUTTON_APPLY_PADDING_X = 'px-4';
export const DRAWER_FILTER_BUTTON_APPLY_PADDING_Y = 'py-2';
export const DRAWER_FILTER_BUTTON_APPLY_RADIUS = 'rounded-lg';
export const DRAWER_FILTER_BUTTON_APPLY_SIZE = 'text-sm';
export const DRAWER_FILTER_BUTTON_APPLY_WEIGHT = 'font-medium';