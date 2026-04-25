// src/types/components/ui/input.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INPUT TYPES                                            ║
// ║                    All type definitions for the Input component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  InputVariant,
  InputSize,
} from '@/lib/constants/components/ui/input.variants';

// ─── Re-exports from variants ──────────────────────────────────────────────
export type { InputVariant, InputSize };

// ─── Component Props ───────────────────────────────────────────────────────
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input (hidden when error is present) */
  helper?: string;
  /** Size variant — controls height and padding */
  inputSize?: InputSize;
  /** Visual variant — controls border and focus styles */
  variant?: InputVariant;
  /** Show required asterisk indicator */
  required?: boolean;
  /** Show optional text indicator */
  optional?: boolean;
  /** Icon element positioned on the left side */
  leftIcon?: React.ReactNode;
  /** Icon element positioned on the right side */
  rightIcon?: React.ReactNode;
  /** Whether the input stretches to full width of its container */
  fullWidth?: boolean;
}