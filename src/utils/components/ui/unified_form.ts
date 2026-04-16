// src/utils/components/ui/unified_form.ts
// Pure logic only - no values, no side effects
// ALIGNED WITH constants and types

import type { 
  FieldValue, 
  FieldConfig, 
  ValidationResult,
  ValidatorFn,
  AsyncValidatorFn,
  FormSection,
  WizardStep,
  FormVariant,
} from '@/types/components/ui/unified_form';

import {
  FORM_VARIANTS,
  VALIDATION_STATES,
  VARIANT_FIELD_CONFIGS,
} from '@/lib/constants/components/ui/unified_form';

// =====================================================
// VALUE HELPERS
// =====================================================

export function isEmpty(value: FieldValue): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof File) return false;
  return false;
}

export function isFileValue(value: FieldValue): value is File {
  return value instanceof File;
}

export function isFileArrayValue(value: FieldValue): value is File[] {
  return Array.isArray(value) && value.every(v => v instanceof File);
}

// =====================================================
// VALIDATION HELPERS
// =====================================================

export function getValidationState(
  error?: string, 
  warning?: string, 
  isValidating?: boolean
): string {
  if (isValidating) return VALIDATION_STATES.VALIDATING;
  if (error) return VALIDATION_STATES.INVALID;
  if (warning) return VALIDATION_STATES.WARNING;
  if (error === undefined && warning === undefined) return VALIDATION_STATES.IDLE;
  return VALIDATION_STATES.VALID;
}

export function hasErrors(validation: ValidationResult): boolean {
  return Object.keys(validation.errors).length > 0;
}

export function hasWarnings(validation: ValidationResult): boolean {
  return Object.keys(validation.warnings).length > 0;
}

export function isValid(validation: ValidationResult): boolean {
  return validation.valid && !hasErrors(validation);
}

// =====================================================
// FIELD EXTRACTION
// =====================================================

/**
 * Get field names for a form variant (returns mutable array)
 */
export function getFieldsForVariant(variant: FormVariant): string[] {
  const config = VARIANT_FIELD_CONFIGS[variant];
  if (!config?.fields) return [];
  // Spread creates a mutable copy, breaking the readonly constraint
  return [...config.fields];
}

/**
 * Get layout for a form variant
 */
export function getLayoutForVariant(variant: FormVariant): string {
  return VARIANT_FIELD_CONFIGS[variant]?.layout || 'vertical';
}

/**
 * Get size for a form variant
 */
export function getSizeForVariant(variant: FormVariant): string {
  return VARIANT_FIELD_CONFIGS[variant]?.size || 'md';
}

/**
 * Get field names as readonly (no copy, more efficient)
 */
export function getFieldsForVariantReadonly(variant: FormVariant): readonly string[] {
  return VARIANT_FIELD_CONFIGS[variant]?.fields || [];
}

/**
 * Check if a variant has a specific field
 */
export function variantHasField(variant: FormVariant, fieldName: string): boolean {
  const fields = getFieldsForVariantReadonly(variant);
  return fields.includes(fieldName);
}

// =====================================================
// SECTION HELPERS
// =====================================================

export function getVisibleSections(
  sections: FormSection[], 
  values: Record<string, FieldValue>
): FormSection[] {
  return sections.filter(section => {
    if (!section.condition) return true;
    return section.condition(values);
  });
}

export function getAllFieldsFromSections(sections: FormSection[]): FieldConfig[] {
  return sections.flatMap(section => section.fields);
}

export function getFieldNamesFromSections(sections: FormSection[]): string[] {
  return getAllFieldsFromSections(sections).map(field => field.name);
}

// =====================================================
// WIZARD HELPERS
// =====================================================

export function getCurrentStep(steps: WizardStep[], currentStepIndex: number): WizardStep | undefined {
  return steps[currentStepIndex];
}

export function canGoToNextStep(
  step: WizardStep, 
  values: Record<string, FieldValue>
): boolean {
  if (!step.canGoNext) return true;
  return step.canGoNext(values);
}

export function getStepStatus(
  step: WizardStep,
  index: number,
  currentStepIndex: number,
  completedSteps: Set<string>
): string {
  if (completedSteps.has(step.id)) return 'completed';
  if (index === currentStepIndex) return 'current';
  if (index < currentStepIndex) return 'completed';
  return 'pending';
}

