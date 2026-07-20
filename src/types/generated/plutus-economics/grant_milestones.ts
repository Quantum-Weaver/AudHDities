// =====================================================
// FILE: types/generated/plutus-economics/grant_milestones.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-20T04:39:10.599Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GrantMilestonesRow = Tables<'grant_milestones'>;
export type GrantMilestonesInsert = TablesInsert<'grant_milestones'>;
export type GrantMilestonesUpdate = TablesUpdate<'grant_milestones'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of grant_milestones
 */
export interface PublicGrantMilestones {
  application_id: string | null;
  completed_at: string | null;
  created_at: string;
  created_by: string;
  description: string | null;
  due_date: string | null;
  id: string;
  name: string;
  notes: string | null;
  status: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for grant_milestones
 * All fields are optional for partial updates
 */
export interface GrantMilestonesFormData {
  application_id?: string | null;
  completed_at?: string | null;
  created_at?: string;
  created_by?: string;
  description?: string | null;
  due_date?: string | null;
  id?: string;
  name?: string;
  notes?: string | null;
  status?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for grant_milestones
 */
export interface GrantMilestonesValidationResult {
  valid: boolean;
  errors: {
    application_id?: string;
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    due_date?: string;
    id?: string;
    name?: string;
    notes?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

