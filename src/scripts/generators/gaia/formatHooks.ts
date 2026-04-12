// src/scripts/generators/gaia/formatHooks.ts
// ============================================================================
// FORMAT HOOKS (GAIA)
// ============================================================================
// Purpose: Format table definitions into React hooks
// Dependencies: types from extractTables, workflow-config
// ============================================================================

import type { TableInfo } from './extractTables.js';
import type { ObjectCategory } from '@/config/object-categories.js';

export interface FormatHooksOptions {
  verbose?: boolean;
  category?: ObjectCategory;
}

export interface FormattedHook {
  content: string;
  filePath: string;
  tableName: string;
  hookType: 'useTable' | 'useTableList' | 'useCreateTable' | 'useUpdateTable' | 'useDeleteTable';
}

// ============================================================================
// MAIN FORMATTING FUNCTION
// ============================================================================

/**
 * Format a table into React hooks
 */
export function formatHooks(
  tableInfo: TableInfo,
  category: ObjectCategory,
  options?: FormatHooksOptions
): FormattedHook[] {
  // TODO: Generate use[Table] hook (fetch single)
  // TODO: Generate use[Table]List hook (fetch list with filters)
  // TODO: Generate useCreate[Table] hook (create mutation)
  // TODO: Generate useUpdate[Table] hook (update mutation)
  // TODO: Generate useDelete[Table] hook (delete mutation)
  // TODO: Return array of FormattedHook
}

/**
 * Format multiple tables into React hooks
 */
export function formatMultipleHooks(
  tables: TableInfo[],
  getCategory: (tableName: string) => ObjectCategory,
  options?: FormatHooksOptions
): FormattedHook[] {
  // TODO: Format each table (only full_crud)
  // TODO: Return array of FormattedHook
}