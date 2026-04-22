// src/scripts/system/gaia/generate/generate_types.ts
// ============================================================================
// GENERATE TYPES (GAIA) - Type-First Generation
// ============================================================================
// Purpose: Generate TypeScript type files using Tables<> helpers
// Replaces: format_types.ts (which parsed content manually)
// ============================================================================

import type { EnrichedTable, EnrichedView, EnrichedTypeEnum } from '../enrich/enrich_objects.js';
import { HELPER_IMPORTS } from '../../../shared/helper_imports.js';
import { logDebug, logSuccess } from '../../../shared/logger.js';

export interface GenerateTypesOptions {
  verbose?: boolean;
}

export interface GeneratedTypeFile {
  content: string;
  filePath: string;
  objectName: string;
  objectType: 'table' | 'view' | 'type_enum';
  deityFolder: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/**
 * Generate header comment
 */
function generateHeader(objectName: string, deityFolder: string, objectType: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: types/generated/${deityFolder}/${objectName}.ts
// TYPE: ${objectType}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

`;
}

// ============================================================================
// TABLE TYPE GENERATION
// ============================================================================

/**
 * Generate type file for a table (full CRUD types)
 */
export function generateTableTypes(table: EnrichedTable): GeneratedTypeFile {
  const { name: tableName, deityFolder, category } = table;
  const pascalName = toPascalCase(tableName);
  
  let content = generateHeader(tableName, deityFolder, 'table');
  content += HELPER_IMPORTS.typeFile + '\n\n';
  
  // Core types (always generated)
  content += `// =====================================================
// CORE TYPES
// =====================================================

`;
  
  if (category.generateRow) {
    content += `export type ${pascalName}Row = Tables<'${tableName}'>;\n`;
  }
  
  if (category.generateInsert) {
    content += `export type ${pascalName}Insert = TablesInsert<'${tableName}'>;\n`;
  }
  
  if (category.generateUpdate) {
    content += `export type ${pascalName}Update = TablesUpdate<'${tableName}'>;\n`;
  }
  
  // Derived types (optional)
  if (category.generatePublicInterface || category.generateFormInterface) {
    content += `\n// =====================================================
// DERIVED TYPES
// =====================================================

`;
  }
  
  if (category.generatePublicInterface) {
    content += `// Public interface (sensitive fields excluded)
// export type Public${pascalName} = Omit<${pascalName}Row, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

`;
  }
  
  if (category.generateFormInterface) {
    content += `// Form data interface (all fields optional)
// export type ${pascalName}FormData = Partial<${pascalName}Insert>;

`;
  }
  
  const filePath = `src/types/generated/${deityFolder}/${tableName}.ts`;
  
  return {
    content,
    filePath,
    objectName: tableName,
    objectType: 'table',
    deityFolder,
  };
}

// ============================================================================
// VIEW TYPE GENERATION
// ============================================================================

/**
 * Generate type file for a view (Row type only - read-only)
 */
export function generateViewTypes(view: EnrichedView): GeneratedTypeFile {
  const { name: viewName, deityFolder } = view;
  const pascalName = toPascalCase(viewName);
  
  let content = generateHeader(viewName, deityFolder, 'view');
  content += HELPER_IMPORTS.viewTypeFile + '\n\n';
  
  content += `// =====================================================
// VIEW TYPE (Read-only)
// =====================================================

`;
  content += `export type ${pascalName}Row = Tables<'${viewName}'>;\n`;
  
  const filePath = `src/types/generated/${deityFolder}/${viewName}.ts`;
  
  return {
    content,
    filePath,
    objectName: viewName,
    objectType: 'view',
    deityFolder,
  };
}

// ============================================================================
// TYPE ENUM GENERATION
// ============================================================================

/**
 * Generate type file for a type enum (just exports the type)
 */
export function generateTypeEnumFile(typeEnum: EnrichedTypeEnum): GeneratedTypeFile {
  const { name: enumName, deityFolder } = typeEnum;
  const pascalName = toPascalCase(enumName);
  
  let content = generateHeader(enumName, deityFolder, 'type_enum');
  content += `import type { Enums } from '@/types/supabase/database.helpers';\n\n`;
  content += `export type ${pascalName} = Enums<'${enumName}'>;\n`;
  
  const filePath = `src/types/generated/${deityFolder}/${enumName}.ts`;
  
  return {
    content,
    filePath,
    objectName: enumName,
    objectType: 'type_enum',
    deityFolder,
  };
}

// ============================================================================
// BULK GENERATION
// ============================================================================

/**
 * Generate type files for multiple tables
 */
export function generateMultipleTableTypes(
  tables: EnrichedTable[],
  options?: GenerateTypesOptions
): GeneratedTypeFile[] {
  const { verbose = false } = options || {};
  const results: GeneratedTypeFile[] = [];
  
  for (const table of tables) {
    if (table.shouldGenerateTypes) {
      results.push(generateTableTypes(table));
    }
  }
  
  if (verbose) {
    logSuccess(`Generated ${results.length} table type files`);
  }
  
  return results;
}

/**
 * Generate type files for multiple views
 */
export function generateMultipleViewTypes(
  views: EnrichedView[],
  options?: GenerateTypesOptions
): GeneratedTypeFile[] {
  const { verbose = false } = options || {};
  const results: GeneratedTypeFile[] = [];
  
  for (const view of views) {
    if (view.shouldGenerateTypes) {
      results.push(generateViewTypes(view));
    }
  }
  
  if (verbose) {
    logSuccess(`Generated ${results.length} view type files`);
  }
  
  return results;
}

/**
 * Generate type files for multiple type enums
 */
export function generateMultipleTypeEnumFiles(
  typeEnums: EnrichedTypeEnum[],
  options?: GenerateTypesOptions
): GeneratedTypeFile[] {
  const results: GeneratedTypeFile[] = [];
  
  for (const typeEnum of typeEnums) {
    results.push(generateTypeEnumFile(typeEnum));
  }
  
  return results;
}