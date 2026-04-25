// src/types/components/ui/form.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM TYPES                                             ║
// ║                    All type definitions for the Form component            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  FormLayout,
  FormSpacing,
  FormActionsAlign,
} from '@/lib/constants/components/ui/form.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { FormLayout, FormSpacing, FormActionsAlign };

// ─── Context ───────────────────────────────────────────────────────────────
export interface FormContextValue {
  layout: FormLayout;
  spacing: FormSpacing;
  disabled: boolean;
  readOnly: boolean;
  formId: string;
}

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Layout orientation of form fields */
  layout?: FormLayout;
  /** Spacing between form fields */
  spacing?: FormSpacing;
  /** Disable all form fields */
  disabled?: boolean;
  /** Make all form fields read-only */
  readOnly?: boolean;
  /** Submit handler */
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  /** Validation function */
  validate?: (data: Record<string, any>) => Record<string, string>;
  /** Children */
  children: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

// ─── Form Actions Props ────────────────────────────────────────────────────
export interface FormActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Align the action buttons */
  align?: FormActionsAlign;
  /** Space between buttons */
  spacing?: FormSpacing;
}