// =====================================================
// FILE: types/generated/aethelred-connections/entity_states.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T17:49:54.560Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type EntityStatesRow = Tables<'entity_states'>;
export type EntityStatesInsert = TablesInsert<'entity_states'>;
export type EntityStatesUpdate = TablesUpdate<'entity_states'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of entity_states
 */
export interface PublicEntityStates {
  changed_by: string | null;
  created_at: string;
  entity_name: string;
  entity_table: string | null;
  id: string;
  new_value: string | null;
  occurred_at: string;
  previous_value: string | null;
  state_data: Json | null;
  state_type: string;
}

/**
 * Form data for entity_states
 * All fields are optional for partial updates
 */
export interface EntityStatesFormData {
  changed_by?: string | null;
  created_at?: string;
  entity_name?: string;
  entity_table?: string | null;
  id?: string;
  new_value?: string | null;
  occurred_at?: string;
  previous_value?: string | null;
  state_data?: Json | null;
  state_type?: string;
}

/**
 * Validation result for entity_states
 */
export interface EntityStatesValidationResult {
  valid: boolean;
  errors: {
    changed_by?: string;
    created_at?: string;
    entity_name?: string;
    entity_table?: string;
    id?: string;
    new_value?: string;
    occurred_at?: string;
    previous_value?: string;
    state_data?: string;
    state_type?: string;
  };
}

