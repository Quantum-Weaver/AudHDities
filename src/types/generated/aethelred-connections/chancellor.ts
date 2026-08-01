// =====================================================
// FILE: types/generated/aethelred-connections/chancellor.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T18:08:02.184Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ChancellorRow = Tables<'chancellor'>;
export type ChancellorInsert = TablesInsert<'chancellor'>;
export type ChancellorUpdate = TablesUpdate<'chancellor'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of chancellor
 */
export interface PublicChancellor {
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
 * Form data for chancellor
 * All fields are optional for partial updates
 */
export interface ChancellorFormData {
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
 * Validation result for chancellor
 */
export interface ChancellorValidationResult {
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

