// =====================================================
// FILE: types/generated/plutus-economics/grant_collaborators.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-28T05:07:04.254Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GrantCollaboratorsRow = Tables<'grant_collaborators'>;
export type GrantCollaboratorsInsert = TablesInsert<'grant_collaborators'>;
export type GrantCollaboratorsUpdate = TablesUpdate<'grant_collaborators'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of grant_collaborators
 */
export interface PublicGrantCollaborators {
  application_id: string;
  created_at: string;
  id: string;
  notes: string | null;
  role: string | null;
  updated_at: string;
  user_id: string;
}

/**
 * Form data for grant_collaborators
 * All fields are optional for partial updates
 */
export interface GrantCollaboratorsFormData {
  application_id?: string;
  created_at?: string;
  id?: string;
  notes?: string | null;
  role?: string | null;
  updated_at?: string;
  user_id?: string;
}

/**
 * Validation result for grant_collaborators
 */
export interface GrantCollaboratorsValidationResult {
  valid: boolean;
  errors: {
    application_id?: string;
    created_at?: string;
    id?: string;
    notes?: string;
    role?: string;
    updated_at?: string;
    user_id?: string;
  };
}

