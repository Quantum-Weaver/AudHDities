// src/hooks/useSchema.ts
// =====================================================
// HOOK: useSchema
// Fetches database schema information from the API
// =====================================================

import { useState, useEffect, useCallback } from 'react';

export interface SchemaTableColumn {
  table_name: string;
  column_name: string;
  column_type: string;
  is_nullable: string;
  column_default: string | null;
  is_primary_key: boolean;
  is_foreign_key: boolean;
  foreign_key_table: string | null;
  foreign_key_column: string | null;
}

export interface SchemaEnum {
  enum_name: string;
  enum_value: string;
  enum_order: number;
}

export interface SchemaFunction {
  function_name: string;
  function_args: string;
  return_type: string;
  is_aggregate: boolean;
  is_window: boolean;
  is_procedure: boolean;
}

export interface SchemaData {
  tables: SchemaTableColumn[];
  enums: SchemaEnum[];
  functions: SchemaFunction[];
  generatedAt: string;
  totalTables: number;
  totalEnums: number;
  totalFunctions: number;
}

export interface UseSchemaReturn {
  data: SchemaData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getTableColumns: (tableName: string) => SchemaTableColumn[];
  getEnumValues: (enumName: string) => string[];
}

/**
 * Hook to fetch database schema information
 */
export function useSchema(): UseSchemaReturn {
  const [data, setData] = useState<SchemaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchema = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/schema');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch schema');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchema();
  }, [fetchSchema]);

  // Helper: Get columns for a specific table
  const getTableColumns = useCallback((tableName: string): SchemaTableColumn[] => {
    if (!data?.tables) return [];
    return data.tables.filter(col => col.table_name === tableName);
  }, [data]);

  // Helper: Get values for a specific enum
  const getEnumValues = useCallback((enumName: string): string[] => {
    if (!data?.enums) return [];
    return data.enums
      .filter(e => e.enum_name === enumName)
      .sort((a, b) => a.enum_order - b.enum_order)
      .map(e => e.enum_value);
  }, [data]);

  return {
    data,
    loading,
    error,
    refetch: fetchSchema,
    getTableColumns,
    getEnumValues,
  };
}

/**
 * Hook to get a specific table's schema
 */
export function useTableSchema(tableName: string) {
  const { data, loading, error, getTableColumns } = useSchema();
  
  return {
    columns: getTableColumns(tableName),
    loading,
    error,
    exists: getTableColumns(tableName).length > 0,
  };
}

/**
 * Hook to get a specific enum's values
 */
export function useEnumValues(enumName: string) {
  const { data, loading, error, getEnumValues } = useSchema();
  
  return {
    values: getEnumValues(enumName),
    loading,
    error,
    exists: getEnumValues(enumName).length > 0,
  };
}