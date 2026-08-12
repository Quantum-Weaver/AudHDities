// src/scripts/system/gaia/generate/generate_hooks.ts
// ============================================================================
// GENERATE HOOKS (GAIA) - Type-First Version
// ============================================================================
// Purpose: Generate React hooks for tables using Tables<> helper types
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess } from '../../../shared/logger.js';
import type { EnrichedTable } from '../enrich/enrich_objects.js';

export interface GenerateHooksOptions {
  verbose?: boolean;
}

export interface GeneratedHook {
  content: string;
  filePath: string;
  tableName: string;
  deityFolder: string;
  category: ObjectCategory;
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

function toHookName(tableName: string): string {
  return `use${toPascalCase(tableName)}`;
}

function generateHeader(table: EnrichedTable): string {
  const timestamp = new Date().toISOString();
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const typesImportPath = `@/lib/generated/types/${deityFolder}/${tableName}`;
  
  return `// =====================================================
// HOOKS: ${tableName}
// GENERATED: ${timestamp}
// DEITY: ${deityFolder}
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '${typesImportPath}';

`;
}

// ============================================================================
// HOOK GENERATORS
// ============================================================================

function generateUseTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Fetch a single ${tableName} record by ID
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
}`;
}

function generateUseTableListHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  const hookName = toHookName(tableName);
  
  return `/**
 * Fetch a paginated list of ${tableName} records
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
}`;
}

function generateUseCreateTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Create a new ${tableName} record
 */
export function useCreate${pascalName}() {
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
}`;
}

function generateUseUpdateTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Update a ${tableName} record
 */
export function useUpdate${pascalName}() {
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
}`;
}

function generateUseDeleteTableHook(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  
  return `/**
 * Delete a ${tableName} record
 */
export function useDelete${pascalName}() {
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

  return { deleteRecord, loading, error };
}`;
}

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate hooks for a single table
 */
export function generateHooks(
  table: EnrichedTable,
  options?: GenerateHooksOptions
): GeneratedHook | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category, shouldGenerateHooks } = table;
  
  // ✅ FIXED: No rowContent check - types come from helpers!
  if (!shouldGenerateHooks) {
    if (verbose) {
      logDebug(`Skipping hooks for ${tableName} (not configured)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Generating hooks for: ${tableName} -> ${deityFolder}`);
  }
  
  let content = generateHeader(table);
  content += `// =====================================================\n`;
  content += `// ${toPascalCase(tableName)} HOOKS\n`;
  content += `// =====================================================\n\n`;
  
  content += generateUseTableHook(table) + '\n\n';
  content += generateUseTableListHook(table) + '\n\n';
  content += generateUseCreateTableHook(table) + '\n\n';
  content += generateUseUpdateTableHook(table) + '\n\n';
  content += generateUseDeleteTableHook(table) + '\n';
  
  return {
    content,
    filePath: `src/hooks/generated/${deityFolder}/${tableName}.ts`,
    tableName,
    deityFolder,
    category,
  };
}

/**
 * Generate hooks for multiple tables
 */
export function generateMultipleHooks(
  tables: EnrichedTable[],
  options?: GenerateHooksOptions
): GeneratedHook[] {
  const { verbose = false } = options || {};
  const results: GeneratedHook[] = [];
  
  if (verbose) {
    logDebug(`Generating hooks for ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    const hooks = generateHooks(table, options);
    if (hooks) {
      results.push(hooks);
      
      if (verbose) {
        logDebug(`  Generated hooks for ${table.name} -> ${table.deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Generated ${results.length} hook files`);
  }
  
  return results;
}