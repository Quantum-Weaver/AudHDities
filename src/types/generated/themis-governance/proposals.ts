// =====================================================
// FILE: types/generated/themis-governance/proposals.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-28T15:33:49.895Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ApplicationStatus = Enums<'application_status'>;

export type ProposalsRow = Tables<'proposals'>;
export type ProposalsInsert = TablesInsert<'proposals'>;
export type ProposalsUpdate = TablesUpdate<'proposals'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of proposals
 */
export interface PublicProposals {
  created_at: string;
  created_by: string;
  description: string | null;
  id: string;
  name: string;
  proposal_type: string | null;
  review_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  slug: string;
  status: ApplicationStatus;
  updated_at: string;
  updated_by: string | null;
  votes_against: number;
  votes_for: number;
  voting_ends_at: string | null;
}

/**
 * Form data for proposals
 * All fields are optional for partial updates
 */
export interface ProposalsFormData {
  created_at?: string;
  created_by?: string;
  description?: string | null;
  id?: string;
  name?: string;
  proposal_type?: string | null;
  review_notes?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  slug?: string;
  status?: ApplicationStatus;
  updated_at?: string;
  updated_by?: string | null;
  votes_against?: number;
  votes_for?: number;
  voting_ends_at?: string | null;
}

/**
 * Validation result for proposals
 */
export interface ProposalsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    proposal_type?: string;
    review_notes?: string;
    reviewed_at?: string;
    reviewed_by?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    votes_against?: string;
    votes_for?: string;
    voting_ends_at?: string;
  };
}

