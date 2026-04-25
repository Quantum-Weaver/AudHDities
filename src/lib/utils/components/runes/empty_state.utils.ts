// src/lib/utils/components/runes/empty_state.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    EMPTY STATE UTILITIES                                  ║
// ║                    Pure logic — icon mapping, action resolution, layout   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  EmptyStateVariant,
  EmptyStateLayout,
} from '@/types/components/runes/empty_state.types';

import { EMPTY_STATE_VARIANTS } from '@/lib/constants/components/runes/empty_state.variants';

// ─── Icon Mapping ──────────────────────────────────────────────────────────

/**
 * Maps empty state variants to recommended icon color classes.
 * Useful when the icon is a string-based icon (like an emoji or SVG sprite)
 * rather than a React component that inherits color.
 */
const VARIANT_ICON_COLOR_MAP: Record<EmptyStateVariant, string> = {
  [EMPTY_STATE_VARIANTS.DEFAULT]: 'text-white/40',
  [EMPTY_STATE_VARIANTS.QUANTUM]: 'text-quantum-purple/50',
  [EMPTY_STATE_VARIANTS.COSMIC]: 'text-cosmic-blue/50',
  [EMPTY_STATE_VARIANTS.SANCTUARY]: 'text-sanctuary-green/50',
} as const;

/**
 * Get the recommended icon color class for a variant.
 */
export function getEmptyStateIconColor(
  variant: EmptyStateVariant
): string {
  return VARIANT_ICON_COLOR_MAP[variant];
}

// ─── Action Button Mapping ─────────────────────────────────────────────────

/**
 * Maps empty state variants to the recommended action button variant.
 * Default empty states use a secondary button (subtle).
 * Themed empty states use ghost to keep focus on the message, not the action.
 */
const ACTION_BUTTON_VARIANT_MAP: Record<
  EmptyStateVariant,
  'secondary' | 'ghost'
> = {
  [EMPTY_STATE_VARIANTS.DEFAULT]: 'secondary',
  [EMPTY_STATE_VARIANTS.QUANTUM]: 'ghost',
  [EMPTY_STATE_VARIANTS.COSMIC]: 'ghost',
  [EMPTY_STATE_VARIANTS.SANCTUARY]: 'ghost',
} as const;

/**
 * Resolve which button variant to use for the call-to-action
 * based on the empty state's visual variant.
 */
export function resolveActionButtonVariant(
  variant: EmptyStateVariant
): 'secondary' | 'ghost' {
  return ACTION_BUTTON_VARIANT_MAP[variant];
}

// ─── Layout Utilities ──────────────────────────────────────────────────────

/**
 * Composes layout-specific class modifiers for the empty state container.
 * Returns Tailwind classes that modify the base centered layout
 * when the horizontal layout is selected.
 */
export function getLayoutClasses(layout: EmptyStateLayout): {
  container: string;
  iconWrapper: string;
  contentWrapper: string;
} {
  if (layout === 'horizontal') {
    return {
      container: 'flex items-center justify-center gap-4 text-left',
      iconWrapper: 'mb-0 flex-shrink-0',
      contentWrapper: 'flex flex-col',
    };
  }

  return {
    container: '',
    iconWrapper: '',
    contentWrapper: '',
  };
}

// ─── Default Content ───────────────────────────────────────────────────────

/**
 * Default messages for common empty state scenarios.
 * These provide sensible fallbacks when no custom content is supplied.
 */
export const EMPTY_STATE_DEFAULTS = {
  /** Used when a search returns no results */
  SEARCH: {
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
  },
  /** Used when a list or collection is empty */
  EMPTY_LIST: {
    title: 'Nothing here yet',
    description: 'Items will appear once they are created or added.',
  },
  /** Used when a view requires data that hasn't loaded */
  NO_DATA: {
    title: 'No data available',
    description: 'Check back later or refresh the page.',
  },
  /** Used when a feature requires authentication */
  UNAUTHORIZED: {
    title: 'Sign in to continue',
    description: 'This content is available to authenticated users.',
  },
} as const;

/**
 * Get default title and description for a common empty state scenario.
 */
export function getDefaultEmptyStateContent(
  scenario: keyof typeof EMPTY_STATE_DEFAULTS
): { title: string; description: string } {
  return { ...EMPTY_STATE_DEFAULTS[scenario] };
}

// ─── Conditional Rendering ─────────────────────────────────────────────────

/**
 * Determines whether the empty state should show at all.
 * Returns false only when data is loading (we don't want to flash
 * the empty state before data arrives).
 */
export function shouldShowEmptyState(params: {
  isLoading: boolean;
  itemCount: number;
  hasError: boolean;
}): boolean {
  if (params.isLoading) return false;
  if (params.hasError) return false;
  return params.itemCount === 0;
}