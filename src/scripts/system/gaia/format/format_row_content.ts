// src/scripts/system/gaia/format/format_row_content.ts
// ============================================================================
// ============================================================================

import { toPascalCase } from '../../../shared/type_mappings.js';

export interface RawField {
  name: string;
  type: string;
  isNullable: boolean;
}

/**
 * Generate the Row interface with all fields exactly as they appear in the database
 */
export function formatRowContent(tableName: string, fields: RawField[]): string {
  const pascalName = toPascalCase(tableName);
  const lines: string[] = [];
  
  lines.push(`export interface ${pascalName}AllFields {`);
  
  for (const field of fields) {
    const nullable = field.isNullable ? ' | null' : '';
    lines.push(`  ${field.name}: ${field.type}${nullable};`);
  }
  
  lines.push(`}`);
  
  return lines.join('\n');
}