// src/utils/components/ui/form.utils.ts
// Pure logic only - no values, no side effects
// ALIGNED WITH constants, types, and GAIA-generated Zod validators

import type { 
  FieldValue, 
  FieldConfig, 
  ValidationResult,
  FormSection,
  WizardStep,
  FormVariant,
} from '@/types/components/ui/form.types';

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
// VALIDATION STATE HELPERS
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
// ZOD VALIDATION HELPER
// =====================================================
// Use GAIA-generated Zod schemas instead of custom validators.
// Example:
//   import { ProfilesInsertSchema } from '@/lib/validators/generated/hestia-core/profiles';
//   const result = ProfilesInsertSchema.safeParse(formData);

export function zodErrorsToValidationResult(
  zodResult: { success: false; error: { issues: Array<{ path: (string | number)[]; message: string }> } }
): ValidationResult {
  const errors: Record<string, string> = {};
  for (const issue of zodResult.error.issues) {
    const fieldName = String(issue.path[0] || 'form');
    if (!errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  }
  return {
    valid: false,
    errors,
    warnings: {},
    touched: {},
  };
}

// =====================================================
// FIELD EXTRACTION
// =====================================================

export function getFieldsForVariant(variant: FormVariant): string[] {
  const config = VARIANT_FIELD_CONFIGS[variant];
  if (!config?.fields) return [];
  return [...config.fields];
}

export function getLayoutForVariant(variant: FormVariant): string {
  return VARIANT_FIELD_CONFIGS[variant]?.layout || 'vertical';
}

export function getSizeForVariant(variant: FormVariant): string {
  return VARIANT_FIELD_CONFIGS[variant]?.size || 'md';
}

export function getFieldsForVariantReadonly(variant: FormVariant): readonly string[] {
  return VARIANT_FIELD_CONFIGS[variant]?.fields || [];
}

export function variantHasField(variant: FormVariant, fieldName: string): boolean {
  return getFieldsForVariantReadonly(variant).includes(fieldName);
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
// FORM DATA HELPERS
// =====================================================

export function serializeFormData(data: Record<string, FieldValue>): FormData {
  const formData = new FormData();
  
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value) && value.every(v => v instanceof File)) {
      for (const file of value) {
        formData.append(`${key}[]`, file);
      }
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }
  
  return formData;
}

export function deserializeFormDataSimple(
  formData: FormData
): Record<string, string | File> {
  const data: Record<string, string | File> = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  return data;
}

export function convertToFieldValues(
  simpleData: Record<string, string | File>
): Record<string, FieldValue> {
  const result: Record<string, FieldValue> = {};
  
  for (const [key, value] of Object.entries(simpleData)) {
    const isArrayKey = key.endsWith('[]');
    const baseKey = isArrayKey ? key.slice(0, -2) : key;
    
    if (isArrayKey) {
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

export function deserializeFormData(formData: FormData): Record<string, FieldValue> {
  const simple = deserializeFormDataSimple(formData);
  return convertToFieldValues(simple);
}

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