// src/scripts/system/gaia/format_hooks.ts
// ============================================================================
// FORMAT HOOKS (GAIA) - ACCEPTS SINGLE TABLE OBJECT
// ============================================================================
// Purpose: Format table definitions into React hooks
// Dependencies: EnrichedTable (single object, not array)
// Output: src/hooks/generated/{deityFolder}/{tableName}.ts
// ============================================================================

import type { EnrichedTable } from './enrich_objects.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatHooksOptions {
  verbose?: boolean;
}

export interface FormattedHook {
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
// HOOKS: ${pascalName}
// GENERATED: ${timestamp}
// DEITY: ${deityFolder}
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${deityFolder}/${tableName}';

`;
}

function generateUseTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = `use${pascalName}`;
  
  return `export function ${hookName}(id: string | undefined) {
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
      const response = await fetch(\`/api/generated/${deityFolder}/${tableName}/\${id}\`);
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

function generateUseTableListHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = `use${pascalName}List`;
  
  return `export function ${hookName}(params?: {
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
      
      const url = \`/api/generated/${deityFolder}/${tableName}?\${searchParams.toString()}\`;
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

function generateUseCreateTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = `useCreate${pascalName}`;
  
  return `export function ${hookName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ${pascalName}Insert) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generated/${deityFolder}/${tableName}', {
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

function generateUseUpdateTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = `useUpdate${pascalName}`;
  
  return `export function ${hookName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: ${pascalName}Update) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`/api/generated/${deityFolder}/${tableName}/\${id}\`, {
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

function generateUseDeleteTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = `useDelete${pascalName}`;
  
  return `export function ${hookName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`/api/generated/${deityFolder}/${tableName}/\${id}\`, {
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
 * Format a single table into hook files
 * Accepts EnrichedTable (single object)
 */
export function formatHooks(
  table: EnrichedTable,
  options?: FormatHooksOptions
): FormattedHook[] {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, shouldGenerateHooks } = table;
  const results: FormattedHook[] = [];
  
  if (!shouldGenerateHooks) {
    if (verbose) logDebug(`Skipping hooks for ${tableName}`);
    return results;
  }
  
  if (verbose) logDebug(`Formatting hooks for: ${tableName} -> ${deityFolder}`);
  
  let content = generateHeader(table);
  content += generateUseTableHook(table);
  content += generateUseTableListHook(table);
  content += generateUseCreateTableHook(table);
  content += generateUseUpdateTableHook(table);
  content += generateUseDeleteTableHook(table);
  
  const filePath = `src/hooks/generated/${deityFolder}/${tableName}.ts`;
  
  results.push({ content, filePath, tableName, deityFolder });
  
  if (verbose) logDebug(`  Generated hooks for ${tableName}`);
  
  return results;
}

/**
 * Format multiple tables into hook files
 * Accepts array of EnrichedTable
 */
export function formatMultipleHooks(
  tables: EnrichedTable[],
  options?: FormatHooksOptions
): FormattedHook[] {
  const { verbose = false } = options || {};
  const results: FormattedHook[] = [];
  
  for (const table of tables) {
    results.push(...formatHooks(table, options));
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} hook files`);
  }
  
  return results;
}