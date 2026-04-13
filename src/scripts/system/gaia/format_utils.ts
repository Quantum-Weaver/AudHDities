// src/scripts/generators/gaia/formatUtils.ts
// ============================================================================
// FORMAT UTILITIES (GAIA)
// ============================================================================
// Purpose: Format table definitions into CRUD utility files
// Dependencies: types from extractTables, workflow_config
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatUtilsOptions {
  verbose?: boolean;
  deityFolder?: string;
  category?: ObjectCategory;
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
 * Convert table name to hook name (e.g., profiles -> useProfiles)
 */
function toHookName(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  return `use${pascalName}`;
}

/**
 * Generate header comment for utility file
 */
function generateHeader(tableName: string, deityFolder: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: utils/generated/${deityFolder}/${tableName}.ts
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

import type { ${toPascalCase(tableName)}Row, ${toPascalCase(tableName)}Insert, ${toPascalCase(tableName)}Update } from '@/types/generated/${deityFolder}/${tableName}.ts';
import { ${toPascalCase(tableName)}InsertSchema, ${toPascalCase(tableName)}UpdateSchema } from '@/lib/validators/generated/${tableName}.ts';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

`;
}

/**
 * Generate create utility function
 */
function generateCreateFunction(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Create a new ${tableName} record
 */
export async function create${pascalName}(data: ${pascalName}Insert): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const validated = ${pascalName}InsertSchema.parse(data);
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
function formatUtilityContent(tableInfo: TableInfo, deityFolder: string): string {
  const { name: tableName } = tableInfo;
  
  let content = generateHeader(tableName, deityFolder);
  
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
 */
export function formatUtility(
  tableInfo: TableInfo,
  deityFolder: string,
  category: ObjectCategory,
  options?: FormatUtilsOptions
): FormattedUtility {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug(`Formatting utility: ${tableInfo.name} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  const content = formatUtilityContent(tableInfo, deityFolder);
  const filePath = `src/utils/generated/${deityFolder}/${tableInfo.name}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName: tableInfo.name,
    deityFolder,
    category
  };
}

/**
 * Format multiple tables into utility files
 * Only formats tables with full_crud handling level
 */
export function formatUtils(
  tables: TableInfo[],
  getDeityFolder: (tableName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  shouldGenerate: (tableName: string) => boolean,
  options?: FormatUtilsOptions
): FormattedUtility[] {
  const { verbose = false } = options || {};
  const results: FormattedUtility[] = [];
  
  if (verbose) {
    logDebug(`Formatting utilities for ${tables.length} tables...`);
  }
  
  for (const tableInfo of tables) {
    if (!shouldGenerate(tableInfo.name)) {
      if (verbose) {
        logDebug(`  Skipping utility for ${tableInfo.name} (not full_crud)`);
      }
      continue;
    }
    
    const deityFolder = getDeityFolder(tableInfo.name);
    const category = getCategory(tableInfo.name);
    const formatted = formatUtility(tableInfo, deityFolder, category, options);
    results.push(formatted);
    
    if (verbose) {
      logDebug(`  Formatted: ${tableInfo.name} -> ${deityFolder}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} utility files`);
  }
  
  return results;
}