// src/scripts/system/gaia/format/format_public_content.ts
// ============================================================================
// ============================================================================

import { toPascalCase } from '../../../shared/type_mappings.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';

export interface RawField {
  name: string;
  type: string;
  isNullable: boolean;
}

/**
 * Generate the Public interface
 * Excludes: email, password, api_key, etc. (SENSITIVE_FIELDS)
 */
export function formatPublicContent(tableName: string, fields: RawField[]): string {
  const pascalName = toPascalCase(tableName);
  const lines: string[] = [];
  const excluded: string[] = [];
  
  lines.push(`/**`);
  lines.push(` * Public view of ${tableName}`);
  
  const publicFields = fields.filter(f => {
    if (SENSITIVE_FIELDS.includes(f.name as any)) {
      excluded.push(f.name);
      return false;
    }
    return true;
  });
  
  if (excluded.length > 0) {
    lines.push(` * Excludes sensitive fields: ${excluded.join(', ')}`);
  }
  lines.push(` */`);
  lines.push(`export interface Public${pascalName} {`);
  
  for (const field of publicFields) {
    const nullable = field.isNullable ? ' | null' : '';
    lines.push(`  ${field.name}: ${field.type}${nullable};`);
  }
  
  lines.push(`}`);
  
  return lines.join('\n');
}