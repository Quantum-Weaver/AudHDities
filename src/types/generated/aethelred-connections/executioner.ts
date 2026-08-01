// =====================================================
// FILE: types/generated/aethelred-connections/executioner.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T18:15:38.594Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

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
 * Form data for executioner
 * All fields are optional for partial updates
 */
export interface ExecutionerFormData {
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
 * Validation result for executioner
 */
export interface ExecutionerValidationResult {
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

