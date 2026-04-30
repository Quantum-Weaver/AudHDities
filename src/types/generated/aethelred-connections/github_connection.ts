// =====================================================
// FILE: types/generated/aethelred-connections/github_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T00:26:46.020Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type WorkflowStatus = Enums<'workflow_status'>;

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
  branch: string | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  issues_open: number | null;
  last_commit_at: string | null;
  last_commit_message: string | null;
  last_commit_sha: string | null;
  operated_by: string | null;
  pull_requests_open: number | null;
  repository_name: string;
  repository_url: string;
  stars: number | null;
  updated_at: string | null;
  workflow_status: WorkflowStatus | null;
}

/**
 * Form data for github_connection
 * All fields are optional for partial updates
 */
export interface GithubConnectionFormData {
  branch?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  issues_open?: number | null;
  last_commit_at?: string | null;
  last_commit_message?: string | null;
  last_commit_sha?: string | null;
  operated_by?: string | null;
  pull_requests_open?: number | null;
  repository_name?: string;
  repository_url?: string;
  stars?: number | null;
  updated_at?: string | null;
  workflow_status?: WorkflowStatus | null;
}

/**
 * Validation result for github_connection
 */
export interface GithubConnectionValidationResult {
  valid: boolean;
  errors: {
    branch?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    issues_open?: string;
    last_commit_at?: string;
    last_commit_message?: string;
    last_commit_sha?: string;
    operated_by?: string;
    pull_requests_open?: string;
    repository_name?: string;
    repository_url?: string;
    stars?: string;
    updated_at?: string;
    workflow_status?: string;
  };
}

