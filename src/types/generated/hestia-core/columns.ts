// =====================================================
// FILE: types/generated/hestia-core/columns.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T01:03:40.949Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ColumnsRow = Tables<'columns'>;
export type ColumnsInsert = TablesInsert<'columns'>;
export type ColumnsUpdate = TablesUpdate<'columns'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of columns
 */
export interface PublicColumns {
  column_default: string | null;
  column_name: string;
  created_at: string;
  created_by: string | null;
  data_type: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  is_nullable: boolean | null;
  log: Json;
  table_name: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for columns
 * All fields are optional for partial updates
 */
export interface ColumnsFormData {
  column_default?: string | null;
  column_name?: string;
  created_at?: string;
  created_by?: string | null;
  data_type?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  is_nullable?: boolean | null;
  log?: Json;
  table_name?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for columns
 */
export interface ColumnsValidationResult {
  valid: boolean;
  errors: {
    column_default?: string;
    column_name?: string;
    created_at?: string;
    created_by?: string;
    data_type?: string;
    description?: string;
    id?: string;
    is_active?: string;
    is_nullable?: string;
    log?: string;
    table_name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

