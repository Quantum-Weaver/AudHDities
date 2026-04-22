// src/scripts/system/gaia/generate/generate_types.ts
// ============================================================================
// GENERATE TYPES (GAIA) - Using Proven Row Content Parsing
// ============================================================================

import type { EnrichedTable, EnrichedView, EnrichedTypeEnum } from '../enrich/enrich_objects.js';
import { logDebug, logSuccess, logWarning } from '../../../shared/logger.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../../..');

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

function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

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
// ROW CONTENT EXTRACTION (Proven Method)
// ============================================================================

interface ParsedTableContent {
  rowContent: string;
  enumRefs: string[];
  hasJson: boolean;
}

function extractRowContent(tableName: string): ParsedTableContent | null {
  try {
    const dbTypesPath = path.join(PROJECT_ROOT, 'src/types/supabase/database.types.ts');
    const content = fs.readFileSync(dbTypesPath, 'utf-8');
    const lines = content.split('\n');
    
    // Find the table's start line
    let tableStartLine = -1;
    const tablePattern = new RegExp(`^\\s{6}${tableName}:\\s*\\{`);
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(tablePattern)) {
        tableStartLine = i;
        break;
      }
    }
    
    if (tableStartLine === -1) return null;
    
    // Find Row section within the table
    let rowStartLine = -1;
    let rowEndLine = -1;
    let insertStartLine = -1;
    let inTable = true;
    let braceDepth = 0;
    let foundOpen = false;
    
    for (let i = tableStartLine; i < lines.length && inTable; i++) {
      const line = lines[i];
      
      // Track braces to know when we exit the table
      for (const char of line) {
        if (char === '{') { braceDepth++; foundOpen = true; }
        if (char === '}') braceDepth--;
      }
      
      if (foundOpen && braceDepth === 0) {
        inTable = false;
      }
      
      if (line.match(/^\s*Row:\s*\{/)) {
        rowStartLine = i;
      }
      if (line.match(/^\s*Insert:\s*\{/)) {
        insertStartLine = i;
        if (rowStartLine !== -1) {
          rowEndLine = i - 1;
        }
      }
    }
    
    if (rowStartLine === -1 || rowEndLine === -1) return null;
    
    // Extract Row content
    const rowLines = lines.slice(rowStartLine + 1, rowEndLine);
    let rowContent = rowLines.join('\n').trim();
    
    if (rowContent.endsWith('}')) {
      rowContent = rowContent.slice(0, -1).trim();
    }
    
    // Find enum references
    const enumRefs: string[] = [];
    const enumPattern = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;
    let match;
    
    while ((match = enumPattern.exec(rowContent)) !== null) {
      if (!enumRefs.includes(match[1])) {
        enumRefs.push(match[1]);
      }
    }
    
    // Clean up enum references
    for (const enumRef of enumRefs) {
      const pascalCase = toPascalCase(enumRef);
      rowContent = rowContent.replace(
        new RegExp(`Database\\["public"\\]\\["Enums"\\]\\["${enumRef}"\\]`, 'g'),
        pascalCase
      );
    }
    
    const hasJson = rowContent.includes('Json');
    
    return { rowContent, enumRefs, hasJson };
    
  } catch (error) {
    return null;
  }
}

// ============================================================================
// DERIVED TYPE GENERATION (Proven Methods)
// ============================================================================

function generatePublicInterface(
  tableName: string,
  rowContent: string,
  sensitiveFields: string[] = SENSITIVE_FIELDS as unknown as string[]
): string {
  const lines = rowContent.split('\n');
  const publicFields: string[] = [];
  const excludedFields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      if (!sensitiveFields.includes(fieldName)) {
        publicFields.push(`  ${line.trim()};`);
      } else {
        excludedFields.push(fieldName);
      }
    }
  }
  
  if (publicFields.length === 0) {
    return `// No public fields available (all fields are sensitive)\n`;
  }
  
  const interfaceName = `Public${pascalName}`;
  
  let result = `/**\n`;
  result += ` * Public view of ${tableName}\n`;
  if (excludedFields.length > 0) {
    result += ` * Excludes sensitive fields: ${excludedFields.join(', ')}\n`;
  }
  result += ` */\n`;
  result += `export interface ${interfaceName} {\n`;
  result += publicFields.join('\n');
  result += `\n}\n`;
  
  return result;
}

