// =====================================================
// FILE: types/aethelred_connections/github_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T18:12:44.719Z
// SOURCE: database.types.ts lines 2206-2268
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type GithubConnectionRow = Database['public']['Tables']['github_connection']['Row'];
export type GithubConnectionInsert = Database['public']['Tables']['github_connection']['Insert'];
export type GithubConnectionUpdate = Database['public']['Tables']['github_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for github_connection
 * All fields are optional for partial updates
 */
export interface GithubConnectionFormData {

}

/**
 * Validation result for github_connection
 */
export interface GithubConnectionValidationResult {
  valid: boolean;
  errors: {

  };
}

