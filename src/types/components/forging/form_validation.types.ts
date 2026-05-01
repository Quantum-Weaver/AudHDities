// src/types/components/forging/form_validation.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM VALIDATION TYPES                                  ║
// ║                    All type definitions for the FormValidation component  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ValidationStatus } from '@/lib/constants/components/forging/form_validation.variants';
import type { InputProps } from '@/types/components/forging/input.types';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { ValidationStatus };

// ─── Validation Results ────────────────────────────────────────────────────
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// ─── Validator ─────────────────────────────────────────────────────────────
export type ValidatorFunction<T = any> = (
  value: T,
  allValues?: Record<string, any>
) => string | null;

export interface FieldValidator {
  field: string;
  validate: ValidatorFunction;
}

// ─── Context ───────────────────────────────────────────────────────────────
export interface FormValidationContextValue {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValidating: Record<string, boolean>;
  registerField: (name: string, validator?: ValidatorFunction) => void;
  unregisterField: (name: string) => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value?: any) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  isValid: boolean;
}

// ─── Provider Props ────────────────────────────────────────────────────────
export interface FormValidationProviderProps {
  /** Initial form values */
  initialValues?: Record<string, any>;
  /** Field validators */
  validators?: FieldValidator[];
  /** Validate on change */
  validateOnChange?: boolean;
  /** Validate on blur */
  validateOnBlur?: boolean;
  /** Children */
  children: React.ReactNode;
  /** Callback when form becomes valid */
  onValid?: () => void;
  /** Callback when form becomes invalid */
  onInvalid?: () => void;
}

// ─── Validated Input ───────────────────────────────────────────────────────
export interface ValidatedInputProps
  extends Omit<InputProps, 'error' | 'onChange' | 'onBlur'> {
  /** Field name */
  name: string;
  /** Custom validator */
  validate?: ValidatorFunction;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Validate on change */
  validateOnChange?: boolean;
  /** Validate on blur */
  validateOnBlur?: boolean;
}

// ─── Summary Props ─────────────────────────────────────────────────────────
export interface ValidationSummaryProps {
  /** Title of the summary */
  title?: string;
  /** Visual variant */
  variant?: 'error' | 'warning' | 'info';
  /** Custom className */
  className?: string;
}

// ─── Success Props ─────────────────────────────────────────────────────────
export interface ValidationSuccessProps {
  /** Success message */
  message: string;
  /** Custom className */
  className?: string;
}