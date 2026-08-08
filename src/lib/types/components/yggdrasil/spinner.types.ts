// src/types/components/yggdrasil/spinner.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPINNER TYPES                                          ║
// ║                    All type definitions for the Spinner component         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SpinnerSize,
  SpinnerType,
  SpinnerSpeed,
} from '@/lib/constants/components/yggdrasil/spinner.constants';
import type {
  SpinnerVariant,
} from '@/lib/constants/components/yggdrasil/spinner.variants';

// ─── Re-exports from constants/variants ────────────────────────────────────
export type { SpinnerSize, SpinnerType, SpinnerSpeed, SpinnerVariant };

// ─── Component Props ───────────────────────────────────────────────────────
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: SpinnerSize;

  /** Color variant */
  variant?: SpinnerVariant;

  /** Optional label for screen readers */
  label?: string;

  /** Show as overlay (centered in parent) */
  overlay?: boolean;

  /** Animation speed */
  speed?: SpinnerSpeed;

  /** Type of spinner */
  type?: SpinnerType;

  /** Show as full page loader */
  fullPage?: boolean;
}