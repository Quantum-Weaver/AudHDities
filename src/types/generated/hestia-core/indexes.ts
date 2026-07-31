// =====================================================
// FILE: types/generated/hestia-core/indexes.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T01:03:41.299Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type IndexesRow = Tables<'indexes'>;
export type IndexesInsert = TablesInsert<'indexes'>;
export type IndexesUpdate = TablesUpdate<'indexes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of indexes
 */
export interface PublicIndexes {
  columns: string | null;
  created_at: string;
  created_by: string | null;
  definition: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  log: Json;
  name: string;
  table_name: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for indexes
 * All fields are optional for partial updates
 */
export interface IndexesFormData {
  columns?: string | null;
  created_at?: string;
  created_by?: string | null;
  definition?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  log?: Json;
  name?: string;
  table_name?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for indexes
 */
export interface IndexesValidationResult {
  valid: boolean;
  errors: {
    columns?: string;
    created_at?: string;
    created_by?: string;
    definition?: string;
    description?: string;
    id?: string;
    is_active?: string;
    log?: string;
    name?: string;
    table_name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

