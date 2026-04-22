// =====================================================
// FILE: types/generated/aethelred-connections/github_connection.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.199Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type WorkflowStatus = Database['public']['Enums']['workflow_status'];
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

