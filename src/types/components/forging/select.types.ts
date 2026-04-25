// src/types/components/forging/select.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SELECT TYPES                                           ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SelectSize,
} from '@/lib/constants/components/forging/select.constants';
import type {
  SelectVariant,
  SelectSizeVariant,
} from '@/lib/constants/components/forging/select.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { SelectSize, SelectVariant, SelectSizeVariant };

// ─── Select Option ─────────────────────────────────────────────────────────
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ─── Select Props ──────────────────────────────────────────────────────────
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text displayed above the select */
  label?: string;
  /** Error message displayed below the select */
  error?: string;
  /** Helper text displayed below the select when no error */
  helper?: string;
  /** Size variant */
  selectSize?: SelectSize;
  /** Options array */
  options?: SelectOption[];
  /** Placeholder option text */
  placeholder?: string;
  /** Show required indicator (*) */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Stretch to full width of container */
  fullWidth?: boolean;
  /** Visual variant */
  variant?: SelectVariant;
  /** Use native browser rendering */
  native?: boolean;
}