// scripts/generate/hook-generator.ts
import { TableInfo } from './parser';

export interface HookFilePreview {
  tableName: string;
  filePath: string;
  content: string;
  action: 'create' | 'update' | 'skip';
  reason?: string;
}

export function previewHookFile(table: TableInfo): HookFilePreview {
  const filePath = `src/hooks/use${toPascalCase(table.name)}.ts`;
  
  // Simulate check
  const exists = false;
  
  if (exists) {
    return {
      tableName: table.name,
      filePath,
      content: '',
      action: 'skip',
      reason: 'File already exists',
    };
  }
  
  const content = generateHookContent(table);
  
  return {
    tableName: table.name,
    filePath,
    content,
    action: 'create',
  };
}

function toPascalCase(str: string): string {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function generateHookContent(table: TableInfo): string {
  const typeName = toPascalCase(table.name);
  const hookName = `use${typeName}`;
  const listHookName = `use${typeName}s`;
  
  return `// hooks/use${toPascalCase(table.name)}.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ${typeName}, ${typeName}Insert, ${typeName}Update } from '@/types/supabase/${table.name}';

interface Use${typeName}Options {
  id?: string;
  limit?: number;
}

export function ${listHookName}(options: Use${typeName}Options = {}) {
  const [items, setItems] = useState<${typeName}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from('${table.name}').select('*');
      
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch'));
    } finally {
      setLoading(false);
    }
  }, [options.limit, supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
}

export function ${hookName}(id?: string) {
  const [item, setItem] = useState<${typeName} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchItem = useCallback(async () => {
    if (!id) {
      setItem(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('${table.name}')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch'));
    } finally {
      setLoading(false);
    }
  }, [id, supabase]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const create = async (data: ${typeName}Insert): Promise<${typeName} | null> => {
    try {
      const { data: result, error: createError } = await supabase
        .from('${table.name}')
        .insert(data)
        .select()
        .single();
      
      if (createError) throw createError;
      await fetchItem();
      return result;
    } catch (err) {
      console.error('Error creating:', err);
      return null;
    }
  };

  const update = async (updates: ${typeName}Update): Promise<${typeName} | null> => {
    if (!id) return null;
    
    try {
      const { data: result, error: updateError } = await supabase
        .from('${table.name}')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (updateError) throw updateError;
      setItem(result);
      return result;
    } catch (err) {
      console.error('Error updating:', err);
      return null;
    }
  };

  const remove = async (): Promise<boolean> => {
    if (!id) return false;
    
    try {
      const { error: deleteError } = await supabase
        .from('${table.name}')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      setItem(null);
      return true;
    } catch (err) {
      console.error('Error deleting:', err);
      return false;
    }
  };

  return {
    item,
    loading,
    error,
    refresh: fetchItem,
    create,
    update,
    delete: remove,
  };
}
`}
