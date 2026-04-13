// =====================================================
// FILE: types/generated/aethelred-connections/supabase_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.904Z
// SOURCE: database.types.ts lines 5799-5873
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

import type { Json } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SupabaseStatus = Database['public']['Enums']['supabase_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type SupabaseConnectionRow = Database['public']['Tables']['supabase_connection']['Row'];
export type SupabaseConnectionInsert = Database['public']['Tables']['supabase_connection']['Insert'];
export type SupabaseConnectionUpdate = Database['public']['Tables']['supabase_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of supabase_connection
 */
export interface PublicSupabaseConnection {
  api_keys: Json | null;
  connection_status:;
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

