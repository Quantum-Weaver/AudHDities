// =====================================================
// FILE: types/generated/aethelred-connections/github_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:17:10.843Z
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

export type GithubConnectionRow = Tables<'github_connection'>;
export type GithubConnectionInsert = TablesInsert<'github_connection'>;
export type GithubConnectionUpdate = TablesUpdate<'github_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of github_connection
 */
export interface PublicGithubConnection {
  config_key: string;
  config_value: string | null;
  created_at: string;
  created_by: string | null;
  default_branch: string;
  description: string | null;
  enabled_workflows: string[] | null;
  id: string;
  is_encrypted: boolean;
  last_verified_at: string | null;
  repository_name: string | null;
  repository_owner: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for github_connection
 * All fields are optional for partial updates
 */
export interface GithubConnectionFormData {
  config_key?: string;
  config_value?: string | null;
  created_at?: string;
  created_by?: string | null;
  default_branch?: string;
  description?: string | null;
  enabled_workflows?: string[] | null;
  id?: string;
  is_encrypted?: boolean;
  last_verified_at?: string | null;
  repository_name?: string | null;
  repository_owner?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for github_connection
 */
export interface GithubConnectionValidationResult {
  valid: boolean;
  errors: {
    config_key?: string;
    config_value?: string;
    created_at?: string;
    created_by?: string;
    default_branch?: string;
    description?: string;
    enabled_workflows?: string;
    id?: string;
    is_encrypted?: string;
    last_verified_at?: string;
    repository_name?: string;
    repository_owner?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

