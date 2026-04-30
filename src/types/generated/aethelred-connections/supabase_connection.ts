// =====================================================
// FILE: types/generated/aethelred-connections/supabase_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T00:26:46.687Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SupabaseStatus = Enums<'supabase_status'>;

export type SupabaseConnectionRow = Tables<'supabase_connection'>;
export type SupabaseConnectionInsert = TablesInsert<'supabase_connection'>;
export type SupabaseConnectionUpdate = TablesUpdate<'supabase_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of supabase_connection
 */
export interface PublicSupabaseConnection {
  api_keys: Json | null;
  connection_status: SupabaseStatus;
  created_at: string | null;
  created_by: string | null;
  edge_functions: string[] | null;
  id: string;
  last_health_check: string | null;
  last_migration_at: string | null;
  migrations_applied: string[] | null;
  operated_by: string | null;
  project_id: string;
  project_url: string;
  schema_version: string;
  storage_buckets: string[] | null;
  updated_at: string | null;
}

/**
 * Form data for supabase_connection
 * All fields are optional for partial updates
 */
export interface SupabaseConnectionFormData {
  api_keys?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  edge_functions?: string[] | null;
  id?: string;
  last_health_check?: string | null;
  last_migration_at?: string | null;
  migrations_applied?: string[] | null;
  operated_by?: string | null;
  project_id?: string;
  project_url?: string;
  schema_version?: string;
  storage_buckets?: string[] | null;
  updated_at?: string | null;
}

/**
 * Validation result for supabase_connection
 */
export interface SupabaseConnectionValidationResult {
  valid: boolean;
  errors: {
    api_keys?: string;
    connection_status?: string;
    created_at?: string;
    created_by?: string;
    edge_functions?: string;
    id?: string;
    last_health_check?: string;
    last_migration_at?: string;
    migrations_applied?: string;
    operated_by?: string;
    project_id?: string;
    project_url?: string;
    schema_version?: string;
    storage_buckets?: string;
    updated_at?: string;
  };
}

