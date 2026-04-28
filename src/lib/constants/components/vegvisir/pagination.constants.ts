// src/lib/constants/components/vegvisir/pagination.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PAGINATION CONSTANTS                                   ║
// ║                    Single source of truth — sizing, defaults, tokens      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Button Sizing ─────────────────────────────────────────────────────────
export const PAGINATION_BUTTON_SIZE = {
  SM: {
    height: 'h-7',
    width: 'w-7',
    textSize: 'text-xs',
  },
  MD: {
    height: 'h-8',
    width: 'w-8',
    textSize: 'text-sm',
  },
  LG: {
    height: 'h-9',
    width: 'w-9',
    textSize: 'text-base',
  },
} as const;

// ─── Icon Sizing ───────────────────────────────────────────────────────────
export const PAGINATION_ICON_SIZE = {
  CHEVRON: 'h-4 w-4',
} as const;

// ─── Defaults ──────────────────────────────────────────────────────────────
export const PAGINATION_DEFAULT_SIBLING_COUNT = 1;
export const PAGINATION_DEFAULT_PAGE_SIZES = [10, 20, 50, 100] as const;
export const PAGINATION_DEFAULT_PAGE_SIZE = 20;

// ─── Page Size Selector ────────────────────────────────────────────────────
export const PAGINATION_SELECT_PADDING = {
  X: 'px-2',
  Y: 'py-1',
} as const;

// ─── Container Spacing ─────────────────────────────────────────────────────
export const PAGINATION_CONTAINER_GAP = 'gap-4';
export const PAGINATION_BUTTON_GAP = 'gap-1';
export const PAGINATION_SELECT_GAP = 'gap-2';

// ─── Type Exports ──────────────────────────────────────────────────────────
// In pagination.constants.ts, add:
export const PAGINATION_SIZE_VALUES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type PaginationSize = (typeof PAGINATION_SIZE_VALUES)[keyof typeof PAGINATION_SIZE_VALUES];

// Create a reverse lookup for the config access:
export const SIZE_KEY_MAP: Record<PaginationSize, keyof typeof PAGINATION_BUTTON_SIZE> = {
  sm: 'SM',
  md: 'MD',
  lg: 'LG',
};