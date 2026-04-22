// src/scripts/system/gaia/format_utils.ts
// ============================================================================
// FORMAT UTILITIES (GAIA)
// ============================================================================

import type { EnrichedTable } from '../enrich/enrich_objects.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatUtilsOptions {
  verbose?: boolean;
}

export interface FormattedUtility {
  content: string;
  filePath: string;
  tableName: string;
  deityFolder: string;
}

function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

function generateHeader(table: EnrichedTable): string {
  const timestamp = new Date().toISOString();
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  
  return `// =====================================================
// UTILITIES: ${pascalName}
// GENERATED: ${timestamp}
// DEITY: ${deityFolder}
// =====================================================

import { createClient } from '@/lib/supabase/client';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${deityFolder}/${tableName}';

`;
}

function generateCreateFunction(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `export async function create${pascalName}(data: ${pascalName}Insert): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const supabase = createClient();
    
    const { data: result, error } = await supabase
      .from('${tableName}')
      .insert(data)
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

function generateReadFunction(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `export async function get${pascalName}(id: string): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const supabase = createClient();
    
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

function generateListFunction(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `export async function list${pascalName}(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ${pascalName}Row[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
    const supabase = createClient();
    
    let query = supabase.from('${tableName}').select('*', { count: 'exact' });
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    query = query.order(sort, { ascending: order === 'asc' });
    
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

function generateUpdateFunction(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `export async function update${pascalName}(id: string, data: ${pascalName}Update): Promise<{ data: ${pascalName}Row | null; error: string | null }> {
  try {
    const supabase = createClient();
    
    const { data: result, error } = await supabase
      .from('${tableName}')
      .update(data)
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

function generateDeleteFunction(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `export async function delete${pascalName}(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createClient();
    
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

export function formatUtility(
  table: EnrichedTable,
  options?: FormatUtilsOptions
): FormattedUtility | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, shouldGenerateUtils } = table;
  
  if (!shouldGenerateUtils) {
    if (verbose) logDebug(`Skipping utils for ${tableName}`);
    return null;
  }
  
  if (verbose) logDebug(`Formatting utils: ${tableName} -> ${deityFolder}`);
  
  let content = generateHeader(table);
  content += generateCreateFunction(table);
  content += generateReadFunction(table);
  content += generateListFunction(table);
  content += generateUpdateFunction(table);
  content += generateDeleteFunction(table);
  
  const filePath = `src/utils/generated/${deityFolder}/${tableName}.ts`;
  
  return { content, filePath, tableName, deityFolder };
}

export function formatUtils(
  tables: EnrichedTable[],
  options?: FormatUtilsOptions
): FormattedUtility[] {
  const results: FormattedUtility[] = [];
  for (const table of tables) {
    const formatted = formatUtility(table, options);
    if (formatted) results.push(formatted);
  }
  return results;
}