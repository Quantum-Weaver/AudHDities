// src/scripts/system/gaia/generate/generate_utils.ts
// ============================================================================
// GENERATE UTILS (GAIA) - Type-First Version
// ============================================================================

import type { EnrichedTable } from '../enrich/enrich_objects.js';
import { logDebug, logSuccess } from '../../../shared/logger.js';
import { ImportManager } from '../../../shared/import_manager.js';

export interface GenerateUtilsOptions {
  verbose?: boolean;
}

export interface GeneratedUtils {
  content: string;
  filePath: string;
  tableName: string;
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

function generateHeader(tableName: string, deityFolder: string): string {
  const timestamp = new Date().toISOString();
  const pascalName = toPascalCase(tableName);
  
  return `// =====================================================
// UTILITIES: ${pascalName}
// DEITY: ${deityFolder}
// GENERATED: ${timestamp}
// =====================================================

`;
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

export function generateUtils(
  table: EnrichedTable,
  options?: GenerateUtilsOptions
): GeneratedUtils | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, shouldGenerateUtils } = table;
  
  if (!shouldGenerateUtils) {
    if (verbose) {
      logDebug(`Skipping utils for ${tableName} (not configured)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Generating utils: ${tableName} -> ${deityFolder}`);
  }
  
  const pascalName = toPascalCase(tableName);
  const importManager = new ImportManager();
  
  // Add imports
  importManager.addImport('@/lib/supabase/client', 'createClient', false);
  importManager.addImport(
    `@/types/generated/${deityFolder}/${tableName}`,
    `${pascalName}Row`,
    true
  );
  importManager.addImport(
    `@/types/generated/${deityFolder}/${tableName}`,
    `${pascalName}Insert`,
    true
  );
  importManager.addImport(
    `@/types/generated/${deityFolder}/${tableName}`,
    `${pascalName}Update`,
    true
  );
  importManager.addImport(
    `@/lib/validators/generated/${deityFolder}/${tableName}`,
    `${pascalName}InsertSchema`,
    false
  );
  importManager.addImport(
    `@/lib/validators/generated/${deityFolder}/${tableName}`,
    `${pascalName}UpdateSchema`,
    false
  );
  
  const importBlock = importManager.getImportBlock();
  
  const content = `${generateHeader(tableName, deityFolder)}
${importBlock}

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new ${tableName} record
 */
export async function create${pascalName}(data: ${pascalName}Insert): Promise<${pascalName}Row> {
  const validated = ${pascalName}InsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('${tableName}')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single ${tableName} record by ID
 */
export async function get${pascalName}(id: string): Promise<${pascalName}Row> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('${tableName}')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of ${tableName} records with pagination
 */
export async function list${pascalName}(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ${pascalName}Row[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('${tableName}').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

/**
 * Update a ${tableName} record
 */
export async function update${pascalName}(id: string, data: ${pascalName}Update): Promise<${pascalName}Row> {
  const validated = ${pascalName}UpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('${tableName}')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a ${tableName} record
 */
export async function delete${pascalName}(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('${tableName}')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
`;
  
  return {
    content,
    filePath: `src/lib/utils/generated/${deityFolder}/${tableName}.ts`,
    tableName,
    deityFolder,
  };
}

/**
 * Generate utils for multiple tables
 */
export function generateMultipleUtils(
  tables: EnrichedTable[],
  options?: GenerateUtilsOptions
): GeneratedUtils[] {
  const { verbose = false } = options || {};
  const results: GeneratedUtils[] = [];
  
  for (const table of tables) {
    const utils = generateUtils(table, options);
    if (utils) {
      results.push(utils);
    }
  }
  
  if (verbose) {
    logSuccess(`Generated ${results.length} util files`);
  }
  
  return results;
}