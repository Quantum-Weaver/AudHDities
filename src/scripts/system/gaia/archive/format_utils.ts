// src/scripts/system/gaia/format_utils.ts
// ============================================================================
// FORMAT UTILITIES (GAIA)
// ============================================================================
// Purpose: Format table definitions into CRUD utility files
// Dependencies: EnrichedTable from enrich_objects, shared utilities
// ============================================================================

import { getTableCategory, type ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { ImportManager } from '../../shared/import_manager.js';
import type { EnrichedTable } from '../enrich/enrich_objects.js';

export interface FormatUtilsOptions {
  verbose?: boolean;
}

export interface FormattedUtility {
  content: string;
  filePath: string;
  tableName: string;
  deityFolder: string;
  category: ObjectCategory;
}

/**
 * Convert snake_case to PascalCase for type names
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Generate header comment for utility file with imports
 */
function generateHeader(tableName: string, deityFolder: string, importManager: ImportManager): string {
  const timestamp = new Date().toISOString();
  const pascalName = toPascalCase(tableName);
  
  // Add all necessary imports to the manager
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'getPaginationParams');
  importManager.addImport('@/lib/api/auth', 'getFilters');
  importManager.addImport('@/lib/api/auth', 'getSortParams');
  
  return `// =====================================================
// FILE: utils/generated/${deityFolder}/${tableName}.ts
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${deityFolder}/${tableName}';
import { ${pascalName}RowSchema, ${pascalName}InsertSchema, ${pascalName}UpdateSchema } from '@/lib/validators/generated/${deityFolder}/${tableName}';

`;
}

/**
 * Generate create utility function
 * Uses RowSchema for strict validation (all fields required)
 */
function generateCreateFunction(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Create a new ${tableName} record
 */
export async function create${pascalName}(data: ${pascalName}Insert): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const validated = ${pascalName}RowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('${tableName}')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating ${tableName}:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

`;
}

/**
 * Generate read utility function (get by ID)
 */
function generateReadFunction(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Get a ${tableName} record by ID
 */
export async function get${pascalName}(id: string): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('${tableName}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

`;
}

/**
 * Generate list utility function (with pagination and filters)
 */
function generateListFunction(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * List ${tableName} records with pagination and filters
 */
export async function list${pascalName}(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ${pascalName}Row[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('${tableName}').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing ${tableName}:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

`;
}

/**
 * Generate update utility function
 */
function generateUpdateFunction(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Update a ${tableName} record
 */
export async function update${pascalName}(id: string, data: ${pascalName}Update): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const validated = ${pascalName}UpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('${tableName}')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating ${tableName}:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

`;
}

/**
 * Generate delete utility function
 */
function generateDeleteFunction(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Delete a ${tableName} record
 */
export async function delete${pascalName}(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('${tableName}')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting ${tableName}:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

`;
}

/**
 * Format a table into a utility file content
 */
function formatUtilityContent(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const importManager = new ImportManager();
  
  let content = generateHeader(tableName, deityFolder, importManager);
  
  // Add import block after header
  const importBlock = importManager.getImportBlock();
  if (importBlock) {
    content += importBlock + '\n\n';
  }
  
  content += `// =====================================================\n`;
  content += `// ${toPascalCase(tableName)} CRUD OPERATIONS\n`;
  content += `// =====================================================\n\n`;
  
  content += generateCreateFunction(tableName);
  content += generateReadFunction(tableName);
  content += generateListFunction(tableName);
  content += generateUpdateFunction(tableName);
  content += generateDeleteFunction(tableName);
  
  return content;
}

/**
 * Format a table into a utility file
 * Accepts EnrichedTable (pre-resolved configuration)
 */
export function formatUtility(
  table: EnrichedTable,
  options?: FormatUtilsOptions
): FormattedUtility | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category, shouldGenerateUtils, rowContent } = table;
  
  // Check if this table needs utilities (using pre-resolved flag from enrichment)
  if (!shouldGenerateUtils) {
    if (verbose) {
      logDebug(`Skipping utility for ${tableName} (not configured for utilities)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Formatting utility: ${tableName} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  // Validate row content exists
  if (!rowContent || rowContent.trim() === '') {
    logWarning(`No row content for ${tableName}, skipping utility generation`);
    return null;
  }
  
  const content = formatUtilityContent(table);
  const filePath = `src/utils/generated/${deityFolder}/${tableName}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName,
    deityFolder,
    category
  };
}

/**
 * Format multiple tables into utility files
 * Accepts pre-enriched tables - no callbacks needed
 */
export function formatUtils(
  tables: EnrichedTable[],
  options?: FormatUtilsOptions
): FormattedUtility[] {
  const { verbose = false } = options || {};
  const results: FormattedUtility[] = [];
  
  if (verbose) {
    logDebug(`Formatting utilities for ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    // Skip if no row content
    if (!table.rowContent || table.rowContent.trim() === '') {
      if (verbose) {
        logDebug(`  Skipping utility for ${table.name} (no row content)`);
      }
      continue;
    }
    
    const formatted = formatUtility(table, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${table.name} -> ${table.deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} utility files`);
  }
  
  return results;
}