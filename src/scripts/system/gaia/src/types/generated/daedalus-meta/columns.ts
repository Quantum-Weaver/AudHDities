// =====================================================
// FILE: types/generated/daedalus-meta/columns.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T17:46:58.393Z
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
  archived_at: string | null;
  column_default: string | null;
  column_name: string;
  created_at: string;
  created_by: string | null;
  data_type: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  is_nullable: boolean | null;
  last_seen_at: string | null;
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
  archived_at?: string | null;
  column_default?: string | null;
  column_name?: string;
  created_at?: string;
  created_by?: string | null;
  data_type?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  is_nullable?: boolean | null;
  last_seen_at?: string | null;
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
    archived_at?: string;
    column_default?: string;
    column_name?: string;
    created_at?: string;
    created_by?: string;
    data_type?: string;
    description?: string;
    id?: string;
    is_active?: string;
    is_nullable?: string;
    last_seen_at?: string;
    log?: string;
    table_name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

