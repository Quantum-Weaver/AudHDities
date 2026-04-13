// @/scripts/generators/gaia/formatHooks.ts
// ============================================================================
// FORMAT HOOKS (GAIA)
// ============================================================================
// Purpose: Format table definitions into React hooks
// Dependencies: types from extractTables, API routes
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatHooksOptions {
  verbose?: boolean;
  category?: ObjectCategory;
}

export interface FormattedHook {
  content: string;
  filePath: string;
  tableName: string;
  hookType: 'useTable' | 'useTableList' | 'useCreateTable' | 'useUpdateTable' | 'useDeleteTable';
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
 * Generate header comment for hook file
 */
function generateHeader(tableName: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// HOOK: ${toHookName(tableName)}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { ${toPascalCase(tableName)}Row, ${toPascalCase(tableName)}Insert, ${toPascalCase(tableName)}Update } from '@/types/generated/hestia-core/${tableName}.ts';

`;
}

/**
 * Generate use[Table] hook (fetch single record)
 */
function generateUseTableHook(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Hook to fetch a single ${tableName} record
 */
export function ${hookName}(id: string | undefined) {
  const [data, setData] = useState<${pascalName}Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(\`/api/generated/${tableName}/\${id}\`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
`;
}

/**
 * Generate use[Table]List hook (fetch list with pagination)
 */
function generateUseTableListHook(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Hook to fetch a list of ${tableName} records with pagination
 */
export function ${hookName}List(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}) {
  const [data, setData] = useState<${pascalName}Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));
      if (params?.sort) searchParams.set('sort', params.sort);
      if (params?.order) searchParams.set('order', params.order);
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          searchParams.set(key, value);
        });
      }
      
      const url = \`/api/generated/${tableName}?\${searchParams.toString()}\`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data.data || result.data || []);
        setTotal(result.data.pagination?.total || result.data.length || 0);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
}
`;
}

/**
 * Generate useCreate[Table] hook (create mutation)
 */
function generateUseCreateTableHook(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Hook to create a new ${tableName} record
 */
export function useCreate${pascalName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ${pascalName}Insert) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generated/${tableName}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { data: result.data, error: null };
      } else {
        setError(result.error);
        return { data: null, error: result.error };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}
`;
}

/**
 * Generate useUpdate[Table] hook (update mutation)
 */
function generateUseUpdateTableHook(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Hook to update a ${tableName} record
 */
export function useUpdate${pascalName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: ${pascalName}Update) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`/api/generated/${tableName}/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { data: result.data, error: null };
      } else {
        setError(result.error);
        return { data: null, error: result.error };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}
`;
}

/**
 * Generate useDelete[Table] hook (delete mutation)
 */
function generateUseDeleteTableHook(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Hook to delete a ${tableName} record
 */
export function useDelete${pascalName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`/api/generated/${tableName}/\${id}\`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { success: true, error: null };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: deleteRecord, loading, error };
}
`;
}

/**
 * Format a table into a hook file content
 */
function formatHookContent(tableName: string): string {
  let content = generateHeader(tableName);
  
  content += `// =====================================================\n`;
  content += `// ${toPascalCase(tableName)} HOOKS\n`;
  content += `// =====================================================\n\n`;
  
  content += generateUseTableHook(tableName);
  content += `\n`;
  content += generateUseTableListHook(tableName);
  content += `\n`;
  content += generateUseCreateTableHook(tableName);
  content += `\n`;
  content += generateUseUpdateTableHook(tableName);
  content += `\n`;
  content += generateUseDeleteTableHook(tableName);
  
  return content;
}

/**
 * Format a table into a hook file
 */
export function formatHook(
  tableInfo: TableInfo,
  deityFolder: string,
  category: ObjectCategory,
  options?: FormatHooksOptions
): FormattedHook[] {
  const { verbose = false } = options || {};
  const { name: tableName } = tableInfo;
  const results: FormattedHook[] = [];
  
  if (verbose) {
    logDebug(`Formatting hooks for: ${tableName} (${category.handlingLevel})`);
  }
  
  const content = formatHookContent(tableName);
  const filePath = `@/hooks/generated/${tableName}.ts`;
  
  // Main hook file contains all hooks
  results.push({
    content,
    filePath,
    tableName,
    hookType: 'useTable',
    deityFolder,
    category
  });
  
  if (verbose) {
    logDebug(`  Formatted hooks for ${tableName} -> ${filePath}`);
  }
  
  return results;
}

/**
 * Format multiple tables into hook files
 * Only formats tables with full_crud handling level
 */
export function formatMultipleHooks(
  tables: TableInfo[],
  getDeityFolder: (tableName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  shouldGenerate: (tableName: string) => boolean,
  options?: FormatHooksOptions
): FormattedHook[] {
  const { verbose = false } = options || {};
  const results: FormattedHook[] = [];
  
  if (verbose) {
    logDebug(`Formatting hooks for ${tables.length} tables...`);
  }
  
  for (const tableInfo of tables) {
    if (!shouldGenerate(tableInfo.name)) {
      if (verbose) {
        logDebug(`  Skipping hooks for ${tableInfo.name} (not full_crud)`);
      }
      continue;
    }
    
    const deityFolder = getDeityFolder(tableInfo.name);
    const category = getCategory(tableInfo.name);
    const hooks = formatHook(tableInfo, deityFolder, category, options);
    results.push(...hooks);
    
    if (verbose) {
      logDebug(`  Formatted hooks for ${tableInfo.name}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} hook files`);
  }
  
  return results;
}