// src/lib/constants/components/ui/searchbar.constant.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SEARCHBAR CONSTANTS                                    ║
// ║                    Single source of truth — no magic values               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Default Text ──────────────────────────────────────────────────────────
export const SEARCHBAR_DEFAULT_PLACEHOLDER = 'Search...' as const;

// ─── Debounce ──────────────────────────────────────────────────────────────
/** Default debounce delay before firing onSearch (aligns with durations.normal) */
export const SEARCHBAR_DEFAULT_DEBOUNCE_MS = durations.normal;

// ─── Sizing ────────────────────────────────────────────────────────────────
/** Height of the loading spinner */
export const SEARCHBAR_SPINNER_SIZE = 'w-4 h-4';

/** Right padding on input to accommodate action buttons */
export const SEARCHBAR_INPUT_RIGHT_PADDING = 'pr-20';

// ─── Positioning ───────────────────────────────────────────────────────────
/** Action button container positioning */
export const SEARCHBAR_ACTIONS_POSITION = {
  CONTAINER: 'absolute right-2 top-1/2 -translate-y-1/2',
  GAP: 'gap-1',
} as const;

// ─── Spinner ───────────────────────────────────────────────────────────────
/** Loading spinner appearance */
export const SEARCHBAR_SPINNER_CLASSES = [
  'border-2',
  'border-neurospark',
  'border-t-transparent',
  'rounded-full',
  'animate-spin',
] as const;

// ─── Clear Button ──────────────────────────────────────────────────────────
export const SEARCHBAR_CLEAR_LABEL = '✕' as const;
export const SEARCHBAR_CLEAR_ARIA_LABEL = 'Clear search' as const;