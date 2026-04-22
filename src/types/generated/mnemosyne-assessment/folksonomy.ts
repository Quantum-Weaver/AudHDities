// =====================================================
// FILE: types/generated/mnemosyne-assessment/folksonomy.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.939Z
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

export type FolksonomyTargetType = Database['public']['Enums']['folksonomy_target_type'];
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

