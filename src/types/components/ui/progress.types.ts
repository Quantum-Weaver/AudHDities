// src/types/components/ui/progress.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PROGRESS TYPES                                         ║
// ║                    All type definitions for the Progress component        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  ProgressVariant,
  ProgressSize,
  ProgressLabelPosition,
} from '@/lib/constants/components/ui/progress.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { ProgressVariant, ProgressSize, ProgressLabelPosition };

// ─── Linear Progress ────────────────────────────────────────────────────────
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: ProgressLabelPosition;
  /** Animate the progress bar */
  animated?: boolean;
  /** Show striped pattern */
  striped?: boolean;
  /** Indeterminate state (loading) */
  indeterminate?: boolean;
}

// ─── Circular Progress ──────────────────────────────────────────────────────
export interface CircularProgressProps
  extends React.SVGAttributes<SVGSVGElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Size of the circle in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Show percentage label inside */
  showLabel?: boolean;
  /** Label format function */
  formatLabel?: (value: number) => string;
}