// =====================================================
// FORM VALUE HELPERS
// =====================================================

export function getInitialValuesFromSections(sections: FormSection[]): Record<string, FieldValue> {
  const values: Record<string, FieldValue> = {};
  for (const section of sections) {
    for (const field of section.fields) {
      if (field.defaultValue !== undefined) {
        values[field.name] = field.defaultValue;
      }
    }
  }
  return values;
}

export function getDirtyFields(
  initialValues: Record<string, FieldValue>,
  currentValues: Record<string, FieldValue>
): string[] {
  const dirty: string[] = [];
  for (const key of Object.keys(currentValues)) {
    if (JSON.stringify(initialValues[key]) !== JSON.stringify(currentValues[key])) {
      dirty.push(key);
    }
  }
  return dirty;
}

export function isFormDirty(
  initialValues: Record<string, FieldValue>,
  currentValues: Record<string, FieldValue>
): boolean {
  return getDirtyFields(initialValues, currentValues).length > 0;
}

// =====================================================
// DEPENDENCY HELPERS
// =====================================================

export function getDependentFields(
  fieldName: string,
  sections: FormSection[]
): string[] {
  const dependents: string[] = [];
  for (const section of sections) {
    for (const field of section.fields) {
      if (field.dependencies?.includes(fieldName)) {
        dependents.push(field.name);
      }
    }
  }
  return dependents;
}

export function shouldValidateField(
  field: FieldConfig,
  values: Record<string, FieldValue>
): boolean {
  if (!field.condition) return true;
  return field.condition(values);
}

// =====================================================
// FORMATTING HELPERS
// =====================================================

export function formatFieldName(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return value;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// =====================================================
// VALIDATOR FACTORIES
// =====================================================

export const required = (message: string = 'This field is required'): ValidatorFn => {
  return (value: FieldValue) => {
    if (isEmpty(value)) return message;
    return null;
  };
};

export const email = (message: string = 'Please enter a valid email address'): ValidatorFn => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'string') return message;
    if (!emailRegex.test(value)) return message;
    return null;
  };
};

export const minLength = (length: number, message?: string): ValidatorFn => {
  const defaultMessage = `Must be at least ${length} characters`;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'string') return defaultMessage;
    if (value.length < length) return message || defaultMessage;
    return null;
  };
};

export const maxLength = (length: number, message?: string): ValidatorFn => {
  const defaultMessage = `Cannot exceed ${length} characters`;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'string') return defaultMessage;
    if (value.length > length) return message || defaultMessage;
    return null;
  };
};

export const min = (minVal: number, message?: string): ValidatorFn => {
  const defaultMessage = `Must be at least ${minVal}`;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'number') return defaultMessage;
    if (value < minVal) return message || defaultMessage;
    return null;
  };
};

export const max = (maxVal: number, message?: string): ValidatorFn => {
  const defaultMessage = `Cannot exceed ${maxVal}`;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'number') return defaultMessage;
    if (value > maxVal) return message || defaultMessage;
    return null;
  };
};

export const pattern = (regex: RegExp, message: string): ValidatorFn => {
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'string') return message;
    if (!regex.test(value)) return message;
    return null;
  };
};

export const url = (message: string = 'Please enter a valid URL'): ValidatorFn => {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'string') return message;
    if (!urlRegex.test(value)) return message;
    return null;
  };
};

export const phone = (message: string = 'Please enter a valid phone number'): ValidatorFn => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return (value: FieldValue) => {
    if (isEmpty(value)) return null;
    if (typeof value !== 'string') return message;
    if (!phoneRegex.test(value)) return message;
    return null;
  };
};

export const match = (fieldName: string, message?: string): ValidatorFn => {
  const defaultMessage = `Must match ${fieldName}`;
  return (value: FieldValue, allValues?: Record<string, FieldValue>) => {
    if (isEmpty(value)) return null;
    const matchValue = allValues?.[fieldName];
    if (value !== matchValue) return message || defaultMessage;
    return null;
  };
};

// =====================================================
// VALIDATOR COMPOSITION
// =====================================================

export function composeValidators(...validators: ValidatorFn[]): ValidatorFn {
  return (value: FieldValue, allValues?: Record<string, FieldValue>) => {
    for (const validator of validators) {
      const error = validator(value, allValues);
      if (error) return error;
    }
    return null;
  };
}

