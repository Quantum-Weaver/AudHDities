// =====================================================
// FILE: types/generated/daedalus-meta/indexes.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T21:41:40.279Z
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
  archived_at: string | null;
  columns: string | null;
  created_at: string;
  created_by: string | null;
  definition: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
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
  archived_at?: string | null;
  columns?: string | null;
  created_at?: string;
  created_by?: string | null;
  definition?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
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
    archived_at?: string;
    columns?: string;
    created_at?: string;
    created_by?: string;
    definition?: string;
    description?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    name?: string;
    table_name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

