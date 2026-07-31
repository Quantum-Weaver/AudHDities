// =====================================================
// FILE: types/generated/hestia-core/current.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T00:35:01.330Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CurrentRow = Tables<'current'>;
export type CurrentInsert = TablesInsert<'current'>;
export type CurrentUpdate = TablesUpdate<'current'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of current
 */
export interface PublicCurrent {
  created_at: string;
  description: string | null;
  event_at: string;
  event_type: string;
  id: string;
  metadata: Json | null;
  reference_id: string | null;
  reference_table: string | null;
  sovereign_id: string | null;
}

/**
 * Form data for current
 * All fields are optional for partial updates
 */
export interface CurrentFormData {
  created_at?: string;
  description?: string | null;
  event_at?: string;
  event_type?: string;
  id?: string;
  metadata?: Json | null;
  reference_id?: string | null;
  reference_table?: string | null;
  sovereign_id?: string | null;
}

/**
 * Validation result for current
 */
export interface CurrentValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    description?: string;
    event_at?: string;
    event_type?: string;
    id?: string;
    metadata?: string;
    reference_id?: string;
    reference_table?: string;
    sovereign_id?: string;
  };
}