export function composeAsyncValidators(...validators: AsyncValidatorFn[]): AsyncValidatorFn {
  return async (value: FieldValue, allValues?: Record<string, FieldValue>) => {
    for (const validator of validators) {
      const error = await validator(value, allValues);
      if (error) return error;
    }
    return null;
  };
}

// =====================================================
// VALIDATION RESULT HELPERS
// =====================================================

export function createValidationResult(
  errors: Record<string, string> = {},
  warnings: Record<string, string> = {},
  touched: Record<string, boolean> = {}
): ValidationResult {
  return {
    valid: Object.keys(errors).length === 0,
    errors,
    warnings,
    touched,
  };
}

export function mergeValidationResults(
  a: ValidationResult,
  b: ValidationResult
): ValidationResult {
  return {
    valid: a.valid && b.valid,
    errors: { ...a.errors, ...b.errors },
    warnings: { ...a.warnings, ...b.warnings },
    touched: { ...a.touched, ...b.touched },
  };
}

export function addFieldError(
  result: ValidationResult,
  fieldName: string,
  error: string
): ValidationResult {
  return {
    ...result,
    valid: false,
    errors: { ...result.errors, [fieldName]: error },
  };
}

export function addFieldWarning(
  result: ValidationResult,
  fieldName: string,
  warning: string
): ValidationResult {
  return {
    ...result,
    warnings: { ...result.warnings, [fieldName]: warning },
  };
}

export function markFieldTouched(
  result: ValidationResult,
  fieldName: string
): ValidationResult {
  return {
    ...result,
    touched: { ...result.touched, [fieldName]: true },
  };
}

// =====================================================
// FORM DATA HELPERS
// =====================================================

export function serializeFormData(data: Record<string, FieldValue>): FormData {
  const formData = new FormData();
  
  for (const [key, value] of Object.entries(data)) {
    // Skip undefined/null
    if (value === undefined || value === null) continue;
    
    // File
    if (value instanceof File) {
      formData.append(key, value);
    }
    // File array
    else if (Array.isArray(value) && value.every(v => v instanceof File)) {
      for (const file of value) {
        formData.append(`${key}[]`, file);
      }
    }
    // Date
    else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    }
    // Object (JSON)
    else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    }
    // Primitive
    else {
      formData.append(key, String(value));
    }
  }
  
  return formData;
}

/**
 * Deserialize FormData to Record<string, string | File>
 * Note: This returns a simpler type because FormData cannot
 * automatically reconstruct complex nested objects.
 * For complex data, use JSON serialization instead.
 */
export function deserializeFormDataSimple(
  formData: FormData
): Record<string, string | File> {
  const data: Record<string, string | File> = {};
  
  for (const [key, value] of formData.entries()) {
    // FormDataEntryValue is either string or File
    data[key] = value;
  }
  
  return data;
}

/**
 * Convert simple FormData result to FieldValue record
 * with intelligent type detection
 */
export function convertToFieldValues(
  simpleData: Record<string, string | File>
): Record<string, FieldValue> {
  const result: Record<string, FieldValue> = {};
  
  for (const [key, value] of Object.entries(simpleData)) {
    // Handle multi-value keys (ends with [])
    const isArrayKey = key.endsWith('[]');
    const baseKey = isArrayKey ? key.slice(0, -2) : key;
    
    if (isArrayKey) {
      // Collect array values
      if (!result[baseKey]) {
        result[baseKey] = [];
      }
      const arr = result[baseKey] as FieldValue[];
      arr.push(value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Complete deserialize with type conversion
 */
export function deserializeFormData(formData: FormData): Record<string, FieldValue> {
  const simple = deserializeFormDataSimple(formData);
  return convertToFieldValues(simple);
}

/**
 * Try to parse JSON strings in form data
 * Useful when receiving serialized objects from API
 */
export function parseJsonFields(
  data: Record<string, FieldValue>,
  fieldsToParse: string[]
): Record<string, FieldValue> {
  const result = { ...data };
  for (const field of fieldsToParse) {
    const value = result[field];
    if (typeof value === 'string') {
      try {
        result[field] = JSON.parse(value);
      } catch {
        // Not JSON, leave as string
      }
    }
  }
  return result;
}