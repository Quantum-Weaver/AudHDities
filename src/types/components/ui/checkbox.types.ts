// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CHECKBOX TYPES                                         ║
// ║                    All type definitions for the Checkbox component         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  CheckboxVariant,
  CheckboxSizeVariant,
} from '@/lib/constants/components/ui/checkbox.variants';
import type { CheckboxSize } from '@/lib/constants/components/ui/checkbox.constants';

// ─── Re-exports from constants/variants ────────────────────────────────────
export type { CheckboxVariant, CheckboxSizeVariant, CheckboxSize };

// ─── Checkbox Props ────────────────────────────────────────────────────────
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error message displayed below the checkbox */
  error?: string;
  /** Helper text displayed below the checkbox when no error */
  helper?: string;
  /** Visual variant */
  variant?: CheckboxVariant;
  /** Size preset */
  size?: CheckboxSize;
}

// ─── Checkbox Group Props ──────────────────────────────────────────────────
export interface CheckboxGroupProps {
  /** Array of checkbox options */
  options: Array<{
    value: string;
    label: string;
    helper?: string;
    disabled?: boolean;
  }>;
  /** Currently selected values */
  value?: string[];
  /** Change handler */
  onChange?: (values: string[]) => void;
  /** Visual variant applied to all checkboxes */
  variant?: CheckboxVariant;
  /** Size preset applied to all checkboxes */
  size?: CheckboxSize;
  /** Error message for the group */
  error?: string;
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Additional class name */
  className?: string;
}