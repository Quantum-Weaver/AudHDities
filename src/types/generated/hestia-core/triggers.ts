// =====================================================
// FILE: types/generated/hestia-core/triggers.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-29T16:16:54.058Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type TriggersRow = Tables<'triggers'>;
export type TriggersInsert = TablesInsert<'triggers'>;
export type TriggersUpdate = TablesUpdate<'triggers'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of triggers
 */
export interface PublicTriggers {
  created_at: string;
  created_by: string | null;
  description: string | null;
  events: string | null;
  function_name: string | null;
  id: string;
  is_active: boolean;
  log: Json;
  name: string;
  table_name: string;
  timing: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for triggers
 * All fields are optional for partial updates
 */
export interface TriggersFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  events?: string | null;
  function_name?: string | null;
  id?: string;
  is_active?: boolean;
  log?: Json;
  name?: string;
  table_name?: string;
  timing?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for triggers
 */
export interface TriggersValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    events?: string;
    function_name?: string;
    id?: string;
    is_active?: string;
    log?: string;
    name?: string;
    table_name?: string;
    timing?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

