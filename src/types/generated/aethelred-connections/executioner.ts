// =====================================================
// FILE: types/generated/aethelred-connections/executioner.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.897Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ExecutionerRow = Tables<'executioner'>;
export type ExecutionerInsert = TablesInsert<'executioner'>;
export type ExecutionerUpdate = TablesUpdate<'executioner'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of executioner
 */
export interface PublicExecutioner {
  appeal_queue: Json | null;
  banned_users: string[] | null;
  boundary_violations: Json | null;
  created_at: string | null;
  created_by: string | null;
  execution_count: number | null;
  id: string;
  justice_log: Json | null;
  suspended_users: string[] | null;
  updated_at: string | null;
}

/**
 * Form data for executioner
 * All fields are optional for partial updates
 */
export interface ExecutionerFormData {
  appeal_queue?: Json | null;
  banned_users?: string[] | null;
  boundary_violations?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  execution_count?: number | null;
  id?: string;
  justice_log?: Json | null;
  suspended_users?: string[] | null;
  updated_at?: string | null;
}

