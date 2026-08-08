// src/types/components/yggdrasil/label.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LABEL TYPES                                            ║
// ║                    All type definitions for the Label component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { LabelVariant, LabelSize } from '@/lib/constants/components/yggdrasil/label.variants';

// ─── Re-exports from variants ──────────────────────────────────────────────
export type { LabelVariant, LabelSize };

// ─── Component Props ───────────────────────────────────────────────────────
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Size of the label */
  size?: LabelSize;
  /** Show required indicator (*) */
  required?: boolean;
  /** Show optional indicator text */
  optional?: boolean;
  /** Error state (changes text color to fire-base) */
  error?: boolean;
  /** Disabled state (applies opacity reduction) */
  disabled?: boolean;
}