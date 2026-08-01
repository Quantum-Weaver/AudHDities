/* src/scripts/system/gaia/generate/generate_validators.ts */
// Phase: Generate Zod validation schemas from table Row/Insert types

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';
import { stageFileChange } from '../../../modules/system/staging.js';
import { ImportManager } from '../../../shared/import_manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../../../../');

export interface GenerateValidatorsOptions {
  verbose?: boolean;
  dryRun?: boolean;
  forceOverwrite?: boolean;
  outputBase?: string;  // default: 'lib/validators'
}

/**
 * Convert snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Convert database type to Zod schema type
 */
function dbTypeToZod(fieldType: string, fieldName: string): string {
  // Handle nullable types
  const isNullable = fieldType.includes(' | null');
  const baseType = fieldType.replace(' | null', '').trim();
  const camelName = baseType.charAt(0).toLowerCase() + baseType.slice(1);

  let zodType = '';
  
  // Basic types
  if (baseType === 'string') {
    zodType = 'z.string()';
  } else if (baseType === 'id') {
    zodType = 'z.string().uuid()';
  } else if (baseType === 'email') {
    zodType = 'z.string().email()';
  } else if (baseType === 'number') {
    zodType = 'z.number()';
  } else if (baseType === 'boolean') {
    zodType = 'z.boolean()';
  } else if (baseType === 'Json') {
    zodType = 'z.any()';
  } else if (baseType.match(/^[A-Z]\w+$/)) {
    // Enum reference (PascalCase type name)
    zodType = `z.enum(ENUM_VALUES.${camelName})`;
  } else if (baseType.includes('|')) {
    // Union type - treat as enum
    const values = baseType.split('|').map(v => v.trim().replace(/['"]/g, ''));
    zodType = `z.enum(ENUM_VALUES.${camelName})`;
  } else {
    // Fallback
    zodType = 'z.any()';
  }
  
  // Add nullable if needed
  if (isNullable) {
    zodType = `${zodType}.nullable()`;
  }
  
  return zodType;
}

/**
 * Parse table content to extract Row, Insert, and Update sections using brace counting
 */
export function parseTableSections(content: string): { rowContent: string; insertContent: string; updateContent: string } {
  const lines = content.split('\n');
  
  let rowStartLine = -1;
  let rowEndLine = -1;
  let insertStartLine = -1;
  let insertEndLine = -1;
  let updateStartLine = -1;
  let updateEndLine = -1;
  
  // Find section start lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Row:\s*\{/)) {
      rowStartLine = i;
    }
    if (line.match(/^\s*Insert:\s*\{/)) {
      insertStartLine = i;
    }
    if (line.match(/^\s*Update:\s*\{/)) {
      updateStartLine = i;
    }
  }
  
  let rowContent = '';
  let insertContent = '';
  let updateContent = '';
  
  // Helper to find closing brace
  function findClosingBrace(startIdx: number): number {
    let braceCount = 0;
    let foundOpen = false;
    for (let i = startIdx; i < lines.length; i++) {
      for (const char of lines[i]) {
        if (char === '{') {
          braceCount++;
          foundOpen = true;
        }
        if (char === '}') {
          braceCount--;
        }
      }
      if (foundOpen && braceCount === 0) {
        return i;
      }
    }
    return -1;
  }
  
  // Extract Row content (between Row: { and Insert: {)
  if (rowStartLine !== -1 && insertStartLine !== -1) {
    rowEndLine = insertStartLine - 1;
    const rowLines = lines.slice(rowStartLine + 1, rowEndLine);
    rowContent = rowLines.join('\n').trim();
    if (rowContent.endsWith('}')) {
      rowContent = rowContent.slice(0, -1).trim();
    }
  }
  
  // Extract Insert content (between Insert: { and Update: {)
  if (insertStartLine !== -1 && updateStartLine !== -1) {
    insertEndLine = updateStartLine - 1;
    const insertLines = lines.slice(insertStartLine + 1, insertEndLine);
    insertContent = insertLines.join('\n').trim();
    if (insertContent.endsWith('}')) {
      insertContent = insertContent.slice(0, -1).trim();
    }
  } else if (insertStartLine !== -1) {
    // Fallback if no Update section
    const insertCloseLine = findClosingBrace(insertStartLine);
    if (insertCloseLine !== -1) {
      insertEndLine = insertCloseLine;
      const insertLines = lines.slice(insertStartLine + 1, insertEndLine);
      insertContent = insertLines.join('\n').trim();
      if (insertContent.endsWith('}')) {
        insertContent = insertContent.slice(0, -1).trim();
      }
    }
  }
  
  // Extract Update content
  if (updateStartLine !== -1) {
    const updateCloseLine = findClosingBrace(updateStartLine);
    if (updateCloseLine !== -1) {
      updateEndLine = updateCloseLine;
      const updateLines = lines.slice(updateStartLine + 1, updateEndLine);
      updateContent = updateLines.join('\n').trim();
      if (updateContent.endsWith('}')) {
        updateContent = updateContent.slice(0, -1).trim();
      }
    }
  }
  
  return { rowContent, insertContent, updateContent };
}

/**
 * Generate Zod schema for a table's Row type
 */
function generateRowSchema(tableName: string, rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName);
      fields.push(`  ${fieldName}: ${zodType},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Row schema`;
  }
  
  return `export const ${pascalName}RowSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate Zod schema for a table's Insert type
 */
function generateInsertSchema(tableName: string, insertContent: string): string {
  const lines = insertContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+)(\??):\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const hasQuestionMark = fieldMatch[2] === '?';
      const fieldType = fieldMatch[3].trim();
      
      const zodType = dbTypeToZod(fieldType, fieldName);
      
      // If field has '?', make it optional; otherwise required
      if (hasQuestionMark) {
        fields.push(`  ${fieldName}: ${zodType}.optional(),`);
      } else {
        fields.push(`  ${fieldName}: ${zodType},`);
      }
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Insert schema`;
  }
  
  return `export const ${pascalName}InsertSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate Zod schema for a table's Update type
 */
function generateUpdateSchema(tableName: string, updateContent: string): string {
  const lines = updateContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+)\??:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName);
      // All fields optional for update
      const optionalZod = `${zodType}.optional()`;
      fields.push(`  ${fieldName}: ${optionalZod},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Update schema`;
  }
  
  return `export const ${pascalName}UpdateSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate complete validator file content for a single table
 */
export function generateValidatorContent(tableName: string, rowContent: string, insertContent: string, updateContent: string): string {
  const pascalName = toPascalCase(tableName);
  const importManager = new ImportManager();
  
  // Always need zod
  importManager.addDefaultImport('zod', 'z');
  
  // Detect enums from row and insert content
  const allContent = rowContent + '\n' + insertContent;
  const enumMatches = allContent.match(/[A-Z][a-zA-Z0-9]*/g) || [];
  const commonTypes = ['Json', 'Date', 'string', 'number', 'boolean'];
  const enumTypes = [...new Set(enumMatches.filter(t => !commonTypes.includes(t) && t.length > 1))];
  
  // If enums exist, import ENUM_VALUES
  if (enumTypes.length > 0) {
    importManager.addImport('@/types/supabase/enums', 'ENUM_VALUES', false);
  }
  
  const imports = importManager.getImportBlock();
  
  let content = `// =====================================================
// FILE: validators/${tableName}.ts
// GENERATED FROM: database.types.ts
// =====================================================

${imports}

// =====================================================
// ${pascalName} SCHEMAS
// =====================================================

`;

  if (rowContent && rowContent.trim()) {
    content += generateRowSchema(tableName, rowContent) + '\n\n';
  }
  
  if (insertContent && insertContent.trim()) {
    content += generateInsertSchema(tableName, insertContent) + '\n\n';
  }
  
  if (updateContent && updateContent.trim()) {
    content += generateUpdateSchema(tableName, updateContent) + '\n\n';
  }

  content += `// =====================================================
// TYPE INFERENCE
// =====================================================

export type ${pascalName}RowInput = z.infer<typeof ${pascalName}RowSchema>;
export type ${pascalName}InsertInput = z.infer<typeof ${pascalName}InsertSchema>;
export type ${pascalName}UpdateInput = z.infer<typeof ${pascalName}UpdateSchema>;
`;
  
  return content;
}

/**
 * Generate validator file for a single table
 */
export async function generateValidatorForTable(
  tableName: string,
  tableContent: string,
  options: GenerateValidatorsOptions = {}
): Promise<{ success: boolean; filePath: string; message: string; action: string }> {
  const { verbose = false, dryRun = false, forceOverwrite = false, outputBase = 'lib/validators' } = options;
  
  // Parse the table content
  const { rowContent, insertContent, updateContent } = parseTableSections(tableContent);
  
  if (!rowContent && !insertContent) {
    return { success: false, filePath: '', message: `No content found for ${tableName}`, action: 'failed' };
  }
  
  const content = generateValidatorContent(tableName, rowContent, insertContent, updateContent);
  const outputPath = path.join(PROJECT_ROOT, outputBase, `${tableName}.ts`);
  
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    if (verbose) logDebug(`Created directory: ${outputDir}`);
  }
  
  // Check if file exists
  const exists = fs.existsSync(outputPath);
  
  if (dryRun) {
    if (verbose) {
      logInfo(`[DRY RUN] Would create validator: ${outputPath}`);
    }
    return { success: true, filePath: outputPath, message: `Would create ${outputPath}`, action: 'dryrun' };
  }
  
  // If file exists and not forcing overwrite, stage the change
  if (exists && !forceOverwrite) {
    const existingContent = fs.readFileSync(outputPath, 'utf-8');
    if (existingContent === content) {
      if (verbose) logDebug(`Validator unchanged: ${outputPath}`);
      return { success: true, filePath: outputPath, message: 'Unchanged', action: 'skipped' };
    }
    
    // Stage the change
    const stageResult = stageFileChange(outputPath, content, { verbose });
    if (stageResult.staged) {
      if (verbose) {
        logWarning(`Validator changes staged for: ${tableName}`);
        logInfo(`  Review: ${stageResult.stagingPath}`);
      }
      return { success: true, filePath: outputPath, message: 'Staged for review', action: 'staged' };
    }
  }
  
  // Write the file (new file or forced overwrite)
  fs.writeFileSync(outputPath, content, 'utf-8');
  if (exists) {
    logWarning(`Validator overwritten: ${outputPath}`);
    return { success: true, filePath: outputPath, message: 'Overwritten', action: 'updated' };
  } else {
    logSuccess(`Validator created: ${outputPath}`);
    return { success: true, filePath: outputPath, message: 'Created', action: 'created' };
  }
}

/**
 * Generate validators for multiple tables
 */
export async function generateValidatorsForTables(
  tables: Array<{ name: string; content: string }>,
  options: GenerateValidatorsOptions = {}
): Promise<{ created: number; updated: number; staged: number; skipped: number; errors: string[] }> {
  const { verbose = false } = options;
  
  const result = {
    created: 0,
    updated: 0,
    staged: 0,
    skipped: 0,
    errors: [] as string[]
  };
  
  for (const table of tables) {
    const fileResult = await generateValidatorForTable(table.name, table.content, options);
    
    if (fileResult.success) {
      if (fileResult.action === 'created') result.created++;
      else if (fileResult.action === 'updated') result.updated++;
      else if (fileResult.action === 'staged') result.staged++;
      else if (fileResult.action === 'skipped') result.skipped++;
    } else {
      result.errors.push(fileResult.message);
    }
  }
  
  if (verbose) {
    console.log('');
    logSeparator('─', 40);
    logInfo('VALIDATOR GENERATION SUMMARY');
    logSeparator('─', 40);
    logSuccess(`Created: ${result.created}`);
    if (result.updated > 0) logWarning(`Updated: ${result.updated}`);
    if (result.staged > 0) logInfo(`Staged for review: ${result.staged}`);
    logInfo(`Skipped: ${result.skipped}`);
    if (result.errors.length > 0) logError(`Errors: ${result.errors.length}`);
  }
  
  return result;
}