// =====================================================
// FILE: types/generated/hestia-core/sigil_unlocks.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.819Z
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
 * Public view of sigil_unlocks
 */
export interface PublicSigilUnlocks {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  name: string;
  sigil_id: string;
  status: ContentStatus;
  trigger_entity: string | null;
  trigger_type: string;
  trigger_value: number | null;
  updated_at: string;
  updated_by: string | null;
}

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

/**
 * Validation result for sigil_unlocks
 */
export interface SigilUnlocksValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    sigil_id?: string;
    status?: string;
    trigger_entity?: string;
    trigger_type?: string;
    trigger_value?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

