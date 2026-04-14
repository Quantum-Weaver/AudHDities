// =====================================================
// FILE: types/generated/mnemosyne-assessment/folksonomy.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.826Z
// SOURCE: database.types.ts lines 2499-2559
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type FolksonomyTargetType = Database['public']['Enums']['folksonomy_target_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type FolksonomyRow = Database['public']['Tables']['folksonomy']['Row'];
export type FolksonomyInsert = Database['public']['Tables']['folksonomy']['Insert'];
export type FolksonomyUpdate = Database['public']['Tables']['folksonomy']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of folksonomy
 */
export interface PublicFolksonomy {
  approved_by: string | null;
  "created_at": "string | null";
  created_by: string | null;
  creator_id: string;
  id: string;
  is_approved: boolean | null;
  tag: string;
  target_id: string;
  target_type: FolksonomyTargetType;
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
  id?: string;
  is_approved?: boolean | null;
  tag?: string;
  target_id?: string;
  target_type?: FolksonomyTargetType;
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
    id?: string;
    is_approved?: string;
    tag?: string;
    target_id?: string;
    target_type?: string;
    weight?: string;
  };
}

