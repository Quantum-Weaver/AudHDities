// =====================================================
// FILE: types/generated/hestia-core/relationships.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T17:46:58.445Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type RelationshipsRow = Tables<'relationships'>;
export type RelationshipsInsert = TablesInsert<'relationships'>;
export type RelationshipsUpdate = TablesUpdate<'relationships'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of relationships
 */
export interface PublicRelationships {
  archived_at: string | null;
  columns: Json;
  constraint_name: string;
  created_at: string;
  created_by: string | null;
  description: string | null;
  foreign_columns: Json;
  foreign_table: string;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
  log: Json;
  on_delete: string | null;
  on_update: string | null;
  one_to_one: boolean;
  table_name: string;
  updated_at: string;
}

/**
 * Form data for relationships
 * All fields are optional for partial updates
 */
export interface RelationshipsFormData {
  archived_at?: string | null;
  columns?: Json;
  constraint_name?: string;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  foreign_columns?: Json;
  foreign_table?: string;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
  log?: Json;
  on_delete?: string | null;
  on_update?: string | null;
  one_to_one?: boolean;
  table_name?: string;
  updated_at?: string;
}

/**
 * Validation result for relationships
 */
export interface RelationshipsValidationResult {
  valid: boolean;
  errors: {
    archived_at?: string;
    columns?: string;
    constraint_name?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    foreign_columns?: string;
    foreign_table?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    on_delete?: string;
    on_update?: string;
    one_to_one?: string;
    table_name?: string;
    updated_at?: string;
  };
}

