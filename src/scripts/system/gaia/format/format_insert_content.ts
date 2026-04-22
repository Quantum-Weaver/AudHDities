// src/scripts/system/gaia/format/format_insert_content.ts
// ============================================================================
// FORMAT INSERT CONTENT - Exclude auto-generated fields
// ============================================================================

import { toPascalCase, AUTO_GENERATED_FIELDS } from '../../../shared/type_mappings.js';

export interface RawField {
  name: string;
  type: string;
  isNullable: boolean;
}

/**
 * Generate the Insert interface
 * Excludes: id, created_at, updated_at, created_by, deleted_at, row_version
 */
export function formatInsertContent(tableName: string, fields: RawField[]): string {
  const pascalName = toPascalCase(tableName);
  const lines: string[] = [];
  
  lines.push(`export interface ${pascalName}Insert {`);
  
  const insertFields = fields.filter(f => !AUTO_GENERATED_FIELDS.includes(f.name));
  
  for (const field of insertFields) {
    const nullable = field.isNullable ? ' | null' : '';
    lines.push(`  ${field.name}${field.isNullable ? '?' : ''}: ${field.type}${nullable};`);
  }
  
  lines.push(`}`);
  
  return lines.join('\n');
}