function generateFormDataInterface(tableName: string, rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      fields.push(`  ${fieldName}?: ${fieldType};`);
    }
  }
  
  if (fields.length === 0) {
    return `// No form fields available\n`;
  }
  
  const interfaceName = `${pascalName}FormData`;
  
  let result = `/**\n`;
  result += ` * Form data for ${tableName}\n`;
  result += ` * All fields are optional for partial updates\n`;
  result += ` */\n`;
  result += `export interface ${interfaceName} {\n`;
  result += fields.join('\n');
  result += `\n}\n`;
  
  return result;
}

function generateEnumExports(enumRefs: string[]): string {
  if (enumRefs.length === 0) return '';
  
  const lines: string[] = [];
  lines.push(`// =====================================================`);
  lines.push(`// ENUM EXPORTS (from database enums)`);
  lines.push(`// =====================================================`);
  lines.push(``);
  
  for (const enumRef of enumRefs) {
    const exportName = toPascalCase(enumRef);
    lines.push(`export type ${exportName} = Database['public']['Enums']['${enumRef}'];`);
  }
  
  return lines.join('\n');
}

// ============================================================================
// TABLE TYPE GENERATION
// ============================================================================

export function generateTableTypes(table: EnrichedTable): GeneratedTypeFile {
  const { name: tableName, deityFolder, category, handlingLevel } = table;
  const pascalName = toPascalCase(tableName);
  
  // Extract row content using proven method
  const parsed = extractRowContent(tableName);
  const rowContent = parsed?.rowContent || '';
  const enumRefs = parsed?.enumRefs || [];
  const hasJson = parsed?.hasJson || false;
  
  if (!rowContent) {
    logWarning(`Could not extract row content for ${tableName}, generating basic types only`);
  }
  
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
  
  // Enum exports
  const enumExports = generateEnumExports(enumRefs);
  if (enumExports) {
    content += enumExports + '\n\n';
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
  if (category.generatePublicInterface || category.generateFormInterface) {
    content += `\n// =====================================================\n`;
    content += `// DERIVED TYPES\n`;
    content += `// =====================================================\n\n`;
  }
  
  if (category.generatePublicInterface && rowContent) {
    content += generatePublicInterface(tableName, rowContent) + '\n';
  }
  
  if (category.generateFormInterface && rowContent) {
    content += generateFormDataInterface(tableName, rowContent) + '\n';
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

export function generateViewTypes(view: EnrichedView): GeneratedTypeFile {
  const { name: viewName, deityFolder, handlingLevel } = view;
  const pascalName = toPascalCase(viewName);
  
  let content = generateHeader(viewName, deityFolder, 'view', handlingLevel);
  content += `import type { Tables } from '@/types/supabase/database.helpers';\n\n`;
  
  content += `// =====================================================\n`;
  content += `// VIEW TYPE (Read-only)\n`;
  content += `// =====================================================\n\n`;
  
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

export function generateTypeEnumFile(typeEnum: EnrichedTypeEnum): GeneratedTypeFile {
  const { name: enumName, deityFolder, handlingLevel } = typeEnum;
  const pascalName = toPascalCase(enumName);
  
  let content = generateHeader(enumName, deityFolder, 'type_enum', handlingLevel);
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

export function generateMultipleViewTypes(
  views: EnrichedView[],
  options?: GenerateTypesOptions
): GeneratedTypeFile[] {
  const results: GeneratedTypeFile[] = [];
  
  for (const view of views) {
    if (view.shouldGenerateTypes) {
      results.push(generateViewTypes(view));
    }
  }
  
  return results;
}

export function generateMultipleTypeEnumFiles(
  typeEnums: EnrichedTypeEnum[]
): GeneratedTypeFile[] {
  const results: GeneratedTypeFile[] = [];
  
  for (const typeEnum of typeEnums) {
    results.push(generateTypeEnumFile(typeEnum));
  }
  
  return results;
}