// =====================================================
// FILE: types/generated/aethelred-connections/supabase_connection.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.765Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SupabaseStatus = Database['public']['Enums']['supabase_status'];
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

