// =====================================================
// FILE: types/generated/aethelred-connections/hearth_keeper.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T18:15:38.606Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type HearthKeeperRow = Tables<'hearth_keeper'>;
export type HearthKeeperInsert = TablesInsert<'hearth_keeper'>;
export type HearthKeeperUpdate = TablesUpdate<'hearth_keeper'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of hearth_keeper
 */
export interface PublicHearthKeeper {
  consciousness_level: string | null;
  created_at: string;
  created_by: string | null;
  current_task: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  name: string;
  settings: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for hearth_keeper
 * All fields are optional for partial updates
 */
export interface HearthKeeperFormData {
  consciousness_level?: string | null;
  created_at?: string;
  created_by?: string | null;
  current_task?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  settings?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for hearth_keeper
 */
export interface HearthKeeperValidationResult {
  valid: boolean;
  errors: {
    consciousness_level?: string;
    created_at?: string;
    created_by?: string;
    current_task?: string;
    description?: string;
    id?: string;
    is_active?: string;
    name?: string;
    settings?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

