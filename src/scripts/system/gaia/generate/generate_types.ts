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
  generatePublicInterface as generatePublicInterfaceFromContent,
  generateFormDataInterface as generateFormDataInterfaceFromContent,
  generateEnumExports as generateEnumExportsFromRefs,
} from '../../../modules/format/format_object_types.js';

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

function extractRowContent(
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

function generatePublicInterface(tableName: string, rowContent: string): string {
  return generatePublicInterfaceFromContent(tableName, rowContent);
}

function generateFormDataInterface(tableName: string, rowContent: string): string {
  return generateFormDataInterfaceFromContent(tableName, rowContent);
}

function generateEnumExports(enumRefs: string[]): string {
  return generateEnumExportsFromRefs(enumRefs);
}

// ============================================================================
// TABLE TYPE GENERATION
// ============================================================================

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
  
  // Derived types
  if (rowContent) {
    content += `\n// =====================================================\n`;
    content += `// DERIVED TYPES\n`;
    content += `// =====================================================\n\n`;
    
    if (category.generatePublicInterface) {
      const publicInterface = generatePublicInterface(tableName, rowContent);
      if (publicInterface) {
        content += publicInterface + '\n';
      }
    }
    if (category.generateFormInterface) {
      const formInterface = generateFormDataInterface(tableName, rowContent);
      if (formInterface) {
        content += formInterface + '\n';
      }
    }
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