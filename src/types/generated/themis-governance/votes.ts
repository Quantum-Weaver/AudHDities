// =====================================================
// FILE: types/generated/themis-governance/votes.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-31T23:16:55.008Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type VotesRow = Tables<'votes'>;
export type VotesInsert = TablesInsert<'votes'>;
export type VotesUpdate = TablesUpdate<'votes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of votes
 */
export interface PublicVotes {
  cast_at: string;
  choice: string;
  id: string;
  proposal_id: string;
  updated_at: string;
  voter_id: string;
}

/**
 * Form data for votes
 * All fields are optional for partial updates
 */
export interface VotesFormData {
  cast_at?: string;
  choice?: string;
  id?: string;
  proposal_id?: string;
  updated_at?: string;
  voter_id?: string;
}

/**
 * Validation result for votes
 */
export interface VotesValidationResult {
  valid: boolean;
  errors: {
    cast_at?: string;
    choice?: string;
    id?: string;
    proposal_id?: string;
    updated_at?: string;
    voter_id?: string;
  };
}

