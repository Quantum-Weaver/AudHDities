// src/scripts/system/gaia/format/format_form_content.ts
// ============================================================================
// ============================================================================

import { toPascalCase, AUTO_GENERATED_FIELDS } from '../../../shared/type_mappings.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';

export interface RawField {
  name: string;
  type: string;
  isNullable: boolean;
}

// Fields that should NEVER appear in forms (sensitive + auto-generated)
const FORM_EXCLUDED_FIELDS = [
  ...AUTO_GENERATED_FIELDS,
  ...SENSITIVE_FIELDS,
];

/**
 * Generate the FormData interface
 * Excludes: auto-generated fields AND sensitive fields
 * All fields are optional
 */
export function formatFormContent(tableName: string, fields: RawField[]): string {
  const pascalName = toPascalCase(tableName);
  const lines: string[] = [];
  
  lines.push(`/**`);
  lines.push(` * Form data for ${tableName}`);
  lines.push(` * Auto-generated and sensitive fields excluded`);
  lines.push(` * All fields are optional for partial updates`);
  lines.push(` */`);
  lines.push(`export interface ${pascalName}FormData {`);
  
  const formFields = fields.filter(f => !FORM_EXCLUDED_FIELDS.includes(f.name));
  
  for (const field of formFields) {
    const nullable = field.isNullable ? ' | null' : '';
    lines.push(`  ${field.name}?: ${field.type}${nullable};`);
  }
  
  lines.push(`}`);
  
  return lines.join('\n');
}