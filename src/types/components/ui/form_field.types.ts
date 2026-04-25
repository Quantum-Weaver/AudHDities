// src/types/components/ui/form_field.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM FIELD TYPES                                       ║
// ║                    All type definitions for the FormField component       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  FormFieldSize,
  FormFieldLayout,
} from '@/lib/constants/components/ui/form_field.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { FormFieldSize, FormFieldLayout };

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface FormFieldProps {
  /** ID of the form field (should match input id) */
  id?: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text (shown when no error) */
  helper?: string;
  /** Size of the field */
  size?: FormFieldSize;
  /** Layout orientation */
  layout?: FormFieldLayout;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** The form input/control */
  children: React.ReactNode;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the label */
  labelClassName?: string;
  /** Additional className for the content wrapper */
  contentClassName?: string;
  /** Full width */
  fullWidth?: boolean;
}