// src/types/components/forging/switch.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SWITCH TYPES                                           ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SwitchSize,
  SwitchVariant,
} from '@/lib/constants/components/forging/switch.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { SwitchSize, SwitchVariant };

// ─── Switch Props ──────────────────────────────────────────────────────────
export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Controlled checked state */
  checked?: boolean;
  /** Default unchecked state */
  defaultChecked?: boolean;
  /** Callback when checked changes */
  onChange?: (checked: boolean) => void;
  /** Label text displayed next to the switch */
  label?: string;
  /** Visual size */
  size?: SwitchSize;
  /** Visual variant */
  variant?: SwitchVariant;
  /** Error message (displays below label) */
  error?: string;
  /** Helper text (displays below label when no error) */
  helper?: string;
}