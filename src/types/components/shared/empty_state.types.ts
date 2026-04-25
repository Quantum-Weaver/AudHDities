// src/types/components/shared/empty_state.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    EMPTY STATE TYPES                                      ║
// ║                    All type definitions for the EmptyState component      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { EmptyStateSize } from '@/lib/constants/components/shared/empty_state.constants';
import type { EmptyStateVariant } from '@/lib/constants/components/shared/empty_state.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { EmptyStateSize, EmptyStateVariant };

// ─── Layout ────────────────────────────────────────────────────────────────
export type EmptyStateLayout = 'centered' | 'horizontal';

// ─── Main Props ────────────────────────────────────────────────────────────
export interface EmptyStateProps {
  /** Primary message displayed as the heading */
  title: string;
  /** Secondary message providing more context */
  description?: string;
  /** Icon element rendered above the title (or inline if horizontal layout) */
  icon?: React.ReactNode;
  /** Label for the call-to-action button */
  actionLabel?: string;
  /** Callback fired when the action button is clicked */
  onAction?: () => void;
  /** Additional CSS classes appended to the container */
  className?: string;
  /** Controls overall size: compact, default, or spacious */
  size?: EmptyStateSize;
  /** Visual mood variant */
  variant?: EmptyStateVariant;
  /** Layout direction: centered (stacked) or horizontal (icon inline) */
  layout?: EmptyStateLayout;
}