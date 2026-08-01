// =====================================================
// FILE: types/generated/plutus-economics/grant_applications.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-08-01T17:49:54.573Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GrantApplicationsRow = Tables<'grant_applications'>;
export type GrantApplicationsInsert = TablesInsert<'grant_applications'>;
export type GrantApplicationsUpdate = TablesUpdate<'grant_applications'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of grant_applications
 */
export interface PublicGrantApplications {
  attachment_ids: string[] | null;
  created_at: string;
  created_by: string;
  deadline: string | null;
  id: string;
  name: string;
  narrative_ids: string[] | null;
  notes: string | null;
  opportunity_id: string | null;
  outcome_notes: string | null;
  reminder_enabled: boolean;
  status: string;
  submitted_at: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for grant_applications
 * All fields are optional for partial updates
 */
export interface GrantApplicationsFormData {
  attachment_ids?: string[] | null;
  created_at?: string;
  created_by?: string;
  deadline?: string | null;
  id?: string;
  name?: string;
  narrative_ids?: string[] | null;
  notes?: string | null;
  opportunity_id?: string | null;
  outcome_notes?: string | null;
  reminder_enabled?: boolean;
  status?: string;
  submitted_at?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for grant_applications
 */
export interface GrantApplicationsValidationResult {
  valid: boolean;
  errors: {
    attachment_ids?: string;
    created_at?: string;
    created_by?: string;
    deadline?: string;
    id?: string;
    name?: string;
    narrative_ids?: string;
    notes?: string;
    opportunity_id?: string;
    outcome_notes?: string;
    reminder_enabled?: string;
    status?: string;
    submitted_at?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

