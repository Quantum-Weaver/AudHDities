// src/scripts/system/gaia/generate/generate_types.ts
// ============================================================================
// GENERATE TYPES (GAIA) - Complete with Derived Interfaces
// ============================================================================

import type { EnrichedTable, EnrichedView, EnrichedTypeEnum } from '../enrich/enrich_objects.js';
import { logSuccess, logWarning } from '../../../shared/logger.js';
import { extractObject } from '../extract/extract_object.js';
import { 
  parseTableContent, 
  toPascalCase,
  generateEnumExports as generateEnumExportsFromRefs,
} from '../../../modules/format/format_object_types.js';
import { formatRowContent, type RawField } from '../format/format_row_content.js';
import { formatInsertContent } from '../format/format_insert_content.js';
import { formatUpdateContent } from '../format/format_update_content.js';
import { formatPublicContent } from '../format/format_public_content.js';
import { formatFormContent } from '../format/format_form_content.js';
// ============================================================================
// TYPES
// ============================================================================

export interface GeneratedTypeFile {
  content: string;
  filePath: string;
  objectName: string;
  objectType: 'table' | 'view' | 'type_enum';
  deityFolder: string;
}

interface ParsedTableContent {
  rowContent: string;
  enumRefs: string[];
  hasJson: boolean;
  success: boolean;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateHeader(objectName: string, deityFolder: string, objectType: string, handlingLevel: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: types/generated/${deityFolder}/${objectName}.ts
// TYPE: ${objectType}
// HANDLING: ${handlingLevel}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

`;
}

// ============================================================================
// EXTRACTION & PARSING
// ============================================================================

export function extractRowContent(
  tableName: string,
  lines: string[],
  markers: any
): ParsedTableContent {
  const extracted = extractObject(
    lines,
    markers.tablesLine,
    markers.tablesEndLine,
    tableName,
    { verbose: false }
  );
  
  if (!extracted) {
    return { rowContent: '', enumRefs: [], hasJson: false, success: false };
  }
  
  const parsed = parseTableContent(extracted.content);
  
  return {
    rowContent: parsed.rowContent,
    enumRefs: parsed.enumRefs,
    hasJson: parsed.hasJson,
    success: true,
  };
}

export function generateEnumExports(enumRefs: string[]): string {
  return generateEnumExportsFromRefs(enumRefs);
}

// ============================================================================
// TABLE TYPE GENERATION
// ============================================================================

// Helper to parse rowContent string into RawField[]
function parseRowContentToFields(rowContent: string): RawField[] {
  const lines = rowContent.split('\n');
  const fields: RawField[] = [];
  
  for (const line of lines) {
    // Match: "fieldName: type" or "fieldName: type | null"
    const match = line.match(/^\s*(\w+):\s*(.+?)(;?)$/);
    if (!match) continue;
    
    const fieldName = match[1];
    let fieldType = match[2].trim();
    
    const isNullable = fieldType.includes('| null');
    fieldType = fieldType.replace(/\| null/g, '').trim();
    
    fields.push({
      name: fieldName,
      type: fieldType,
      isNullable,
    });
  }
  
  return fields;
}

export function generateTableTypes(
  table: EnrichedTable,
  lines: string[],
  markers: any
): GeneratedTypeFile {
  const { name: tableName, deityFolder, category, handlingLevel } = table;
  const pascalName = toPascalCase(tableName);
  
  const parsed = extractRowContent(tableName, lines, markers);
  const rowContent = parsed.rowContent;
  const enumRefs = parsed.enumRefs;
  const hasJson = parsed.hasJson;
  
  // Parse rowContent into structured fields
  const fields = rowContent ? parseRowContentToFields(rowContent) : [];
  
  let content = generateHeader(tableName, deityFolder, 'table', handlingLevel);
  
  // Imports
  content += `import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';\n`;
  content += `import type { Database } from '@/types/supabase/database.types';\n`;
  if (hasJson) {
    content += `import type { Json } from '@/types/supabase/database.types';\n`;
  }
  content += `\n`;
  
  // Core types
  content += `// =====================================================\n`;
  content += `// CORE TYPES\n`;
  content += `// =====================================================\n\n`;
  
  const enumExports = generateEnumExports(enumRefs);
  if (enumExports) {
    content += enumExports + '\n';
  }
  
  if (category.generateRow) {
    content += `export type ${pascalName}Row = Tables<'${tableName}'>;\n`;
  }
  if (category.generateInsert) {
    content += `export type ${pascalName}Insert = TablesInsert<'${tableName}'>;\n`;
  }
  if (category.generateUpdate) {
    content += `export type ${pascalName}Update = TablesUpdate<'${tableName}'>;\n`;
  }
  
  // Derived types - using NEW formatters
  if (fields.length > 0) {
    content += `\n// =====================================================\n`;
    content += `// DERIVED TYPES\n`;
    content += `// =====================================================\n\n`;
    
    // Row interface (all fields)
    content += formatRowContent(tableName, fields) + '\n\n';
    
    // Insert interface (exclude auto-generated)
    content += formatInsertContent(tableName, fields) + '\n\n';
    
    // Update interface (all optional)
    content += formatUpdateContent(tableName, fields) + '\n\n';
    
    // Public interface (exclude sensitive)
    content += formatPublicContent(tableName, fields) + '\n\n';
    
    // Form interface (editable, all optional)
    content += formatFormContent(tableName, fields) + '\n';
  }
  
  return {
    content,
    filePath: `src/types/generated/${deityFolder}/${tableName}.ts`,
    objectName: tableName,
    objectType: 'table',
    deityFolder,
  };
}

// ============================================================================
// VIEW TYPE GENERATION
// ============================================================================

export function generateViewTypes(view: EnrichedView): GeneratedTypeFile {
  const { name: viewName, deityFolder, handlingLevel } = view;
  const pascalName = toPascalCase(viewName);
  
  let content = generateHeader(viewName, deityFolder, 'view', handlingLevel);
  content += `import type { Tables } from '@/types/supabase/database.helpers';\n\n`;
  content += `// =====================================================\n`;
  content += `// VIEW TYPE (Read-only)\n`;
  content += `// =====================================================\n\n`;
  content += `export type ${pascalName}Row = Tables<'${viewName}'>;\n`;
  
  return {
    content,
    filePath: `src/types/generated/${deityFolder}/${viewName}.ts`,
    objectName: viewName,
    objectType: 'view',
    deityFolder,
  };
}

// ============================================================================
// TYPE ENUM GENERATION
// ============================================================================

export function generateTypeEnumFile(typeEnum: EnrichedTypeEnum): GeneratedTypeFile {
  const { name: enumName, deityFolder, handlingLevel } = typeEnum;
  const pascalName = toPascalCase(enumName);
  
  let content = generateHeader(enumName, deityFolder, 'type_enum', handlingLevel);
  content += `import type { Enums } from '@/types/supabase/database.helpers';\n\n`;
  content += `export type ${pascalName} = Enums<'${enumName}'>;\n`;
  
  return {
    content,
    filePath: `src/types/generated/${deityFolder}/${enumName}.ts`,
    objectName: enumName,
    objectType: 'type_enum',
    deityFolder,
  };
}

// ============================================================================
// BULK GENERATION
// ============================================================================

export function generateMultipleTableTypes(
  tables: EnrichedTable[],
  lines: string[],
  markers: any
): GeneratedTypeFile[] {
  return tables.filter(t => t.shouldGenerateTypes).map(t => generateTableTypes(t, lines, markers));
}

export function generateMultipleViewTypes(views: EnrichedView[]): GeneratedTypeFile[] {
  return views.filter(v => v.shouldGenerateTypes).map(generateViewTypes);
}

export function generateMultipleTypeEnumFiles(typeEnums: EnrichedTypeEnum[]): GeneratedTypeFile[] {
  return typeEnums.map(generateTypeEnumFile);
}