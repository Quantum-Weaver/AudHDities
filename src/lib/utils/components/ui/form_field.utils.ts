// src/utils/components/ui/form_field.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM FIELD UTILITIES                                   ║
// ║                    ID generation, child enhancement                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

/**
 * Generates a unique field ID.
 * Used as fallback when no explicit `id` prop is provided.
 */
export function generateFieldId(prefix: string = 'field'): string {
  const random = Math.random().toString(36).slice(2, 9);
  return `${prefix}-${random}`;
}

/**
 * Generates a helper text element ID from a field ID.
 */
export function getHelperId(fieldId: string): string {
  return `${fieldId}-helper`;
}

/**
 * Generates an error element ID from a field ID.
 */
export function getErrorId(fieldId: string): string {
  return `${fieldId}-error`;
}