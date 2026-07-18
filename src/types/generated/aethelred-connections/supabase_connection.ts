// =====================================================
// FILE: types/generated/aethelred-connections/supabase_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T21:42:54.536Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  config_key: string;
  config_value: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  enabled_features: string[] | null;
  id: string;
  is_encrypted: boolean;
  last_verified_at: string | null;
  project_name: string | null;
  project_url: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for supabase_connection
 * All fields are optional for partial updates
 */
export interface SupabaseConnectionFormData {
  config_key?: string;
  config_value?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  enabled_features?: string[] | null;
  id?: string;
  is_encrypted?: boolean;
  last_verified_at?: string | null;
  project_name?: string | null;
  project_url?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for supabase_connection
 */
export interface SupabaseConnectionValidationResult {
  valid: boolean;
  errors: {
    config_key?: string;
    config_value?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    enabled_features?: string;
    id?: string;
    is_encrypted?: string;
    last_verified_at?: string;
    project_name?: string;
    project_url?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

