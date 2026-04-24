// src/types/components/ui/form.types.ts
// Pure types only - no values, no logic
// ALIGNED WITH constants/unified_form.ts

import type { ReactNode } from 'react';
import type { 
  FORM_VARIANTS,
  FORM_SPACING,
  FORM_SIZES,
  FORM_LAYOUTS,
  INPUT_VARIANTS,
  VALIDATION_STATES,
  LABEL_POSITIONS,
  HELPER_POSITIONS,
  WIZARD_STEP_STATUS,
} from '@/lib/constants/components/ui/form.variants';

// =====================================================
// CORE TYPE ALIASES
// =====================================================

export type FormVariant = typeof FORM_VARIANTS[keyof typeof FORM_VARIANTS];
export type FormSize = typeof FORM_SIZES[keyof typeof FORM_SIZES];
export type FormSpacing = typeof FORM_SPACING[keyof typeof FORM_SPACING];
export type FormLayout = typeof FORM_LAYOUTS[keyof typeof FORM_LAYOUTS];
export type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];
export type ValidationState = typeof VALIDATION_STATES[keyof typeof VALIDATION_STATES];
export type LabelPosition = typeof LABEL_POSITIONS[keyof typeof LABEL_POSITIONS];
export type HelperPosition = typeof HELPER_POSITIONS[keyof typeof HELPER_POSITIONS];
export type WizardStepStatus = typeof WIZARD_STEP_STATUS[keyof typeof WIZARD_STEP_STATUS];

// =====================================================
// FIELD VALUE TYPES
// =====================================================

export type FieldValue = 
  | string 
  | number 
  | boolean 
  | Date 
  | File 
  | File[]
  | string[] 
  | null 
  | undefined;

export interface FieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}

// =====================================================
// VALIDATION RESULT
// =====================================================

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  touched: Record<string, boolean>;
}

// =====================================================
// FIELD CONFIGURATION
// =====================================================

export interface FieldConfig {
  name: string;
  type: InputVariant;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  defaultValue?: FieldValue;
  options?: FieldOption[];
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  accept?: string;
  multiple?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  labelPosition?: LabelPosition;
  helperPosition?: HelperPosition;
  validation?: (value: FieldValue) => string | null;
  asyncValidation?: (value: FieldValue) => Promise<string | null>;
  dependencies?: string[];
  condition?: (values: Record<string, FieldValue>) => boolean;
}

// =====================================================
// SECTION CONFIGURATION
// =====================================================

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  fields: FieldConfig[];
  collapsible?: boolean;
  collapsed?: boolean;
  condition?: (values: Record<string, FieldValue>) => boolean;
}

// =====================================================
// WIZARD STEP
// =====================================================

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
  status?: WizardStepStatus;
  canGoNext?: (values: Record<string, FieldValue>) => boolean;
  onEnter?: () => void;
  onExit?: () => void;
}

// =====================================================
// FORM ACTION
// =====================================================

export interface FormAction {
  label: string;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  onClick?: (values: Record<string, FieldValue>) => void;
  disabled?: boolean;
  loading?: boolean;
  condition?: (values: Record<string, FieldValue>) => boolean;
}

// =====================================================
// FORM PROPS
// =====================================================

export interface UnifiedFormProps {
  /** Form variant (product, profile, signup, etc.) */
  variant: FormVariant;
  /** Form size */
  size?: FormSize;
  /** Form layout */
  layout?: FormLayout;
  /** Initial form values */
  initialValues?: Record<string, FieldValue>;
  /** Form sections (for custom layouts) */
  sections?: FormSection[];
  /** Wizard steps (for multi-step forms) */
  steps?: WizardStep[];
  /** Submit handler */
  onSubmit: (values: Record<string, FieldValue>) => void | Promise<void>;
  /** Cancel handler */
  onCancel?: () => void;
  /** Change handler */
  onChange?: (values: Record<string, FieldValue>) => void;
  /** Validation mode */
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit';
  /** Custom actions */
  actions?: FormAction[];
  /** Submit button text */
  submitLabel?: string;
  /** Cancel button text */
  cancelLabel?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Readonly mode */
  readonly?: boolean;
  /** Disabled mode */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Children (custom content) */
  children?: ReactNode;
}

// =====================================================
// FIELD PROPS
// =====================================================

export interface FieldProps {
  config: FieldConfig;
  value: FieldValue;
  error?: string;
  warning?: string;
  touched?: boolean;
  onChange: (value: FieldValue) => void;
  onBlur?: () => void;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

// =====================================================
// FORM CONTEXT VALUE
// =====================================================

export interface FormContextValue {
  values: Record<string, FieldValue>;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  setFieldValue: (name: string, value: FieldValue) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setFieldError: (name: string, error: string) => void;
  validateField: (name: string) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

// =====================================================
// FIELD REGISTRY
// =====================================================

export interface FieldRegistryEntry {
  component: React.ComponentType<FieldProps>;
  defaultProps?: Partial<FieldProps>;
  supportedTypes: InputVariant[];
}

// =====================================================
// VALIDATOR FUNCTION TYPES
// =====================================================

export type ValidatorFn = (value: FieldValue, allValues?: Record<string, FieldValue>) => string | null;
export type AsyncValidatorFn = (value: FieldValue, allValues?: Record<string, FieldValue>) => Promise<string | null>;

// =====================================================
// COMMON VALIDATORS (type definitions only)
// =====================================================

export interface Validators {
  required: (message?: string) => ValidatorFn;
  email: (message?: string) => ValidatorFn;
  minLength: (length: number, message?: string) => ValidatorFn;
  maxLength: (length: number, message?: string) => ValidatorFn;
  min: (min: number, message?: string) => ValidatorFn;
  max: (max: number, message?: string) => ValidatorFn;
  pattern: (regex: RegExp, message?: string) => ValidatorFn;
  url: (message?: string) => ValidatorFn;
  phone: (message?: string) => ValidatorFn;
  match: (field: string, message?: string) => ValidatorFn;
  unique: (getExisting: (value: string) => Promise<boolean>, message?: string) => AsyncValidatorFn;
}

// =====================================================
// FORM RESULT
// =====================================================

export interface FormResult {
  success: boolean;
  data?: Record<string, FieldValue>;
  errors?: Record<string, string>;
  message?: string;
}