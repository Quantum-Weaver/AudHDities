// =====================================================
// FILE: types/generated/daedalus-meta/triggers.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-07-31T23:16:54.881Z
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
  archived_at: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  events: string | null;
  function_name: string | null;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
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
  archived_at?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  events?: string | null;
  function_name?: string | null;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
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
    archived_at?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    events?: string;
    function_name?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    name?: string;
    table_name?: string;
    timing?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

