// =====================================================
// FILE: types/generated/aethelred-connections/vercel_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:17:11.214Z
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

export type VercelConnectionRow = Tables<'vercel_connection'>;
export type VercelConnectionInsert = TablesInsert<'vercel_connection'>;
export type VercelConnectionUpdate = TablesUpdate<'vercel_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vercel_connection
 */
export interface PublicVercelConnection {
  config_key: string;
  config_value: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  enabled_integrations: string[] | null;
  id: string;
  is_encrypted: boolean;
  last_deployed_at: string | null;
  preview_domains: string[] | null;
  production_domain: string | null;
  project_name: string | null;
  status: ContentStatus;
  team_name: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for vercel_connection
 * All fields are optional for partial updates
 */
export interface VercelConnectionFormData {
  config_key?: string;
  config_value?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  enabled_integrations?: string[] | null;
  id?: string;
  is_encrypted?: boolean;
  last_deployed_at?: string | null;
  preview_domains?: string[] | null;
  production_domain?: string | null;
  project_name?: string | null;
  status?: ContentStatus;
  team_name?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for vercel_connection
 */
export interface VercelConnectionValidationResult {
  valid: boolean;
  errors: {
    config_key?: string;
    config_value?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    enabled_integrations?: string;
    id?: string;
    is_encrypted?: string;
    last_deployed_at?: string;
    preview_domains?: string;
    production_domain?: string;
    project_name?: string;
    status?: string;
    team_name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

