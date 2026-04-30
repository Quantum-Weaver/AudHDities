// =====================================================
// FILE: types/generated/mnemosyne-assessment/folksonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T15:32:13.469Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type FolksonomyTargetType = Enums<'folksonomy_target_type'>;

export type FolksonomyRow = Tables<'folksonomy'>;
export type FolksonomyInsert = TablesInsert<'folksonomy'>;
export type FolksonomyUpdate = TablesUpdate<'folksonomy'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of folksonomy
 */
export interface PublicFolksonomy {
  approved_by: string | null;
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  folksonomy_id: string;
  is_approved: boolean | null;
  tag: string;
  target_id: string;
  target_type: FolksonomyTargetType;
  updated_at: string | null;
  updated_by: string | null;
  weight: number | null;
}

/**
 * Form data for folksonomy
 * All fields are optional for partial updates
 */
export interface FolksonomyFormData {
  approved_by?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  creator_id?: string;
  folksonomy_id?: string;
  is_approved?: boolean | null;
  tag?: string;
  target_id?: string;
  target_type?: FolksonomyTargetType;
  updated_at?: string | null;
  updated_by?: string | null;
  weight?: number | null;
}

/**
 * Validation result for folksonomy
 */
export interface FolksonomyValidationResult {
  valid: boolean;
  errors: {
    approved_by?: string;
    created_at?: string;
    created_by?: string;
    creator_id?: string;
    folksonomy_id?: string;
    is_approved?: string;
    tag?: string;
    target_id?: string;
    target_type?: string;
    updated_at?: string;
    updated_by?: string;
    weight?: string;
  };
}

