// =====================================================
// FILE: types/generated/athena-gamification/sigil_unlocks.ts
// HANDLING: join_table
// DEITY: athena-gamification
// GENERATED: 2026-07-18T23:09:31.520Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type SigilUnlocksRow = Tables<'sigil_unlocks'>;
export type SigilUnlocksInsert = TablesInsert<'sigil_unlocks'>;
export type SigilUnlocksUpdate = TablesUpdate<'sigil_unlocks'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for sigil_unlocks
 * All fields are optional for partial updates
 */
export interface SigilUnlocksFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  name?: string;
  sigil_id?: string;
  status?: ContentStatus;
  trigger_entity?: string | null;
  trigger_type?: string;
  trigger_value?: number | null;
  updated_at?: string;
  updated_by?: string | null;
}

