// src/scripts/system/gaia/format/format_update_content.ts
// ============================================================================
// ============================================================================

import { toPascalCase } from '../../../shared/type_mappings.js';

export interface RawField {
  name: string;
  type: string;
  isNullable: boolean;
}

/**
 * Generate the Update interface
 * All fields are optional (partial update)
 */
export function formatUpdateContent(tableName: string, fields: RawField[]): string {
  const pascalName = toPascalCase(tableName);
  const lines: string[] = [];
  
  lines.push(`export interface ${pascalName}Update {`);
  
  for (const field of fields) {
    const nullable = field.isNullable ? ' | null' : '';
    lines.push(`  ${field.name}?: ${field.type}${nullable};`);
  }
  
  lines.push(`}`);
  
  return lines.join('\n');
}